from werkzeug.security import generate_password_hash
from app.models import db, Teacher, State

state = State.query.filter(State.name == "Missouri").first()

# Adds a demo user. UPDATE for both students and teachers
def seed_teachers():

    demo = Teacher(first_name='Matt', last_name='Kufchak', email_address='matt@email.com',
                password='password', instrument='cello', phone='123-789-6543', street_address='143 S 1st St',
                city='St. Louis', state_id=state.id, zip='63130',
                photo_url='https://soundpost-app.s3.us-east-2.amazonaws.com/matt-1.jpg')

    db.session.add(demo)
    db.session.commit()


      "phone": self.phone,
      "street_address": self.street_address,
      "city": self.city,
      "state_id": self.state_id,
      "zip": self.zip,
      "photo_url": self.photo_url,

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_teachers():
    db.session.execute('TRUNCATE teachers RESTART IDENTITY CASCADE;')
    db.session.commit()
