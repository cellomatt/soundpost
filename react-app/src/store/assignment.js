const LATEST_ASSIGNMENT = "assignment/LATEST_ASSIGNMENT"
const ALL_ASSIGNMENTS = "assignment/ALL_ASSIGNMENTS"
const NEW_ASSIGNMENT = "assignment/NEW_ASSIGNMENT"
const CLEANUP_ASSIGNMENTS = "assignment/CLEANUP_ASSIGNMENTS"

export const setLatest = (assignment) => {
  return { type: LATEST_ASSIGNMENT, assignment }
}

export const setAllAssignments = (assignments) => {
  return { type: ALL_ASSIGNMENTS, assignments }
}

export const  setOneAssignment = (assignment) => {
  return { type: NEW_ASSIGNMENT, assignment }
}

export const getLatest = (userId) => async dispatch => {
  const res = await fetch(`/api/assignments/${userId}/latest`)
  const data = await res.json();
  if (data !== null) {
    data.created_at = new Date(data.created_at);
  }
  dispatch(setLatest(data))
  return data;
}

export const getAllAssignments = (userId) => async dispatch => {
  const res = await fetch(`/api/assignments/${userId}/all`)
  const data = await res.json();
  data.forEach(assignment => {
    assignment.created_at = new Date(assignment.created_at)
  })
  dispatch(setAllAssignments(data))
  return data;
}

export const sendNewAssignment = (teacherId, studentId, assignment) => async dispatch => {
  console.log(teacherId, studentId, assignment)
  const res = await fetch(`/api/assignments/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teacherId,
      studentId,
      assignment
    }),
  })
  console.log(res)
  const data = await res.json();
  data.created_at = new Date(data.created_at)
  dispatch(setOneAssignment(data))
  return data;
}

export const cleanupAssignments = () => {
  return { type: CLEANUP_ASSIGNMENTS}
}

const initialState = { latest: null, all: null };

export default function assignmentReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case LATEST_ASSIGNMENT:
      updateState.latest = action.assignment
      return updateState;
    case ALL_ASSIGNMENTS:
      if (action.assignments.length > 0) {
        updateState.all = {}
        action.assignments.forEach(assignment => {
          updateState.all[assignment.created_at] = assignment
        })
      }
      return updateState;
    case NEW_ASSIGNMENT:
      if (updateState.all === null) {
        updateState.all = {}
      }
      updateState.all[action.assignment.created_at] = action.assignment
      return updateState;
    case CLEANUP_ASSIGNMENTS:
      return initialState;
    default:
      return state;
    }
}
