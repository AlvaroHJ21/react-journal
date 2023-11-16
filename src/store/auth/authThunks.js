import {
    loginUserWithEmailPassword,
    logoutFirebase,
    registerUserWithEmailPassword,
    singInWithGoogle,
} from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    };
};

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await singInWithGoogle();

        // console.log(result.errorMessage);

        if (!result.ok)
            return dispatch(logout({ errorMessage: result.errorMessage }));
        dispatch(login(result));
        // console.log(result);
    };
};

export const startCreateUserWithEmailPassorwd = ({
    email,
    password,
    displayName,
}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } =
            await registerUserWithEmailPassword({
                email,
                password,
                displayName,
            });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, displayName, email, photoURL }));
    };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginUserWithEmailPassword({ email, password });

        if (!result.ok)
            return dispatch(logout({ errorMessage: result.errorMessage }));
        dispatch(login(result));
    };
};

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout({}));
        dispatch(clearNotesLogout());
    };
};
