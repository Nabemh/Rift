"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundGrid = ({
  className,
  size = 60,
  lineWidth = 0.5,
  opacity = 0.3,
  color = "#3b82f6",
  blur = 0,
}: {
  className?: string;
  size?: number;
  lineWidth?: number;
  opacity?: number;
  color?: string;
  blur?: number;
}) => {
  const rows = Math.ceil(typeof window !== "undefined" ? window.innerHeight / size : 10);
  const cols = Math.ceil(typeof window !== "undefined" ? window.innerWidth / size : 10);

  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        className
      )}
      style={{
        backdropFilter: blur ? `blur(${blur}px)` : undefined,
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Horizontal lines */}
        {Array.from({ length: rows }).map((_, i) => (
          <motion.line
            key={`h-${i}`}
            x1="0"
            y1={i * size}
            x2="100%"
            y2={i * size}
            stroke={color}
            strokeWidth={lineWidth}
            strokeOpacity={opacity}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1,
              delay: i * 0.02,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Vertical lines */}
        {Array.from({ length: cols }).map((_, i) => (
          <motion.line
            key={`v-${i}`}
            x1={i * size}
            y1="0"
            x2={i * size}
            y2="100%"
            stroke={color}
            strokeWidth={lineWidth}
            strokeOpacity={opacity}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1,
              delay: i * 0.02,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Animated dots at intersections */}
      <div className="absolute inset-0">
        {Array.from({ length: rows }).map((_, row) => (
          Array.from({ length: cols }).map((_, col) => (
            <motion.div
              key={`dot-${row}-${col}`}
              className="absolute rounded-full"
              style={{
                left: col * size,
                top: row * size,
                width: lineWidth * 3,
                height: lineWidth * 3,
                backgroundColor: color,
                opacity,
              }}
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1, 0.8, 1],
                opacity: [0, opacity, opacity*0.8, opacity]
                }}
                transition={{
                    duration: 4,
                    delay: (row + col) * 0.02,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            />
          ))
        ))}
      </div>
    </div>
  );
};