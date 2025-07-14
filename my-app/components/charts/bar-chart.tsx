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

export function BarChart({
  data,
  height = 200,
  showSecondaryValue = false,
  valueLabel = "Count",
  secondaryLabel = "Secondary",
}: HorizontalBarChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className="space-y-1" style={{ height }}>
      {/* Header Row */}
      {showSecondaryValue && (
        <div className="grid grid-cols-[80px_1fr_40px_60px] text-xs text-gray-500 px-1">
          <span></span>
          <span></span>
          <span className="text-right">{valueLabel}</span>
          <span className="text-right">{secondaryLabel}</span>
        </div>
      )}

      {/* Data Rows */}
      {data.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[80px_1fr_40px_60px] items-center gap-2 py-1 px-1"
        >
          {/* Label */}
          <div className="text-xs text-gray-700 truncate font-medium" title={item.label}>
            {item.label}
          </div>

          {/* Bar */}
          <div className="bg-gray-200 rounded-full h-2 relative">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${item.color || "bg-blue-500"}`}
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>

          {/* Value */}
          <div className="text-xs text-gray-900 font-semibold text-right">
            {item.value}
          </div>

          {/* Secondary Value */}
          <div className="text-xs text-gray-600 text-right">
            {showSecondaryValue && item.secondaryValue ? `(${item.secondaryValue})` : ""}
          </div>
        </div>
      ))}
    </div>
  )
}
