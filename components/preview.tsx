// "use client";

import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useInvoice } from "@/hooks/invoice";
import { formatDate, generatePDF } from "@/lib/utils";

interface InvoicePreviewProps {
  onBack: () => void;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({ onBack }) => {
  const { invoice } = useInvoice();
  // const [pdfURL, setPdfURL] = React.useState<string | null>(null);

  const handleDownloadPDF = () => {
    // const url = generatePDF(invoice);
    // setPdfURL(url);
    generatePDF(invoice);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Invoice Preview</h1>

          <div className="space-x-2">
            <Button variant={"outline"} onClick={onBack}>
              Back to Edit
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="size-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* {pdfURL && (
          <div className="mt-4 border rounded-lg overflow-hidden">
            <iframe src={pdfURL} width="100%" height="600px" />
          </div>
        )} */}

        <Card>
          <CardContent className="p-8">
            {/* INVOICE HEADER */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">INVOICE</h2>
                <p className="text-gray-600">{invoice.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Date: {formatDate(invoice.date)}
                </p>
              </div>
            </div>

            {/* FROM/TO */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-2">From:</h3>
                <p className="font-medium">{invoice.fromName}</p>
                <p className="text-gray-600">{invoice.fromEmail}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">To:</h3>
                <p className="font-medium">{invoice.toName}</p>
                <p className="text-gray-600">{invoice.toEmail}</p>
              </div>
            </div>

            {/* ITEMS TABLE */}
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-4">Description</th>
                  <th className="text-center py-4">Qty</th>
                  <th className="text-right py-4">Rate</th>
                  <th className="text-right py-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4">{item.description}</td>
                    <td className="py-4 text-center">{item.quantity}</td>
                    <td className="py-4 text-right">
                      $
                      {typeof item.rate === "number"
                        ? item.rate.toFixed(2)
                        : "0.00"}
                    </td>
                    <td className="py-4 text-right">
                      $
                      {typeof item.amount === "number"
                        ? item.amount.toFixed(2)
                        : "0.00"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* TOTALS */}
            <div className="flex justify-end">
              <div className="w-96 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Tax (
                    {typeof invoice.taxRate === "number" ? invoice.taxRate : 0}
                    %):
                  </span>
                  <span>${invoice.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
