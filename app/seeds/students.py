from werkzeug.security import generate_password_hash
from app.models import db, Student, Teacher

teacher = Teacher.query.filter(Teacher.email == "matt@email.com").first()

# Adds a demo user. UPDATE for both students and teachers
def seed_students():

    demo = Student(first_name='Demo', last_name='Student', email_address='demo@email.com',
                password='password', instrument='cello', phone='999-891-3202', parent_name='Demo Parent',
                photo_url='https://soundpost-app.s3.us-east-2.amazonaws.com/XzA1NTg5MzUuanBn.jpg', teacher_id=teacher.id)

    db.session.add(demo)
    db.session.commit()

def undo_students():
    db.session.execute('TRUNCATE students RESTART IDENTITY CASCADE;')
    db.session.commit()
