from .db import db


class PracticeLog(db.Model):
    __tablename__ = 'practice_logs'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"),
                           nullable=False,)
    date = db.Column(db.Date, nullable=False, unique=True)

    student = db.relationship("Student", back_populates="practice_logs")

    def to_dict(self):
        return {
            "id": self.id,
            "student_id": self.student_id,
            "date": self.date,
        }
