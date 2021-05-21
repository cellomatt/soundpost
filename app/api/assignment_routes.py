from flask import Blueprint, jsonify, Response, request
from flask_login import login_required
from app.models import db, Assignment
import json
from datetime import *

assignment_routes = Blueprint('assignments', __name__)


@assignment_routes.route('/<int:id>/latest')
@login_required
def latest_assignment(id):
    assignment = Assignment.query.filter(Assignment.student_id == id).order_by(
                Assignment.created_at.desc()).first()
    if assignment is not None:
        data = assignment.to_dict()
    else:
        data = None
    res = json.dumps(data)
    return res


@assignment_routes.route('/<int:id>/all')
@login_required
def all_assignments(id):
    assignments = Assignment.query.filter(
        Assignment.student_id == id).order_by(
        Assignment.created_at.desc()).all()
    data = [assignment.to_dict() for assignment in assignments]
    res = json.dumps(data)
    return res


@assignment_routes.route('/new', methods=['POST'])
@login_required
def set_new_assignment():
    data = request.get_json()
    teacher_id = data["teacherId"]
    student_id = data["studentId"]
    message = data["assignment"]

    new_assignment = Assignment(
        student_id=student_id,
        teacher_id=teacher_id,
        message=message,
        created_at=datetime.now(tz=None)
    )
    db.session.add(new_assignment)
    db.session.commit()
    res = new_assignment.to_dict()
    return json.dumps(res)
