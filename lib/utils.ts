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

export function generatePDF(invoice: InvoiceData | null) {
  if (!invoice) return;
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Color palette to match the preview
  const colors = {
    primary: [30, 58, 138] as const, // blue-800
    secondary: [71, 85, 105] as const, // slate-600
    accent: [99, 102, 241] as const, // indigo-500
    emerald: [16, 185, 129] as const, // emerald-500
    purple: [147, 51, 234] as const, // purple-600
    lightGray: [248, 250, 252] as const, // slate-50
    darkGray: [51, 65, 85] as const, // slate-700
    success: [34, 197, 94] as const, // green-500
  };
  
  let y = margin;
  
  // Background gradient effect (subtle)
  doc.setFillColor(248, 250, 252); // Very light blue-gray
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  // HEADER SECTION
  y = 30;
  
  // Large "INVOICE" title with gradient effect simulation
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(...colors.primary);
  doc.text('INVOICE', margin, y);
  
  // Invoice number badge
  const badgeX = pageWidth - margin - 50;
  const badgeY = y - 8;
  doc.setFillColor(219, 234, 254); // blue-100
  doc.roundedRect(badgeX, badgeY, 45, 10, 3, 3, 'F');
  doc.setFontSize(10);
  doc.setTextColor(...colors.accent);
  doc.setFont('helvetica', 'bold');
  doc.text(`${invoice.invoiceNumber}`, badgeX + 22.5, badgeY + 6.5, { align: 'center' });
  
  // Invoice Date section
  y += 15;
  const dateBoxX = pageWidth - margin - 50;
  const dateBoxY = y - 8;
  doc.setFillColor(241, 245, 249); // slate-100
  doc.roundedRect(dateBoxX, dateBoxY, 45, 15, 3, 3, 'F');
  doc.setFontSize(8);
  doc.setTextColor(...colors.secondary);
  doc.setFont('helvetica', 'normal');
  doc.text('Invoice Date', dateBoxX + 22.5, dateBoxY + 5, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(...colors.darkGray);
  doc.setFont('helvetica', 'bold');
  doc.text(formatDate(invoice.date), dateBoxX + 22.5, dateBoxY + 11, { align: 'center' });
  
  // FROM/TO SECTION
  y += 25;
  const columnWidth = (contentWidth - 10) / 2;
  
  // FROM section
  const fromX = margin;
  // FROM badge
  doc.setFillColor(209, 250, 229); // emerald-100
  doc.roundedRect(fromX, y - 5, 25, 8, 2, 2, 'F');
  doc.setFontSize(8);
  doc.setTextColor(...colors.emerald);
  doc.setFont('helvetica', 'bold');
  doc.text('FROM', fromX + 12.5, y - 1, { align: 'center' });
  
  y += 8;
  doc.setFontSize(14);
  doc.setTextColor(...colors.darkGray);
  doc.setFont('helvetica', 'bold');
  doc.text(invoice.fromName || '[Your Name/Company]', fromX, y);
  
  y += 6;
  doc.setFontSize(10);
  doc.setTextColor(...colors.secondary);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.fromEmail || '[Your Email]', fromX, y);
  
  // TO section
  y -= 14; // Reset y for TO section
  const toX = margin + columnWidth + 10;
  // TO badge
  doc.setFillColor(233, 213, 255); // purple-100
  doc.roundedRect(toX, y - 5, 20, 8, 2, 2, 'F');
  doc.setFontSize(8);
  doc.setTextColor(...colors.purple);
  doc.setFont('helvetica', 'bold');
  doc.text('TO', toX + 10, y - 1, { align: 'center' });
  
  y += 8;
  doc.setFontSize(14);
  doc.setTextColor(...colors.darkGray);
  doc.setFont('helvetica', 'bold');
  doc.text(invoice.toName || '[Client Name/Company]', toX, y);
  
  y += 6;
  doc.setFontSize(10);
  doc.setTextColor(...colors.secondary);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.toEmail || '[Client Email]', toX, y);
  
  // ITEMS TABLE SECTION
  y += 25;
  const tableHeaders = ['Description', 'Qty', 'Rate', 'Amount'];
  const columnWidths = [contentWidth * 0.5, contentWidth * 0.15, contentWidth * 0.175, contentWidth * 0.175];
  let currentX = margin;
  
  // Table header background
  doc.setFillColor(248, 250, 252); // slate-50
  doc.rect(margin, y - 5, contentWidth, 12, 'F');
  
  // Table header border
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.5);
  doc.line(margin, y - 5, margin + contentWidth, y - 5);
  doc.line(margin, y + 7, margin + contentWidth, y + 7);
  
  // Table headers
  doc.setFontSize(10);
  doc.setTextColor(...colors.secondary);
  doc.setFont('helvetica', 'bold');
  
  tableHeaders.forEach((header, index) => {
    const align = index === 0 ? 'left' : index === 1 ? 'center' : 'right';
    const textX = index === 0 ? currentX : 
                 index === 1 ? currentX + columnWidths[index] / 2 : 
                 currentX + columnWidths[index] - 2;
    doc.text(header, textX, y + 2, { align });
    currentX += columnWidths[index];
  });
  
  y += 15;
  
  // Table rows
  invoice.items.forEach((item, index) => {
    const isEven = index % 2 === 0;
    
    // Alternating row background
    if (!isEven) {
      doc.setFillColor(248, 250, 252); // slate-50
      doc.rect(margin, y - 4, contentWidth, 10, 'F');
    }
    
    currentX = margin;
    doc.setFontSize(9);
    doc.setTextColor(...colors.darkGray);
    doc.setFont('helvetica', 'normal');
    
    // Description
    const description = item.description || '[Item Description]';
    doc.text(description.length > 40 ? description.substring(0, 37) + '...' : description, currentX, y);
    currentX += columnWidths[0];
    
    // Quantity (centered)
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.secondary);
    doc.text(item.quantity.toString(), currentX + columnWidths[1] / 2, y, { align: 'center' });
    currentX += columnWidths[1];
    
    // Rate (right aligned)
    doc.setFont('helvetica', 'normal');
    doc.text(`$${typeof item.rate === 'number' ? item.rate.toFixed(2) : '0.00'}`, currentX + columnWidths[2] - 2, y, { align: 'right' });
    currentX += columnWidths[2];
    
    // Amount (right aligned, bold)
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.darkGray);
    doc.text(`$${typeof item.amount === 'number' ? item.amount.toFixed(2) : '0.00'}`, currentX + columnWidths[3] - 2, y, { align: 'right' });
    
    y += 10;
  });
  
  // Table bottom border
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y - 3, margin + contentWidth, y - 3);
  
  // TOTALS SECTION
  y += 20;
  const totalsBoxWidth = 80;
  const totalsBoxX = pageWidth - margin - totalsBoxWidth;
  
  // Totals background
  doc.setFillColor(248, 250, 252); // slate-50
  doc.roundedRect(totalsBoxX, y - 5, totalsBoxWidth, 35, 5, 5, 'F');
  
  // Subtotal
  doc.setFontSize(10);
  doc.setTextColor(...colors.secondary);
  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal:', totalsBoxX + 5, y + 2);
  doc.setTextColor(...colors.darkGray);
  doc.setFont('helvetica', 'bold');
  doc.text(`$${invoice.subtotal.toFixed(2)}`, totalsBoxX + totalsBoxWidth - 5, y + 2, { align: 'right' });
  
  y += 8;
  // Tax
  doc.setTextColor(...colors.secondary);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tax (${typeof invoice.taxRate === 'number' ? invoice.taxRate : 0}%):`, totalsBoxX + 5, y + 2);
  doc.setTextColor(...colors.darkGray);
  doc.setFont('helvetica', 'bold');
  doc.text(`$${invoice.taxAmount.toFixed(2)}`, totalsBoxX + totalsBoxWidth - 5, y + 2, { align: 'right' });
  
  // Total section with gradient-like effect
  y += 10;
  doc.setFillColor(...colors.primary); // Blue background for total
  doc.roundedRect(totalsBoxX, y - 2, totalsBoxWidth, 12, 3, 3, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255); // White text
  doc.setFont('helvetica', 'bold');
  doc.text('Total:', totalsBoxX + 5, y + 5);
  doc.setFontSize(14);
  doc.text(`$${invoice.total.toFixed(2)}`, totalsBoxX + totalsBoxWidth - 5, y + 5, { align: 'right' });
  
  // FOOTER SECTION
  y = pageHeight - 25;
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(0, y - 5, pageWidth, 20, 'F');
  
  doc.setFontSize(9);
  doc.setTextColor(...colors.secondary);
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for your business! This invoice was generated using Invoice Generator.', pageWidth / 2, y + 3, { align: 'center' });
  
  // Add subtle border around the entire document
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(1);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  // Save the PDF
  doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
}
