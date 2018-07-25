import * as userAction from '../actions/userAction'

/**
 * Defines the userReducer initialState
 */
const userInitialState = {userId: ""};

const userReducer = (state=userInitialState, action) => {
  switch (action.type) {
    // save userID
    case userAction.SET_USER_ID:
      return { ...state,
        userId: action.payload,
      }

    // default
    default:
      return state;
  }
}

export default userReducer
