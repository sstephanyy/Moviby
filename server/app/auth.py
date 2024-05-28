from flask import Blueprint, request, jsonify
from .models import User
from . import db
from flask_jwt_extended import create_access_token
from flask_cors import cross_origin
from datetime import timedelta


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/registrar', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already exists"}), 409

    new_user = User(username=username)
    new_user.set_password(password)
    new_user.email = email
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    expires_in = timedelta(days=1)

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity={'email': user.email}, expires_delta=expires_in)
        return jsonify(access_token=access_token), 200

    return jsonify({"msg": "Invalid credentials"}), 401
