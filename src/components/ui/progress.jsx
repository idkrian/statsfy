import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "/src/lib/utils.js";

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 m-5 w-64 overflow-hidden rounded-full bg-green-500 dark:bg-slate-800",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-slate-900 transition-all dark:bg-slate-50"
      style={{ transform: `translateX(${100 * (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
