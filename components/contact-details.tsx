import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInvoice } from "@/hooks/invoice";
import { Users, User, Mail, Building2 } from "lucide-react";

export const ContactDetails = () => {
  const { invoice, updateInvoice } = useInvoice();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="border-b border-slate-100/50">
        <CardTitle className="flex items-center gap-3 text-slate-800">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg text-white">
            <Users className="size-5" />
          </div>
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* From Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building2 className="size-4 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800">From (Your Details)</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="from-name" className="flex items-center gap-2 text-slate-700 font-medium">
                <User className="size-4 text-slate-500" />
                Name / Company
              </Label>
              <Input
                id="from-name"
                placeholder="Your name or company"
                value={invoice.fromName}
                onChange={(e) => updateInvoice({ fromName: e.target.value })}
                className="bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-email" className="flex items-center gap-2 text-slate-700 font-medium">
                <Mail className="size-4 text-slate-500" />
                Email Address
              </Label>
              <Input
                id="from-email"
                placeholder="your@company.com"
                type="email"
                value={invoice.fromEmail}
                onChange={(e) => updateInvoice({ fromEmail: e.target.value })}
                className="bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>
          </div>
        </div>
        
        {/* To Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Users className="size-4 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-slate-800">To (Client Details)</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="to-name" className="flex items-center gap-2 text-slate-700 font-medium">
                <User className="size-4 text-slate-500" />
                Name / Company
              </Label>
              <Input
                id="to-name"
                placeholder="Client name or company"
                value={invoice.toName}
                onChange={(e) => updateInvoice({ toName: e.target.value })}
                className="bg-white/70 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-email" className="flex items-center gap-2 text-slate-700 font-medium">
                <Mail className="size-4 text-slate-500" />
                Email Address
              </Label>
              <Input
                id="to-email"
                placeholder="client@company.com"
                type="email"
                value={invoice.toEmail}
                onChange={(e) => updateInvoice({ toEmail: e.target.value })}
                className="bg-white/70 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
