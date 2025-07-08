"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  period?: string;  // Moved period to be standalone
  icon: LucideIcon;
}

export function MetricCard({ title, value, period, icon: Icon }: MetricCardProps) {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </CardTitle>
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {period && (
          <div className="absolute bottom-2 right-4 text-xs text-gray-400">
            {period}
          </div>
        )}
      </CardContent>
    </Card>
  );
}