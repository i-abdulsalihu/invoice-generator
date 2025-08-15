"use client";

import { InvoiceForm } from "@/components/form";
import { InvoicePreview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import React from "react";

export default function Home() {
  const [showPreview, setShowPreview] = React.useState<boolean>(false);

  if (showPreview) {
    return <InvoicePreview onBack={() => setShowPreview(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[100px]" />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header with enhanced styling */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-slate-600 mb-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Professional Invoice Generator
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Create Beautiful Invoices
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Generate professional invoices with our modern, easy-to-use interface. 
              Add items, calculate taxes, and export to PDF instantly.
            </p>
            
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => setShowPreview(true)}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Eye className="size-5" />
                <span>Preview Invoice</span>
              </Button>
            </div>
          </div>

          <InvoiceForm />
        </div>
      </div>
    </div>
  );
}
