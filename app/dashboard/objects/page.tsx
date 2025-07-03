import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { 
  Building2, 
  Car, 
  Home, 
  Plane, 
  Ship, 
  Gem, 
  Palette, 
  Coins,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  Calendar,
  MapPin,
  Users,
  Shield
} from "lucide-react"

const assetCategories = [
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Home,
    totalValue: 8500000,
    change: 2.5,
    changeType: "positive",
    count: 4
  },
  {
    id: "vehicles",
    name: "Vehicles",
    icon: Car,
    totalValue: 1200000,
    change: -1.2,
    changeType: "negative",
    count: 3
  },
  {
    id: "art-collection",
    name: "Art Collection",
    icon: Palette,
    totalValue: 3200000,
    change: 8.7,
    changeType: "positive",
    count: 12
  },
  {
    id: "jewelry",
    name: "Jewelry & Watches",
    icon: Gem,
    totalValue: 1800000,
    change: 3.1,
    changeType: "positive",
    count: 8
  },
  {
    id: "boats",
    name: "Boats & Yachts",
    icon: Ship,
    totalValue: 2500000,
    change: 0.0,
    changeType: "neutral",
    count: 2
  },
  {
    id: "aircraft",
    name: "Aircraft",
    icon: Plane,
    totalValue: 15000000,
    change: 1.8,
    changeType: "positive",
    count: 1
  }
]

const realEstateAssets = [
  {
    id: 1,
    name: "Primary Residence",
    type: "Residential",
    location: "Beverly Hills, CA",
    value: 4500000,
    change: 3.2,
    changeType: "positive",
    details: "6 bed, 8 bath, 12,000 sq ft",
    insurance: "Active",
    maintenance: "Up to date",
    image: "/placeholder.jpg"
  },
  {
    id: 2,
    name: "Aspen Mountain Home",
    type: "Vacation",
    location: "Aspen, CO",
    value: 2800000,
    change: 1.8,
    changeType: "positive",
    details: "4 bed, 5 bath, 8,500 sq ft",
    insurance: "Active",
    maintenance: "Scheduled",
    image: "/placeholder.jpg"
  },
  {
    id: 3,
    name: "Commercial Office Building",
    type: "Commercial",
    location: "Downtown LA, CA",
    value: 8500000,
    change: 2.1,
    changeType: "positive",
    details: "25,000 sq ft, 95% leased",
    insurance: "Active",
    maintenance: "Professional management",
    image: "/placeholder.jpg"
  },
  {
    id: 4,
    name: "Investment Property",
    type: "Rental",
    location: "Miami Beach, FL",
    value: 1200000,
    change: -0.5,
    changeType: "negative",
    details: "3 bed, 3 bath, 2,200 sq ft",
    insurance: "Active",
    maintenance: "Tenant responsibility",
    image: "/placeholder.jpg"
  }
]

const vehicleAssets = [
  {
    id: 1,
    name: "2023 Rolls-Royce Phantom",
    type: "Luxury Sedan",
    value: 450000,
    change: 0.0,
    changeType: "neutral",
    details: "V12, 6.75L, 563 hp",
    insurance: "Active",
    maintenance: "Dealer service",
    mileage: "2,450"
  },
  {
    id: 2,
    name: "2022 Bentley Bentayga",
    type: "Luxury SUV",
    value: 380000,
    change: -2.1,
    changeType: "negative",
    details: "W12, 6.0L, 600 hp",
    insurance: "Active",
    maintenance: "Dealer service",
    mileage: "8,200"
  },
  {
    id: 3,
    name: "2024 Tesla Model S Plaid",
    type: "Electric",
    value: 370000,
    change: 1.5,
    changeType: "positive",
    details: "Tri-motor, 1,020 hp",
    insurance: "Active",
    maintenance: "Tesla service",
    mileage: "1,100"
  }
]

const artCollection = [
  {
    id: 1,
    name: "Untitled (Blue) by Mark Rothko",
    artist: "Mark Rothko",
    year: "1955",
    value: 850000,
    change: 12.5,
    changeType: "positive",
    medium: "Oil on canvas",
    dimensions: "81\" x 66\"",
    location: "Primary Residence",
    insurance: "Active"
  },
  {
    id: 2,
    name: "Number 17A by Jackson Pollock",
    artist: "Jackson Pollock",
    year: "1948",
    value: 650000,
    change: 8.2,
    changeType: "positive",
    medium: "Oil and enamel on canvas",
    dimensions: "76\" x 61\"",
    location: "Art Storage Facility",
    insurance: "Active"
  }
]

export default function ObjectsPage() {
  const totalAssetsValue = assetCategories.reduce((sum, category) => sum + category.totalValue, 0)
  const totalChange = assetCategories.reduce((sum, category) => sum + (category.change * category.totalValue / 100), 0)
  const totalChangePercent = (totalChange / totalAssetsValue) * 100

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            My Assets & Objects
          </h1>
          <p className="text-text-secondary">
            Overview of your physical assets, real estate holdings, and valuable objects.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Asset Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalAssetsValue / 1000000).toFixed(1)}M</div>
              <div className={`flex items-center text-xs ${totalChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalChangePercent >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(totalChangePercent).toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assetCategories.reduce((sum, cat) => sum + cat.count, 0)}</div>
              <p className="text-xs text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Insurance Coverage</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground">All assets insured</p>
            </CardContent>
          </Card>
        </div>

        {/* Asset Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Categories</CardTitle>
            <CardDescription>Overview of your asset portfolio by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assetCategories.map((category) => (
                <div key={category.id} className="p-4 border rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <category.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.count} items</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${
                      category.changeType === 'positive' ? 'text-green-600 border-green-200' :
                      category.changeType === 'negative' ? 'text-red-600 border-red-200' :
                      'text-gray-600 border-gray-200'
                    }`}>
                      {category.change >= 0 ? '+' : ''}{category.change}%
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    ${(category.totalValue / 1000000).toFixed(1)}M
                  </div>
                  <Progress value={(category.totalValue / totalAssetsValue) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Asset Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Details</CardTitle>
            <CardDescription>Detailed view of your assets by category</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="real-estate" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
                <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
                <TabsTrigger value="art">Art Collection</TabsTrigger>
                <TabsTrigger value="other">Other Assets</TabsTrigger>
              </TabsList>

              <TabsContent value="real-estate" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {realEstateAssets.map((asset) => (
                    <div key={asset.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{asset.name}</h3>
                          <p className="text-sm text-gray-600">{asset.type}</p>
                        </div>
                        <Badge variant="outline" className={`text-xs ${
                          asset.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {asset.change >= 0 ? '+' : ''}{asset.change}%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4" />
                          {asset.location}
                        </div>
                        <div className="text-lg font-bold">${(asset.value / 1000000).toFixed(1)}M</div>
                        <p className="text-sm text-gray-600">{asset.details}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-green-600">✓ {asset.insurance}</span>
                          <span className="text-blue-600">✓ {asset.maintenance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="vehicles" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicleAssets.map((asset) => (
                    <div key={asset.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{asset.name}</h3>
                          <p className="text-sm text-gray-600">{asset.type}</p>
                        </div>
                        <Badge variant="outline" className={`text-xs ${
                          asset.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {asset.change >= 0 ? '+' : ''}{asset.change}%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="text-lg font-bold">${(asset.value / 1000).toFixed(0)}K</div>
                        <p className="text-sm text-gray-600">{asset.details}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-green-600">✓ {asset.insurance}</span>
                          <span className="text-blue-600">✓ {asset.maintenance}</span>
                          <span className="text-gray-600">{asset.mileage} miles</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="art" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {artCollection.map((piece) => (
                    <div key={piece.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{piece.name}</h3>
                          <p className="text-sm text-gray-600">{piece.artist}, {piece.year}</p>
                        </div>
                        <Badge variant="outline" className="text-green-600 text-xs">
                          +{piece.change}%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="text-lg font-bold">${(piece.value / 1000).toFixed(0)}K</div>
                        <p className="text-sm text-gray-600">{piece.medium}, {piece.dimensions}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-green-600">✓ {piece.insurance}</span>
                          <span className="text-gray-600">{piece.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="other" className="space-y-4">
                <div className="text-center py-8 text-gray-500">
                  <Coins className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Other assets will be displayed here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 