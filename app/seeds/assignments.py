from app.models import db, Assignment, Student, Teacher
from datetime import *
from dateutil.relativedelta import *


def seed_assignments():
    teacher = Teacher.query.filter(Teacher.first_name == "Matt").first()
    student = Student.query.filter(Student.first_name == "Demo").first()
    today = date.today()
    first_lesson = today + relativedelta(months=-1, weekday=TH)
    first_assignment_time = datetime.combine(first_lesson, time(hour=16))

    assignment1 = Assignment(
        student_id=student.id, teacher_id=teacher.id,
        message=("Great first lesson, Demo! Here’s what I’d like you work on "
                 "this week: 10 minutes a day on 1 octave G major scale and 2 octave C "
                 "major scale with special concentration on keeping your bow straight "
                 "and producing a big sound. Please also prepare Allegro from Suzuki "
                 "Book 1, we will look at that next week!"),
        created_at=first_assignment_time
    )

    assignment2 = Assignment(
        student_id=student.id,
        teacher_id=teacher.id,
        message=("Hi Demo, you did an amazing job at your lesson today! You "
                 "made solid progress on Allegro this week and I’m excited to see what "
                 "you put together for next week’s lesson. We talked about emphasizing "
                 "the differences in dynamics (loud and soft) and staccato (short) vs. "
                 "legato (long) bows to change the mood of the sound. If all goes well "
                 "this week, we will move on to Book 2! Please continue the same scales "
                 "from last week for your warm-up time."),
        created_at=first_assignment_time + timedelta(days=7)
    )
    assignment3 = Assignment(
        student_id=student.id,
        teacher_id=teacher.id,
        message=("Fantastic work this week. We’re adding to your warm-ups "
                 "this week: please spend 5 minutes to start off with just open strings, "
                 "focusing on pulling evenly through the full length of the bow and "
                 "keeping your wrist flexible at both the tip and frog for an even "
                 "change. Let’s also add the second octave to your G major scale. Good "
                 "luck getting started on Long, Long Ago from Book 2, focus on the ‘long, "
                 "short-short’ bowings we discussed!"),
        created_at=first_assignment_time + timedelta(days=14)
    )
    assignment4 = Assignment(
        student_id=student.id,
        teacher_id=teacher.id,
        message=("You are doing so well! Thank you for your amazing "
                 "preparation for today’s lesson. For this week, please continue the "
                 "same warm-ups and let’s begin work on ‘May Time’ for "
                 "our next lesson."),
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
