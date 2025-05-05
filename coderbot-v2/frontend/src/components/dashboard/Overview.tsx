import React from "react";

export function Overview() {
  // This would ideally use a chart library like recharts, but for now we'll use a simple placeholder
  return (
    <div className="w-full h-[300px] flex justify-center items-center">
      <div className="relative w-full h-full">
        {/* Simulate a chart with CSS */}
        <div className="absolute bottom-0 left-0 w-full h-[240px] bg-gradient-to-t from-primary/10 to-transparent rounded-md"></div>
        <div className="absolute bottom-0 left-0 w-full h-[240px] flex items-end">
          {[0.2, 0.4, 0.3, 0.6, 0.5, 0.7, 0.9].map((height, i) => (
            <div
              key={i}
              className="flex-1 mx-1 bg-primary rounded-t-md"
              style={{ height: `${height * 200}px` }}
            ></div>
          ))}
        </div>
        
        {/* X Axis */}
        <div className="absolute bottom-[-24px] left-0 w-full flex justify-between text-xs text-muted-foreground">
          <span>Seg</span>
          <span>Ter</span>
          <span>Qua</span>
          <span>Qui</span>
          <span>Sex</span>
          <span>Sáb</span>
          <span>Dom</span>
        </div>
        
        {/* Y Axis */}
        <div className="absolute top-0 left-[-30px] h-full flex flex-col justify-between text-xs text-muted-foreground">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
      </div>
    </div>
  );
} 