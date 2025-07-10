"use client"

interface LabelData {
  label: string
  count: number
  percentage: number
}

interface LabelsChartProps {
  data: LabelData[]
  height?: number
}

export function LabelsChart({ data, height = 300 }: LabelsChartProps) {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
  ]

  return (
    <div className="space-y-4" style={{ height }}>
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 font-medium">{item.label}</span>
            <span className="text-gray-600">{item.count}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${colors[index % colors.length]}`}
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
