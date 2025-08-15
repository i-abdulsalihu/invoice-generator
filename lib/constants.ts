import type { InvoiceData } from "@/types/invoice";

export const initialValue: InvoiceData = {
  invoiceNumber: "INV-899866442432",
  date: "2025-08-15",
  fromName: "Abdullahi Salihu",
  fromEmail: "abdullahisalihuinusa@gmail.com",
  toName: "John Doe",
  toEmail: "johndoe@gmail.com",
  items: [
    {
      id: "1",
      description: "website",
      quantity: 1,
      rate: 10,
      amount: 10,
    },
  ],
  taxRate: 10,
  subtotal: 10,
  taxAmount: 1,
  total: 11,
};
