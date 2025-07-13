"use client"

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { scaleLinear } from "d3-scale"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

interface RegionData {
  region: string
  count: number
}

interface WorldHeatmapProps {
  data: RegionData[]
  height?: number
}

export function WorldHeatmap({ data, height = 400 }: WorldHeatmapProps) {
  const maxCount = Math.max(...data.map(d => d.count))
  const colorScale = scaleLinear<string>()
    .domain([0, maxCount])
    .range(["#e0f2f1", "#b71c1c"]) // light green to dark red

  return (
    <div className="rounded shadow" style={{ height }}>
      <ComposableMap projectionConfig={{ scale: 160 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const match = data.find(d => d.region.toLowerCase() === geo.properties.name.toLowerCase())
              const fill = match ? colorScale(match.count) : "#F5F5F5"

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="#DDD"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#555", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}
