"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface DashboardSectionProps {
  title: string
  children?: ReactNode
  className?: string
}

export function DashboardSection({ title, children, className = "" }: DashboardSectionProps) {
  return (
    <Card className={`bg-white border-gray-200 shadow-sm ${className}`}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children || (
          <div className="flex items-center justify-center h-48 text-gray-400">
            <div className="text-center">
              <div className="text-lg mb-2">📊</div>
              <p className="text-sm">Chart will be rendered here</p>
              <p className="text-xs text-gray-500 mt-1">Data from backend</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
