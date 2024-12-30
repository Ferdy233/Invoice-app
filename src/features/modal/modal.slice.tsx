import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store.ts";

interface InitialState {
  showFormDialog: boolean;
  showDeleteDialog: boolean;
  showDropdown: boolean;
  showPaymentTerms: boolean;
  showProfile: boolean;
}

const initialState: InitialState = {
  showFormDialog: false,
  showDeleteDialog: false,
  showDropdown: false,
  showPaymentTerms: false,
  showProfile: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (
      state: InitialState,
      action: PayloadAction<
        Partial<
          | "showDeleteDialog"
          | "showFormDialog"
          | "showDropdown"
          | "showPaymentTerms"
          | "showProfile"
        >
      >,
    ) => {
      const modal = action.payload;
      state[modal] = !state[modal];
    },
  },
});

export const selectFormDialog = (state: RootState) =>
  state.modal.showFormDialog;
export const selectDeleteDialog = (state: RootState) =>
  state.modal.showDeleteDialog;
export const selectDropdown = (state: RootState) => state.modal.showDropdown;
export const selectPaymentTerms = (state: RootState) =>
  state.modal.showPaymentTerms;
export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
