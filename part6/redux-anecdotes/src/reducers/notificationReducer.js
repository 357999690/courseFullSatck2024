import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification(state, action) {
            const message = action.payload
            return state = message
        },
        deleteNotification(state, action) {
            const message = action.payload
            return state = message
        }
    }
})

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(addNotification(message))
        setTimeout(() => {
            dispatch(deleteNotification(''))
        }, time * 1000)
    }
}

export const { addNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer