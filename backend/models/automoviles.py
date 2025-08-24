from .db import Database

class Automovil:
    @staticmethod
    def obtener_todos():
        query = """
        SELECT * FROM automoviles
        LEFT JOIN imagenes_autos 
        ON automoviles.auto_id = imagenes_autos.auto_id 
        AND imagenes_autos.es_principal = TRUE
        """
        return Database.execute_query(query)

    @staticmethod
    def crear_auto(datos_auto):
        query = """
        INSERT INTO automoviles 
        (marca, modelo, año, precio, descripcion)
        VALUES (%s, %s, %s, %s, %s)
        """
        params = (
            datos_auto['marca'],
            datos_auto['modelo'],
            datos_auto['año'],
            datos_auto['precio'],
            datos_auto['descripcion']
        )
        return Database.execute_query(query, params)