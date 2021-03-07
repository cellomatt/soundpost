from werkzeug.security import generate_password_hash
from app.models import db, Teacher, State


def seed_teachers():
    state1 = State.query.filter(State.name == "Missouri").first()
    state2 = State.query.filter(State.name == "Texas").first()

    teacher1 = Teacher(first_name='Matt', last_name='Kufchak',
                       email_address='matt@email.com', password='password',
                       instrument='cello', phone='123-789-6543',
                       street_address='143 S 1st St', city='St. Louis',
                       state_id=state1.id, zip='63130',
                       photo_url='https://soundpost-app.s3.us-east-2.amazonaws.com/matt-1.jpg')

    teacher2 = Teacher(first_name='Michelle', last_name='Brown',
                       email_address='michelle@email.com', password='password',
                       instrument='viola', phone='487-192-9999',
                       street_address='73 N Main St', city='Austin',
                       state_id=state2.id, zip='78701',
                       photo_url='https://soundpost-app.s3.us-east-2.amazonaws.com/download+(27).png')

    db.session.add(teacher1)
    db.session.add(teacher2)
    db.session.commit()


def undo_teachers():
    db.session.execute('TRUNCATE teachers RESTART IDENTITY CASCADE;')
    db.session.commit()
