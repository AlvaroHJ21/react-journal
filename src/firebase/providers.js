import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        // console.log(credentials);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            //
            displayName,
            email,
            photoURL,
            uid,
        };
    } catch (error) {
        // console.log(error);
        return {
            ok: false,
            errorMessage: error.message,
        };
    }
};

export const registerUserWithEmailPassword = async ({
    email,
    password,
    displayName,
}) => {
    // console.log({ email, password });
    try {
        const resp = await createUserWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
        );

        const { uid, photoURL } = resp.user;

        //TODO: Actualizar en firebase

        await updateProfile(FirebaseAuth.currentUser, {
            displayName,
        });

        // console.log(resp);

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        };
    }
};

export const loginUserWithEmailPassword = async ({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
        );

        const { displayName, photoURL, uid } = resp.user;

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        };
    }
};

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
};
