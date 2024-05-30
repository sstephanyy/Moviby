from flask import jsonify, request
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from functools import wraps
from .auth import auth_bp

def token_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
        except Exception as e:
            return jsonify(msg="Token inválido ou expirado"), 401
        return fn(*args, **kwargs)
    return wrapper

@auth_bp.route('/protegido', methods=['GET'])
@token_required
def protected_route():
    # Se o token for válido, a função será executada
    return jsonify(msg="Você está vendo esta mensagem porque está autenticado"), 200
