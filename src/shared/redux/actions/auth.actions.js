export const SET_USER = 'SET_USER'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_EMAIL = 'SET_EMAIL'
export const SET_ROLES = 'SET_ROLES'
export const SET_ID = 'SET_ID'

export const setUser = (value) => ({
    type: SET_USER,
    payload: value
})
export const setToken = (value) => ({
    type: SET_TOKEN,
    payload: value
})

export const setEmail = (value) => ({
    type: SET_EMAIL,
    payload: value
})

export const setRoles = (value) => ({
    type: SET_ROLES,
    payload: value
})

export const setId = (value) => ({
    type: SET_ID,
    payload: value
})