import requests
import os
from .models.movies import Movie
from app import db
import random

TMDB_API_KEY = os.getenv('TMDB_API_KEY')

# Check database first
def get_movies_by_genre_from_db(genre):
    return Movie.query.filter_by(genre=genre).all()


# Check if a movie with the given ID exists in the database
def movie_exists(movie_id):
    return Movie.query.filter_by(id=movie_id).first() is not None

# Update an existing movie with new data
def update_movie(movie, data):
    movie.title = data['title']
    movie.genre = data['genre']
    movie.vote_average = data['vote_average']
    movie.overview = data['overview']
    db.session.commit()

# Fetch movies from the API and return only the random one
def get_movie_by_genre_from_api(genre):
    url = f"https://api.themoviedb.org/3/discover/movie?api_key={TMDB_API_KEY}&with_genres={genre}"
    response = requests.get(url)
    movies_data = response.json().get('results', [])
    
    if not movies_data:
        return None
    
    data = random.choice(movies_data)
    
    movie = Movie(
        id=data['id'],
        title=data['title'],
        genre=genre,
        vote_average=data['vote_average'],
        overview=data['overview']
    )

    # Check if the movie already exists in the database
    existing_movie = Movie.query.filter_by(id=movie.id).first()
    if existing_movie:
        # If the movie exists, update its data
        update_movie(existing_movie, data)
        return existing_movie
    else:
        # If the movie doesn't exist, add it to the database
        db.session.add(movie)
        db.session.commit()
        return movie

# Function to recommend movies based on mood
def recommended_movies(mood):
    all_genres = {
        'feliz': '35',   # Comedy
        'triste': '18',     # Drama
        'animado': '28', # Action
        'assutado': '27',  # Horror
        'romântico': '10749',# Romance
        'misterioso': '9648',# Mystery
        'nostálgico': '10751',# Family
        'sombrio': '80', # Crime
        'inspirado': '36', # Histórico
        'reflexivo': '9648', # Mistério ou Drama Psicológico
        'eufórico': '53',   # Thriller
        'tenso': '53', # Suspense
        'curioso': '14',  # fantasy
        'sozinho': '878', #Science Fiction 
        'esperançoso': '99',# documentary,
        'aventureiro': '37', #western
        'resiliente': '10752', #War
        'brincalhão': '35',
        'melancólico': '18'
    }

    genre = all_genres.get(mood.lower()) 
    if not genre:
        return []

    
    movie = get_movie_by_genre_from_api(genre)
    if movie:
        # If movie is successfully fetched from the API, return it as a list
        return [movie.to_dict()]
    
    # If movies are found in the database or fetched from the API, return them
    return sorted([movie.to_dict()], key=lambda x: x['vote_average'], reverse=True)