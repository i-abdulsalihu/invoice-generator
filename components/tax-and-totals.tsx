import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useInvoice } from "@/hooks/invoice";
import { Calculator, Percent, DollarSign, Receipt } from "lucide-react";

export const TaxAndTotals = () => {
  const { invoice, updateInvoice } = useInvoice();

  const handleTaxRateChange = (value: string) => {
    // Allow empty string temporarily
    if (value === "") {
      updateInvoice({ taxRate: "" });
    } else {
      const numValue = Number.parseInt(value);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
        updateInvoice({ taxRate: numValue });
      }
    }
  };

  const handleTaxRateBlur = () => {
    // if empty on blur, set to 0
    if (invoice.taxRate === "" || isNaN(Number(invoice.taxRate))) {
      updateInvoice({ taxRate: 0 });
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="border-b border-slate-100/50">
        <CardTitle className="flex items-center gap-3 text-slate-800">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg text-white">
            <Calculator className="size-5" />
          </div>
          Tax & Totals
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tax Rate Input */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="taxRate" className="flex items-center gap-2 text-slate-700 font-medium">
              <Percent className="size-4 text-slate-500" />
              Tax Rate (%)
            </Label>
            <Input
              id="taxRate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={invoice.taxRate}
              onChange={(e) => handleTaxRateChange(e.target.value)}
              onBlur={handleTaxRateBlur}
              className="bg-white/70 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
              placeholder="10"
            />
          </div>
        </div>
        
        {/* Totals Summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Receipt className="size-4 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800">Invoice Summary</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 px-3 bg-slate-50/50 rounded-lg">
              <span className="flex items-center gap-2 text-slate-600">
                <DollarSign className="size-4" />
                Subtotal:
              </span>
              <span className="font-medium text-slate-800">${invoice.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 px-3 bg-slate-50/50 rounded-lg">
              <span className="flex items-center gap-2 text-slate-600">
                <Percent className="size-4" />
                Tax ({typeof invoice.taxRate === "number" ? invoice.taxRate : 0}%):
              </span>
              <span className="font-medium text-slate-800">${invoice.taxAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-4 px-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl">
              <span className="flex items-center gap-2 font-bold text-lg text-slate-800">
                <Receipt className="size-5" />
                Total:
              </span>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                ${invoice.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
