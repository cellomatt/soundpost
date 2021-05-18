const GET_STUDENTS = 'student/GET_STUDENTS'
const GET_ONE_STUDENT = 'student/GET_ONE_STUDENT'
const CLEANUP_STUDENT = 'student/CLEANUP_STUDENT'

export const loadStudents = students => {
  return { type: GET_STUDENTS, students };
};

export const loadOneStudent = student => {
  return { type: GET_ONE_STUDENT, student}
}

export const getStudioStudents = (id) => async dispatch => {
  const res = await fetch(`/api/teachers/${id}/students`);
  const data = await res.json();
  dispatch(loadStudents(data));
  return data;
};

export const getOneStudent = (studentId) => async dispatch => {
  const res = await fetch(`/api/students/${studentId}`);
  const data = await res.json();
  dispatch(loadOneStudent(data));
  return data;
}

export const cleanupStudent = () => {
  return { type: CLEANUP_STUDENT}
}

const initialState = { all: null, currentStudent: null };

export default function studentReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case GET_STUDENTS:
      updateState.all = {}
      action.students.forEach(student => {
        updateState.all[student.id] = student
      })
      return updateState;
    case GET_ONE_STUDENT:
      updateState.currentStudent = action.student
      return updateState;
    case CLEANUP_STUDENT:
      updateState.currentStudent = null;
      return updateState;
    default:
      return state;
    }
}
