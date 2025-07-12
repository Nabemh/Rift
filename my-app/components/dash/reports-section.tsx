"use client"

import { Card, CardContent } from "@/components/ui/card"

interface ReportsSectionProps {
  className?: string
}

export function ReportsSection({ className = "" }: ReportsSectionProps) {
  return (
    <div className={className}>
      {/* Title outside the card */}
      <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">Latest Reports</h3>

      {/* Card with just content */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32 text-gray-400">
            <div className="text-center">
              <div className="text-lg mb-2">📄</div>
              <p className="text-sm">Reports will be loaded here</p>
              <p className="text-xs text-gray-500 mt-1">Dynamic content from API</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
