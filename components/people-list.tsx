"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserCheck, Calendar, Phone, Mail, Building, Search, Heart, Table as TableIcon, LayoutGrid } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Copy } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function PeopleList() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [view, setView] = useState<'card' | 'table'>('card')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    category: 'internal',
    avatar: ''
  })

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
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=128&h=128&facepad=2",
      category: "family"
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
      avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=128&h=128&facepad=2",
      category: "family"
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
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=128&h=128&facepad=2",
      category: "family"
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
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=128&h=128&facepad=2",
      category: "internal"
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
      avatar: "https://images.unsplash.com/photo-1519340333755-c1aa5571fd46?auto=format&fit=facearea&w=128&h=128&facepad=2",
      category: "internal"
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
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&w=128&h=128&facepad=2",
      category: "internal"
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
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=128&h=128&facepad=2",
      category: "internal"
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
      avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=128&h=128&facepad=2",
      category: "external"
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
      avatar: "https://images.unsplash.com/photo-1519340333755-c1aa5571fd46?auto=format&fit=facearea&w=128&h=128&facepad=2",
      category: "external"
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
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&w=128&h=128&facepad=2",
      category: "external"
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
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=128&h=128&facepad=2",
      category: "external"
    },
  ]

  // Combine all people for the "All" tab
  const allPeople = [...internalTeam, ...familyMembers, ...externalPartners]

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "available":
        return <Badge variant="success">Available</Badge>
      case "busy":
        return <Badge variant="error">Busy</Badge>
      case "away":
        return <Badge variant="warning">Away</Badge>
      default:
        return <Badge variant="outline">{availability}</Badge>
    }
  }

  const getRelationshipBadge = (relationship: string) => {
    switch (relationship) {
      case "Preferred Partner":
        return <Badge variant="brand">Preferred Partner</Badge>
      case "Trusted Partner":
        return <Badge variant="success">Trusted Partner</Badge>
      case "Strategic Partner":
        return <Badge variant="info">Strategic Partner</Badge>
      default:
        return <Badge variant="outline">{relationship}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "internal":
        return <Badge variant="brand">Internal Team</Badge>
      case "family":
        return <Badge variant="success">Family</Badge>
      case "external":
        return <Badge variant="info">External Partner</Badge>
      default:
        return <Badge variant="outline">{category}</Badge>
    }
  }

  useEffect(() => {
    const handler = (e: any) => {
      const form = e.detail
      let newPerson: any = { ...form, id: Date.now().toString(), avatar: form.avatar || undefined }
      if (form.category === 'internal') {
        newPerson = {
          ...newPerson,
          department: 'Advisory',
          specialties: [],
          currentClients: 0,
          availability: 'available',
        }
        internalTeam.push(newPerson)
      } else if (form.category === 'family') {
        newPerson = {
          ...newPerson,
          relationship: form.role || 'Family',
          birthday: '',
          interests: [],
        }
        familyMembers.push(newPerson)
      } else if (form.category === 'external') {
        newPerson = {
          ...newPerson,
          company: '',
          specialties: [],
          relationship: form.role || 'Partner',
        }
        externalPartners.push(newPerson)
      }
    }
    window.addEventListener('add-person', handler)
    return () => window.removeEventListener('add-person', handler)
  }, [])

  return (
    <>
      <div className="space-y-6">
        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search people..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as 'card' | 'table')}>
            <ToggleGroupItem value="card" aria-label="Card view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Table view">
              <TableIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="internal">Internal Team</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="external">External Partners</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {view === 'card' ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {allPeople.map((person) => (
                  <Card key={`${person.category}-${person.id}`} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={person.avatar} alt={person.name} />
                          <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-text-primary">{person.name}</h3>
                            {person.category === 'internal' && 'availability' in person && getAvailabilityBadge(person.availability)}
                            {person.category === 'external' && 'relationship' in person && getRelationshipBadge(person.relationship)}
                            {person.category === 'family' && getCategoryBadge(person.category)}
                          </div>
                          <p className="text-sm text-text-secondary">{person.role}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {person.category === 'internal' && 'department' in person && (
                        <>
                          <div className="text-sm text-text-secondary">
                            <p className="font-medium">{person.department}</p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {person.specialties.map((specialty: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </>
                      )}
                      {person.category === 'family' && 'birthday' in person && (
                        <>
                          <div className="flex items-center gap-2 text-xs text-text-tertiary">
                            <Calendar className="h-3 w-3" />
                            <span>Birthday: {person.birthday}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {person.interests.map((interest: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </>
                      )}
                      {person.category === 'external' && 'company' in person && (
                        <>
                          <div className="text-sm text-text-secondary">
                            <p className="font-medium">{person.company}</p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {person.specialties.map((specialty: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </>
                      )}
                      <div className="flex items-center gap-2 text-xs text-text-tertiary group">
                        <Mail className="h-3 w-3" />
                        <span>{person.email}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => navigator.clipboard.writeText(person.email)}
                                tabIndex={0}
                                aria-label={`Copy email for ${person.name}`}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy email</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-tertiary group">
                        <Phone className="h-3 w-3" />
                        <span>{person.phone}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => navigator.clipboard.writeText(person.phone)}
                                tabIndex={0}
                                aria-label={`Copy phone for ${person.name}`}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy phone</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allPeople.map((person) => (
                      <TableRow key={`${person.category}-${person.id}`}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={person.avatar} alt={person.name} />
                              <AvatarFallback className="text-xs">{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-text-primary">{person.name}</div>
                              <div className="text-sm text-text-secondary">{person.role}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-text-secondary">{person.role}</TableCell>
                        <TableCell>{getCategoryBadge(person.category)}</TableCell>
                        <TableCell>
                          {person.category === 'internal' && 'department' in person && person.department}
                          {person.category === 'family' && 'relationship' in person && person.relationship}
                          {person.category === 'external' && 'company' in person && person.company}
                        </TableCell>
                        <TableCell>
                          {person.category === 'internal' && 'availability' in person && getAvailabilityBadge(person.availability)}
                          {person.category === 'external' && 'relationship' in person && getRelationshipBadge(person.relationship)}
                          {person.category === 'family' && <Badge variant="outline">Family Member</Badge>}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="internal" className="space-y-4">
            {view === 'card' ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {internalTeam.map((member) => (
                  <Card key={member.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-text-primary">{member.name}</h3>
                            {getAvailabilityBadge(member.availability)}
                          </div>
                          <p className="text-sm text-text-secondary">{member.role}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm text-text-secondary">
                        <p className="font-medium">{member.department}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-tertiary group">
                        <Mail className="h-3 w-3" />
                        <span>{member.email}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => navigator.clipboard.writeText(member.email)}
                                tabIndex={0}
                                aria-label={`Copy email for ${member.name}`}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy email</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-tertiary group">
                        <Phone className="h-3 w-3" />
                        <span>{member.phone}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => navigator.clipboard.writeText(member.phone)}
                                tabIndex={0}
                                aria-label={`Copy phone for ${member.name}`}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy phone</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Specialties</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {internalTeam.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback className="text-xs">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-text-primary">{member.name}</div>
                              <div className="text-sm text-text-secondary">{member.role}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-text-secondary">{member.role}</TableCell>
                        <TableCell className="text-text-secondary">{member.department}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {member.specialties.slice(0, 2).map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                            {member.specialties.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{member.specialties.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getAvailabilityBadge(member.availability)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="family" className="space-y-4">
            {view === 'card' ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {familyMembers.map((member) => (
                  <Card key={member.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-text-primary">{member.name}</h3>
                            <Badge variant="success" className="ml-2">Family</Badge>
                          </div>
                          <p className="text-sm text-text-secondary">{member.relationship}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-text-tertiary">
                        <Calendar className="h-3 w-3" />
                        <span>Birthday: {member.birthday}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-tertiary group">
                        <Mail className="h-3 w-3" />
                        <span>{member.email}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => navigator.clipboard.writeText(member.email)}
                                tabIndex={0}
                                aria-label={`Copy email for ${member.name}`}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy email</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-tertiary group">
                        <Phone className="h-3 w-3" />
                        <span>{member.phone}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => navigator.clipboard.writeText(member.phone)}
                                tabIndex={0}
                                aria-label={`Copy phone for ${member.name}`}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy phone</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Relationship</TableHead>
                      <TableHead>Birthday</TableHead>
                      <TableHead>Interests</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {familyMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback className="text-xs">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-text-primary">{member.name}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-text-secondary">{member.relationship}</TableCell>
                        <TableCell className="text-text-secondary">{member.birthday}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {member.interests.map((interest, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="external" className="space-y-4">
            {view === 'card' ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {externalPartners.map((partner) => (
                  <Card key={partner.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={partner.avatar} alt={partner.name} />
                          <AvatarFallback>{partner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-text-primary">{partner.name}</h3>
                            {getRelationshipBadge(partner.relationship)}
                          </div>
                          <p className="text-sm text-text-secondary">{partner.role}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm text-text-secondary">
                        <p className="font-medium">{partner.company}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {partner.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-tertiary group">
                        <Mail className="h-3 w-3" />
                        <span>{partner.email}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => navigator.clipboard.writeText(partner.email)}
                                tabIndex={0}
                                aria-label={`Copy email for ${partner.name}`}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy email</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-tertiary group">
                        <Phone className="h-3 w-3" />
                        <span>{partner.phone}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => navigator.clipboard.writeText(partner.phone)}
                                tabIndex={0}
                                aria-label={`Copy phone for ${partner.name}`}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy phone</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Specialties</TableHead>
                      <TableHead>Relationship</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {externalPartners.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={partner.avatar} alt={partner.name} />
                              <AvatarFallback className="text-xs">{partner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-text-primary">{partner.name}</div>
                              <div className="text-sm text-text-secondary">{partner.role}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-text-secondary">{partner.role}</TableCell>
                        <TableCell className="text-text-secondary">{partner.company}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {partner.specialties.slice(0, 2).map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                            {partner.specialties.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{partner.specialties.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getRelationshipBadge(partner.relationship)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
