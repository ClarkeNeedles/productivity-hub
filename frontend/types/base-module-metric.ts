import type { ComponentType } from "react";

export interface BaseModuleMetric<TId extends string = string> {
  readonly id: TId;
  readonly name: string;

  // Scaled down version for fitting into ModuleCard slots
  readonly renderMicroVariant: ComponentType;
  // Full component rendered in the ModulePage view
  readonly renderFullVariant?: ComponentType;
}
