"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { DashboardSection } from "@/components/dash/dashboard-section"
import { HorizontalBarChart } from "@/components/charts/horizontal-bar-chart"
import { RegionsList } from "@/components/charts/regions-list"
import { TelecomThreatsList } from "@/components/charts/telecom-threats-list"
import { ErrorBoundary } from "@/components/dash/error-boundary"
import { useThreatData } from "@/hooks/use-threat-data"
import { MetricCard } from "@/components/dash/metric-card"
import { Shield, AlertTriangle, FileText } from "lucide-react"
import { LoadingScreen } from "@/components/loading-data"
import { ErrorScreen } from "@/components/dash/error-dash"
import { BarChart } from "@/components/charts/bar-chart"
import FloatingAIAssistant from "@/components/chatbot/floating-ai-assistant"

export default function CyberThreatDashboard() {
  const { data, loading, error } = useThreatData()

  const [metrics, setMetrics] = useState({
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

  if (loading) return <LoadingScreen />
  if (error) return <ErrorScreen errorMessage={error} />

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="h-16 flex-shrink-0">
          <Header />
        </div>

        {/* Scrollable content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Your existing dashboard content remains the same */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 h-32">
            <MetricCard title="Threats" value={metrics.threats} period="(All time)" icon={Shield} />
            <MetricCard title="Malware" value={metrics.malware} period="(All time)" icon={AlertTriangle} />
            <MetricCard title="Vulnerabilities" value={metrics.vulnerabilities} period="(All time)" icon={FileText} />
          </div>

          {/* First Row - Threats, Malware, C2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 h-96">
            <ErrorBoundary>
              <DashboardSection title="Top Threat Categories" className="h-full">
                {data?.threatCategories?.length ? (
                  <BarChart
                    data={data.threatCategories.map(item => ({
                      label: item.Category || "Unknown",
                      value: item["Count of TID"] || 0,
                      secondaryValue: item["Count of IP"] || 0,
                      color: "bg-red-500",
                    }))}
                    showSecondaryValue
                    valueLabel="TID"
                    secondaryLabel="IPs"
                    height={300}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                    No threat categories data
                  </div>
                )}
              </DashboardSection>
            </ErrorBoundary>

            <ErrorBoundary>
              <DashboardSection title="Top Malware/Spambots" className="h-full">
                {data?.malware?.length ? (
                  <BarChart
                    data={data.malware.map(item => ({
                      label: item.Infection || "Unknown",
                      value: item["Frequency of Occurrence"] || 0,
                      secondaryValue: item["Count of Unique IPs"] || 0,
                      color: "bg-orange-500",
                    }))}
                    showSecondaryValue
                    valueLabel="Freq"
                    secondaryLabel="IPs"
                    height={300}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                    No malware data
                  </div>
                )}
              </DashboardSection>
            </ErrorBoundary>

            <ErrorBoundary>
              <DashboardSection title="Top Command & Control IPs" className="h-full">
                {data?.c2Ips?.length ? (
                  <HorizontalBarChart
                    data={data.c2Ips.map(item => ({
                      label: item.IP || "Unknown",
                      value: item["Unique Count"] || 0,
                      color: "bg-purple-500",
                    }))}
                    height={300}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                    No C2 IP data
                  </div>
                )}
              </DashboardSection>
            </ErrorBoundary>
          </div>

          {/* Second Row - Regions, ISPs, Heatmap */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-22">
            <ErrorBoundary>
              <DashboardSection title="Top Nigerian Regions" className="lg:col-span-3 h-96">
                {data?.regions?.length ? (
                  <RegionsList data={data.regions} height={350} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                    No regions data
                  </div>
                )}
              </DashboardSection>
            </ErrorBoundary>

            <ErrorBoundary>
              <DashboardSection title="Top ISPs (ASNames)" className="lg:col-span-3 h-96">
                {data?.isps?.length ? (
                  <HorizontalBarChart
                    data={data.isps.map(item => ({
                      label: item.ASNName || "Unknown",
                      value: item.Count || 0,
                      color: "bg-blue-500",
                    }))}
                    height={350}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                    No ISP data
                  </div>
                )}
              </DashboardSection>
            </ErrorBoundary>

            <ErrorBoundary>
              <DashboardSection title="Nigerian Cities Threat Heatmap" className="lg:col-span-6 h-96">
                {/* Your heatmap content */}
              </DashboardSection>
            </ErrorBoundary>
          </div>

          {/* Third Row - Reports & Top ISPs */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-96">
            <ErrorBoundary>
              <DashboardSection title="Telecom Threat Intelligence Reports" className="lg:col-span-3 h-full">
                {data?.telecomThreats?.length ? (
                  <TelecomThreatsList data={data.telecomThreats} height={220} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                    No telecom threats data
                  </div>
                )}
              </DashboardSection>
            </ErrorBoundary>

            <ErrorBoundary>
              <DashboardSection title="Top ISPs (ASNames)" className="lg:col-span-1 h-full">
                {data?.isps?.length ? (
                  <HorizontalBarChart
                    data={data.isps.slice(0, 5).map(item => ({
                      label: item.ASNName || "Unknown",
                      value: item.Count || 0,
                      color: "bg-blue-500",
                    }))}
                    height={220}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                    No ISP data
                  </div>
                )}
              </DashboardSection>
            </ErrorBoundary>
          </div>
        </main>
      </div>

      {/* Floating AI Assistant */}
      <FloatingAIAssistant />
    </div>
  )
}