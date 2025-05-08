/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  variant?: "dark" | "light";
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  variant = "light",
  spotlightColor
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const defaultSpotlightColor = variant === "light" 
    ? "rgba(139, 92, 246, 0.15)" // Purple for light mode
    : "rgba(168, 85, 247, 0.25)"; // Purple for dark mode

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-3xl p-8",
        variant === "light" 
          ? "border-purple-100 bg-white/90 shadow-sm backdrop-blur-sm" 
          : "border-purple-800 bg-purple-900/90 backdrop-blur-sm",
        "transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/10",
        className
      )}
    >
      {/* Spotlight gradient */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${spotlightColor || defaultSpotlightColor}, transparent 40%)`,
        }}
      />

      {/* Ambient gradient background */}
      <div
        className={cn(
          "absolute inset-0 opacity-30",
          variant === "light" 
            ? "bg-gradient-to-br from-purple-100 via-white to-purple-50" 
            : "bg-gradient-to-br from-purple-800 to-purple-900"
        )}
      />

      {/* Edge gradient highlight */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-300",
          variant === "light"
            ? "bg-gradient-to-br from-purple-200/20 via-transparent to-purple-200/20"
            : "bg-gradient-to-br from-purple-400/10 via-transparent to-purple-400/5",
          "group-hover:opacity-100"
        )}
      />

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
};

export default SpotlightCard;