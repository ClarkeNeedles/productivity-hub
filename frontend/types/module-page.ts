import type { ReactNode } from "react";
import type { BaseModule } from "@/types/base-module";

export abstract class ModulePage {
  // Inject the parent module context directly into the render signature
  abstract renderContentArea(module: BaseModule<any, any, any>): ReactNode; // Primary page view
  abstract renderSecondaryUtilities(module: BaseModule<any, any, any>): ReactNode; // Optional widgets at the base of the layout
}
