export class BaseModuleCard {
  public constructor(
    public readonly showOptions: boolean = true,
    public readonly showTitle: boolean = true,
    public readonly maxMetrics: number = 2,
  ) {}
};
