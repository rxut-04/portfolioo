import { useState, useEffect } from 'react';

/**
 * Pure Line Graph Statistics Component
 * Contains only the graph element: SVG curves, area fills, grid, interactive points, and tooltip.
 */
export function LineGraph({ className = '' }: { className?: string }) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [chartVisible, setChartVisible] = useState<boolean>(false);

  // 30 days dataset from the provided component
  const currentData = {
    dates: ['Jun 1', 'Jun 3', 'Jun 5', 'Jun 7', 'Jun 9', 'Jun 12', 'Jun 15', 'Jun 18', 'Jun 21', 'Jun 24', 'Jun 27', 'Jun 30'],
    mobile: [290, 270, 310, 280, 260, 350, 320, 340, 400, 370, 420, 480],
    desktop: [200, 180, 220, 255, 230, 280, 260, 270, 300, 285, 310, 320],
  };

  const maxValue = Math.max(...currentData.mobile, ...currentData.desktop) * 1.1;

  // Generate path for smooth curves
  const generateSmoothPath = (values: number[], height = 340, isArea = false) => {
    const width = 800;
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const points = values.map((value, index) => ({
      x: padding + (index / (values.length - 1)) * chartWidth,
      y: padding + (1 - value / maxValue) * chartHeight
    }));

    if (points.length < 2) return '';

    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      
      const cp1x = prev.x + (curr.x - prev.x) * 0.5;
      const cp1y = prev.y;
      const cp2x = curr.x - (next ? (next.x - curr.x) * 0.3 : 0);
      const cp2y = curr.y;
      
      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
    }
    
    if (isArea) {
      path += ` L ${points[points.length - 1].x},${height - padding} L ${padding},${height - padding} Z`;
    }
    
    return path;
  };

  useEffect(() => {
    // Smooth initial animation
    const timer = setTimeout(() => setChartVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      <div className="w-full h-64 sm:h-80 md:h-96 relative">
        <svg className="w-full h-full object-contain" viewBox="0 0 800 370">
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="currentColor" className="text-zinc-200/60 dark:text-zinc-800/50" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="800" height="370" fill="url(#grid)"/>

          {/* Desktop Area Fill */}
          <path
            d={generateSmoothPath(currentData.desktop, 320, true)}
            fill="currentColor"
            className={`text-zinc-500/10 dark:text-zinc-400/10 transition-all duration-1000 ${
              chartVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: chartVisible ? 'scale(1)' : 'scale(0.97)',
              transformOrigin: 'center bottom'
            }}
          />

          {/* Mobile Area Fill */}
          <path
            d={generateSmoothPath(currentData.mobile, 320, true)}
            fill="rgba(59, 130, 246, 0.09)"
            className={`transition-all duration-1000 ${
              chartVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: chartVisible ? 'scale(1)' : 'scale(0.97)',
              transformOrigin: 'center bottom',
              transitionDelay: '150ms'
            }}
          />

          {/* Desktop Line */}
          <path
            d={generateSmoothPath(currentData.desktop, 320)}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={`text-zinc-600 dark:text-zinc-400 transition-all duration-1000 ${
              chartVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Mobile Line */}
          <path
            d={generateSmoothPath(currentData.mobile, 320)}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={`transition-all duration-1000 ${
              chartVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Data Points */}
          {currentData.dates.map((date, index) => {
            const padding = 50;
            const chartWidth = 800 - padding * 2;
            const chartHeight = 320 - padding * 2;
            const x = padding + (index / (currentData.dates.length - 1)) * chartWidth;
            const mobileY = padding + (1 - currentData.mobile[index] / maxValue) * chartHeight;
            const desktopY = padding + (1 - currentData.desktop[index] / maxValue) * chartHeight;
            const isHovered = hoveredPoint === index;
            
            return (
              <g key={index}>
                {/* Desktop Point */}
                <circle
                  cx={x}
                  cy={desktopY}
                  r={isHovered ? 5.5 : 3}
                  fill="currentColor"
                  className={`text-zinc-700 dark:text-zinc-300 transition-all duration-200 cursor-pointer ${
                    chartVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                
                {/* Mobile Point */}
                <circle
                  cx={x}
                  cy={mobileY}
                  r={isHovered ? 5.5 : 3}
                  fill="#3b82f6"
                  className={`transition-all duration-200 cursor-pointer ${
                    chartVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}

          {/* X-axis Date Labels */}
          {currentData.dates.map((date, index) => {
            const padding = 50;
            const chartWidth = 800 - padding * 2;
            const x = padding + (index / (currentData.dates.length - 1)) * chartWidth;
            
            return (
              <text
                key={index}
                x={x}
                y={345}
                textAnchor="middle"
                fill="currentColor"
                fontSize="12"
                fontWeight="500"
                className={`text-zinc-400 dark:text-zinc-500 font-mono transition-all duration-500 ${
                  chartVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {date}
              </text>
            );
          })}

          {/* Interactive Hover Tooltip */}
          {hoveredPoint !== null && (
            <g className="pointer-events-none">
              <rect
                x={Math.max(10, Math.min(680, 50 + (hoveredPoint / (currentData.dates.length - 1)) * 700 - 55))}
                y={15}
                width="110"
                height="64"
                rx="8"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                className="text-white dark:text-[#18181b] fill-white dark:fill-[#18181b] stroke-zinc-200 dark:stroke-zinc-800 drop-shadow-xl"
              />
              <text
                x={Math.max(65, Math.min(735, 50 + (hoveredPoint / (currentData.dates.length - 1)) * 700))}
                y={34}
                textAnchor="middle"
                fill="currentColor"
                fontSize="12"
                fontWeight="700"
                className="text-zinc-900 dark:text-zinc-100"
              >
                {currentData.dates[hoveredPoint]}
              </text>
              <text
                x={Math.max(65, Math.min(735, 50 + (hoveredPoint / (currentData.dates.length - 1)) * 700))}
                y={51}
                textAnchor="middle"
                fill="#3b82f6"
                fontSize="11"
                fontWeight="600"
              >
                Mobile: {currentData.mobile[hoveredPoint]}
              </text>
              <text
                x={Math.max(65, Math.min(735, 50 + (hoveredPoint / (currentData.dates.length - 1)) * 700))}
                y={68}
                textAnchor="middle"
                fill="currentColor"
                fontSize="11"
                fontWeight="500"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Desktop: {currentData.desktop[hoveredPoint]}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

export default LineGraph;
