const SCHEDULED = 'lesson/SCHEDULED'
const DELETE = 'lesson/DELETE'
const SET_AVAILABLE = 'lesson/SET_AVAILABLE'


export const setLessons = (lessons) => {
  return { type: SCHEDULED, lessons }
}

export const deleteLesson = (id) => {
  return { type: DELETE, id}
}

export const setAvailability = (lessons) => {
  return { type: SET_AVAILABLE, lessons }
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

export const deleteOneLesson = (id) => async dispatch => {
  const res = await fetch(`/api/lessons/${id}`, {
    method: "DELETE"
  });
  if (res.ok) {
    dispatch(deleteLesson(id));
    return res;
  }
}

export const getAvailability = (teacherId, startDay, endDay, duration) => async dispatch => {
  console.log(duration)
  let newEndDay = new Date(endDay)
  const end = newEndDay.getDate()
  newEndDay.setDate(end + 1)
  const start = startDay.toISOString().replace('Z', '+00:00')
  const newEnd = newEndDay.toISOString().replace('Z', '+00:00')
  const res = await fetch(`/api/lessons/teachers/${teacherId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start,
      end: newEnd,
      duration
    }),
  })
  const data = await res.json();
  data.forEach(lesson => {
    lesson.start_time = new Date(lesson.start_time);
    lesson.end_time = new Date(lesson.end_time);
  })
  dispatch(setAvailability(data))
  return data;
}


const initialState = { scheduled: null, available: null };

export default function lessonReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case SCHEDULED:
      updateState.scheduled = {}
      action.lessons.forEach(lesson => {
        updateState.scheduled[lesson.id] = lesson
      })
      return updateState;
    case DELETE:
      delete updateState.scheduled[action.id];
      return updateState;
    case SET_AVAILABLE:
      updateState.available = {}
      action.lessons.forEach(lesson => {
        updateState.available[lesson.id] = lesson
      })
      return updateState;
    default:
      return state;
    }
}
