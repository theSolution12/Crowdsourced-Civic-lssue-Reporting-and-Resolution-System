"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, MapPin, Clock, User, Filter, Search, Eye, Forward } from "lucide-react"
import { useGetIssues } from "@/lib/hooks/issues/get-issues"
import { Issue } from "@/constants/types";


const reportedIssues: Issue[] = [
  {
    id: "RPT-2024-001",
    title: "Large pothole on MG Road",
    description: "Deep pothole causing traffic disruption and vehicle damage near City Mall junction",
    category: "Road Infrastructure",
    priority: "High",
    status: "Under Review",
    location_data: { address: "MG Road, Sector 14" },
    upvotes: 24,
    downvotes: 0,
    created_at: "2024-01-15T09:30:00Z",
    updated_at: "2024-01-15T09:30:00Z",
    user_id: "some-user-id-1",
    image_urls: [],
    voice_note_url: null,
    tags: ["pothole", "road"],
    assigned_department_id: null,
    assigned_officer_id: null,
    resolved_at: null,
  },
  {
    id: "RPT-2024-002",
    title: "Overflowing garbage bins",
    description: "Multiple garbage bins overflowing in residential area, causing hygiene issues",
    category: "Waste Management",
    priority: "Medium",
    status: "Assigned",
    location_data: { address: "Green Park Colony" },
    upvotes: 18,
    downvotes: 0,
    created_at: "2024-01-15T11:45:00Z",
    updated_at: "2024-01-15T11:45:00Z",
    user_id: "some-user-id-2",
    image_urls: [],
    voice_note_url: null,
    tags: ["garbage", "hygiene"],
    assigned_department_id: null,
    assigned_officer_id: null,
    resolved_at: null,
  },
  {
    id: "RPT-2024-003",
    title: "Street light not working",
    description: "Multiple street lights not functioning on main road, safety concern during night",
    category: "Public Lighting",
    priority: "High",
    status: "New",
    location_data: { address: "Park Street" },
    upvotes: 31,
    downvotes: 0,
    created_at: "2024-01-15T14:15:00Z",
    updated_at: "2024-01-15T14:15:00Z",
    user_id: "some-user-id-3",
    image_urls: [],
    voice_note_url: null,
    tags: ["streetlight", "safety"],
    assigned_department_id: null,
    assigned_officer_id: null,
    resolved_at: null,
  },
  {
    id: "RPT-2024-004",
    title: "Water logging in underpass",
    description: "Severe water logging in subway underpass after recent rains",
    category: "Drainage",
    priority: "Critical",
    status: "Escalated",
    location_data: { address: "Railway Underpass, Station Road" },
    upvotes: 45,
    downvotes: 0,
    created_at: "2024-01-15T16:20:00Z",
    updated_at: "2024-01-15T16:20:00Z",
    user_id: "some-user-id-4",
    image_urls: [],
    voice_note_url: null,
    tags: ["waterlogging", "underpass"],
    assigned_department_id: null,
    assigned_officer_id: null,
    resolved_at: null,
  },
  {
    id: "RPT-2024-005",
    title: "Broken pedestrian footbridge",
    description: "Footbridge near central bus stand has broken steps and loose railings, posing safety risks.",
    category: "Infrastructure",
    priority: "High",
    status: "Assigned",
    location_data: { address: "Central Bus Stand" },
    upvotes: 19,
    downvotes: 0,
    created_at: "2024-01-16T08:10:00Z",
    updated_at: "2024-01-16T08:10:00Z",
    user_id: "some-user-id-5",
    image_urls: [],
    voice_note_url: null,
    tags: ["footbridge", "broken"],
    assigned_department_id: null,
    assigned_officer_id: null,
    resolved_at: null,
  },
  {
    id: "RPT-2024-006",
    title: "Uncovered manhole",
    description: "Open manhole on main street, risk of accidents especially at night.",
    category: "Sanitation",
    priority: "Critical",
    status: "Escalated",
    location_data: { address: "Main Street, Block B" },
    upvotes: 27,
    downvotes: 0,
    created_at: "2024-01-16T10:25:00Z",
    updated_at: "2024-01-16T10:25:00Z",
    user_id: "some-user-id-6",
    image_urls: [],
    voice_note_url: null,
    tags: ["manhole", "safety"],
    assigned_department_id: null,
    assigned_officer_id: null,
    resolved_at: null,
  },
  {
    id: "RPT-2024-007",
    title: "Illegal dumping of construction debris",
    description: "Construction debris dumped illegally in vacant plot, blocking access and causing pollution.",
    category: "Waste Management",
    priority: "Medium",
    status: "Under Review",
    location_data: { address: "Plot 22, Industrial Area" },
    upvotes: 14,
    downvotes: 0,
    created_at: "2024-01-16T12:40:00Z",
    updated_at: "2024-01-16T12:40:00Z",
    user_id: "some-user-id-7",
    image_urls: [],
    voice_note_url: null,
    tags: ["dumping", "pollution"],
    assigned_department_id: null,
    assigned_officer_id: null,
    resolved_at: null,
  },
]

export function ReportedIssuesPage() {
  const { data, isPending } = useGetIssues();

  const [searchTerm, setSearchTerm] = useState("")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const issuesToDisplay = data || reportedIssues;

  const filteredIssues = issuesToDisplay.filter((issue) => {
    const matchesSearch =
      issue.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSource = sourceFilter === "all" || (issue.category?.toLowerCase() === sourceFilter) // Assuming category can act as source for now
    const matchesPriority = priorityFilter === "all" || (issue.priority?.toLowerCase() === priorityFilter)
    const matchesStatus = statusFilter === "all" || (issue.status?.toLowerCase().replace(" ", "-") === statusFilter)

    return matchesSearch && matchesSource && matchesPriority && matchesStatus
  })

  const getPriorityColor = (priority: string | null) => {
    switch (priority) {
      case "Critical":
        return "destructive"
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "New":
        return "outline"
      case "Under Review":
        return "secondary"
      case "Assigned":
        return "default"
      case "Escalated":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (isPending) {
    return (
      <main className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6">
        <p>Loading issues...</p>
      </main>
    )
  }

  return (
    <main className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Reported Issues</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage and track all civic issues reported by citizens and government officials
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="public">Public Reports</SelectItem>
                <SelectItem value="government">Government Forwarded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setSourceFilter("all")
                setPriorityFilter("all")
                setStatusFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Issues List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-semibold">Issues ({filteredIssues.length})</h2>
          <Tabs defaultValue="list" className="w-auto hidden sm:block">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-semibold text-base sm:text-lg leading-tight">{issue.title}</h3>
                        <Badge variant={issue.category === "Government" ? "default" : "secondary"} className="w-fit">
                          {issue.category}
                        </Badge>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                        {issue.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{(issue.location_data as any)?.address || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{issue.user_id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{new Date(issue.created_at).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Category:</span>
                          <span className="font-medium truncate">{issue.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t sm:border-t-0 sm:pt-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={getPriorityColor(issue.priority)} className="text-xs">
                        {issue.priority}
                      </Badge>
                      <Badge variant={getStatusColor(issue.status)} className="text-xs">
                        {issue.status}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground ml-auto sm:ml-0">
                        <span>{issue.image_urls?.length || 0} images</span>
                        <span>•</span>
                        <span>{issue.upvotes} upvotes</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-transparent">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                      </Button>
                      <Button size="sm" className="flex-1 sm:flex-none">
                        <Forward className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="hidden sm:inline">Take Action</span>
                        <span className="sm:hidden">Action</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
