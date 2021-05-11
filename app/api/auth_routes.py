from flask import Blueprint, jsonify, session, request
from app.models import Student, Teacher, db
from app.forms import LoginForm
from app.forms import SignUpStudentForm  # SignUpTeacherForm
from flask_login import current_user, login_user, logout_user, login_required
from ..config import Config
from ..s3 import *
import boto3
import botocore
from datetime import *

auth_routes = Blueprint('auth', __name__)

# ----------- TODO: Needs to be refactored for teachers in addition to students


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field}: {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print("-------------------------------------------", request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        if form.data['student']:
            user = Student.query.filter(Student.email_address ==
                                        form.data['email']).first()
        else:
            user = Teacher.query.filter(Teacher.email_address ==
                                        form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    If there is a photo, upload it to S3
    """
    url = ""
    if "photo" in request.files:
        file = request.files["photo"]
        url = upload_file_to_s3(file, Config.S3_BUCKET)
    """
    Creates a new user and logs them in
    """
    form = SignUpStudentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        created_at = form.data['created_at']
        user = Student(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            email_address=form.data['email_address'],
            phone=form.data['phone'],
            parent_name=form.data['parent_name'],
            instrument=form.data['instrument'],
            teacher_id=form.data['teacher_id'],
            photo_url=url,
            password=form.data['password'],
            created_at=datetime.fromisoformat(created_at)
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
