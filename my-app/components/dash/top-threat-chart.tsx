"use client"
import Plot from "@/components/PlotlyNoSSR"
import { Data, Layout } from "plotly.js";
import { useEffect, useState } from "react"

interface ThreatCategory {
  Category: string
  "Count of TID": number
  "Count of IP": number
}

export default function TopThreatsChart() {
  const [data, setData] = useState<ThreatCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("http://localhost:8000/api/summary/threat-categories?limit=10")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const resData = await response.json()
        console.log("API Response:", resData)

        const summary = Array.isArray(resData?.summary_table)
          ? resData.summary_table
          : []

        setData(summary)
      } catch (err) {
        console.error("Failed to load chart data", err)
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p className="text-sm text-gray-500">Loading chart...</p>
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>
  if (data.length === 0) return <p className="text-sm text-gray-500">No data available</p>

  // Distinct colors for each category (more can be added as needed)
  const distinctColors = [
    '#FF6384', // Red
    '#36A2EB', // Blue
    '#FFCE56', // Yellow
    '#4BC0C0', // Teal
    '#9966FF', // Purple
    '#FF9F40', // Orange
    '#8AC249', // Green
    '#EA5F89', // Pink
    '#00B5AD', // Dark Teal
    '#F77825'  // Dark Orange
  ];

  const plotData: Data[] = [
    {
      type: "pie",
      values: data.map((d) => d["Count of TID"]),
      labels: data.map((d) => d.Category),
      hole: 0.5, // Adjust hole size for better visibility
      marker: {
        colors: distinctColors.slice(0, data.length),
        line: {
          color: '#FFFFFF', // White border between segments
          width: 2
        }
      },
      textinfo: 'percent',
      hoverinfo: 'label+value+percent',
      textposition: 'inside',
      insidetextorientation: 'radial',
      rotation: 0,
      pull: data.map((_, i) => (i === 0 ? 0.1 : 0)), // Slightly pull the first segment for emphasis
    }
  ]

  const layout: Partial<Layout> = {
    margin: { l: 20, r: 20, t: 40, b: 40 },
    height: 500,
    showlegend: true,
    legend: {
      orientation: 'v',
      y: 0.5,
      font: {
        size: 12
      }
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    title: {
      text: 'Threat Category Distribution',
      font: {
        size: 16
      },
      x: 0.5,
      xanchor: 'center'
    }
  }

  return (
    <div className="w-full">
      <Plot
        data={plotData}
        layout={layout}
        style={{ width: "100%", height: "100%" }}
        config={{ responsive: true, displayModeBar: true }}
      />
    </div>
  )
}