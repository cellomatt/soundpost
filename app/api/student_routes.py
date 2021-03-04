from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Student

student_routes = Blueprint('students', __name__)


@student_routes.route('/')
@login_required
def students():
    students = Student.query.all()
    return {"students": [student.to_dict() for student in students]}


@student_routes.route('/<int:id>')
@login_required
def student(id):
    student = Student.query.get(id)
    return student.to_dict()
