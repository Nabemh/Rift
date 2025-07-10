"use client"

import { Calendar, Bug } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TelecomThreat {
  name: string
  date: string
  source: string
  keywords: string[]
}

interface TelecomThreatsListProps {
  data: TelecomThreat[]
  height?: number
}

export function TelecomThreatsList({ data, height = 300 }: TelecomThreatsListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  return (
    <div className="overflow-y-auto" style={{ height }}>
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-white border-b">
          <tr className="text-left text-gray-500">
            <th className="p-2 w-1/3">Threat Name</th>
            <th className="p-2">Date</th>
            <th className="p-2 text-right">Keywords</th>
            <th className="p-2 w-1/4 text-right">Source</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((threat, index) => (
            <tr key={index} className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200 transition">
              <td className="p-2">
                <div className="flex items-center gap-2">
                  <Bug className="w-3 h-3 text-blue-600 flex-shrink-0" />
                  <span className="font-medium text-gray-900 line-clamp-1">{threat.name}</span>
                </div>
              </td>
              <td className="p-2 text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(threat.date)}</span>
                </div>
              </td>
              <td className="p-2">
                <div className="flex justify-end flex-wrap gap-1">
                  {threat.keywords.map((keyword, keyIndex) => (
                    <Badge 
                      key={keyIndex} 
                      variant="secondary" 
                      className="text-xs px-1.5 py-0 h-5"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="p-2 text-gray-600 text-right truncate" title={threat.source}>
                {threat.source}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
