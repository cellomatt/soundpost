from flask.cli import AppGroup
from .students import seed_students, undo_students
from .teachers import seed_teachers, undo_teachers
from .states import seed_states, undo_states
from .practice_logs import seed_practice_logs, undo_practice_logs
from .timeslots import seed_timeslots, undo_timeslots

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_states()
    seed_teachers()
    seed_students()
    seed_practice_logs()
    seed_timeslots()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_timeslots()
    undo_practice_logs()
    undo_students()
    undo_teachers()
    undo_states()
    # Add other undo functions here
