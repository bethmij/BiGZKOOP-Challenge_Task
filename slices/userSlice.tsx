import { createSlice } from '@reduxjs/toolkit'
import {User} from "@/pages/preview/userTableDetails.tsx";


const initialState = {
    userTableData : [],
    currentUser: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserTableData: (state, action) => {
            state.userTableData = action.payload
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        }
    }})

export const {setUserTableData, setCurrentUser} = userSlice.actions

export const selectUserTableData= (state: { user: { userTableData: [] } }) => state.user.userTableData
export const selectCurrentUser= (state: { user: { currentUser : User} }) => state.user.currentUser

export default userSlice.reducer