import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { InvoiceItem } from "./invoice-item";
import { useInvoice } from "@/hooks/invoice";

export const ItemsList = () => {
  const {
    invoice: { items },
    addItem,
  } = useInvoice();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Invoice Items</CardTitle>
        <Button size={"sm"} onClick={addItem}>
          <Plus className="size-4" />
          <span>Add Item</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <InvoiceItem
            key={item.id || index}
            item={item}
            index={index}
            canRemove={items.length > 1}
          />
        ))}
      </CardContent>
    </Card>
  );
};
