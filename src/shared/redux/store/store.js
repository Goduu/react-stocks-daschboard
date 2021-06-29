import { createStore, applyMiddleware, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import grid from '../reducers/grid.reducer';
import ui from '../reducers/ui.reducer'
import card from '../reducers/card.reducer'
import table from '../reducers/table.reducer'
import auth from '../reducers/auth.reducer'
import notification from '../reducers/notification.reducer'
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
  grid: grid,
  table: table,
  card: card,
  ui: ui,
  auth: auth,
  notification: notification,
})

const persistedReducer = persistReducer({
  key: 'root',
  // transforms: [GridParse],
  storage: storage,
}, rootReducer)

export const store = createStore(persistedReducer,applyMiddleware(thunk))
export const persistedStore = persistStore(store)




