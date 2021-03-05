const GET_TEACHERS = 'teachers/GET_TEACHERS'

export const loadTeachers = teachers => {
  return { type: GET_TEACHERS, teachers };
};

export const getAllTeachers = () => async dispatch => {
  const res = await fetch(`/api/teachers/all`);
  const data = await res.json();
  dispatch(loadTeachers(data));
};

const initialState = { teachers: {} };

export default function teacherReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case GET_TEACHERS:
      action.teachers.forEach(teacher => {
        updateState.teachers[teacher.id] = teacher
      })
      return updateState;
    default:
      return state;
    }
}
