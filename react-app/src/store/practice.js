const PRACTICED_TODAY = "practice/PRACTICED_TODAY"


export const setPracticed = () => {
  return { type: PRACTICED_TODAY }
}


export const practicedToday = (userId) => async dispatch => {
  const res = await fetch(`/api/practice/${userId}/new`, {
    method: "POST"
  })
  if (res.ok) {
    dispatch(setPraticed());
    return res;
  }
}

const initialState = { today: null };

export default function practiceReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case PRACTICED_TODAY:
      updateState.today = true
      return updateState;
    default:
      return state;
    }
}
