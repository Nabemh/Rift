"use client"

import { useState, useCallback } from "react"
import type { Report, ReportSection, SectionType, ViewMode } from "@/types/report"

const initialReport: Report = {
  id: "1",
  metadata: {
    title: "Untitled Report",
    createdAt: new Date(),
    updatedAt: new Date(),
    author: "Current User",
    status: "draft",
  },
  sections: [
    {
      id: "section-executive-summary",
      type: "executive-summary",
      title: "Executive Summary",
      content: "",
      order: 0,
      isEditable: true,
    },
    {
      id: "section-key-findings",
      type: "key-findings",
      title: "Key Findings Snapshot",
      content: "",
      order: 1,
      isEditable: true,
    },
    {
      id: "section-threat-landscape",
      type: "threat-landscape",
      title: "Threat Landscape Overview",
      content: "",
      order: 2,
      isEditable: true,
    },
    {
      id: "section-alerts-warnings",
      type: "alerts-warnings",
      title: "Alerts & Warning Activities",
      content: "",
      order: 3,
      isEditable: true,
    },
    {
      id: "section-recommendations",
      type: "recommendations",
      title: "Recommendations",
      content: "",
      order: 4,
      isEditable: true,
    },
    {
      id: "section-appendix",
      type: "appendix",
      title: "Appendix",
      content: "",
      order: 5,
      isEditable: true,
    },
  ],
}

export function useReport() {
  const [report, setReport] = useState<Report>(initialReport)
  const [viewMode, setViewMode] = useState<ViewMode>("edit")
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)

  const updateTitle = useCallback((title: string) => {
    setReport((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        title,
        updatedAt: new Date(),
      },
    }))
  }, [])

  const addSection = useCallback(
    (type: SectionType) => {
      const newSection: ReportSection = {
        id: `section-${Date.now()}`,
        type,
        title: getSectionTitle(type),
        content: "",
        order: report.sections.length,
        isEditable: true,
      }

      setReport((prev) => ({
        ...prev,
        sections: [...prev.sections, newSection],
        metadata: {
          ...prev.metadata,
          updatedAt: new Date(),
        },
      }))
    },
    [report.sections.length],
  )

  const updateSection = useCallback((sectionId: string, updates: Partial<ReportSection>) => {
    setReport((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (section.id === sectionId ? { ...section, ...updates } : section)),
      metadata: {
        ...prev.metadata,
        updatedAt: new Date(),
      },
    }))
  }, [])

  const deleteSection = useCallback((sectionId: string) => {
    setReport((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== sectionId),
      metadata: {
        ...prev.metadata,
        updatedAt: new Date(),
      },
    }))
  }, [])

  const reorderSections = useCallback((sections: ReportSection[]) => {
    setReport((prev) => ({
      ...prev,
      sections: sections.map((section, index) => ({ ...section, order: index })),
      metadata: {
        ...prev.metadata,
        updatedAt: new Date(),
      },
    }))
  }, [])

  const regenerateSection = useCallback(async (sectionId: string) => {
    // Placeholder for AI regeneration
    console.log("Regenerating section:", sectionId)
    // This would call an AI API to regenerate the section content
  }, [])

  return {
    report,
    viewMode,
    selectedSectionId,
    setViewMode,
    setSelectedSectionId,
    updateTitle,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    regenerateSection,
  }
}

function getSectionTitle(type: SectionType): string {
  const titles = {
    "executive-summary": "Executive Summary",
    "key-findings": "Key Findings Snapshot",
    "threat-landscape": "Threat Landscape Overview",
    "alerts-warnings": "Alerts & Warning Activities",
    recommendations: "Recommendations",
    appendix: "Appendix",
  }
  return titles[type]
}
