"use client";

import { initialValue } from "@/lib/constants";
import { calculateTotals } from "@/lib/utils";
import type { InvoiceData, InvoiceItem } from "@/types/invoice";
import { createContext, ReactNode, useState } from "react";

interface InvoiceContextType {
  invoice: InvoiceData;
  updateInvoice: (newUpdate: Partial<InvoiceData>) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
  updateItem: (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => void;
}

export const InvoiceContext = createContext<InvoiceContextType>({
  invoice: initialValue,
  updateInvoice: () => {},
  addItem: () => {},
  removeItem: () => {},
  updateItem: () => {},
});

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoice, setInvoice] = useState<InvoiceData>(initialValue);

  const updateInvoice = (newUpdate: Partial<InvoiceData>) => {
    const newInvoice = { ...invoice, ...newUpdate };

    if (newUpdate.items || newUpdate.taxRate !== undefined) {
      const { subtotal, taxAmount, total } = calculateTotals(
        newUpdate.items || invoice.items,
        newUpdate.taxRate !== undefined ? newUpdate.taxRate : invoice.taxRate
      );
      newInvoice.subtotal = subtotal;
      newInvoice.taxAmount = taxAmount;
      newInvoice.total = total;
    }

    setInvoice(newInvoice);
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };

    updateInvoice({ items: [...invoice.items, newItem] });
  };

  const removeItem = (index: number) => {
    if (invoice.items.length > 1) {
      const newItems = invoice.items.filter((_, i) => i !== index);
      updateInvoice({ items: newItems });
    }
  };

  const updateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };

    if (field === "quantity" || field === "rate") {
      const quantityValue = newItems[index].quantity;
      const rateValue = newItems[index].rate;

      let quantity: number;
      if (typeof quantityValue === "string") {
        quantity = quantityValue === "" ? 0 : Number(quantityValue);
      } else {
        quantity = quantityValue;
      }

      let rate: number;
      if (typeof rateValue === "string") {
        rate = rateValue === "" ? 0 : Number(rateValue);
      } else {
        rate = rateValue;
      }

      newItems[index].amount = quantity * rate;
    }

    updateInvoice({ items: newItems });
  };

  return (
    <InvoiceContext.Provider
      value={{ invoice, updateInvoice, addItem, removeItem, updateItem }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
