from app import db


class Movie(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(180), nullable=False)
    genre = db.Column(db.String(80), nullable=False)
    vote_average = db.Column(db.Float, nullable=False)
    overview = db.Column(db.String(1000), nullable=True)
    trailer_url = db.Column(db.String(255), nullable=True)
    release_year = db.Column(db.Integer, nullable=True)
    duration = db.Column(db.String(30), nullable=True)
    
    # need to convert your SQLAlchemy models into a format that can be easily serialized to JSON.
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'vote_average': self.vote_average,
            'overview': self.overview,
            'trailer_url': self.trailer_url,
            'release_year': self.release_year,
            'duration': self.duration
        }