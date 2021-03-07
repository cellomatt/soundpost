from app.models import db, TimeSlot, Teacher, Student
from datetime import *


def seed_timeslots():
    today = date.today()
    end = date(2021, 7, 1)
    delta = end - today
    teacher = Teacher.query.filter(Teacher.first_name == "Matt").first()

    for i in range(delta.days + 1):
        day = today + timedelta(days=i)
        if day.weekday() != 6:
            for j in range(15, 21):
                lesson_duration = timedelta(minutes=30)
                time1 = datetime.combine(day, time(hour=j))
                time2 = time1 + lesson_duration
                time3 = time2 + lesson_duration
                slot1 = TimeSlot(
                    # student_id="",
                    teacher_id=teacher.id,
                    start_time=time1,
                    end_time=time2
                )
                slot2 = TimeSlot(
                    # student_id="",
                    teacher_id=teacher.id,
                    start_time=time2,
                    end_time=time3
                )
                db.session.add(slot1)
                db.session.add(slot2)
    db.session.commit()


def undo_timeslots():
    db.session.execute('TRUNCATE timeslots RESTART IDENTITY CASCADE;')
    db.session.commit()
