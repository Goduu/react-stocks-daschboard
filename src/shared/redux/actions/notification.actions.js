export const NOTIFY = 'NOTIFY'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'

export const notify = (value) => ({
    type: NOTIFY,
    payload: value
})
export const closeNotification = () => ({
    type: CLOSE_NOTIFICATION
})

