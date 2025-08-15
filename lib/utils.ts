import type { InvoiceData, InvoiceItem } from "@/types/invoice";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jsPDF } from "jspdf";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function assertValue<T>(
  v: T | undefined,
  errorMessage?: string
): NonNullable<T> {
  if (v === undefined || v === null) {
    throw new Error(errorMessage ?? "Missing property");
  }
  return v;
}

export function calculateTotals(
  items: Array<InvoiceItem>,
  taxRate: number | string
) {
  const subtotal = items.reduce((sum, item) => {
    const amount = typeof item.amount === "number" ? item.amount : 0;
    return sum + amount;
  }, 0);

  const rate =
    typeof taxRate === "number"
      ? taxRate
      : taxRate === ""
      ? 0
      : Number(taxRate);
  const taxAmount = (subtotal * rate) / 100;
  const total = subtotal + taxAmount;

  return { subtotal, taxAmount, total };
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export function generatePDF(invoice: InvoiceData) {
  const doc = new jsPDF();
  let y = 30;

  // Title
  doc.setFontSize(24);
  doc.text("INVOICE", 20, y);
  doc.setFontSize(12);
  doc.text(`#${invoice.invoiceNumber}`, 150, y);
  y += 20;

  // Date
  doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 150, y);
  y += 20;

  // From/To
  doc.setFontSize(14);
  doc.text("From:", 20, y);
  doc.text("To:", 120, y);
  y += 10;

  doc.setFontSize(10);
  doc.text(invoice.fromName, 20, y);
  doc.text(invoice.toName, 120, y);
  y += 6;
  doc.text(invoice.fromEmail, 20, y);
  doc.text(invoice.toEmail, 120, y);
  y += 20;

  // Items header
  doc.setFontSize(10);
  doc.text("Description", 20, y);
  doc.text("Qty", 120, y);
  doc.text("Rate", 140, y);
  doc.text("Amount", 160, y);
  y += 5;
  doc.line(20, y, 190, y);
  y += 10;

  // Items
  invoice.items.forEach((item) => {
    doc.text(item.description, 20, y);
    doc.text(item.quantity.toString(), 120, y);
    doc.text(`$${Number(item.rate).toFixed(2)}`, 140, y);
    doc.text(`$${item.amount.toFixed(2)}`, 160, y);
    y += 8;
  });

  y += 10;
  doc.line(120, y, 190, y);
  y += 10;

  // Totals
  doc.text("Subtotal:", 120, y);
  doc.text(`$${invoice.subtotal.toFixed(2)}`, 160, y);
  y += 8;
  doc.text(`Tax (${invoice.taxRate}%):`, 120, y);
  doc.text(`$${invoice.taxAmount.toFixed(2)}`, 160, y);
  y += 8;
  doc.setFontSize(12);
  doc.text("Total:", 120, y);
  doc.text(`$${invoice.total.toFixed(2)}`, 160, y);

  // Generate blob URL untuk preview
  // const pdfBlob = doc.output("blob");
  // return URL.createObjectURL(pdfBlob);

  doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
}
