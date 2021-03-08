const LATEST_ASSIGNMENT = "assignment/LATEST_ASSIGNMENT"

export const setLatest = (assignment) => {
  return { type: LATEST_ASSIGNMENT, assignment }
}

export const getLatest = (userId) => async dispatch => {
  const res = await fetch(`/api/assignments/${userId}/latest`)
  const data = await res.json();
  dispatch(setLatest(data))
  return data;
}


const initialState = { latest: null, all: {} };

export default function assignmentReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case LATEST_ASSIGNMENT:
      updateState.latest = action.assignment
      return updateState;
    default:
      return state;
    }
}
