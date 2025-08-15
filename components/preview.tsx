// "use client";

import React from "react";
import { Button } from "./ui/button";
import { Download, ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[100px]" />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Invoice Preview
              </h1>
              <p className="text-slate-600 mt-1">Review your invoice before downloading</p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={onBack}
                className="bg-white/70 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-200"
              >
                <ArrowLeft className="size-4" />
                Back to Edit
              </Button>
              <Button 
                onClick={handleDownloadPDF}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Download className="size-4" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Invoice Card */}
          <Card className="bg-white shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-0">
              {/* Invoice Content */}
              <div className="p-8 lg:p-12">
                {/* INVOICE HEADER */}
                <div className="flex items-start justify-between mb-10">
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-3">
                      INVOICE
                    </h2>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <p className="text-blue-700 font-medium text-sm">{invoice.invoiceNumber}</p>
                    </div>
                  </div>
                  <div className="text-right bg-slate-50 px-4 py-3 rounded-lg">
                    <p className="text-sm text-slate-600 font-medium">
                      Invoice Date
                    </p>
                    <p className="text-lg font-semibold text-slate-800">
                      {formatDate(invoice.date)}
                    </p>
                  </div>
                </div>

                {/* FROM/TO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full mb-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <h3 className="font-semibold text-emerald-700 text-sm">FROM</h3>
                    </div>
                    <p className="font-bold text-lg text-slate-800">{invoice.fromName || "[Your Name/Company]"}</p>
                    <p className="text-slate-600">{invoice.fromEmail || "[Your Email]"}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full mb-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <h3 className="font-semibold text-purple-700 text-sm">TO</h3>
                    </div>
                    <p className="font-bold text-lg text-slate-800">{invoice.toName || "[Client Name/Company]"}</p>
                    <p className="text-slate-600">{invoice.toEmail || "[Client Email]"}</p>
                  </div>
                </div>

                {/* ITEMS TABLE */}
                <div className="mb-10">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-slate-200">
                          <th className="text-left py-4 px-4 font-semibold text-slate-700">Description</th>
                          <th className="text-center py-4 px-4 font-semibold text-slate-700">Qty</th>
                          <th className="text-right py-4 px-4 font-semibold text-slate-700">Rate</th>
                          <th className="text-right py-4 px-4 font-semibold text-slate-700">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.items.map((item, index) => (
                          <tr key={item.id} className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${
                            index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                          }`}>
                            <td className="py-4 px-4 text-slate-800">{item.description || "[Item Description]"}</td>
                            <td className="py-4 px-4 text-center font-medium text-slate-700">{item.quantity}</td>
                            <td className="py-4 px-4 text-right font-medium text-slate-700">
                              ${typeof item.rate === "number" ? item.rate.toFixed(2) : "0.00"}
                            </td>
                            <td className="py-4 px-4 text-right font-bold text-slate-800">
                              ${typeof item.amount === "number" ? item.amount.toFixed(2) : "0.00"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* TOTALS */}
                <div className="flex justify-end">
                  <div className="w-full max-w-sm">
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Subtotal:</span>
                        <span className="font-semibold text-slate-800">${invoice.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">
                          Tax ({typeof invoice.taxRate === "number" ? invoice.taxRate : 0}%):
                        </span>
                        <span className="font-semibold text-slate-800">${invoice.taxAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg px-4 text-white">
                        <span className="font-bold text-lg">Total:</span>
                        <span className="font-bold text-2xl">${invoice.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="bg-gradient-to-r from-slate-100 to-blue-100 px-8 lg:px-12 py-6 border-t border-slate-200">
                <p className="text-center text-slate-600 text-sm">
                  Thank you for your business! This invoice was generated using Invoice Generator.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
