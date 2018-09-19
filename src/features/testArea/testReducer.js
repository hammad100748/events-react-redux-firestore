import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";
import { createReducer } from '../../app/common/util/reducerUtil';

const initialState = {
  data: 44
};

const incrementCounter = (state,payload) => {
    return { ...state, data: state.data + 1 };
}

const decrementCounter = (state,payload) => { 
    return { ...state, data: state.data - 1 };
}

/* Instead of following we used util lies in common/util/reducerUtil
const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, data: state.data + 1 };
    case DECREMENT_COUNTER:
      return { ...state, data: state.data - 1 };
    default:
      return state;
  }
 };*/

export default createReducer(initialState,{
    [INCREMENT_COUNTER]:incrementCounter,
    [DECREMENT_COUNTER]:decrementCounter
});
