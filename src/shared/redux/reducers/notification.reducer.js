import { NOTIFY,CLOSE_NOTIFICATION } from '../actions/notification.actions'

const initialState = {
    type: '',
    msg: '',
    open: false
};

let stateTemp

const notification = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFY:
            stateTemp = { ...state }
            stateTemp.type = action.payload.type
            stateTemp.msg = action.payload.msg
            stateTemp.open = true
            return stateTemp
        case CLOSE_NOTIFICATION:
            return initialState
        default:
            return state
    }
}

export default notification

