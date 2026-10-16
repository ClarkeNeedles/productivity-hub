import type { ComponentType } from "react";

export interface BaseModuleMetric<TId extends string = string> {
  readonly id: TId;
  readonly name: string;

  readonly renderMetric: ComponentType;
}
