"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { PathOptions } from "leaflet";

interface RegionData {
  name: string;
  threatCount: number;
}

interface NigeriaRealMapProps {
  regionData: RegionData[];
  height?: number;
}

export function NigeriaRealMap({ regionData, height = 400 }: NigeriaRealMapProps) {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    fetch("/data/gadm41_NGA_1.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);

  const getColor = (threatCount: number) => {
    if (threatCount > 10000) return "#b91c1c"; // red
    if (threatCount > 5000) return "#ea580c"; // orange
    if (threatCount > 1000) return "#eab308"; // yellow
    if (threatCount > 100) return "#3b82f6"; // blue
    return "#22c55e"; // green
  };

  const styleFeature = (feature?: Feature<Geometry, GeoJsonProperties>): PathOptions => {
    const regionName = feature?.properties?.NAME_1?.toLowerCase() || "";
    const region = regionData.find((r) => r.name.toLowerCase() === regionName);
    const threatCount = region?.threatCount || 0;

    return {
      fillColor: getColor(threatCount),
      weight: 1,
      opacity: 1,
      color: "gray",
      fillOpacity: 0.7,
    };
  };

  return (
    <div className="w-full rounded-lg overflow-hidden border" style={{ height }}>
      <MapContainer
        center={[9.082, 8.6753]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={styleFeature}
            onEachFeature={(feature, layer) => {
              const regionName = feature.properties?.NAME_1;
              const match = regionData.find(
                (r) => r.name.toLowerCase() === regionName?.toLowerCase()
              );
              const threatCount = match?.threatCount ?? 0;

              layer.bindTooltip(`${regionName}: ${threatCount} threats`, {
                sticky: true,
              });
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
