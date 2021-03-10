const SET_PRACTICED_TODAY = "practice/SET_PRACTICED_TODAY"


export const setPracticed = (value) => {
  return { type: SET_PRACTICED_TODAY, value }
}

export const practicedToday = (userId) => async dispatch => {
  const res = await fetch(`/api/practice/${userId}/new`, {
    method: "POST",
  })
  if (res.ok) {
    dispatch(setPracticed(true));
    return res;
  }
}

export const getPractice = (userId) => async dispatch => {
  const res = await fetch(`/api/practice/${userId}/today`)
  const data = await res.json();
  dispatch(setPracticed(data))
  return data;
}

const initialState = { today: null };

export default function practiceReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case SET_PRACTICED_TODAY:
      updateState.today = action.value
      return updateState;
    default:
      return state;
    }
}
