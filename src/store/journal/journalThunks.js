import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import {
    addNewEmptyNote,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNotes,
    setSaving,
    updateNote,
} from "./journalSlice";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());

        //Necesito el uid del usuario para insertar su nota
        const { uid } = getState().auth;

        //Creamos una nota en blanco

        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime(),
            imageUrls: [],
        };

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

        console.log(newDoc);

        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    };
};

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    };
};

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active } = getState().journal;
        const noteToFirestore = { ...active };
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${active.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch(updateNote(active));
    };
};

export const startUploadingFiles = (files = []) => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        // const url = await fileUpload(files[0]);

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photoUrls = await Promise.all(fileUploadPromises);

        console.log(photoUrls);

        dispatch(setPhotosToActiveNotes(photoUrls));
    };
};

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active } = getState().journal;

        console.log(active);

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${active.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(active.id));
        
    };
};
