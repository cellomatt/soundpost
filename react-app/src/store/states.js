const GET_STATES = 'states/GET_STATES'

export const loadStates = states => {
  return { type: GET_STATES, states };
};

export const getAllStates = () => async dispatch => {
  const res = await fetch(`/api/states/all`);
  const data = await res.json();
  dispatch(loadStates(data));
  return data;
};

const initialState = { all: {} };

export default function statesReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case GET_STATES:
      action.states.forEach(americanState => {
        updateState.all[americanState.id] = americanState
      })
      return updateState;
    default:
      return state;
    }
}
