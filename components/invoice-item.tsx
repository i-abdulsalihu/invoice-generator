import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
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
    <div className="grid grid-cols-12 gap-4 p-4 border rounded-lg">
      <div className="col-span-5">
        <Label htmlFor="item-description">Description</Label>
        <Input
          id="item-description"
          placeholder="Item Description"
          value={item.description}
          onChange={(e) => updateItem(index, "description", e.target.value)}
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="item-quantity">Quantity</Label>
        <Input
          id="item-quantity"
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          onBlur={handleQuantityBlur}
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="item-rate">Rate ($)</Label>
        <Input
          id="item-rate"
          type="number"
          min="0"
          step="0.01"
          value={item.rate}
          onChange={(e) => handleRateChange(e.target.value)}
          onBlur={handleRateBlur}
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="item-amount">Amount</Label>
        <div className="h-9 px-3 py-1.5 text-sm  bg-gray-50 border rounded-md flex items-center">
          ${typeof item.amount === "number" ? item.amount.toFixed(2) : "0.00"}
        </div>
      </div>
      <div className="col-span-1 flex items-end">
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => removeItem(index)}
          disabled={!canRemove}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
};
