from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import State
import json

states_routes = Blueprint('states', __name__)


@states_routes.route('/all')
def states():
    states = State.query.all()
    data = [state.to_dict() for state in states]
    res = json.dumps(data)
    return res
