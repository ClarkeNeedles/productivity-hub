import type { BaseModuleMetric } from "@/types/base-module-metric";

type MetricSlotsProps = {
  metrics: readonly BaseModuleMetric[];
  maxMetrics: number;
};

export function MetricSlots({ metrics, maxMetrics }: MetricSlotsProps) {
  const visibleMetrics = metrics.slice(0, maxMetrics);

  if (visibleMetrics.length === 0) return null;

  return (
    <div
      className={`grid w-full gap-3 ${
        visibleMetrics.length === 1 ? "grid-cols-1" : "grid-cols-2"
      }`}
    >
      {visibleMetrics.map((metric) => (
        <div key={metric.id}>{metric.renderMicroVariant()}</div>
      ))}
    </div>
  );
}
