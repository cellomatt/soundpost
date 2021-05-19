from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Teacher, Student
import json

teacher_routes = Blueprint('teachers', __name__)


@teacher_routes.route('/all')
def teachers():
    teachers = Teacher.query.all()
    data = [teacher.to_dict() for teacher in teachers]
    res = json.dumps(data)
    return res


@teacher_routes.route('/<int:id>/students')
@login_required
def studio_students(id):
    students = Student.query.filter(Student.teacher_id == id).all()
    data = [student.to_dict() for student in students]
    res = json.dumps(data)
    return res
