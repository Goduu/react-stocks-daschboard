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
      console.log("SET_TOKEN", action.payload)
      stateTemp = {...state}
      stateTemp.token = action.payload
      return stateTemp
    case SET_USER:
        console.log("SET_USER", action.payload)
        stateTemp = {...state}
        stateTemp.user = action.payload
        return stateTemp
    case SET_ROLES:
      console.log("SET_ROLES", action.payload)
      stateTemp = {...state}
      stateTemp.roles = action.payload
      return stateTemp
    default:
      return state
  }
}

export default authentication

