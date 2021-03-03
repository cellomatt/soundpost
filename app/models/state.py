from .db import db


class State(db.Model):
    __tablename__ = 'states'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    abbreviation = db.Column(db.String(2), nullable=False)

    teacher = db.relationship("Teacher", back_populates="state")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "abbreviation": self.abbreviation
        }
