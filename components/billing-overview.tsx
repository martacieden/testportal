"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, CheckCircle, Clock, CreditCard, Download, DollarSign, Table as TableIcon, LayoutGrid } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react"

const invoices = [
  {
    id: "INV-001",
    project: "Website Redesign",
    amount: "$3,750",
    status: "Paid",
    dueDate: "2024-01-15",
    paidDate: "2024-01-10",
  },
  {
    id: "INV-002",
    project: "Brand Identity",
    amount: "$2,000",
    status: "Paid",
    dueDate: "2024-01-20",
    paidDate: "2024-01-18",
  },
  {
    id: "INV-003",
    project: "Website Redesign",
    amount: "$2,450",
    status: "Pending",
    dueDate: "2024-02-15",
    paidDate: null,
  },
  {
    id: "INV-004",
    project: "Mobile App Development",
    amount: "$5,000",
    status: "Draft",
    dueDate: "2024-03-01",
    paidDate: null,
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Paid":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "Pending":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "Overdue":
      return <AlertCircle className="h-4 w-4 text-red-600" />
    default:
      return <Clock className="h-4 w-4 text-gray-600" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "default"
    case "Pending":
      return "secondary"
    case "Overdue":
      return "destructive"
    default:
      return "outline"
  }
}

export default function BillingOverview() {
  const [view, setView] = useState<'table' | 'card'>('table')
  const totalPaid = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + Number.parseFloat(inv.amount.replace("$", "").replace(",", "")), 0)

  const totalPending = invoices
    .filter((inv) => inv.status === "Pending")
    .reduce((sum, inv) => sum + Number.parseFloat(inv.amount.replace("$", "").replace(",", "")), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Billing</h2>
          <p className="text-muted-foreground">Manage your invoices and payments</p>
        </div>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Payment Methods
        </Button>
      </div>

      {/* Billing Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Due in 15 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,450</div>
            <p className="text-xs text-muted-foreground">Due Feb 15, 2024</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Invoices */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Your billing history and payment status</CardDescription>
          </div>
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(val) => val && setView(val as 'table' | 'card')}
            className="bg-muted rounded-md p-1"
            size="sm"
            variant="outline"
            aria-label="Switch invoice view"
          >
            <ToggleGroupItem value="table" aria-label="Table view">
              <TableIcon className="h-4 w-4" />
              <span className="sr-only">Table</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="card" aria-label="Card view">
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Card</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </CardHeader>
        <CardContent>
          {view === 'table' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.project}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(invoice.status)}
                        <Badge variant={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                      {invoice.paidDate && (
                        <div className="text-xs text-muted-foreground">
                          Paid: {new Date(invoice.paidDate).toLocaleDateString()}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        {invoice.status === "Pending" && <Button size="sm">Pay Now</Button>}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {invoices.map((invoice) => (
                <Card key={invoice.id} className="bg-background border-gray-100">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">{invoice.project}</CardTitle>
                    {getStatusIcon(invoice.status)}
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold">{invoice.amount}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      <span className="text-xs text-muted-foreground">{new Date(invoice.dueDate).toLocaleDateString()}</span>
                    </div>
                    {invoice.paidDate && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Paid: {new Date(invoice.paidDate).toLocaleDateString()}
                      </div>
                    )}
                    <div className="flex space-x-2 mt-4">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      {invoice.status === "Pending" && <Button size="sm">Pay Now</Button>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <Badge variant="secondary">Default</Badge>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Add Payment Method
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
