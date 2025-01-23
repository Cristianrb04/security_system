const mongoose = require('mongoose');
const fs = require('fs'); 
const path = require('path'); 
const Image = require('./functions/models/image.js');

// Obtener el valor de la variable key desde argumentos de la CLI
const args = process.argv.slice(2);
const dynamicKey = args[0] || '00000000';  // Valor por defecto si no se pasa un argumento

mongoose.connect('mongodb://localhost:27017/imageDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const seedImages = async () => {
    try {
        const images = [
            {
                title: 'Imagen1',
                url: `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, 'foto3.png')).toString('base64')}`,
                path: path.join(__dirname, 'foto3.png'),
                key: dynamicKey,
            },
            {
                title: 'Imagen2',
                url: `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, 'foto4.png')).toString('base64')}`,
                path: path.join(__dirname, 'foto4.png'),
                key: dynamicKey,
            },
            {
                title: 'Imagen3',
                url: `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, 'foto5.png')).toString('base64')}`,
                path: path.join(__dirname, 'foto5.png'),
                key: dynamicKey,
            },
            {
                title: 'Imagen4',
                url: `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, 'foto6.png')).toString('base64')}`,
                path: path.join(__dirname, 'foto6.png'),
                key: dynamicKey,
            },
            {
                title: 'Imagen5',
                url: `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, 'foto7.png')).toString('base64')}`,
                path: path.join(__dirname, 'foto7.png'),
                key: dynamicKey,
            },
        ];

        await Image.insertMany(images);
        console.log('Imágenes agregadas con key:', dynamicKey);
    } catch (error) {
        console.error('Error al agregar las imágenes:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedImages();
