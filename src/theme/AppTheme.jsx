import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { purpleTheme } from "./";
import { cyanTheme } from "./cyanTheme";

export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={cyanTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
