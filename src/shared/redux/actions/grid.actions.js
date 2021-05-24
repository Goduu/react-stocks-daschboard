import { getQuoteData } from '../../functions/requests'
export const ADD_GRID = 'ADD_GRID'
export const SET_CURRENT_TICKER = 'SET_CURRENT_TICKER'
export const SET_GRID_ELEMENTS = 'SET_GRID_ELEMENTS'



export const addGrid = (value) => ({
    type: ADD_GRID,
    payload: value
})

export const setCurrentTicker = (value) => ({
    type: SET_CURRENT_TICKER,
    payload: value
})

export const setGridElements = (value) => ({
    type: SET_GRID_ELEMENTS,
    payload: value
})

export const fetchCardInfo = (ticker) => dispatch => {
    console.log("fetchCardInfo")
    setTimeout(() => {
        getQuoteData(ticker)
            .then(resp => {
                dispatch(addGrid(resp))
                dispatch(setCurrentTicker(ticker))
            });
    }, 500)

}
