from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import TimeSlot
import json

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
