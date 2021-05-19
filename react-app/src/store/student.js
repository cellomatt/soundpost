const GET_STUDENTS = 'student/GET_STUDENTS'

export const loadStudents = students => {
  return { type: GET_STUDENTS, students };
};

export const getStudioStudents = (id) => async dispatch => {
  const res = await fetch(`/api/teachers/${id}/students`);
  const data = await res.json();
  dispatch(loadStudents(data));
  return data;
};

const initialState = { all: null };

export default function studentReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case GET_STUDENTS:
      updateState.all = {}
      action.students.forEach(student => {
        updateState.all[student.id] = student
      })
      return updateState;
    default:
      return state;
    }
}
