import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, ShoppingCart } from "lucide-react";
import { InvoiceItem } from "./invoice-item";
import { useInvoice } from "@/hooks/invoice";

export const ItemsList = () => {
  const {
    invoice: { items },
    addItem,
  } = useInvoice();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100/50">
        <CardTitle className="flex items-center gap-3 text-slate-800">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg text-white">
            <ShoppingCart className="size-5" />
          </div>
          Invoice Items
        </CardTitle>
        <Button 
          size="sm" 
          onClick={addItem}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          <span>Add Item</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <ShoppingCart className="size-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm">No items added yet</p>
          </div>
        ) : (
          items.map((item, index) => (
            <InvoiceItem
              key={item.id || index}
              item={item}
              index={index}
              canRemove={items.length > 1}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};
