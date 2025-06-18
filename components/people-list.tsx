"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserCheck, Calendar, Phone, Mail, Building, Plus, Search, Heart, Table as TableIcon, LayoutGrid } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

export default function PeopleList() {
  const [activeTab, setActiveTab] = useState("family")
  const [searchTerm, setSearchTerm] = useState("")
  const [view, setView] = useState<'card' | 'table'>('card')

  // Family members
  const familyMembers = [
    {
      id: "1",
      name: "Jane Doe",
      role: "Spouse",
      relationship: "Spouse",
      email: "jane.doe@example.com",
      phone: "(555) 123-4567",
      birthday: "March 15",
      interests: ["Travel", "Photography"],
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "2",
      name: "Alex Doe",
      role: "Child",
      relationship: "Son",
      email: "alex.doe@example.com",
      phone: "(555) 234-5678",
      birthday: "July 22",
      interests: ["Sports", "Gaming"],
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "3",
      name: "Emma Doe",
      role: "Child",
      relationship: "Daughter",
      email: "emma.doe@example.com",
      phone: "(555) 345-6789",
      birthday: "December 8",
      interests: ["Art", "Music"],
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  // Internal team members
  const internalTeam = [
    {
      id: "1",
      name: "Michael Chen",
      role: "Senior Advisor",
      department: "Advisory",
      email: "michael.chen@cresset.com",
      phone: "(555) 123-4567",
      specialties: ["Financial Planning", "Estate Planning"],
      currentClients: 12,
      availability: "available",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "2",
      name: "Jennifer Liu",
      role: "Portfolio Manager",
      department: "Investment Team",
      email: "jennifer.liu@cresset.com",
      phone: "(555) 234-5678",
      specialties: ["Investment Management", "Risk Assessment"],
      currentClients: 8,
      availability: "busy",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "3",
      name: "David Rodriguez",
      role: "Tax Specialist",
      department: "Tax & Estate Planning",
      email: "david.rodriguez@cresset.com",
      phone: "(555) 345-6789",
      specialties: ["Tax Planning", "Estate Planning"],
      currentClients: 15,
      availability: "available",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "4",
      name: "Sarah Kim",
      role: "Risk Manager",
      department: "Risk Management",
      email: "sarah.kim@cresset.com",
      phone: "(555) 456-7890",
      specialties: ["Insurance", "Asset Protection"],
      currentClients: 10,
      availability: "away",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  // External partners
  const externalPartners = [
    {
      id: "1",
      name: "Robert Smith",
      role: "CPA",
      company: "Smith Accounting Group",
      email: "robert@smithaccounting.com",
      phone: "(555) 567-8901",
      specialties: ["Tax Preparation", "Business Accounting"],
      relationship: "Preferred Partner",
      lastContact: "2 days ago",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "2",
      name: "Maria Garcia",
      role: "Estate Attorney",
      company: "Garcia Legal Services",
      email: "maria@garcialegal.com",
      phone: "(555) 678-9012",
      specialties: ["Estate Planning", "Trust Administration"],
      relationship: "Trusted Partner",
      lastContact: "1 week ago",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "3",
      name: "James Wilson",
      role: "Investment Banker",
      company: "Wilson Capital Partners",
      email: "james@wilsoncapital.com",
      phone: "(555) 789-0123",
      specialties: ["M&A", "Business Valuation"],
      relationship: "Strategic Partner",
      lastContact: "3 days ago",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "4",
      name: "Emily Thompson",
      role: "Insurance Specialist",
      company: "Thompson Insurance Solutions",
      email: "emily@thompsoninsurance.com",
      phone: "(555) 890-1234",
      specialties: ["Life Insurance", "Disability Insurance"],
      relationship: "Preferred Partner",
      lastContact: "5 days ago",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>
      case "busy":
        return <Badge className="bg-red-100 text-red-800">Busy</Badge>
      case "away":
        return <Badge className="bg-amber-100 text-amber-800">Away</Badge>
      default:
        return <Badge variant="outline">{availability}</Badge>
    }
  }

  const getRelationshipBadge = (relationship: string) => {
    switch (relationship) {
      case "Preferred Partner":
        return <Badge style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}>Preferred Partner</Badge>
      case "Trusted Partner":
        return <Badge className="bg-green-100 text-green-800">Trusted Partner</Badge>
      case "Strategic Partner":
        return <Badge className="bg-purple-100 text-purple-800">Strategic Partner</Badge>
      default:
        return <Badge variant="outline">{relationship}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* People Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          className="flex justify-between items-center w-full"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E6EBED" }}
        >
          <div className="flex">
            <TabsTrigger value="family" className="data-[state=active]:bg-blue-50" style={{ color: "#063852" }}>
              <Heart className="h-4 w-4 mr-2" />
              Family
            </TabsTrigger>
            <TabsTrigger value="internal" className="data-[state=active]:bg-blue-50" style={{ color: "#063852" }}>
              <UserCheck className="h-4 w-4 mr-2" />
              Internal Team
            </TabsTrigger>
            <TabsTrigger value="external" className="data-[state=active]:bg-blue-50" style={{ color: "#063852" }}>
              <Building className="h-4 w-4 mr-2" />
              External Partner
            </TabsTrigger>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" style={{ borderColor: "#1E9ADF", color: "#1E9ADF" }}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button size="sm" style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </TabsList>

        {/* Family Tab */}
        <TabsContent value="family" className="mt-6">
          <Card style={{ backgroundColor: "#FFFFFF", borderColor: "#E6EBED" }}>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>Family Members</CardTitle>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: "#636466" }} />
                  <Input
                    placeholder="Search family members..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ borderColor: "#E6EBED" }}
                  />
                </div>
                <ToggleGroup
                  type="single"
                  value={view}
                  onValueChange={(val) => val && setView(val as 'card' | 'table')}
                  className="bg-muted rounded-md p-1"
                  size="sm"
                  variant="outline"
                  aria-label="Switch people view"
                >
                  <ToggleGroupItem value="card" aria-label="Card view">
                    <LayoutGrid className="h-4 w-4" />
                    <span className="sr-only">Card</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="table" aria-label="Table view">
                    <TableIcon className="h-4 w-4" />
                    <span className="sr-only">Table</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardHeader>
            <CardContent>
              {view === 'card' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {familyMembers.map((member) => (
                    <Card
                      key={member.id}
                      className="shadow-sm border hover:shadow-md transition-all duration-200"
                      style={{ backgroundColor: "#FFFFFF", borderColor: "#F1F3F4" }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}>
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium" style={{ color: "#063852" }}>{member.name}</h3>
                              <Badge variant="outline" style={{ color: "#636466" }}>{member.relationship}</Badge>
                            </div>
                            <p className="text-sm mb-3" style={{ color: "#636466" }}>{member.role}</p>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3" style={{ color: "#636466" }} />
                                <a href={`mailto:${member.email}`} className="hover:underline" style={{ color: "#1E9ADF" }}>{member.email}</a>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3" style={{ color: "#636466" }} />
                                <a href={`tel:${member.phone}`} style={{ color: "#063852" }}>{member.phone}</a>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" style={{ color: "#636466" }} />
                                <span style={{ color: "#063852" }}>Birthday: {member.birthday}</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-xs mb-1" style={{ color: "#636466" }}>Interests:</p>
                              <div className="flex flex-wrap gap-1">
                                {member.interests.map((interest, i) => (
                                  <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "#E6F3FF", color: "#1E9ADF" }}>{interest}</span>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" variant="outline" className="flex-1" style={{ borderColor: "#1E9ADF", color: "#1E9ADF" }}>
                                <Calendar className="h-3 w-3 mr-1" />
                                Schedule
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Relationship</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Birthday</TableHead>
                      <TableHead>Interests</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {familyMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.relationship}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell><a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">{member.email}</a></TableCell>
                        <TableCell><a href={`tel:${member.phone}`} className="text-blue-600 hover:underline">{member.phone}</a></TableCell>
                        <TableCell>{member.birthday}</TableCell>
                        <TableCell>{member.interests.join(", ")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Internal Team Tab */}
        <TabsContent value="internal" className="mt-6">
          <Card style={{ backgroundColor: "#FFFFFF", borderColor: "#E6EBED" }}>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col gap-1">
                <CardTitle style={{ color: "#063852" }}>Internal Team</CardTitle>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: "#636466" }} />
                  <Input
                    placeholder="Search team members..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ borderColor: "#E6EBED" }}
                  />
                </div>
                <ToggleGroup
                  type="single"
                  value={view}
                  onValueChange={(val) => val && setView(val as 'card' | 'table')}
                  className="bg-muted rounded-md p-1"
                  size="sm"
                  variant="outline"
                  aria-label="Switch people view"
                >
                  <ToggleGroupItem value="card" aria-label="Card view">
                    <LayoutGrid className="h-4 w-4" />
                    <span className="sr-only">Card</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="table" aria-label="Table view">
                    <TableIcon className="h-4 w-4" />
                    <span className="sr-only">Table</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardHeader>
            <CardContent>
              {view === 'card' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {internalTeam.map((member) => (
                    <Card
                      key={member.id}
                      className="shadow-sm border hover:shadow-md transition-all duration-200"
                      style={{ backgroundColor: "#FFFFFF", borderColor: "#F1F3F4" }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}>
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium" style={{ color: "#063852" }}>{member.name}</h3>
                              {getAvailabilityBadge(member.availability)}
                            </div>
                            <p className="text-sm mb-1" style={{ color: "#636466" }}>{member.role}</p>
                            <p className="text-sm mb-3" style={{ color: "#636466" }}>{member.department}</p>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3" style={{ color: "#636466" }} />
                                <a href={`mailto:${member.email}`} className="hover:underline" style={{ color: "#1E9ADF" }}>{member.email}</a>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3" style={{ color: "#636466" }} />
                                <a href={`tel:${member.phone}`} style={{ color: "#063852" }}>{member.phone}</a>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-3 w-3" style={{ color: "#636466" }} />
                                <span style={{ color: "#063852" }}>{member.currentClients} active clients</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-xs mb-1" style={{ color: "#636466" }}>Specialties:</p>
                              <div className="flex flex-wrap gap-1">
                                {member.specialties.map((specialty, i) => (
                                  <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "#E6F3FF", color: "#1E9ADF" }}>{specialty}</span>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" variant="outline" className="flex-1" style={{ borderColor: "#1E9ADF", color: "#1E9ADF" }}>
                                <Calendar className="h-3 w-3 mr-1" />
                                Schedule
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Clients</TableHead>
                      <TableHead>Specialties</TableHead>
                      <TableHead>Availability</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {internalTeam.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell><a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">{member.email}</a></TableCell>
                        <TableCell><a href={`tel:${member.phone}`} className="text-blue-600 hover:underline">{member.phone}</a></TableCell>
                        <TableCell>{member.currentClients}</TableCell>
                        <TableCell>{member.specialties.join(", ")}</TableCell>
                        <TableCell>{member.availability}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* External Partners Tab */}
        <TabsContent value="external" className="mt-6">
          <Card style={{ backgroundColor: "#FFFFFF", borderColor: "#E6EBED" }}>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col gap-1">
                <CardTitle style={{ color: "#063852" }}>External Partners</CardTitle>
              </div>
              <div className="flex items-center gap-4">
                <ToggleGroup
                  type="single"
                  value={view}
                  onValueChange={(val) => val && setView(val as 'card' | 'table')}
                  className="bg-muted rounded-md p-1"
                  size="sm"
                  variant="outline"
                  aria-label="Switch people view"
                >
                  <ToggleGroupItem value="card" aria-label="Card view">
                    <LayoutGrid className="h-4 w-4" />
                    <span className="sr-only">Card</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="table" aria-label="Table view">
                    <TableIcon className="h-4 w-4" />
                    <span className="sr-only">Table</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardHeader>
            <CardContent>
              {view === 'card' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {externalPartners.map((partner) => (
                    <Card
                      key={partner.id}
                      className="shadow-sm border hover:shadow-md transition-all duration-200"
                      style={{ backgroundColor: "#FFFFFF", borderColor: "#F1F3F4" }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={partner.avatar || "/placeholder.svg"} />
                            <AvatarFallback style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}>
                              {partner.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium" style={{ color: "#063852" }}>{partner.name}</h3>
                              {getRelationshipBadge(partner.relationship)}
                            </div>
                            <p className="text-sm mb-1" style={{ color: "#636466" }}>{partner.role}</p>
                            <p className="text-sm mb-3 flex items-center gap-1" style={{ color: "#636466" }}>
                              <Building className="h-3 w-3" />
                              {partner.company}
                            </p>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3" style={{ color: "#636466" }} />
                                <a href={`mailto:${partner.email}`} className="hover:underline" style={{ color: "#1E9ADF" }}>{partner.email}</a>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3" style={{ color: "#636466" }} />
                                <a href={`tel:${partner.phone}`} style={{ color: "#063852" }}>{partner.phone}</a>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" style={{ color: "#636466" }} />
                                <span style={{ color: "#063852" }}>Last contact: {partner.lastContact}</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-xs mb-1" style={{ color: "#636466" }}>Specialties:</p>
                              <div className="flex flex-wrap gap-1">
                                {partner.specialties.map((specialty, i) => (
                                  <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "#F3E8FF", color: "#7C3AED" }}>{specialty}</span>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" variant="outline" className="flex-1" style={{ borderColor: "#1E9ADF", color: "#1E9ADF" }}>
                                <Calendar className="h-3 w-3 mr-1" />
                                Schedule
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Specialties</TableHead>
                      <TableHead>Relationship</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {externalPartners.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell className="font-medium">{partner.name}</TableCell>
                        <TableCell>{partner.role}</TableCell>
                        <TableCell>{partner.company}</TableCell>
                        <TableCell><a href={`mailto:${partner.email}`} className="text-blue-600 hover:underline">{partner.email}</a></TableCell>
                        <TableCell><a href={`tel:${partner.phone}`} className="text-blue-600 hover:underline">{partner.phone}</a></TableCell>
                        <TableCell>{partner.lastContact}</TableCell>
                        <TableCell>{partner.specialties.join(", ")}</TableCell>
                        <TableCell>{partner.relationship}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
