import { SET_COUNTER, IS_SIDEDRAWER_OPEN, DECREMENT_COUNTER } from '../actions/ui.actions'

const initialState = {
  sidedrawer: false,
  
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTER:
      return action.payload
    case IS_SIDEDRAWER_OPEN:
      console.log("alcapaha",action.payload)
      let stateTemp = {...state}
      stateTemp.sidedrawer = action.payload
      return stateTemp
    case DECREMENT_COUNTER:
      return state - 1
    default:
      return state
  }
}

export default ui
