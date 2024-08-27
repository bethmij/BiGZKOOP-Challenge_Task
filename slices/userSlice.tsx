import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userTableData : [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserTableData: (state, action) => {
            state.userTableData = action.payload
        },
    }})

export const {setUserTableData} = userSlice.actions

export const selectUserTableData= (state: { user: { userTableData: [] } }) => state.user.userTableData

export default userSlice.reducer