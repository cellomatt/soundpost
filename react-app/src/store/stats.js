const SET_WEEKLY_PRACTICE = "stats/SET_WEEKLY_PRACTICE"
const SET_ALL_STATS = "stats/SET_ALL_STATS"

export const setWeeklyPractice = (value) => {
  return { type: SET_WEEKLY_PRACTICE, value }
}

export const setAllStats = (data) => {
  return { type: SET_ALL_STATS, data }
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
  console.log(data)
  dispatch(setAllStats(data));
  return data;
}

const initialState = { thisweek: {count: 0, percentage: 0} };

export default function statsReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case SET_WEEKLY_PRACTICE:
      if (action.value !== 0) {
        updateState.thisweek = action.value
      }
      return updateState;
    default:
      return state;
    }
}
