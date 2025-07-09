"use client"

import { useState, useEffect } from "react"

interface ThreatCategory {
  Category: string
  "Count of TID": number
  "Count of IP": number
}

interface MalwareData {
  Infection: string
  "Frequency of Occurrence": number
  "Count of Unique IPs": number
}

interface C2IPData {
  IP: string
  "Unique Count": number
}

interface ISPData {
  ASNName: string
  Count: number
}

interface RegionData {
  Region: string
  "Count of TID": number
  "Count of Unique IP": number
}

interface TelecomThreat {
  name: string
  date: string
  source: string
  keywords: string[]
}

interface CityHeatmap {
  City: string
  "Threat Count": number
}

interface ThreatIntelligenceData {
  threatCategories: ThreatCategory[]
  malware: MalwareData[]
  c2Ips: C2IPData[]
  isps: ISPData[]
  regions: RegionData[]
  telecomThreats: TelecomThreat[]
  cityHeatmap: CityHeatmap[]
}

export function useThreatData() {
  const [data, setData] = useState<ThreatIntelligenceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchThreatData = async () => {
      try {
        setLoading(true)

        const [
          threatCategoriesRes,
          malwareRes,
          c2IpsRes,
          ispsRes,
          regionsRes,
          telecomThreatsRes,
          heatmapRes
        ] = await Promise.all([
          fetch("http://localhost:8000/api/summary/threat-categories?limit=10"),
          fetch("http://localhost:8000/api/summary/malware?limit=10"),
          fetch("http://localhost:8000/api/summary/c2-ips?limit=10"),
          fetch("http://localhost:8000/api/summary/top-isps?limit=10"),
          fetch("http://localhost:8000/api/summary/regions?limit=10"),
          fetch("http://localhost:8000/api/summary/telecom-threats?limit=20"),
          fetch("http://localhost:8000/api/summary/heatmap?limit=20")
        ])

        const [
          threatCategoriesData,
          malwareData,
          c2IpsData,
          ispsData,
          regionsData,
          telecomThreatsData,
          heatmapData
        ] = await Promise.all([
          threatCategoriesRes.json(),
          malwareRes.json(),
          c2IpsRes.json(),
          ispsRes.json(),
          regionsRes.json(),
          telecomThreatsRes.json(),
          heatmapRes.json()
        ])

        const threatData: ThreatIntelligenceData = {
          threatCategories: threatCategoriesData.summary_table ?? [],
          malware: malwareData.summary_table ?? [],
          c2Ips: c2IpsData.summary_table ?? [],
          isps: ispsData.summary_table ?? [],
          regions: regionsData.summary_table ?? [],
          telecomThreats: telecomThreatsData.telecom_threats ?? [],
          cityHeatmap: heatmapData.heat_data ?? []
        }

        console.log("Fetched threat data:", threatData)
        setData(threatData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch threat intelligence data")
      } finally {
        setLoading(false)
      }
    }

    fetchThreatData()
  }, [])

  return { data, loading, error }
}
