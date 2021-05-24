const SET_WEEKLY_PRACTICE = "stats/SET_WEEKLY_PRACTICE"
const SET_ALL_STATS = "stats/SET_ALL_STATS"
const CLEANUP_STATS = "stats/CLEANUP_STATS"
const USER_LOGOUT = "USER_LOGOUT"

export const setWeeklyPractice = (value) => {
  return { type: SET_WEEKLY_PRACTICE, value }
}

export const setAllStats = (data) => {
  return { type: SET_ALL_STATS, data }
}

export const cleanupStats = () => {
  return { type: CLEANUP_STATS}
}

export const getWeeklyPractice = (userId) => async dispatch => {
  const res = await fetch (`/api/practice/${userId}/week`)
  const data = await res.json();
  dispatch(setWeeklyPractice(data))
  return data;
}

export const getAllStats = (userId) => async dispatch => {
  const res = await fetch (`/api/practice/${userId}`)
  const data = await res.json();

  data.days.list.forEach(day => {
    console.log(day.date)
    day.date = new Date(day.date)
  })

  dispatch(setAllStats(data));
  return data;
}

const initialState = {
  thisweek: {count: 0, percentage: 0},
  thismonth: {count: 0, percentage: 0},
  all: {count: 0, percentage: 0},
  days: {count: 0, list: {}},
  lessons: 0,
  start_date: null
};

export default function statsReducer(state = initialState, action) {
  let updateState = {...state}
  switch (action.type) {
    case SET_WEEKLY_PRACTICE:
      if (action.value !== 0) {
        updateState.thisweek = action.value
      }
      return updateState;
    case SET_ALL_STATS:
      if (action.data.thisweek !== 0) {
        updateState.thisweek = action.data.thisweek
      }
      if (action.data.thismonth !== 0) {
        updateState.thismonth = action.data.thismonth
      }
      if (action.data.all !== 0) {
        updateState.all = action.data.all
      }
      if (action.data.days) {
        updateState.days.count = action.data.days.count
        action.data.days["list"].forEach(day => {
          updateState.days.list[day.date] = day
        })
      }
      updateState.start_date = new Date(action.data.start_date)
      updateState.lessons = action.data.lessons;
      return updateState;
    case CLEANUP_STATS:
      updateState = initialState;
      updateState.days = {count: 0, list: {}}
      return updateState;
    case USER_LOGOUT:
      updateState.days = {count: 0, list: {}}
      return updateState;
    default:
      return state;
    }
}
