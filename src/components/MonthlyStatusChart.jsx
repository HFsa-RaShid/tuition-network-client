import React from "react";

// Simple grouped-bar SVG chart for monthly banned/unbanned percentages
// Props: data = [{ month: 'Jan', banned: 3, unbanned: 7 }, ...]
// Renders vertical axis as percentage (0% - 100%) and horizontal axis as months
const MonthlyStatusChart = ({ data = [], width = 360, height = 160 }) => {
  const padding = 12;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2 - 20;

  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-gray-500 text-center py-6">
        No monthly user-status data available
      </div>
    );
  }

  const groups = data.length;
  const groupWidth = chartWidth / groups;
  const barWidth = Math.max(10, Math.min(24, groupWidth / 2.8));
  // use raw counts on Y axis (number of users)
  const maxCount = Math.max(
    1,
    ...data.map((d) => Math.max(d.banned || 0, d.unbanned || 0))
  );

  return (
    <div>
      <svg width={width} height={height} className="block mx-auto">
        <g transform={`translate(${padding}, ${padding})`}>
          {/* Y-axis title (rotated) */}
          <text
            x={-36}
            y={chartHeight / 2}
            transform={`rotate(-90, -36, ${chartHeight / 2})`}
            fontSize={11}
            fill="#374151"
            textAnchor="middle"
          >
            Users (count)
          </text>
          {data.map((d, i) => {
            const x = i * groupWidth + (groupWidth - (barWidth * 2 + 6)) / 2;
            const total = (d.banned || 0) + (d.unbanned || 0) || 1;
            const bannedCount = d.banned || 0;
            const unbannedCount = d.unbanned || 0;
            const bannedH = (bannedCount / maxCount) * chartHeight;
            const unbannedH = (unbannedCount / maxCount) * chartHeight;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={chartHeight - unbannedH}
                  width={barWidth}
                  height={unbannedH}
                  rx={3}
                  fill="#10b981"
                />
                <text
                  x={x + barWidth / 2}
                  y={Math.max(10, chartHeight - unbannedH - 6)}
                  fontSize={10}
                  textAnchor="middle"
                  fill="#065f46"
                >
                  {unbannedCount}
                </text>
                <rect
                  x={x + barWidth + 6}
                  y={chartHeight - bannedH}
                  width={barWidth}
                  height={bannedH}
                  rx={3}
                  fill="#ef4444"
                />
                <text
                  x={x + barWidth + 6 + barWidth / 2}
                  y={Math.max(10, chartHeight - bannedH - 6)}
                  fontSize={10}
                  textAnchor="middle"
                  fill="#7f1d1d"
                >
                  {bannedCount}
                </text>
                <text
                  x={i * groupWidth + groupWidth / 2}
                  y={chartHeight + 14}
                  fontSize={10}
                  textAnchor="middle"
                  fill="#6b7280"
                >
                  {d.month}
                </text>
              </g>
            );
          })}

          {[0, 0.25, 0.5, 0.75, 1].map((t, idx) => {
            const val = Math.round(t * maxCount);
            return (
              <g key={idx}>
                <line
                  x1={0}
                  x2={chartWidth}
                  y1={chartHeight - t * chartHeight}
                  y2={chartHeight - t * chartHeight}
                  stroke="#e6e7eb"
                  strokeWidth={1}
                />
                {/* numeric tick label removed as requested */}
              </g>
            );
          })}
        </g>
        {/* X-axis title centered under months */}
        <text
          x={padding + chartWidth / 2}
          y={padding + chartHeight + 34}
          fontSize={11}
          fill="#374151"
          textAnchor="middle"
        >
          Month
        </text>
      </svg>

      <div className="flex items-center justify-center gap-4 text-xs mt-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ background: "#10b981" }} />
          <span className="text-gray-600">Unbanned</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ background: "#ef4444" }} />
          <span className="text-gray-600">Banned</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyStatusChart;
