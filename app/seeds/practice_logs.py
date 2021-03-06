from app.models import db, PracticeLog, Student
from datetime import *
from dateutil.relativedelta import *


def seed_practice_logs():
    students = Student.query.all()
    practice_logs = []
    start_date = datetime.date(2021, 1, 1)
    today = datetime.date.today()
    delta = today - start_date

    for student in students:
        for i in range(delta.days + 1):
            day = start_date + timedelta(days=i)
            if day.weekday() not 6:
                log = PracticeLog(
                    student_id=student.id,
                    date=day
                )
                db.session.append(log)

    db.session.commit()


def undo_practice_logs():
    db.session.execute('TRUNCATE practice_logs RESTART IDENTITY CASCADE;')
    db.session.commit()
