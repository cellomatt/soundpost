from werkzeug.security import generate_password_hash
from app.models import db, Teacher, State


# Adds a demo user. UPDATE for both students and teachers
def seed_teachers():
    state = State.query.filter(State.name == "Missouri").first()

    demo = Teacher(first_name='Matt', last_name='Kufchak', email_address='matt@email.com',
                password='password', instrument='cello', phone='123-789-6543', street_address='143 S 1st St',
                city='St. Louis', state_id=state.id, zip='63130',
                photo_url='https://soundpost-app.s3.us-east-2.amazonaws.com/matt-1.jpg')

    db.session.add(demo)
    db.session.commit()

def undo_teachers():
    db.session.execute('TRUNCATE teachers RESTART IDENTITY CASCADE;')
    db.session.commit()
