import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewEmptyNote, startNewNote } from "../../store/journal";

export const FloatingButton = () => {
    const { isSaving } = useSelector((state) => state.journal);
    const dispatch = useDispatch();
    const onAddNewNote = () => {
        dispatch(startNewNote());
    };
    return (
        <IconButton
            disabled={isSaving}
            onClick={onAddNewNote}
            size="large"
            sx={{
                position: "fixed",
                right: 10,
                bottom: 20,
                color: "primary",
                backgroundColor: "white",
                border: "1px solid",
                borderColor: "primary",
                ":hover": {
                    color: "white",
                    backgroundColor: "secondary",
                },
            }}
        >
            <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>
    );
};
