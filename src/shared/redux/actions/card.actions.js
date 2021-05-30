import { getQuoteData } from '../../functions/requests'
export const ADD_CARD = 'ADD_CARD'



export const addCard = (value) => ({
    type: ADD_CARD,
    payload: value
})


export const fetchCardInfo = (ticker) => dispatch => {
    setTimeout(() => {
        getQuoteData(ticker)
            .then(resp => {
                dispatch(addCard(resp))
            });
    }, 500)

}
