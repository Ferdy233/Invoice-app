import { FieldError } from "react-hook-form";

export type AddressType = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

export type ItemType = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type FormValues = {
  id: string;
  clientName: string;
  clientEmail: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientAddress: AddressType;
  senderAddress: AddressType;
  items: ItemType[];
  status: string;
  total: number;
};

export const initialItems: ItemType = {
  name: "",
  quantity: 0,
  price: 0,
  total: 0,
};

export type Errors = {
  street?: FieldError;
  postCode?: FieldError;
  city?: FieldError;
  country?: FieldError;
  clientName?: FieldError;
  clientEmail?: FieldError;
  createdAt?: FieldError;
  paymentTerms?: FieldError;
  description?: FieldError;
  name?: FieldError;
  quantity?: FieldError;
  price?: FieldError;
  items?: FieldError;
};
