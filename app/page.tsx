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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Invoice Generator</h1>
            <p className="text-gray-600">Create professional invoice quickly</p>
          </div>

          <Button onClick={() => setShowPreview(true)}>
            <Eye className="size-4" />
            <span>Preview</span>
          </Button>
        </div>

        <InvoiceForm />
      </div>
    </div>
  );
}
