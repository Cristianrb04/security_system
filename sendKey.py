import requests

def send_key_to_api(key):
    api_url = "http://localhost:5001/modular-2025/us-central1/api/home"
    params = {"key": key}  # Agrega la clave como parámetro
    try:
        response = requests.get(api_url, params=params)
        if response.status_code == 200:
            print("Respuesta de la API:")
            print(response.json())  # Muestra el contenido de la respuesta
        elif response.status_code == 404:
            print("No se encontraron imágenes para la clave proporcionada.")
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
    except requests.exceptions.RequestException as e:
        print(f"Error al conectar con la API: {e}")

# Ejemplo de uso
key = "14012025"
send_key_to_api(key)
