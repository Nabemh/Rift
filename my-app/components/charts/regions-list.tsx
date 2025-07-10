"use client"

import { MapPin } from "lucide-react"

interface RegionData {
  Region: string
  "Count of TID": number
  "Count of Unique IP": number
}

interface RegionsListProps {
  data: RegionData[]
  height?: number
}

export function RegionsList({ data, height = 200 }: RegionsListProps) {
  return (
    <div className="overflow-y-auto pr-2" style={{ height }}>
      {/* Header Row */}
      <div className="flex items-center justify-between px-2 py-1 text-xs font-semibold text-gray-500 sticky top-0 bg-white z-10 border-b border-gray-200">
        <span className="flex-1">Region</span>
        <div className="flex gap-3 flex-shrink-0">
          <span>TID</span>
          <span>IP</span>
        </div>
      </div>

      {/* Region Rows */}
      <div className="space-y-1">
        {data.map((region, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded text-xs border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0 ">
              <MapPin className="w-3 h-3 text-blue-600 flex-shrink-0" />
              <span className="font-medium text-gray-900 truncate">{region.Region}</span>
            </div>
            <div className="flex gap-3 text-gray-600 flex-shrink-0 ">
              <span className="font-semibold">{region["Count of TID"]}</span>
              <span className="font-semibold">{region["Count of Unique IP"]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
