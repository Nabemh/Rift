"use client"

interface BarData {
  label: string
  value: number
  secondaryValue?: number
  color?: string
}

interface HorizontalBarChartProps {
  data: BarData[]
  height?: number
  showSecondaryValue?: boolean
  valueLabel?: string
  secondaryLabel?: string
}

export function HorizontalBarChart({
  data,
  height = 200,
  showSecondaryValue = false,
  valueLabel = "Count",
  secondaryLabel = "Secondary",
}: HorizontalBarChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className="space-y-1" style={{ height }}>
      {/* Add header with labels */}
      {showSecondaryValue && (
        <div className="flex justify-end gap-8 pr-10 text-xs text-gray-500">
          <span>{valueLabel}</span>
          <span>{secondaryLabel}</span>
        </div>
      )}

      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-2 py-1">
          <div className="w-20 text-xs text-gray-700 truncate font-medium" title={item.label}>
            {item.label}
          </div>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${item.color || "bg-blue-500"}`}
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
          <div className="flex gap-2 text-xs">
            <span className="text-gray-900 font-semibold w-8 text-right">{item.value}</span>
            {showSecondaryValue && item.secondaryValue && (
              <span className="text-gray-600 w-8 text-right">({item.secondaryValue})</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}