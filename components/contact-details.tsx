import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInvoice } from "@/hooks/invoice";

export const ContactDetails = () => {
  const { invoice, updateInvoice } = useInvoice();

  return (
    <Card>
      <CardHeader>
        <CardTitle>From & To</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="font-medium">From (Your Details)</h3>
          <div>
            <Label htmlFor="from-name">Name</Label>
            <Input
              id="from-name"
              placeholder="Your name or company"
              value={invoice.fromName}
              onChange={(e) => updateInvoice({ fromName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="from-email">Email</Label>
            <Input
              id="from-email"
              placeholder="your@company.com"
              type="email"
              value={invoice.fromEmail}
              onChange={(e) => updateInvoice({ fromEmail: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-medium">To (Client Details)</h3>
          <div>
            <Label htmlFor="to-name">Name</Label>
            <Input
              id="to-name"
              placeholder="Client name or company"
              value={invoice.toName}
              onChange={(e) => updateInvoice({ toName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="to-email">Email</Label>
            <Input
              id="to-email"
              placeholder="client@company.com"
              type="email"
              value={invoice.toEmail}
              onChange={(e) => updateInvoice({ toEmail: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
