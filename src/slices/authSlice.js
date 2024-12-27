import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  users: [],
};

export const registerUser = createAsyncThunk(
 "users/register",
    async (userData) => {
        const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        });
        const data = await response.json();
        return data;
    }
)

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.users = action.payload;
        });
    }
   
})

export default userSlice.reducer;
