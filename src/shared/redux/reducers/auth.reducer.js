import { SET_TOKEN,SET_USER,SET_ROLES } from '../actions/auth.actions'

const initialState = {
  token: '',
  user: '', 
  roles: []
};

let stateTemp

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      stateTemp = {...state}
      stateTemp.token = action.payload
      return stateTemp
    case SET_USER:
        stateTemp = {...state}
        stateTemp.user = action.payload
        return stateTemp
    case SET_ROLES:
      stateTemp = {...state}
      stateTemp.roles = action.payload
      return stateTemp
    default:
      return state
  }
}

export default authentication

