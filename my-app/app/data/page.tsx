"use client";

import { useEffect, useState } from "react"

type ThreatRecord = {
  TID: string
  ThreatID: string
  IP: string
  Category: string
  Type: string
  Region: string
  Country: string
  [key: string]: string
}

export default function ThreatTablePage() {
  const [data, setData] = useState<ThreatRecord[]>([])
  const [page, setPage] = useState<number>(0)
  const limit = 20

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/table?skip=${page * limit}&limit=${limit}`)
        const json = await res.json()
        setData(json.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [page])

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Threat Records</h1>
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">TID</th>
            <th className="p-2 border">IP</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Region</th>
            <th className="p-2 border">Country</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className="text-sm">
              <td className="p-2 border">{record.TID}</td>
              <td className="p-2 border">{record.IP}</td>
              <td className="p-2 border">{record.Category}</td>
              <td className="p-2 border">{record.Type}</td>
              <td className="p-2 border">{record.Region}</td>
              <td className="p-2 border">{record.Country}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex gap-2">
        <button
          className="bg-gray-200 px-3 py-1 rounded"
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>
        <span className="px-2">Page {page + 1}</span>
        <button
          className="bg-gray-200 px-3 py-1 rounded"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
