from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import TimeSlot
import json

lesson_routes = Blueprint('lessons', __name__)


@lesson_routes.route('/<int:id>/all')
@login_required
def scheduled_lessons(id):
    lessons = TimeSlot.query.filter(TimeSlot.student_id == id).all()
    i = 0
    while i < len(lessons) - 2:
        if lessons[i].end_time == lessons[i + 1].start_time:
            lessons[i].end_time = lessons[i + 1].end_time
            lessons.pop(i + 1)
            continue
        i += 1
    data = [lesson.to_dict() for lesson in lessons]
    res = json.dumps(data)
    return res
