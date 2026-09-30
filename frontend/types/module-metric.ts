import type { ReactNode } from 'react';

export interface ModuleMetric {
  readonly id: string;
  readonly name: string;

  // Scaled down version for fitting into ModuleCard slots
  renderMicroVariant(): ReactNode; 
  // Full component rendered in the ModulePage view
  renderFullVariant(): ReactNode;
}
