import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import teacherReducer from "./teacher"
import assignmentReducer from "./assignment"
import lessonReducer from "./lesson"
import practiceReducer from "./practice"
import statsReducer from "./stats"
import statesReducer from "./states"
import studentReducer from "./student"

const appReducer = combineReducers({
  session: sessionReducer,
  teachers: teacherReducer,
  assignments: assignmentReducer,
  lessons: lessonReducer,
  practice: practiceReducer,
  stats: statsReducer,
  states: statesReducer,
  students: studentReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
