from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Teacher(db.Model, UserMixin):
  __tablename__ = 'teachers'

  id = db.Column(db.Integer, primary_key = True)
  first_name = db.Column(db.String(30), nullable = False)
  last_name = db.Column(db.String(50), nullable = False)
  email_address = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  instrument = db.Column(db.String(255), nullable = False)
  phone = db.Column(db.String(15), nullable = False)
  street_address = db.Column(db.String(255), nullable = False)
  city = db.Column(db.String(255), nullable = False)
  state_id = db.Column(db.Integer, db.ForeignKey("states.id"), nullable = False)
  zip = db.Column(db.Integer, nullable = False)
  photo_url = db.Column(db.String(255), nullable = False)

  students = db.relationship("Student", back_populates="teacher")
  assignments = db.relationship("Assignment", back_populates="teacher")
  state = db.relationship("State", back_populates="teacher")
  timeslots = db.relationship("TimeSlot", back_populates="teacher")


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "email_address": self.email_address,
      "instrument": self.instrument,
      "phone": self.phone,
      "street_address": self.street_address,
      "city": self.city,
      "state_id": self.state_id,
      "zip": self.zip,
      "photo_url": self.photo_url,
    }
