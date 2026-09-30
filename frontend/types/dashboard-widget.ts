import type { ReactNode } from 'react';

export interface DashboardWidget {
  readonly id: string;
  readonly name: string;
  renderMicroVariant(): ReactNode; // Scaled down version for fitting into ModuleCard slots
  renderFullVariant(): ReactNode;  // Full component rendered in the ModulePage view
}
