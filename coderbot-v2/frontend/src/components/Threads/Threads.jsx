/*
	Installed from https://reactbits.dev/default/
*/

import React, { useMemo } from 'react';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import './Threads.css';

const Threads = ({ amplitude = 1, distance = 0, enableMouseInteraction = true }) => {
  // Generate thread items with random heights and widths
  const threads = useMemo(() => {
    const items = [];
    const colors = [
      'rgba(124, 58, 237, 0.3)',  // Primary color (purple)
      'rgba(14, 165, 233, 0.3)',   // Secondary color (blue)
      'rgba(244, 114, 182, 0.3)',  // Accent color (pink)
    ];
    
    // Create 15 threads with different heights, widths and colors
    for (let i = 0; i < 15; i++) {
      const width = Math.floor(Math.random() * 3) + 1; // 1-3
      const height = Math.floor(Math.random() * 200) + 100; // 100-300px
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      items.push({
        content: (
          <div 
            className="thread"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              backgroundColor: color,
              opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity
              transform: `translateX(${Math.random() * 100}px)`,
            }}
          />
        )
      });
    }
    
    return items;
  }, []);

  return (
    <div className="threads-container">
      {/* Left Column */}
      <div className="threads-column">
        <InfiniteScroll
          items={threads}
          width="100%"
          itemMinHeight={50}
          autoplay={true}
          autoplaySpeed={amplitude}
          autoplayDirection="down"
          pauseOnHover={enableMouseInteraction}
          isTilted={false}
        />
      </div>
      
      {/* Center Column */}
      <div className="threads-column">
        <InfiniteScroll
          items={threads}
          width="100%"
          itemMinHeight={70}
          autoplay={true}
          autoplaySpeed={amplitude * 0.7}
          autoplayDirection="up"
          pauseOnHover={enableMouseInteraction}
          isTilted={false}
        />
      </div>
      
      {/* Right Column */}
      <div className="threads-column">
        <InfiniteScroll
          items={threads}
          width="100%"
          itemMinHeight={60}
          autoplay={true}
          autoplaySpeed={amplitude * 0.85}
          autoplayDirection="down"
          pauseOnHover={enableMouseInteraction}
          isTilted={false}
        />
      </div>
    </div>
  );
};

export default Threads;
