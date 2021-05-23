import { combineReducers } from 'redux'
import counter from './counter'
import table from './table.reducer'
import card from './card.reducer'

const rootReducer = combineReducers({
  counter,
  table,
  card
})

export default rootReducer
