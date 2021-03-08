from .db import db


class TimeSlot(db.Model):
    __tablename__ = 'timeslots'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"),
                           nullable=True,)
    teacher_id = db.Column(db.Integer, db.ForeignKey("teachers.id"),
                           nullable=False,)
    start_time = db.Column(db.DateTime(timezone=False), nullable=False)
    end_time = db.Column(db.DateTime(timezone=False), nullable=False)

    student = db.relationship("Student", back_populates="timeslots")
    teacher = db.relationship("Teacher", back_populates="timeslots")

    def to_dict(self):
        months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November",
                  "December"]

        return {
            "id": self.id,
            "student_id": self.student_id,
            "teacher_id": self.teacher_id,
            "start_time": {"year": self.start_time.year,
                           "month": months[self.start_time.month - 1],
                           "day": self.start_time.day,
                           "hour": self.start_time.hour,
                           "minute": self.start_time.minute,
                           "second": self.start_time.second},
            "end_time": {"year": self.end_time.year,
                           "month": months[self.end_time.month - 1],
                           "day": self.end_time.day,
                           "hour": self.end_time.hour,
                           "minute": self.end_time.minute,
                           "second": self.end_time.second},
        }
