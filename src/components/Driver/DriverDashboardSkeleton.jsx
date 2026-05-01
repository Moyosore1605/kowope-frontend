import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';

function DriverDashboardSkeleton() {
  const { darkMode } = useContext(DarkModeContext);
  const dk = darkMode;

  const base = dk ? "bg-gray-800" : "bg-gray-200";
  const card = dk ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  const shimmer = `animate-pulse rounded-lg ${base}`;

  return (
    <div className="flex-1 p-6">

      {/* Greeting */}
      <div className="mb-8">
        <div className={`h-8 w-56 mb-2 ${shimmer}`} />
        <div className={`h-4 w-40 ${shimmer}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left column */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Status card */}
          <div className={`p-6 rounded-2xl border shadow-sm ${card}`}>
            <div className={`h-5 w-32 mb-4 ${shimmer}`} />
            <div className="flex items-center justify-between">
              <div>
                <div className={`h-4 w-36 mb-2 ${shimmer}`} />
                <div className={`h-3 w-24 ${shimmer}`} />
              </div>
              <div className={`h-9 w-28 rounded-xl ${shimmer}`} />
            </div>
          </div>

          {/* Recent Payments card */}
          <div className={`p-6 rounded-2xl border shadow-sm ${card}`}>
            <div className="flex items-center justify-between mb-5">
              <div className={`h-5 w-40 ${shimmer}`} />
              <div className={`h-3 w-12 ${shimmer}`} />
            </div>

            {/* Table header */}
            <div className="flex gap-4 pb-3 mb-1">
              <div className={`h-3 w-16 ${shimmer}`} />
              <div className={`h-3 w-10 ${shimmer}`} />
              <div className={`h-3 w-12 ${shimmer}`} />
            </div>

            {/* Table rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-2.5"
                style={{ borderTop: dk ? '1px solid #1f2937' : '1px solid #f1f5f9' }}
              >
                <div className={`h-3 w-28 ${shimmer}`} />
                <div className={`h-3 w-12 ${shimmer}`} />
                <div className={`h-5 w-14 rounded-md ${shimmer}`} />
              </div>
            ))}
          </div>
        </div>

        {/* QR Code panel */}
        <div className={`p-6 rounded-2xl border shadow-sm flex flex-col ${card}`}>
          <div className={`h-5 w-20 mb-5 ${shimmer}`} />

          {/* QR box */}
          <div className="flex flex-col items-center gap-4">
            <div className={`w-40 h-40 rounded-2xl ${shimmer}`} />

            <div className={`h-3 w-48 ${shimmer}`} />
            <div className={`h-3 w-36 ${shimmer}`} />

            {/* Detail rows */}
            <div className="w-full mt-1 flex flex-col gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2"
                  style={{ borderBottom: dk ? '1px solid #1f2937' : '1px solid #f1f5f9' }}
                >
                  <div className={`h-3 w-24 ${shimmer}`} />
                  <div className={`h-3 w-20 ${shimmer}`} />
                </div>
              ))}
            </div>

            {/* Countdown bar */}
            <div className={`w-full h-9 rounded-xl ${shimmer}`} />

            {/* Share button */}
            <div className={`w-full h-10 rounded-xl ${shimmer}`} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default DriverDashboardSkeleton;