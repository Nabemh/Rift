"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface DashboardSectionProps {
  title: string
  children?: ReactNode
  className?: string
}

export function DashboardSection({ title, children, className = "" }: DashboardSectionProps) {
  return (
    <div className={className}>
      <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">{title}</h3>
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardContent className="p-3">
          {children || (
            <div className="flex items-center justify-center h-32 text-gray-400">
              <div className="text-center">
                <div className="text-sm mb-1">📊</div>
                <p className="text-xs">Loading data...</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
