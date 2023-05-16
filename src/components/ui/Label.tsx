"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      size: {
        default: "text-base sm:text-md",
        sm: "text-base sm:text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    {...props}
    className={cn(labelVariants({ size, className }))}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
