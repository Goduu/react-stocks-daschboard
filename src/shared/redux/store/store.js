import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import gridSlice from '../../../logged_in/components/grid/gridSlice';
import counter from '../reducers/counter'
import card from '../reducers/card.reducer'
import table from '../reducers/table.reducer'
import thunk from 'redux-thunk'

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))


const rootReducer = combineReducers({
  grid: gridSlice,
  table: table,
  card: card,
  counter: counter,
})

const persistedReducer = persistReducer({
  key: 'root',
  storage
}, rootReducer)

export const store = createStore(persistedReducer,applyMiddleware(thunk))
export const persistedStore = persistStore(store)

// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from '../reducers'




