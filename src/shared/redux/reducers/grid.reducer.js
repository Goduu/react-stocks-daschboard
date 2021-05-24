import { ADD_GRID, SET_CURRENT_TICKER,SET_GRID_ELEMENTS } from '../actions/grid.actions'

let initialState = {
  grids: {},
  currentTicker: ''
}

let temp
const grid = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GRID:
      temp = { ...state };
      temp.grids[action.payload.ticker] = { ...temp.grids[action.payload.ticker],card: action.payload }
      return temp
    case SET_CURRENT_TICKER:
      temp = state
      temp.currentTicker = action.payload
      return temp
    case SET_GRID_ELEMENTS:
      temp = state
      if(temp.grids[action.payload.ticker]) {
        temp.grids[action.payload.ticker]['elements'] = action.payload.element
      }else{
        temp.grids[action.payload.ticker] = {}
        temp.grids[action.payload.ticker]['elements'] = action.payload.elements
      }
      return temp
    default:
      return state
  }
}

export default grid
