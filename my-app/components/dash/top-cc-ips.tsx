"use client"
import { useEffect, useState } from "react"

interface CCIPData {
  IP: string
  "Unique Count": number
}

export default function TopC2IPsList() {
  const [data, setData] = useState<CCIPData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch("http://localhost:8000/api/summary/c2-ips")
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const resData = await response.json()
        console.log("C2 IPs API Response:", resData) // Debug log
        
        const summary = Array.isArray(resData?.summary_table)
          ? resData.summary_table
          : []
        
        setData(summary.slice(0, 10))
      } catch (err) {
        console.error("Failed to load C2 IPs", err)
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p className="text-sm text-gray-500">Loading C2 IPs...</p>
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>
  if (data.length === 0) return <p className="text-sm text-gray-500">No C2 IP data available</p>

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Top Command & Control IPs</h3>
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-4 py-3 border-b bg-gray-50 rounded-t-lg">
          <div className="flex justify-between items-center text-sm font-medium text-gray-700">
            <span>IP Address</span>
            <span>Unique Count</span>
          </div>
        </div>
        <ul className="divide-y divide-gray-200">
          {data.map((ip, idx) => (
            <li key={idx} className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                  {ip.IP}
                </span>
                <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                  {ip["Unique Count"]}
                </span>
              </div>
            </li>
          ))}
        </ul>
        {data.length > 0 && (
          <div className="px-4 py-2 bg-gray-50 border-t text-xs text-gray-500 rounded-b-lg">
            Showing top {data.length} Command & Control IPs
          </div>
        )}
      </div>
    </div>
  )
}