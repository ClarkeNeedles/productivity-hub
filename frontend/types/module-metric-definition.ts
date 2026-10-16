import type { ComponentType } from "react";

export interface ModuleMetricDefinition<TId extends string = string> {
  readonly id: TId;
  readonly name: string;

  readonly renderMetric: ComponentType;
}