from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from app.models.db import Database
from ..config import Config

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validaciones básicas
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email y contraseña requeridos'}), 400
    
    # Verificar si el usuario ya existe
    existing_user = Database.execute_query(
        "SELECT * FROM usuarios WHERE email = %s", 
        (data['email'],), 
        fetch_one=True
    )
    
    if existing_user:
        return jsonify({'error': 'El usuario ya existe'}), 409
    
    # Crear nuevo usuario
    hashed_password = generate_password_hash(data['password'])
    Database.execute_query(
        "INSERT INTO usuarios (email, password_hash, nombre, apellido) VALUES (%s, %s, %s, %s)",
        (data['email'], hashed_password, data.get('nombre'), data.get('apellido'))
    )
    
    return jsonify({'message': 'Usuario registrado exitosamente'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validaciones
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email y contraseña requeridos'}), 400
    
    # Buscar usuario
    user = Database.execute_query(
        "SELECT * FROM usuarios WHERE email = %s", 
        (data['email'],), 
        fetch_one=True
    )
    
    if not user or not check_password_hash(user['password_hash'], data['password']):
        return jsonify({'error': 'Credenciales inválidas'}), 401
    
    # Generar token JWT
    token = jwt.encode({
        'user_id': user['usuario_id'],
        'exp': datetime.utcnow() + timedelta(days=7)
    }, Config.SECRET_KEY, algorithm='HS256')
    
    return jsonify({
        'token': token,
        'user_id': user['usuario_id'],
        'email': user['email']
    })

@auth_bp.route('/check-auth', methods=['GET'])
def check_auth():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token requerido'}), 401
    
    try:
        data = jwt.decode(token.split()[1], Config.SECRET_KEY, algorithms=['HS256'])
        return jsonify({'valid': True, 'user_id': data['user_id']})
    except:
        return jsonify({'error': 'Token inválido'}), 401