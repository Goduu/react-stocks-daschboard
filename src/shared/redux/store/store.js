import { createStore, applyMiddleware, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createTransform } from 'redux-persist';

import grid from '../reducers/grid.reducer';
import counter from '../reducers/counter'
import card from '../reducers/card.reducer'
import table from '../reducers/table.reducer'
import auth from '../reducers/auth.reducer'
import thunk from 'redux-thunk'

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// const GridParse = createTransform(
//   // transform state on its way to being serialized and persisted.
//   (inboundState, key) => {
//     // convert mySet to an Array.
//     console.log("ALCAPAHA AQUI",inboundState.grids)
//     return { ...inboundState, grids: JSON.stringify(inboundState.grids) };
//   },
//   // transform state being rehydrated
//   (outboundState, key) => {
//     // convert mySet back to a Set.
//     return { ...outboundState, grids: JSON.parse(outboundState.grids) };
//   },
//   // define which reducers this transform gets called for.
//   { whitelist: ['grid'] }
// );


const rootReducer = combineReducers({
  grid: grid,
  table: table,
  card: card,
  counter: counter,
  auth: auth,
})

const persistedReducer = persistReducer({
  key: 'root',
  // transforms: [GridParse],
  storage: storage,
}, rootReducer)

export const store = createStore(persistedReducer,applyMiddleware(thunk))
export const persistedStore = persistStore(store)




