from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
Model = db.Model
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)  

    from app.models.users import User
    from app.models.movies import Movie

    with app.app_context():
        db.create_all()

    from .auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    from .views.movie import main_bp
    app.register_blueprint(main_bp)

    CORS(app)

    return app



