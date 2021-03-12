from app.models import db, PracticeLog, Student
from datetime import *
from dateutil.relativedelta import *


def seed_practice_logs():
    students = Student.query.all()
    today = date.today()
    start_date = today + relativedelta(months=-1)
    delta = today - start_date

    for student in students:
        for i in range(delta.days):
            day = start_date + timedelta(days=i)
            if day.weekday() != 6:
                log = PracticeLog(
                    student_id=student.id,
                    date=day
                )
                db.session.add(log)

    db.session.commit()


def undo_practice_logs():
    db.session.execute('TRUNCATE practice_logs RESTART IDENTITY CASCADE;')
    db.session.commit()
