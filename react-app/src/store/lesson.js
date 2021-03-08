const SCHEDULED = 'lesson/SCHEDULED'

export const setLessons = (lessons) => {
  return { type: SCHEDULED, lessons }
}

export const getUserLessons = (userId) => async dispatch => {
  const res = await fetch(`/api/lessons/${userId}/all`)
  const data = await res.json();
  data.forEach(lesson => {
    lesson.start_time = new Date(lesson.start_time);
    lesson.end_time = new Date(lesson.end_time);
  })
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
