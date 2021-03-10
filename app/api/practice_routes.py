from flask import Blueprint, jsonify, Response, request
from flask_login import login_required
from app.models import db, PracticeLog
import json
from datetime import *

practice_routes = Blueprint('practice', __name__)


@practice_routes.route('/<int:id>/new', methods=['POST'])
@login_required
def new_practice(id):
    print("-------------------------------NEW PRACTICE")
    practice_log = PracticeLog(student_id=id, date=datetime.now())
    db.session.add(practice_log)
    db.session.commit()
    return Response(status=201, mimetype='application/json')


@practice_routes.route('/<int:id>/today')
@login_required
def practice_today(id):
    res = false
    practice_log = PracticeLog.query.filter(PracticeLog.date.date() ==
                                            date.today()).first()

    if practice_log:
        res = true
