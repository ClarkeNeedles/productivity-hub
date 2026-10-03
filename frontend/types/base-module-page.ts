import type { ReactNode } from "react";
import type { BaseModule } from "@/types/base-module";

export interface BaseModulePage {
  renderContentArea(module: BaseModule): ReactNode;
}
