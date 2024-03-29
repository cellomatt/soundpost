from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Student, Teacher


def user_exists(form, field):
    print("Checking if user exists", field.data)
    email = field.data
    student = form.data['student']
    if student:
        user = Student.query.filter(Student.email_address == email).first()
    else:
        user = Teacher.query.filter(Teacher.email_address == email).first()
    if not user:
        raise ValidationError("Email provided not found.")


def password_matches(form, field):
    print("Checking if password matches")
    password = field.data
    email = form.data['email']
    student = form.data['student']
    if student:
        user = Student.query.filter(Student.email_address == email).first()
    else:
        user = Teacher.query.filter(Teacher.email_address == email).first()

    if not user:
        raise ValidationError("No such user exists.")
    if not user.check_password(password):
        raise ValidationError("Password was incorrect.")


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
    student = BooleanField('student')
