from flask import Blueprint, jsonify, Response, request
from flask_login import login_required
from app.models import db, PracticeLog, Student, TimeSlot
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
    practice_log = PracticeLog.query.filter(
        PracticeLog.date == date.today()).filter(
        PracticeLog.student_id == id).first()

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
        res = {
            "count": practice_logs,
            "percentage": int((practice_logs/7)*100)
            }

    return json.dumps(res)


@practice_routes.route('/<int:id>')
@login_required
def all_stats(id):
    thisweek = 0
    thismonth = 0
    all = 0
    student = Student.query.get(id)
    start_date = student.created_at
    today = date.today()
    days = today - start_date
    total_days = days.days + 1
    delta = today - start_date
    list = []

    practice_logs_all = PracticeLog.query.filter(
        PracticeLog.student_id == id).all()
    practice_logs_week = PracticeLog.query.filter(PracticeLog.date.between(
        (today - timedelta(days=6)), today)).filter(
        PracticeLog.student_id == id).count()
    practice_logs_month = PracticeLog.query.filter(PracticeLog.date.between(
        (today - timedelta(days=30)), today)).filter(
        PracticeLog.student_id == id).count()
    lessons = TimeSlot.query.filter(TimeSlot.student_id == id).filter(
        TimeSlot.start_time.between(start_date, today - timedelta(days=1))
        ).order_by(TimeSlot.id).all()
    lessons_count = 0

    i = 0
    while i < len(lessons):
        if lessons[i].start_time == lessons[i-1].end_time:
            lessons.pop(i)
            continue
        lessons_count += 1
        i += 1

    for i in range(delta.days):
        day = start_date + timedelta(days=i)
        list.append(day)

    if practice_logs_week:
        thisweek = {
                    "count": practice_logs_week,
                    "percentage": int((practice_logs_week/7)*100)
                }

    if practice_logs_month:
        thismonth = {
                    "count": practice_logs_month,
                    "percentage": int((practice_logs_month/30)*100)
                }

    if practice_logs_all:
        all = {
                "count": len(practice_logs_all),
                "percentage": int((len(practice_logs_all)/(total_days))*100),
            }

    logs = [log.to_dict() for log in practice_logs_all]

    final_list = [{"date": day.isoformat(), "practiced": False}
                  for day in list]

    for day in final_list:
        for log in logs:
            if day["date"] == log["date"].isoformat():
                day["practiced"] = True

    res = {
        "thisweek": thisweek,
        "thismonth": thismonth,
        "all": all,
        "days": {
            "count": total_days,
            "list": final_list
            },
        "lessons": lessons_count,
        "start_date": start_date.isoformat(),
    }

    return json.dumps(res)
