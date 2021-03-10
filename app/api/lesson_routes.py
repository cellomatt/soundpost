from flask import Blueprint, jsonify, Response, request
from flask_login import login_required
from app.models import db, TimeSlot
import json
from datetime import *

lesson_routes = Blueprint('lessons', __name__)


@lesson_routes.route('/<int:id>/all')
@login_required
def scheduled_lessons(id):
    lessons = TimeSlot.query.filter(TimeSlot.student_id == id).order_by(
        TimeSlot.id).all()
    i = 1
    while i < len(lessons):
        if lessons[i-1].end_time == lessons[i].start_time:
            lessons[i-1].end_time = lessons[i].end_time
            lessons.pop(i)
            continue
        i += 1
    data = [lesson.to_dict() for lesson in lessons]
    res = json.dumps(data)
    return res


@lesson_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_lesson(id):
    lesson = TimeSlot.query.get(id)
    lesson2 = TimeSlot.query.filter(TimeSlot.start_time == lesson.end_time and
                                    TimeSlot.student_id == lesson.student_id).first()
    if lesson2:
        lesson2.student_id = None
        db.session.add(lesson2)
    lesson.student_id = None
    db.session.add(lesson)
    db.session.commit()

    return Response(status=201, mimetype='application/json')


@lesson_routes.route('/teachers/<int:id>', methods=['POST'])
@login_required
def get_availability(id):
    data = request.get_json()
    start_time = datetime.fromisoformat(data["start"])
    end_time = datetime.fromisoformat(data["end"])
    duration = data["duration"]

    lessons = TimeSlot.query.filter(TimeSlot.start_time.between(start_time,
                                    end_time)).filter(TimeSlot.student_id == None).order_by(TimeSlot.id).all()

    if duration == "60":
        i = 0
        while i < len(lessons):
            if i == len(lessons) - 1:
                if lessons[i].end_time - lessons[i].start_time == timedelta(minutes=30):
                    lessons.pop(i)
                    break
            elif lessons[i].end_time == lessons[i+1].start_time:
                lessons[i].end_time = lessons[i+1].end_time
                lessons.pop(i+1)
            elif i == 0:
                if lessons[i].end_time - lessons[i].start_time == timedelta(minutes=30):
                    lessons.pop(i)
                    continue
            i += 1

    availability = [lesson.to_dict() for lesson in lessons]
    res = json.dumps(availability)
    return res


@lesson_routes.route('/<int:id>/schedule', methods=['POST'])
@login_required
def schedule_lesson(id):
    data = request.get_json()
    duration = data["duration"]
    student_id = data["studentId"]

    lesson = TimeSlot.query.get(id)
    lesson.student_id = student_id
    db.session.add(lesson)

    lesson2 = None
    if duration == "60":
        lesson2 = TimeSlot.query.filter(TimeSlot.start_time == lesson.end_time).first()
        lesson2.student_id = student_id
        db.session.add(lesson2)
        db.session.commit()
        lesson.end_time = lesson2.end_time

    db.session.commit()
    scheduled = lesson.to_dict()
    res = json.dumps(scheduled)
    return res
