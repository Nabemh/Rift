"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  ChevronDown,
  ChevronLeft,
  Database,
  FileText,
  Grid3X3,
  Home,
  MapPin,
  Settings,
  Shield,
  Target,
  Users,
  Zap,
  Eye,
  Calendar,
  BarChart3,
  AlertTriangle,
  Activity,
  User,
} from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-blue-600">OpenCTI</span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-700 hover:bg-black">
            <Home className="w-4 h-4 mr-3" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-black">
            <BarChart3 className="w-4 h-4 mr-3" />
            Analyses
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-black">
            <FileText className="w-4 h-4 mr-3" />
            Cases
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-black">
            <Calendar className="w-4 h-4 mr-3" />
            Events
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-black">
            <Eye className="w-4 h-4 mr-3" />
            Observations
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>
          <div className="ml-6 space-y-1">
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-black text-sm">
              Observables
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-black text-sm">
              Artifacts
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-black text-sm">
              Indicators
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-black text-sm">
              Infrastructures
            </Button>
          </div>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-black">
            <AlertTriangle className="w-4 h-4 mr-3" />
            Threats
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-black">
            <Target className="w-4 h-4 mr-3" />
            Arsenal
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-black">
            <Zap className="w-4 h-4 mr-3" />
            Techniques
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-black">
            <Users className="w-4 h-4 mr-3" />
            Entities
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-black">
            <MapPin className="w-4 h-4 mr-3" />
            Locations
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>
          <Separator className="my-4 bg-gray-200" />
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-black">
            <Grid3X3 className="w-4 h-4 mr-3" />
            Dashboards
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-black">
            <Activity className="w-4 h-4 mr-3" />
            Investigations
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-black">
            <Database className="w-4 h-4 mr-3" />
            Data
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-black">
            <Settings className="w-4 h-4 mr-3" />
            Settings
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>
        </nav>
      </ScrollArea>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-3 h-3" />
          </div>
          <span>Filigran</span>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start mt-2 text-gray-600 hover:bg-black">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Collapse
        </Button>
      </div>
    </div>
  )
}
