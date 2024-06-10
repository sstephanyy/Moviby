from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Movie
from app import db

saved_movies_bp = Blueprint('saved_movies', __name__)

@saved_movies_bp.route('/filmes_salvos', methods=['GET'])
@jwt_required
def get_saved_movies():
    # Get the current user's ID from the JWT
    user_id = get_jwt_identity()

    movies = Movie.query.filter_by(user_id=user_id).all()
    movies_dict = [movie.to_dict() for movie in movies]

    return jsonify(movies_dict), 200

@saved_movies_bp.route('/adicionar_filme', methods=['POST'])
@jwt_required()
def add_saved_movies():
    data = request.json

    category = data.get('category')

    new_movie = Movie(   
        category=category,
    )

    db.session.add(new_movie)
    db.session.commit()

    return jsonify({'message': 'Movie added successfully'}), 201



@saved_movies_bp.route('/atualizar_filme', methods=['PUT'])
@jwt_required()
def update_saved_movies():
    data = request.get_json()

    movie_id = data.get('movie_id')
    new_category = data.get('category')

    user_id = get_jwt_identity()

    movie = Movie.query.filter_by(id=movie_id, user_id=user_id).first()
    if not movie:
        return jsonify({'message': 'Movie not found or not owned by user'}), 404

    movie.category = new_category
    db.session.commit()

    return jsonify({'message': 'Movie category updated successfully'}), 200


@saved_movies_bp.route('/deletar_filme', methods=['DELETE'])
@jwt_required()
def delete_saved_movies():
    data = request.get_json()

    movie_id = data.get('movie_id')

    user_id = get_jwt_identity()

    movie = Movie.query.filter_by(id=movie_id, user_id=user_id).first()
    if not movie:
        return jsonify({'message': 'Movie not found or not owned by user'}), 404

    db.session.delete(movie)
    db.session.commit()

    return jsonify({'message': 'Movie deleted successfully'}), 200

