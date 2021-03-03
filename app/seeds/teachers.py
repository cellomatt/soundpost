from werkzeug.security import generate_password_hash
from app.models import db, Teacher

# Adds a demo user. UPDATE for both students and teachers
def seed_users():

    demo = Student(first_name='Demo', last_name='Student', email_address='demo@email.com',
                password='password', instrument='cello', phone='999-891-3202', parent_name='Demo Parent',
                photo_url='https://soundpost-app.s3.us-east-2.amazonaws.com/XzA1NTg5MzUuanBn.jpg', teacher_id=1)

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
