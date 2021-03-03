from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Student(db.Model, UserMixin):
  __tablename__ = 'students'

  id = db.Column(db.Integer, primary_key = True)
  first_name = db.Column(db.String(30), nullable = False)
  last_name = db.Column(db.String(50), nullable = False)
  email_address = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  instrument = db.Column(db.String(255), nullable = False)
  phone = db.Column(db.String(15), nullable = False)
  parent_name = db.Column(db.String(80), nullable = True)
  photo_url = db.Column(db.String(255), nullable = True)
  teacher_id = db.Column(db.Integer, db.ForeignKey("teachers.id"), nullable = False)

  teacher = db.relationship("Teacher", back_populates="students")
  assignments = db.relationship("Assignment", back_populates="students")
  practice_logs = db.relationship("PracticeLog", back_populates="student")
  timeslots = db.relationship("TimeSlot", back_populates="student")


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
      "hashed_password": self.hashed_password,
      "instrument": self.instrument,
      "phone": self.phone,
      "parent_name": self.parent_name,
      "photo_url": self.photo_url,
      "teacher_id": self.teacher_id
    }
