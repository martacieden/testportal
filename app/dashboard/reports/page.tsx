"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Download, FileText } from "lucide-react"
import { useState } from "react"

export default function ReportsPage() {
  const [tab, setTab] = useState("reports")

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Tabs and Actions Toolbar */}
        <Tabs value={tab} onValueChange={setTab} className="w-auto">
          <div className="flex flex-row items-center gap-3 mb-2">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button
              className="flex items-center gap-2"
              style={{ backgroundColor: "#1E9ADF", color: "#fff" }}
            >
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
          <TabsContent value="overview">
            <Card className="mt-8">
              <CardContent className="flex flex-col items-center justify-center py-24">
                <FileText className="h-16 w-16 text-gray-300 mb-6" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Overview</h2>
                <p className="text-gray-500 text-center max-w-md">
                  Overview content coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="progress">
            <Card className="mt-8">
              <CardContent className="flex flex-col items-center justify-center py-24">
                <FileText className="h-16 w-16 text-gray-300 mb-6" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Progress Tracking</h2>
                <p className="text-gray-500 text-center max-w-md">
                  Progress tracking tools coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card className="mt-8">
              <CardContent className="flex flex-col items-center justify-center py-24">
                <FileText className="h-16 w-16 text-gray-300 mb-6" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Reporting & Documentation</h2>
                <p className="text-gray-500 text-center max-w-md">
                  Client progress reports and fee justification tools coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
} 