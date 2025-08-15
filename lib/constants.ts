import type { InvoiceData } from "@/types/invoice";

export const initialValue: InvoiceData = {
  invoiceNumber: `INV-${(Math.random() * Date.now()).toFixed()}`,
  date: new Date().toISOString().split("T")[0],
  fromName: "",
  fromEmail: "",
  toName: "",
  toEmail: "",
  items: [{ id: "1", description: "", quantity: 1, rate: 0, amount: 0 }],
  taxRate: 10,
  subtotal: 0,
  taxAmount: 0,
  total: 0,
};
