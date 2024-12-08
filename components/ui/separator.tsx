"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & { thickness?: string; color?: string }
>(
  (
    { 
      className, 
      orientation = "horizontal", 
      decorative = true, 
      thickness = "1px", 
      color = "gray", 
      ...props 
    },
    ref
  ) => {
    const dynamicStyles = {
      height: orientation === "horizontal" ? thickness : undefined,
      width: orientation === "vertical" ? thickness : undefined,
      backgroundColor: color,
    };

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        style={dynamicStyles}
        className={cn(
          "shrink-0",
          className
        )}
        {...props}
      />
    )
  }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
