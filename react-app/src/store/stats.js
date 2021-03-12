const SET_WEEKLY_PRACTICE = "stats/SET_WEEKLY_PRACTICE"

export const setWeeklyPractice = (value) => {
  return { type: SET_WEEKLY_PRACTICE, value }
}


export const getWeeklyPractice = (userId) => async dispatch => {
  const res = await fetch (`/api/practice/${userId}/week`)
  const data = await res.json();
  dispatch(setWeeklyPractice(data))
  return data;
}

const initialState = { thisweek: 0 };

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
