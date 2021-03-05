from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import Teacher
import json

teacher_routes = Blueprint('teachers', __name__)


@teacher_routes.route('/all')
def students():
    teachers = Teacher.query.all()
    data = [teacher.to_dict() for teacher in teachers]
    res = json.dumps(data)
    return res
