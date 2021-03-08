const SCHEDULED = 'lesson/SCHEDULED'

export const setLessons = (lessons) => {
  return { type: SCHEDULED, lessons }
}

export const getUserLessons = (userId) => async dispatch => {
  const res = await fetch(`/api/lessons/${userId}/all`)
  const data = await res.json();
  dispatch(setLessons(data))
  return data;
}

const initialState = { scheduled: null };

export default function lessonReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case SCHEDULED:
      updateState.scheduled = {}
      action.lessons.forEach(lesson => {
        updateState.scheduled[lesson.id] = lesson
      })
      return updateState;
    default:
      return state;
    }
}
