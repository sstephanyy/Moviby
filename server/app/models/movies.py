from app import db


class Movie(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(180), nullable=False)
    genre = db.Column(db.String(80), nullable=False)
    vote_average = db.Column(db.Float, nullable=False)
    overview = db.Column(db.String(1000), nullable=True)

    # need to convert your SQLAlchemy models into a format that can be easily serialized to JSON.
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'vote_average': self.vote_average,
            'overview': self.overview
        }