import subprocess
from datetime import datetime

# Generar la fecha y hora actual en formato numérico (DDMMYYYYHHMM)
fecha_hora_actual = datetime.now().strftime("%d%m%Y%H%M")

# Ejecutar el script JavaScript con la clave generada
try:
    result = subprocess.run(
        ['node', 'seed.js', fecha_hora_actual],
        capture_output=True,
        text=True
    )
    
    # Mostrar la salida del script
    print("Salida de seed.js:", result.stdout)

except Exception as e:
    print("Error al ejecutar el script:", str(e))
