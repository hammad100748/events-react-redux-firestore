import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import testReducer from "../../features/testArea/testReducer";
import eventReducer from "../../features/event/eventReducer";
import modalsReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/AuthReducer";
import asyncReducer from "../../features/async/asyncReducer";
import { reducer as toastrReducer } from 'react-redux-toastr'
const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalsReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr:toastrReducer,
  firebase:firebaseReducer,
  firestore:firestoreReducer
});

export default rootReducer;
