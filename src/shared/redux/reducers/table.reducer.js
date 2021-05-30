import { CHANGE_HEADER, CHANGE_HEADER_TYPE, CHANGE_HEADER_NAME, CHANGE_ROW, ADD_ROW } from '../actions/table.actions'
const initialState = {
    headers: [
        { field: 'h1', headerName: 'headStr', flex: 1, type: 'string', editable: true },
        { field: 'h2', headerName: 'headNum', flex: 1, type: 'number', editable: true },
        { field: 'h3', headerName: 'headDate', type: 'date', width: 180, editable: true,
        },
    ],
    rows: [],
    rowNumber: 0,
    status: 'idle',
};
let field =''
let headersTemp = ''
let rowsTemp = []

const table = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_HEADER:
            state.headers = action.payload
            return state
        case CHANGE_HEADER_TYPE:
            field = action.payload.field
            headersTemp = state.headers
            headersTemp.find(h => { return h.field === field }).type = action.payload.type
            state.headers = headersTemp;
            return state
        case CHANGE_HEADER_NAME:
            field = action.payload.field
            headersTemp = state.headers
            headersTemp.find(h => { return h.field === field }).headerName = action.payload.type
            state.headers = headersTemp;
            return state
        case CHANGE_ROW:
            field = action.payload.field
            rowsTemp = state.rows
            rowsTemp.find(h => { return h.id === action.payload.id })[field] = action.payload.props.value
            state.rows= rowsTemp
            return state
        case ADD_ROW:
            rowsTemp = [...state.rows]
            rowsTemp
            .push({
                id: state.rowNumber + 1,
                h1: '',
                h2: '',
                h3: ''
            });
            state.rows = rowsTemp
            state.rowNumber += 1
            return state
        default:
            return state
    }
}

export default table


