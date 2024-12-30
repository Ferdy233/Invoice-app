import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";

interface InitialValueType {
    theme: string;
}

const initialState: InitialValueType = {
    theme: "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    },
})

export const themeSelector = (state: RootState) => state.theme;

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;