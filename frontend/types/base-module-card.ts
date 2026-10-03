export type BaseModuleCard = {
  readonly showOptions: boolean;
  readonly showTitle: boolean;
  readonly maxMetrics: number;
};

export type BaseModuleCardOptions = Partial<BaseModuleCard>;

export function createBaseModuleCard(options: BaseModuleCardOptions = {}): BaseModuleCard {
  return {
    showOptions: options.showOptions ?? true,
    showTitle: options.showTitle ?? true,
    maxMetrics: options.maxMetrics ?? 2,
  };
}
