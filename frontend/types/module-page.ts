import type { ReactNode } from "react";

export abstract class ModulePage {
  constructor(private readonly _pageSubtitle: string) {}

  public get pageSubtitle(): string { return this._pageSubtitle; }
  
  // Supplies the primary interactive canvas grid and operational dashboard interfaces for this page view.
  abstract renderContentArea(): ReactNode;
  // Yields optional auxiliary tools, secondary telemetry feeds, or contextual settings widgets at the base of the layout.
  abstract renderSecondaryUtilities(): ReactNode;
}
