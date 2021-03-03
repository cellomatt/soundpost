from .db import db


class Assignment(db.Model):
    __tablename__ = 'assignments'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False,)
    teacher_id = db.Column(db.Integer, db.ForeignKey("teachers.id"), nullable=False,)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)

    student = db.relationship("Student", back_populates="assignments")
    teacher = db.relationship("Teacher", back_populates="assignments")

    def to_dict(self):
        return {
            "id": self.id,
            "student_id": self.student_id,
            "teacher_id": self.teacher_id,
            "message": self.message,
            "created_at": self.created_at,
        }