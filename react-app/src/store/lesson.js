const SCHEDULED = 'lesson/SCHEDULED'
const DELETE = 'lesson/DELETE'
const SET_AVAILABLE = 'lesson/SET_AVAILABLE'
const SET_ONE = 'lesson/SET_ONE'
const CLEAR_AVAILABLE = 'lesson/CLEAR_AVAILABLE'

export const setLessons = (lessons) => {
  return { type: SCHEDULED, lessons }
}

export const deleteLesson = (id) => {
  return { type: DELETE, id}
}

export const setAvailability = (lessons) => {
  return { type: SET_AVAILABLE, lessons }
}

export const clearAvailability = () => {
  return { type: CLEAR_AVAILABLE}
}

export const setOneLesson = (lesson) => {
  return { type: SET_ONE, lesson}
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

export const scheduleOneLesson = (id, duration, studentId) => async dispatch => {
  const res = await fetch(`/api/lessons/${id}/schedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      studentId,
      duration
    })
  })
  const data = await res.json();
  dispatch(setOneLesson(data));
  return data
}

export const getAvailability = (teacherId, startDay, endDay, duration) => async dispatch => {
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
    case SET_ONE:
      if (updateState.scheduled === null) {
        updateState.scheduled = {}
      }
      updateState.scheduled[action.lesson.id] = action.lesson;
      return updateState;
    case DELETE:
      delete updateState.scheduled[action.id];
      return updateState;
    case SET_AVAILABLE:
      if (action.lessons.length > 0) {
        updateState.available = {}
        action.lessons.forEach(lesson => {
          updateState.available[lesson.id] = lesson
        })
      } else {
        updateState.available = null
      }
      return updateState;
    case CLEAR_AVAILABLE:
      updateState.available = null
      return updateState;
    default:
      return state;
    }
}
