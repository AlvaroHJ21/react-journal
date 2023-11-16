import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "checking", //"checking", "not-authenticated", "authenticated"
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.status = "authenticated";
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = "not-authenticated";
            state.uid = initialState.uid;
            state.email = initialState.email;
            state.displayName = initialState.displayName;
            state.photoURL = initialState.photoURL;
            state.errorMessage = payload?.errorMessage;

            // state = Object.assign(initialState);
        },
        checkingCredentials: (state) => {
            state.status = "checking";
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
