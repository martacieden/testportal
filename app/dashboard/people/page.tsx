'use client'
import DashboardLayout from "@/components/dashboard-layout"
import PeopleList from "@/components/people-list"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function PeoplePage() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    category: 'internal',
    avatar: ''
  })
  const [refresh, setRefresh] = useState(false)

  // Handler to add a new person (will be passed to PeopleList)
  const handleAddPerson = (person: any) => {
    // This will be implemented in PeopleList
    setRefresh(r => !r) // force refresh
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Pass the new person to PeopleList via handler (could be improved with context or lifting state)
    window.dispatchEvent(new CustomEvent('add-person', { detail: { ...form } }))
    setForm({ name: '', role: '', email: '', phone: '', category: 'internal', avatar: '' })
    setOpen(false)
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm(f => ({ ...f, avatar: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">People</h1>
            <p className="text-text-secondary">Connect with your financial team and key stakeholders.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="brand" onClick={() => setOpen(true)}>
                <Users className="h-4 w-4 mr-2" />
                Add People
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Person</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <Input name="name" placeholder="Name" value={form.name} onChange={handleFormChange} required />
                <Input name="role" placeholder="Role/Relationship" value={form.role} onChange={handleFormChange} required />
                <Input name="email" placeholder="Email" value={form.email} onChange={handleFormChange} required />
                <Input name="phone" placeholder="Phone" value={form.phone} onChange={handleFormChange} required />
                <select name="category" value={form.category} onChange={handleFormChange} className="w-full border rounded-md p-2">
                  <option value="internal">Internal</option>
                  <option value="family">Family</option>
                  <option value="external">External</option>
                </select>
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="w-full border rounded-md p-2" />
                <DialogFooter>
                  <Button type="submit" variant="brand">Add</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <PeopleList />
      </div>
    </DashboardLayout>
  )
}
