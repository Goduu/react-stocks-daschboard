import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {increment, decrement} from '../../../shared/redux/actions/counter.actions.js'
function Counter() {
    const dispatch = useDispatch()
    const number = useSelector(state => state.counter)

    const handleIncremet = () => dispatch(increment())
    const handleDecrement = () => dispatch(decrement())

    return (
        <>
            <input type='text' placeholder='a' />
            <input type='text' placeholder='b' />
            <button onClick={handleIncremet}> somar</button>
            <button onClick={handleDecrement}> subt</button>
            <div>Result {number}</div>
        </>
    )
}

export default Counter