import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInvoice } from "@/hooks/invoice";
import { FileText, Calendar } from "lucide-react";

export const BasicDetails = () => {
  const { invoice, updateInvoice } = useInvoice();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="border-b border-slate-100/50">
        <CardTitle className="flex items-center gap-3 text-slate-800">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white">
            <FileText className="size-5" />
          </div>
          Invoice Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="invoice-number" className="flex items-center gap-2 text-slate-700 font-medium">
            <FileText className="size-4 text-slate-500" />
            Invoice Number
          </Label>
          <Input
            id="invoice-number"
            value={invoice.invoiceNumber}
            onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
            className="bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            placeholder="INV-2024-001"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoice-date" className="flex items-center gap-2 text-slate-700 font-medium">
            <Calendar className="size-4 text-slate-500" />
            Invoice Date
          </Label>
          <Input
            id="invoice-date"
            type="date"
            value={invoice.date}
            onChange={(e) => updateInvoice({ date: e.target.value })}
            className="bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>
      </CardContent>
    </Card>
  );
};
