from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Assignment
import json

assignment_routes = Blueprint('assignments', __name__)


@assignment_routes.route('/<int:id>/latest')
@login_required
def latest_assignment(id):
    assignment = Assignment.query.filter(Assignment.student_id == id).order_by(
                Assignment.created_at.desc()).first()
    data = assignment.to_dict()
    res = json.dumps(data)
    return res
