export const SET_COUNTER = 'SET_COUNTER'
export const IS_SIDEDRAWER_OPEN = 'IS_SIDEDRAWER_OPEN'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

export const set = (value) => ({
  type: SET_COUNTER,
  payload: value
})

export const isSidedrawerOpen = (value) => ({
  type: IS_SIDEDRAWER_OPEN,
  payload: value
})

export const decrement = () => ({
  type: DECREMENT_COUNTER
})

// export const incrementIfOdd = () => (dispatch, getState) => {
//   const { counter } = getState()

//   if (counter % 2 === 0) {
//     return
//   }

//   dispatch(increment())
// }

// export const incrementAsync = (delay = 1000) => dispatch => {
//   setTimeout(() => {
//     dispatch(increment())
//   }, delay)
// }
