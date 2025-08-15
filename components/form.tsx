import React from "react";
import { BasicDetails } from "./basic-details";
import { ContactDetails } from "./contact-details";
import { ItemsList } from "./items-list";
import { TaxAndTotals } from "./tax-and-totals";

export const InvoiceForm = () => {
  return (
    <div className="space-y-8">
      <div className="animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        <BasicDetails />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        <ContactDetails />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
        <ItemsList />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
        <TaxAndTotals />
      </div>
    </div>
  );
};
