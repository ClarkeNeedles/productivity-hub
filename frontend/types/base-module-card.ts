import type { ReactNode } from "react";
import type { BaseModuleMetric } from "@/types/base-module-metric";
import type { BaseModule } from "@/types/base-module";

export type BaseModuleCardOptions = {
  readonly showOptions?: boolean;
  readonly showTitle?: boolean;
  readonly activeStats?: BaseModuleMetric[];
};

export abstract class BaseModuleCard {
  public readonly maxMetrics = 2;
  private readonly _showOptions: boolean;
  private readonly _showTitle: boolean;

  constructor(options: BaseModuleCardOptions = {}) {
    this._showOptions = options.showOptions ?? true;
    this._showTitle = options.showTitle ?? true;
  }

  public get showOptions(): boolean {
    return this._showOptions;
  }
  public get showTitle(): boolean {
    return this._showTitle;
  }
}
