import {REGISTER, LOG_IN, LOG_OUT} from '../actions/actionTypes'
import {getToken} from '../lib/token'

const token = getToken();

const userInitialState = {token};

const userReducer = (state=userInitialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
      };
    case LOG_IN:
      return {
        ...state,
        token: action.payload.token,
      }
    case LOG_OUT:
      return {
        ...state,
        token: '',
      }
    default:
      return state;
  }
}

export default userReducer
