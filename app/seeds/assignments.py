from app.models import db, Assignment, Student, Teacher
from datetime import *
from dateutil.relativedelta import *


def seed_assignments():
    teacher = Teacher.query.filter(Teacher.first_name == "Matt").first()
    student = Student.query.filter(Student.first_name == "Demo").first()
    today = date.today()
    first_lesson = today + relativedelta(months=-1, weekday=WE)
    first_assignment_time = datetime.combine(first_lesson, time(hour=16))

    assignment1 = Assignment(
        student_id=student.id, teacher_id=teacher.id,
        message="Great first lesson, Demo! Here\'s what I\'d like you work on this week: 10 minutes a day on 1 octave G major scale and 2 octave C major scale with special concentration on keeping your bow straight and producing a big sound. Please also prepare Allegro from Suzuki Book 1, we will look at that next week!",
        created_at=first_assignment_time
    )

    assignment2 = Assignment(
        student_id=student.id,
        teacher_id=teacher.id,
        message="Great first lesson, Demo! Here\'s what I\'d like you work on this week: 10 minutes a day on 1 octave G major scale and 2 octave C major scale with special concentration on keeping your bow straight and producing a big sound. Please also prepare Allegro from Suzuki Book 1, we will look at that next week!",
        created_at=first_assignment_time + timedelta(days=7)
    )
    assignment3 = Assignment(
        student_id=student.id,
        teacher_id=teacher.id,
        message="Great first lesson, Demo! Here\'s what I\'d like you work on this week: 10 minutes a day on 1 octave G major scale and 2 octave C major scale with special concentration on keeping your bow straight and producing a big sound. Please also prepare Allegro from Suzuki Book 1, we will look at that next week!",
        created_at=first_assignment_time + timedelta(days=14)
    )
    assignment4 = Assignment(
        student_id=student.id,
        teacher_id=teacher.id,
        message="Great first lesson, Demo! Here\'s what I\'d like you work on this week: 10 minutes a day on 1 octave G major scale and 2 octave C major scale with special concentration on keeping your bow straight and producing a big sound. Please also prepare Allegro from Suzuki Book 1, we will look at that next week!",
        created_at=first_assignment_time + timedelta(days=21)
    )

    db.session.add(assignment1)
    db.session.add(assignment2)
    db.session.add(assignment3)
    db.session.add(assignment4)
    db.session.commit()


def undo_assignments():
    db.session.execute('TRUNCATE timeslots RESTART IDENTITY CASCADE;')
    db.session.commit()
