"use client"

import React from "react"
import {
  Sheet,
  SheetPortal,
  SheetOverlay,
  sheetVariants,
  SheetPrimitive,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface SlidePanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  side?: "left" | "right" | "top" | "bottom"
  width?: string
  className?: string
}

export function SlidePanel({
  open,
  onOpenChange,
  children,
  side = "right",
  width = "w-full sm:w-[600px]",
  className = "",
}: SlidePanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetPortal>
        <SheetOverlay className="!bg-transparent" />
        <SheetPrimitive.Content
          className={cn(
            sheetVariants({ side }),
            width,
            "p-0 overflow-hidden shadow-none",
            className
          )}
        >
          {children}
        </SheetPrimitive.Content>
      </SheetPortal>
    </Sheet>
  )
} 