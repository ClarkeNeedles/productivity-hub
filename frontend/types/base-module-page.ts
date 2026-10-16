import type { ReactNode } from "react";

export interface ModulePageContext {
  readonly id: string;
  readonly title: string;
}

export interface BaseModulePage {
  renderContentArea(module: ModulePageContext): ReactNode;
}
