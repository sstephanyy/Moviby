from flask import Blueprint, request, jsonify
from ..tmdb_service import recommended_movies
from flask_jwt_extended import jwt_required

main_bp = Blueprint('main', __name__)

@main_bp.route('/recomendar', methods=['GET'])
@jwt_required()
def recommend():
    mood = request.args.get('mood')
    if not mood:
        return jsonify({"msg": "Mood parameter is required"}), 400

    movies = recommended_movies(mood)
    return jsonify(movies), 200