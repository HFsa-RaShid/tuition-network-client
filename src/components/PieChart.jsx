import React from "react";

// Simple SVG pie/donut chart component
// props:
// - data: [{ label, value, color }]
// - size: number (px)
// - innerRadius: number (px) for donut hole (0 for full pie)
const PieChart = ({ data = [], size = 160, innerRadius = 48 }) => {
  const total = data.reduce((s, d) => s + (d.value || 0), 0) || 1;
  const radius = size / 2;
  let cumulative = 0;

  const polarToCartesian = (cx, cy, r, angleDeg) => {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  };

  const createSlicePath = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      `M ${cx} ${cy}`,
      `L ${start.x} ${start.y}`,
      `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      "Z",
    ].join(" ");
  };

  const slices = data.map((d) => {
    const value = d.value || 0;
    const startAngle = (cumulative / total) * 360;
    cumulative += value;
    const endAngle = (cumulative / total) * 360;
    return { ...d, startAngle, endAngle };
  });

  // reset cumulative for potential reuse
  cumulative = 0;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g>
          {slices.map((s, idx) => (
            <path
              key={idx}
              d={createSlicePath(
                size / 2,
                size / 2,
                radius,
                s.startAngle,
                s.endAngle
              )}
              fill={s.color || `hsl(${(idx / slices.length) * 360} 70% 50%)`}
              stroke="#fff"
              strokeWidth="1"
            />
          ))}

          {/* center circle to create donut effect */}
          {innerRadius > 0 && (
            <circle cx={size / 2} cy={size / 2} r={innerRadius} fill="#fff" />
          )}
        </g>
      </svg>

      {/* legend */}
      <div className="mt-3 w-full max-w-[220px]">
        {data.map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-between text-xs mb-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded"
                style={{ background: d.color }}
              />
              <span
                className="text-gray-600 truncate"
                style={{ maxWidth: 120 }}
              >
                {d.label}
              </span>
            </div>
            <div className="text-gray-700 font-semibold">{d.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
