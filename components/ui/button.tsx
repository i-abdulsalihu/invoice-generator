import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg hover:shadow-xl hover:from-slate-700 hover:to-slate-600 transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40 transform hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm hover:bg-white hover:shadow-md hover:border-slate-300 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transform hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 shadow-sm hover:shadow-md hover:from-slate-200 hover:to-slate-300 transform hover:-translate-y-0.5 active:translate-y-0",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-accent/50 rounded-lg transition-all duration-200",
        link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700 transition-colors duration-200",
      },
      size: {
        default: "h-11 px-6 py-2 has-[>svg]:px-5",
        sm: "h-10 rounded-lg gap-2.5 px-4 has-[>svg]:px-3.5 text-sm",
        lg: "h-14 rounded-lg px-8 has-[>svg]:px-6 text-base font-semibold",
        icon: "size-11 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
