import requests
import os
from datetime import datetime
from .models.movies import Movie
from app import db
import random

TMDB_API_KEY = os.getenv('TMDB_API_KEY')

def fetch_movie_details(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}"
    params = {
        'api_key': TMDB_API_KEY,
        'append_to_response': 'videos'
    }
    response = requests.get(url, params=params)
    data = response.json()

    trailer_url = None
    videos = data.get('videos', {}).get('results', [])
    for video in videos:
        if video['type'] == 'Trailer' and video['site'] == 'YouTube':
            trailer_url = f"https://www.youtube.com/embed/{video['key']}"
            break

    return {
        'duration': data.get('runtime', None),
        'trailer_url': trailer_url
    }

def get_movies_by_genre_from_db(genre):
    return Movie.query.filter_by(genre=genre).all()

def movie_exists(movie_id):
    return Movie.query.filter_by(id=movie_id).first() is not None

def update_movie(movie, data):
    movie.title = data['title']
    movie.vote_average = data['vote_average']
    movie.overview = data['overview']
    movie.release_year = datetime.strptime(data['release_date'], '%Y-%m-%d').year if data.get('release_date') else None
    movie.trailer_url = data.get('trailer_url', None)
    movie.genre = data.get('genre', movie.genre)
    if data.get('duration') is not None:
        hours, minutes = divmod(data['duration'], 60)
        movie.duration = f"{hours:02}:{minutes:02}"
    else:
        movie.duration = None

    db.session.commit()

def get_movie_by_genre_from_api(genre):
    url = f"https://api.themoviedb.org/3/discover/movie"
    params = {
        'api_key': TMDB_API_KEY,
        'with_genres': genre,
        'language': 'pt-BR'
    }
    response = requests.get(url, params=params)
    movies_data = response.json().get('results', [])

    if not movies_data:
        return None

    existing_movie_ids = [movie.id for movie in Movie.query.all()]
    new_movies_data = [movie for movie in movies_data if movie['id'] not in existing_movie_ids]

    if not new_movies_data:
        new_movies_data = movies_data

    data = random.choice(new_movies_data)
    details = fetch_movie_details(data['id'])
    data['video'] = True
    data['trailer_url'] = details['trailer_url']
    data['duration'] = details['duration']

    movie = Movie(
        id=data['id'],
        title=data['title'],
        genre=genre,
        vote_average=data['vote_average'],
        overview=data['overview'],
        release_year=datetime.strptime(data['release_date'], '%Y-%m-%d').year if data.get('release_date') else None,
        trailer_url=data['trailer_url'],
        duration=f"{details['duration'] // 60:02}:{details['duration'] % 60:02}" if details['duration'] is not None else None  # Convert duration to HH:MM format
    )

    existing_movie = Movie.query.filter_by(id=movie.id).first()
    if existing_movie:
        update_movie(existing_movie, data)
        return existing_movie
    else:
        db.session.add(movie)
        db.session.commit()
        return movie

def recommended_movies(mood):
    all_genres = {
        'feliz': '35',   # Comedy
        'triste': '18',  # Drama
        'animado': '28', # Action
        'assustado': '27',  # Horror
        'romantico': '10749',# Romance
        'misterioso': '9648',# Mystery
        'nostalgico': '10751',# Family
        'sombrio': '80', # Crime
        'inspirado': '36', # Histórico
        'reflexivo': '9648', # Mistério ou Drama Psicológico
        'euforico': '53',   # Thriller
        'tenso': '53', # Suspense
        'curioso': '14',  # fantasy
        'sozinho': '878', #Science Fiction 
        'esperancoso': '99',# documentary,
        'aventureiro': '37', #western
        'resiliente': '10752', #War
        'brincalhao': '35',
        'melancolico': '18'
    }

    genre = all_genres.get(mood.lower())
    if not genre:
        return []

    movie = get_movie_by_genre_from_api(genre)
    if movie:
        return [movie.to_dict()]

    return sorted([movie.to_dict()], key=lambda x: x['vote_average'], reverse=True)
