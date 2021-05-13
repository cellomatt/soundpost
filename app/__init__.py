import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, Student, Teacher
from .api.student_routes import student_routes
from .api.auth_routes import auth_routes
from .api.teacher_routes import teacher_routes
from .api.assignment_routes import assignment_routes
from .api.lesson_routes import lesson_routes
from .api.practice_routes import practice_routes
from .api.states_routes import states_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    # load student or teacher account to session based on role
    if session['student']:
        return Student.query.get(int(id))
    else:
        return Teacher.query.get(int(id))


# Tell flask about seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(student_routes, url_prefix='/api/students')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(teacher_routes, url_prefix='/api/teachers')
app.register_blueprint(states_routes, url_prefix='/api/states')
app.register_blueprint(assignment_routes, url_prefix='/api/assignments')
app.register_blueprint(lesson_routes, url_prefix='/api/lessons')
app.register_blueprint(practice_routes, url_prefix='/api/practice')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

# Make sure that in production any
# request made over http is redirected to https.


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
