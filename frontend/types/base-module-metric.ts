import type { ReactNode } from 'react';

export interface BaseModuleMetric<TId extends string = string> {
  readonly id: TId;
  readonly name: string;

  // Scaled down version for fitting into ModuleCard slots
  renderMicroVariant(): ReactNode;
  // Full component rendered in the ModulePage view
  renderFullVariant?(): ReactNode;
}
