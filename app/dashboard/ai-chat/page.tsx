"use client"
import DashboardLayout from "@/components/dashboard-layout"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, Mic, Send } from "lucide-react"

const recents = [
  "Portfolio rebalancing strategy",
  "ESG investment criteria setup",
  "Update tax optimization strategy",
  "Next-gen wealth transfer plan",
  "Private equity deal analysis",
  "Family governance structure",
  "Update investment policy statement",
  "Philanthropic foundation setup"
]
const yesterday = [
  "Retirement account distribution",
  "Fixed income allocation"
]
const previous7 = [
  "College savings plan",
  "Real estate investment trust",
  "Insurance coverage review"
]

export default function AIChatPage() {
  const [input, setInput] = useState("")
  // TODO: додати стан для історії чату

  return (
    <DashboardLayout>
      <div className="bg-muted min-h-screen py-8">
        <div className="flex max-w-6xl mx-auto rounded-xl border bg-white shadow-sm p-8 min-h-[70vh]">
          {/* Left: Chat list */}
          <div className="w-72 pr-8 border-r hidden md:block">
            <Button className="w-full mb-4" variant="outline">+ New chat</Button>
            <div className="mb-6">
              <div className="text-xs text-muted-foreground mb-2">Recents</div>
              <ul className="space-y-1">
                {recents.map((item, i) => (
                  <li key={i} className="truncate text-sm text-gray-800 cursor-pointer hover:bg-muted rounded px-2 py-1">{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <div className="text-xs text-muted-foreground mb-2">Yesterday</div>
              <ul className="space-y-1">
                {yesterday.map((item, i) => (
                  <li key={i} className="truncate text-sm text-gray-800 cursor-pointer hover:bg-muted rounded px-2 py-1">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2">Previous 7 days</div>
              <ul className="space-y-1">
                {previous7.map((item, i) => (
                  <li key={i} className="truncate text-sm text-gray-800 cursor-pointer hover:bg-muted rounded px-2 py-1">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Center: Welcome + input */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center w-full max-w-xl mt-12">
              <div className="mb-6">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-blue-100 p-4 mb-4">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#2563eb" fillOpacity="0.2"/><path d="M20 10L28 20H12L20 10Z" fill="#2563eb"/></svg>
                  </div>
                  <h1 className="text-2xl font-bold mb-2">How can I help you, John?</h1>
                </div>
              </div>
              <div className="w-full">
                <div className="rounded-xl border flex items-center px-4 py-3 bg-white shadow-sm">
                  <Input
                    className="border-0 focus:ring-0 focus-visible:ring-0 flex-1 text-base"
                    placeholder="Ask AI anything..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  />
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Mic className="w-5 h-5" />
                  </Button>
                  <Button size="icon" className="ml-2 bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 