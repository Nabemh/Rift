"use client"

import { useState, useEffect } from "react"

// Types for API responses
interface ThreatCategory {
  name: string
  count: number
}

interface MalwareData {
  name: string
  count: number
}

interface VulnerabilityData {
  cve_id: string
  count: number
  severity?: string
}

interface RegionData {
  region: string
  count: number
}

interface TelecomThreat {
  name: string
  date: string
  source: string
  keywords: string[]
}

interface DashboardData {
  threatCategories: ThreatCategory[]
  malware: MalwareData[]
  vulnerabilities: VulnerabilityData[]
  regions: RegionData[]
  telecomThreats: TelecomThreat[]
  topIsps: { name: string; count: number }[]
  c2Ips: { ip: string; count: number }[]
  heatmapData: RegionData[]
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch all endpoints in parallel
        const [
          threatCategoriesRes,
          malwareRes,
          vulnerabilitiesRes,
          regionsRes,
          telecomThreatsRes,
          topIspsRes,
          c2IpsRes,
          heatmapRes,
        ] = await Promise.all([
          fetch("http://localhost:8000/api/summary/threat-categories?limit=10"),
          fetch("http://localhost:8000/api/summary/malware?limit=10"),
          fetch("http://localhost:8000/api/summary/vulnerabilities?limit=10"),
          fetch("http://localhost:8000/api/summary/regions?limit=10"),
          fetch("http://localhost:8000/api/summary/telecom-threats"),
          fetch("http://localhost:8000/api/summary/top-isps?limit=10"),
          fetch("http://localhost:8000/api/summary/c2-ips?limit=10"),
          fetch("http://localhost:8000/api/summary/heatmap?limit=20"),
        ])

        const dashboardData: DashboardData = {
          threatCategories: await threatCategoriesRes.json(),
          malware: await malwareRes.json(),
          vulnerabilities: await vulnerabilitiesRes.json(),
          regions: await regionsRes.json(),
          telecomThreats: (await telecomThreatsRes.json()).telecom_threats,
          topIsps: await topIspsRes.json(),
          c2Ips: await c2IpsRes.json(),
          heatmapData: await heatmapRes.json(),
        }

        setData(dashboardData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return { data, loading, error }
}
