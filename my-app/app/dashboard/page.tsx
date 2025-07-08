"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MetricCard } from "@/components/metric-card"
import { DashboardSection } from "@/components/dashboard-section"
import { ReportsSection } from "@/components/reports-section"
import { Shield, AlertTriangle, FileText } from "lucide-react"

export default function CTIDashboard() {

  const [metrics, setMetrics] = useState<{
    threats: number | string
    malware: number | string
    vulnerabilities: number | string
  }>({
    threats: "--",
    malware: "--",
    vulnerabilities: "--"
  })

  useEffect(() => {
    fetch("http://localhost:8000/api/summary/metrics")
      .then(res => res.json())
      .then(data => {
        setMetrics({
          threats: data.total_threats,
          malware: data.malware,
          vulnerabilities: data.vulnerabilities,
        })
      })
      .catch(err => console.error("Failed to fetch metrics:", err))
  }, [])

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Threats"
            value={metrics.threats}
            period="(All time)"
            icon={Shield}
          />

          <MetricCard
            title="Malware"
            value={metrics.malware}
            period="(All time)"
            icon={AlertTriangle}
          />

          <MetricCard
            title="Vulnerabilities"
            value={metrics.vulnerabilities}
            period="(All time)"
            icon={FileText}
          />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 mb-8">
            <DashboardSection title="Most Active Threats (3 Last Months)" className="lg:col-span-2" />
            <DashboardSection title="Most Targeted Victims (3 Last Months)" className="lg:col-span-2" />
            <DashboardSection title="Relationships Created" className="lg:col-span-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 mb-8">
            <DashboardSection title="Most Active Malware (3 Last Months)" className="lg:col-span-2" />
            <DashboardSection title="Most Active Vulnerabilities (3 Last Months)" className="lg:col-span-2" />
            <DashboardSection title="Targeted Countries (3 Last Months)" className="lg:col-span-4" />
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <ReportsSection className="lg:col-span-3" />
            <DashboardSection title="Most Active Labels (3 Last Months)" className="lg:col-span-1" />
          </div>

        </main>
      </div>
    </div>
  )
}
