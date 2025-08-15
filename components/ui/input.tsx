import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-11 w-full min-w-0 rounded-lg border bg-white/50 backdrop-blur-sm px-4 py-1 text-base shadow-sm transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:bg-white/70 hover:shadow-md hover:border-slate-300",
        "focus-visible:border-blue-500 focus-visible:ring-blue-500/20 focus-visible:ring-4 focus-visible:bg-white focus-visible:shadow-lg",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "placeholder:text-slate-400",
        className
      )}
      {...props}
    />
  );
}

export { Input };
