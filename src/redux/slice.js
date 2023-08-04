import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./operations";

const initialState = {
  user: {
    email: "",
    name: "",
    uid: "",
  },
  posts: [],
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser() {
      console.log("clearing user");
      state = { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authOperations.signIn.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.result.email;
        state.user.uid = action.payload.result.localId;
        state.isLoggedIn = true;
        console.log("signin.fulfilled");
      })
      .addCase(authOperations.logIn.fulfilled, (state, action) => {
        state.user.name = action.payload.displayName;
        state.user.email = action.payload.email;
        state.user.uid = action.payload.localId;
        state.isLoggedIn = true;
        console.log("login.fulfilled");
      })
      .addCase(authOperations.logOut.fulfilled, (state, _) => {
        console.log("logout.fulfilled");
        return { ...initialState };
      });
  },
});

export const { clearUser } = authSlice.actions;
