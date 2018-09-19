import { combineReducers } from "redux";
import testReducer from "../../features/testArea/testReducer";
import eventReducer from "../../features/event/eventReducer";
import { reducer as FormReducer } from "redux-form";
import modalsReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/AuthReducer";
import asyncReducer from "../../features/async/asyncReducer";
const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalsReducer,
  auth: authReducer,
  async: asyncReducer
});

export default rootReducer;
