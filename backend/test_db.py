from app.models.db import Database

# Prueba simple de conexión
def test_connection():
    query = "SHOW TABLES"
    tables = Database.execute_query(query)
    if tables:
        print("Conexión exitosa. Tablas en la base de datos:")
        for table in tables:
            print(table)
    else:
        print("Error al conectar a la base de datos")

if __name__ == "__main__":
    test_connection()