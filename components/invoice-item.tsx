import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2, FileText, Hash, DollarSign } from "lucide-react";
import type { InvoiceItem as InvoiceItemType } from "@/types/invoice";
import { useInvoice } from "@/hooks/invoice";

interface InvoiceItemProps {
  item: InvoiceItemType;
  index: number;
  canRemove: boolean;
}

export const InvoiceItem: React.FC<InvoiceItemProps> = ({
  item,
  index,
  canRemove,
}) => {
  const { removeItem, updateItem } = useInvoice();

  const handleQuantityChange = (value: string) => {
    // Allow empty string temporarily, but convert the number for calculations
    if (value === "") {
      updateItem(index, "quantity", "");
    } else {
      const numValue = Number.parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        updateItem(index, "quantity", numValue);
      }
    }
  };

  const handleQuantityBlur = () => {
    // if empty on blur, set to 1
    if (item.quantity === "" || item.quantity === 0) {
      updateItem(index, "quantity", 1);
    }
  };

  const handleRateChange = (value: string) => {
    // Allow empty string temporarily, but convert the number for calculations
    if (value === "") {
      updateItem(index, "rate", "");
    } else {
      const numValue = Number.parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        updateItem(index, "rate", numValue);
      }
    }
  };

  const handleRateBlur = () => {
    // if empty on blur, set to 0
    if (item.rate === "") {
      updateItem(index, "rate", 0);
    }
  };

  return (
    <div className="bg-gradient-to-r from-white/90 to-slate-50/90 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Description - Full width on mobile, 5 cols on large screens */}
        <div className="lg:col-span-5 space-y-2">
          <Label htmlFor={`item-description-${index}`} className="flex items-center gap-2 text-slate-700 font-medium">
            <FileText className="size-4 text-slate-500" />
            Description
          </Label>
          <Input
            id={`item-description-${index}`}
            placeholder="e.g., Web development services"
            value={item.description}
            onChange={(e) => updateItem(index, "description", e.target.value)}
            className="bg-white/70 border-slate-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-200"
          />
        </div>
        
        {/* Quantity and Rate - Side by side on mobile */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`item-quantity-${index}`} className="flex items-center gap-2 text-slate-700 font-medium">
              <Hash className="size-4 text-slate-500" />
              Qty
            </Label>
            <Input
              id={`item-quantity-${index}`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              onBlur={handleQuantityBlur}
              className="bg-white/70 border-slate-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`item-rate-${index}`} className="flex items-center gap-2 text-slate-700 font-medium">
              <DollarSign className="size-4 text-slate-500" />
              Rate
            </Label>
            <Input
              id={`item-rate-${index}`}
              type="number"
              min="0"
              step="0.01"
              value={item.rate}
              onChange={(e) => handleRateChange(e.target.value)}
              onBlur={handleRateBlur}
              className="bg-white/70 border-slate-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-200"
            />
          </div>
        </div>
        
        {/* Amount and Delete - Side by side on mobile */}
        <div className="flex items-end gap-4 lg:col-span-3">
          <div className="flex-1 space-y-2">
            <Label className="flex items-center gap-2 text-slate-700 font-medium">
              <DollarSign className="size-4 text-slate-500" />
              Total
            </Label>
            <div className="h-11 px-3 py-2 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg flex items-center font-semibold text-slate-800">
              ${typeof item.amount === "number" ? item.amount.toFixed(2) : "0.00"}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => removeItem(index)}
            disabled={!canRemove}
            className={`shrink-0 transition-all duration-200 ${
              canRemove 
                ? "hover:bg-red-50 hover:border-red-200 hover:text-red-600 group-hover:opacity-100" 
                : "opacity-50"
            }`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
