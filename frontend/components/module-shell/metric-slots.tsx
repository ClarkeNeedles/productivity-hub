import type { ModuleMetricDefinition } from "@/types/module-metric-definition";

type MetricSlotsProps = {
  metrics: readonly ModuleMetricDefinition[];
  maxMetrics: number;
};

export function MetricSlots({ metrics, maxMetrics }: MetricSlotsProps) {
  const visibleMetrics = metrics.slice(0, maxMetrics);

  if (visibleMetrics.length === 0) return null;

  return (
    <div
      className={`grid w-full gap-3 ${visibleMetrics.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
    >
      {visibleMetrics.map((metric) => (
        <div key={metric.id} className="flex items-center justify-center">
          <metric.renderMetric />
        </div>
      ))}
    </div>
  );
}
