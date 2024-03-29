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

        if self.student:
            student = self.student.to_dict()
        else:
            student = None

        return {
            "id": self.id,
            "student_id": self.student_id,
            "teacher_id": self.teacher_id,
            "start_time": self.start_time.isoformat(),
            "end_time": self.end_time.isoformat(),
            "teacher": self.teacher.to_dict(),
            "student": student,
        }
