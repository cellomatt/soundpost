from app.models import db, TimeSlot, Teacher, Student
from datetime import *
from dateutil.relativedelta import *
from tzlocal import get_localzone
import pytz


def seed_timeslots():
    tz = get_localzone()
    today = date.today()
    beginning = today + relativedelta(months=-1, weekday=TH)
    end = today + relativedelta(months=4)
    delta = end - beginning
    teacher = Teacher.query.filter(Teacher.first_name == "Matt").first()
    students = Student.query.filter(Student.teacher_id == teacher.id).all()

    for i in range(delta.days + 1):
        day = beginning + timedelta(days=i)
        if day.weekday() not in [0, 5, 6]:
            for j in range(15, 21):
                lesson_duration = timedelta(minutes=30)
                time1 = datetime.combine(day, time(hour=j))
                time1 = tz.localize(time1)
                time2 = time1 + lesson_duration
                time3 = time2 + lesson_duration
                if day.weekday() == 3 and j == 15 and
                (day.month < today.month + 1):
                    slot1 = TimeSlot(
                        student_id=students[0].id,
                        teacher_id=teacher.id,
                        start_time=time1,
                        end_time=time2
                    )
                    slot2 = TimeSlot(
                        student_id=students[0].id,
                        teacher_id=teacher.id,
                        start_time=time2,
                        end_time=time3
                    )
                elif day.weekday() == 4 and j == 17 and
                (day.month < today.month + 1):
                    slot1 = TimeSlot(
                        student_id=students[3].id,
                        teacher_id=teacher.id,
                        start_time=time1,
                        end_time=time2
                    )
                    slot2 = TimeSlot(
                        student_id=students[1].id,
                        teacher_id=teacher.id,
                        start_time=time2,
                        end_time=time3
                    )
                else:
                    slot1 = TimeSlot(
                        teacher_id=teacher.id,
                        start_time=time1,
                        end_time=time2
                    )
                    slot2 = TimeSlot(
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
