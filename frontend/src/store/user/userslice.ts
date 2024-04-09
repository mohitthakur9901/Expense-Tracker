import { createSlice } from "@reduxjs/toolkit";

interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    refresh_token: string;
    account: string
}

const initialState: User = {
    _id: "",
    name: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    refresh_token: "",
    account: ""
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
            state.refresh_token = action.payload.refresh_token;
            state.account = action.payload.account;
        },
        clearUser(state) {
            state._id = "";
            state.name = "";
            state.email = "";
            state.createdAt = "";
            state.updatedAt = "";
            state.refresh_token = "";
            state.account = "";
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer