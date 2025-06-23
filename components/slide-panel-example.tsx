"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { SlidePanel } from "./slide-panel"

export function SlidePanelExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>
        Open Slide Panel
      </Button>
      
      <SlidePanel
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        {/* Your content goes here */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Slide Panel Content</h2>
          <p className="text-gray-600">
            This is just the basic slide panel interaction. 
            You can put any content you want inside.
          </p>
        </div>
      </SlidePanel>
    </div>
  )
} 