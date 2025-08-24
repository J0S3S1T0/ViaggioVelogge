import mysql.connector
from mysql.connector import Error
from flask import current_app
from ..config import Config

class Database:
    @staticmethod
    def get_connection():
        try:
            connection = mysql.connector.connect(
                host=Config.DB_HOST,
                user=Config.DB_USER,
                password=Config.DB_PASSWORD,
                database=Config.DB_NAME,
                auth_plugin='mysql_native_password'  # Puede ser necesario
            )
            if connection.is_connected():
                print(f"Conexión exitosa a la base de datos {Config.DB_NAME}")
                return connection
        except Error as e:
            current_app.logger.error(f"Error al conectar a MySQL: {e}")
            return None

    @staticmethod
    def execute_query(query, params=None, fetch_one=False):
        conn = Database.get_connection()
        if conn is None:
            return None
            
        cursor = conn.cursor(dictionary=True)
        try:
            cursor.execute(query, params or ())
            
            if query.strip().lower().startswith('select'):
                result = cursor.fetchone() if fetch_one else cursor.fetchall()
            else:
                conn.commit()
                result = cursor.rowcount
            
            return result
        except Error as e:
            current_app.logger.error(f"Error en la consulta: {e}")
            conn.rollback()
            return None
        finally:
            cursor.close()
            conn.close()