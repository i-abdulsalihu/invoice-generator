import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInvoice } from "@/hooks/invoice";

export const BasicDetails = () => {
  const { invoice, updateInvoice } = useInvoice();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="invoice-number">Invoice Number</Label>
          <Input
            id="invoice-number"
            value={invoice.invoiceNumber}
            onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="invoice-date">Date</Label>
          <Input
            id="invoice-date"
            type="date"
            value={invoice.date}
            onChange={(e) => updateInvoice({ date: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
};
