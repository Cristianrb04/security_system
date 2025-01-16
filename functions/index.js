const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Configuración de MongoDB
mongoose.connect('mongodb://localhost:27017/imageDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conectado a MongoDB");
}).catch((err) => {
    console.error("Error conectando a MongoDB:", err);
});

// Modelo de MongoDB
const Image = require('./models/image');

// Ruta principal
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../INICIO/home.html"));
});

// Ruta para obtener todas las imágenes
app.get("/api/images", async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        res.status(500).send("Error al obtener las imágenes");
    }
});

// Ruta para agregar una nueva imagen
app.post('/api/images', async (req, res) => {
    const { title, url } = req.body;
    try {
        const newImage = new Image({ title, url });
        await newImage.save();
        res.status(201).send('Imagen agregada');
    } catch (error) {
        res.status(500).send('Error al agregar la imagen');
    }
});

// Ruta para mostrar todas las imágenes con una key específica
app.get('/images/:key', async (req, res) => {
    const { key } = req.params;

    try {
        const images = await Image.find({ key: key.toString() }); // Convertir explícitamente a String
        console.log(`Imágenes encontradas:`, images);

        if (images.length === 0) {
            return res.status(404).send('No se encontraron imágenes con esa clave');
        }

        // Retorna directamente el campo `url` sin agregar el prefijo
        res.json(images.map(image => ({
            title: image.title,
            base64: image.url
        })));
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        res.status(500).send('Error al obtener las imágenes');
    }
});






// Ruta para ditto.json
app.get("/ditto", (req, res) => {
    res.json(require("./ditto.json"));
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).send("Página no encontrada");
});

// Exporta para Firebase
exports.api = functions.https.onRequest(app);
