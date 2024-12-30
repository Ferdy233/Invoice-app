import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, Invoice } from "../../types/invoice.types.ts";
import data from "../../data.json";
import { RootState } from "../../store.ts";
const initialState: InitialState = {
  invoices: data as Invoice[],
  invoice: { loading: "idle", error: null, invoice: undefined },
  statusFilter: [],
  loading: "idle",
  error: null,
};

export const fetchInvoices = createAsyncThunk<Invoice[]>(
  "invoices/fetch",
  () => {
    return data as Invoice[];
  },
);

export const getInvoiceById = createAsyncThunk("invoice/get", (id: string) => {
  return id;
});

export const deleteInvoice = createAsyncThunk(
  "invoices/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated delay
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateInvoiceStatus = createAsyncThunk(
  "invoices/updateInvoiceStatus",
  async (id: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated delay
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const addInvoice = createAsyncThunk(
  "invoices/addInvoice",
  async (invoice: Invoice, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return invoice;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    filterInvoices: (state, action: PayloadAction<string>) => {
      state.statusFilter = state.statusFilter.includes(action.payload)
        ? state.statusFilter.filter((status) => status !== action.payload)
        : [...state.statusFilter, action.payload];
    },
    deleteInvoice: (state, action: PayloadAction<string>) => {
      state.loading = "loading";
      state.error = null;
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload,
      );
      state.loading = "success";
      console.log("hello");
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchInvoices
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch invoices";
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload;
      })

      //getInvoiceById
      .addCase(getInvoiceById.rejected, (state, action) => {
        state.invoice = {
          invoice: undefined,
          loading: "idle",
          error: action.error.message ?? "Invoice not found",
        };
      })
      .addCase(getInvoiceById.fulfilled, (state, action) => {
        state.invoice = {
          loading: "idle",
          error: null,
          invoice: state.invoices.find(
            (invoice) => invoice.id === action.payload,
          ),
        };
      })

      //deleteInvoice
      .addCase(deleteInvoice.pending, (state) => {
        state.invoice.loading = "loading";
        state.invoice.error = null;
      })
      .addCase(
        deleteInvoice.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.invoices = state.invoices.filter(
            (invoice) => invoice.id !== action.payload,
          );
          state.invoice.loading = "success";
        },
      )
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload as string;
      })

      //updateInvoiceStatus
      .addCase(updateInvoiceStatus.pending, (state) => {
        state.invoice.loading = "loading";
        state.invoice.error = null;
      })
      .addCase(
        updateInvoiceStatus.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.invoices.findIndex(
            (invoice) => invoice.id === action.payload,
          );

          if (
            index >= 0 &&
            state.invoice.invoice &&
            state.invoices[index].id === state.invoice.invoice.id &&
            state.invoices[index].status === "pending"
          ) {
            state.invoices[index].status = "paid";
            state.invoice.invoice.status = "paid";
            state.invoice.loading = "success";
            state.invoice.error = null;
          }
          state.invoice.loading = "idle";
          state.invoice.error = "something went wrong";
        },
      )
      .addCase(updateInvoiceStatus.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload as string;
      })

      //addInvoice
      .addCase(addInvoice.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        const { payload } = action;

        const payloadExists = state.invoices.find(
          (invoice) => invoice.id === payload.id,
        );

        if (!payloadExists) {
          state.invoices = [action.payload, ...state.invoices];
        } else {
          const index = state.invoices.findIndex(
            (invoice) => invoice.id === payload.id,
          );
          state.invoices[index] = { ...state.invoices[index], ...payload };
        }
        state.loading = "success";
        state.error = null;
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload as string;
      });
  },
});

export const { filterInvoices } = invoiceSlice.actions;

export const selectInvoice = (state: RootState) => state.invoice.invoice;
export const selectInvoices = (state: RootState) => state.invoice.invoices;
export const selectStatusFilter = (state: RootState) =>
  state.invoice.statusFilter;
export const selectLoading = (state: RootState) => state.invoice.loading;
export const selectError = (state: RootState) => state.invoice.error;
export default invoiceSlice.reducer;
