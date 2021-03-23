from werkzeug.security import generate_password_hash
from app.models import db, Student, Teacher
from faker import Faker
import random
from datetime import *
from dateutil.relativedelta import *

fake = Faker('en_US')


def seed_students():
    teacher1 = Teacher.query.filter(Teacher.email_address ==
                                    "matt@email.com").first()
    teacher2 = Teacher.query.filter(Teacher.email_address ==
                                    "michelle@email.com").first()
    today = date.today()
    start_date = today + relativedelta(months=-1)
    students = []

    def phone_number():
        return '({first}) {second}-{third}'.format(first=random.randrange(100, 1000),
                                                   second=random.randrange(100, 1000),
                                                   third=random.randrange(1000, 10000))

    female_pics = [
        "https://soundpost-app.s3.us-east-2.amazonaws.com/download.png",
        "https://soundpost-app.s3.us-east-2.amazonaws.com/download+(26).png",
        "https://soundpost-app.s3.us-east-2.amazonaws.com/download+(25).png",
        "https://soundpost-app.s3.us-east-2.amazonaws.com/download+(21).png",
        "https://soundpost-app.s3.us-east-2.amazonaws.com/XzA1MjQxOTkuanBn.jpg",
        "https://soundpost-app.s3.us-east-2.amazonaws.com/download+(22).png"
    ]
    male_pics = [
        "https://soundpost-app.s3.us-east-2.amazonaws.com/download+(1).png",
        "https://soundpost-app.s3.us-east-2.amazonaws.com/download+(2).png",
        "https://soundpost-app.s3.us-east-2.amazonaws.com/download+(18).png",
        "https://soundpost-app.s3.us-east-2.amazonaws.com/download+(6).png",
        "https://soundpost-app.s3.us-east-2.amazonaws.com/download+(7).png",
        "https://soundpost-app.s3.us-east-2.amazonaws.com/download+(5).png"
    ]

    demo = Student(first_name='Demo',
                   last_name='Student',
                   email_address='demo@email.com',
                   password='password',
                   instrument='cello',
                   phone=phone_number(),
                   parent_name='Demo Parent',
                   photo_url='https://soundpost-app.s3.us-east-2.amazonaws.com/XzA1NTg5MzUuanBn.jpg',
                   teacher_id=teacher1.id,
                   created_at=start_date)
    students.append(demo)

    for num in range(3):
        student = Student(first_name=fake.first_name_female(),
                          last_name=fake.last_name(),
                          email_address=fake.free_email(),
                          password=fake.password(length=12),
                          instrument='cello',
                          phone=phone_number(),
                          parent_name=fake.name(),
                          photo_url=female_pics[num],
                          teacher_id=teacher1.id,
                          created_at=start_date)
        students.append(student)

    for num in range(3, 6):
        student = Student(first_name=fake.first_name_female(),
                          last_name=fake.last_name(),
                          email_address=fake.free_email(),
                          password=fake.password(length=12),
                          instrument='viola',
                          phone=phone_number(),
                          parent_name=fake.name(),
                          photo_url=female_pics[num],
                          teacher_id=teacher2.id,
                          created_at=start_date)
        students.append(student)

    for num in range(3):
        student = Student(first_name=fake.first_name_male(),
                          last_name=fake.last_name(),
                          email_address=fake.free_email(),
                          password=fake.password(length=12),
                          instrument='cello',
                          phone=phone_number(),
                          parent_name=fake.name(),
                          photo_url=male_pics[num],
                          teacher_id=teacher1.id,
                          created_at=start_date)
        students.append(student)

    for num in range(3):
        student = Student(first_name=fake.first_name_male(),
                          last_name=fake.last_name(),
                          email_address=fake.free_email(),
                          password=fake.password(length=12),
                          instrument='viola',
                          phone=phone_number(),
                          parent_name=fake.name(),
                          photo_url=male_pics[num],
                          teacher_id=teacher2.id,
                          created_at=start_date)
        students.append(student)

    for student in students:
        db.session.add(student)
    db.session.commit()


def undo_students():
    db.session.execute('TRUNCATE students RESTART IDENTITY CASCADE;')
    db.session.commit()
