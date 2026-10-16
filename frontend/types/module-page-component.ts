import type { ComponentType } from "react";

export interface ModulePageContext {
  readonly id: string;
  readonly title: string;
}

export type ModulePageProps = {
  module: ModulePageContext;
};

export type ModulePageComponent = ComponentType<ModulePageProps>;