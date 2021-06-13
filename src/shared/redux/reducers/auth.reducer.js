import { SET_USER,SET_TOKEN,SET_EMAIL,SET_ROLES, SET_ID, SET_AVATAR } from '../actions/auth.actions'

const initialState = {
  token: '',
  email: '', 
  roles: []
};

let stateTemp

const authentication = (state = initialState, action) => {
  
  switch (action.type) {
    case SET_USER:
      stateTemp = {...state}
      stateTemp.email = action.payload.email
      stateTemp.roles = action.payload.roles
      stateTemp.id = action.payload.id
      stateTemp.name = action.payload.name
      stateTemp.avatar = action.payload.avatar
      return stateTemp
    case SET_TOKEN:
      stateTemp = {...state}
      stateTemp.token = action.payload
      return stateTemp
    case SET_EMAIL:
        stateTemp = {...state}
        stateTemp.email = action.payload
        return stateTemp
    case SET_ROLES:
      stateTemp = {...state}
      stateTemp.roles = action.payload
      return stateTemp
    case SET_ID:
      stateTemp = {...state}
      stateTemp.id = action.payload
      return stateTemp
    case SET_AVATAR:
      stateTemp = {...state}
      stateTemp.avatar = action.payload
      return stateTemp
    default:
      return state
  }
}

export default authentication

