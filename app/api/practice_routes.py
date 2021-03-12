from flask import Blueprint, jsonify, Response, request
from flask_login import login_required
from app.models import db, PracticeLog
import json
from datetime import *

practice_routes = Blueprint('practice', __name__)


@practice_routes.route('/<int:id>/new', methods=['POST'])
@login_required
def new_practice(id):
    practice_log = PracticeLog(student_id=id, date=datetime.now())
    db.session.add(practice_log)
    db.session.commit()
    return Response(status=201, mimetype='application/json')


@practice_routes.route('/<int:id>/today')
@login_required
def practice_today(id):
    res = False
    practice_log = PracticeLog.query.filter(PracticeLog.date ==
                                            date.today()).filter(PracticeLog.student_id == id).first()

    if practice_log:
        res = True

    return json.dumps(res)


@practice_routes.route('/<int:id>/week')
@login_required
def practice_week(id):
    res = 0
    practice_logs = PracticeLog.query.filter(PracticeLog.date.between(
        (date.today() - timedelta(days=6)), date.today())).filter(
        PracticeLog.student_id == id).count()

    if practice_logs:
        res = {"count": practice_logs, "percentage": int((practice_logs/7)*100)}

    return json.dumps(res)
