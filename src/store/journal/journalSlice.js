import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
    name: "journal",
    initialState: {
        isSaving: false, //bandera para saber si estamos guardando o no
        messageSaved: "",
        notes: [],
        active: null,
        // {
        // id: "ABCD",
        // body: "",
        // title: "",
        // date: 12323423,
        // imageUrls: [], //lista de imagenes que el usuario almacenó
        // },
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            console.log("add new empty note");
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = "";
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state, action) => {
            state.isSaving = true;
            state.messageSaved = "";
            //TODO: Mensaje de error...
        },
        updateNote: (state, { payload }) => {
            state.isSaving = false;
            state.notes = state.notes.map((note) =>
                note.id === payload.id ? payload : note
            );
            state.messageSaved = `${payload.title}, actualizada correctamente`;
        },
        setPhotosToActiveNotes: (state, action) => {
            state.isSaving = false;
            state.active.imageUrls = [
                ...state.active.imageUrls,
                ...action.payload,
            ];
        },
        clearNotesLogout: (state, action) => {
            state.isSaving = false; //bandera para saber si estamos guardando o no
            state.messageSaved = "";
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            state.notes = state.notes.filter(
                (note) => note.id !== action.payload
            );
            state.active = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNotes,
    clearNotesLogout,
    deleteNoteById,
} = journalSlice.actions;
