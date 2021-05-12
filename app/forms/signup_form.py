from flask_wtf import FlaskForm
from wtforms import StringField, FileField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Student, Teacher


def user_exists(form, field):
    email = field.data
    student = Student.query.filter(Student.email_address == email).first()
    teacher = Teacher.query.filter(Teacher.email_address == email).first()
    if student or teacher:
        raise ValidationError("User is already registered.")


class SignUpStudentForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email_address = StringField('email', validators=[DataRequired(), Email(),
                                user_exists])
    phone = StringField('phone', validators=[DataRequired()])
    parent_name = StringField('parent_name')
    instrument = StringField('instrument', validators=[DataRequired()])
    teacher_id = IntegerField('teacher_id', validators=[DataRequired()])
    photo = FileField('photo')
    password = StringField('password', validators=[DataRequired()])
    created_at = StringField('created_at')
    student = BooleanField('student', validators=[DataRequired()])


class SignUpTeacherForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email_address = StringField('email', validators=[DataRequired(), Email(),
                                user_exists])
    phone = StringField('phone', validators=[DataRequired()])
    instrument = StringField('instrument', validators=[DataRequired()])
    street_address = StringField('street_address',
                                 validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state_id = IntegerField('state_id', validators=[DataRequired()])
    zip = IntegerField('zip', validators=[DataRequired()])
    photo = FileField('photo', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
    student = BooleanField('student', validators=[DataRequired()])
