import type { ReactNode } from "react";

// Supporting layouts for standard components
export interface ModuleBreadcrumb { label: string; url: string; }
export interface ModuleAction { label: string; action: () => void; }

export abstract class ModulePage {
  abstract renderHeader(breadcrumbs: ModuleBreadcrumb[], actions: ModuleAction[]): ReactNode;
  abstract renderContentArea(): ReactNode;
  abstract renderSecondaryUtilities(): ReactNode;

  // Stitches the uniform layout for any expanded full-screen module workspace
  public renderWorkspace(breadcrumbs: ModuleBreadcrumb[], actions: ModuleAction[]): ReactNode {
    return (
      this.renderHeader(breadcrumbs, actions) ||
      this.renderContentArea() ||
      this.renderSecondaryUtilities()
    );
  }
}
