from flask_wtf import FlaskForm
from wtforms import StringField, FileField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Student, Teacher


def user_exists(form, field):
    email = field.data
    user = Student.query.filter(Student.email_address == email).first()
    # or Teacher.query.filter(Teacher.email_address == email).first()
    if user:
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


class SignUpTeacherForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email_address = StringField('email', validators=[DataRequired(), Email(),
                                user_exists])
    instrument = StringField('instrument', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired()])
    street_address = StringField('street_address',
                                 validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state_id = IntegerField('state_id', validators=[DataRequired()])
    zip = IntegerField('zip', validators=[DataRequired()])
    photo = FileField('photo', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
