import { InvoiceContext } from "@/context/invoice.context";
import { assertValue } from "@/lib/utils";
import { useContext } from "react";

export function useInvoice() {
  const context = useContext(InvoiceContext);
  assertValue(context, "useInvoice must be used within an InvoiceProvider");
  return context;
}
