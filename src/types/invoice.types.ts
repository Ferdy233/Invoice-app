export type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type Address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

export type Invoice = {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  total: number;
};

export type currentInvoice = {
  invoice: Invoice | undefined;
  loading: "idle" | "loading" | "success";
  error: string | null;
};

export type InitialState = {
  invoices: Invoice[];
  invoice: currentInvoice;
  statusFilter: string[];
  loading: "idle" | "loading" | "success";
  error: string | null;
};

export const initialInvoices: Invoice = {
  id: "",
  clientName: "",
  clientEmail: "",
  createdAt: "",
  paymentDue: "",
  description: "",
  paymentTerms: 0,
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  items: [],
  status: "",
  total: 0,
};
