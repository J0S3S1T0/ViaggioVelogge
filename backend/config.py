import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Configuración de la base de datos ViaggioVelogge
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', 'cesareduardo119')
    DB_NAME = os.getenv('DB_NAME', 'ViaggioVelogge')
    
    # Configuración de la aplicación
    SECRET_KEY = os.getenv('SECRET_KEY', 'tu-clave-secreta-aqui')