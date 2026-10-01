import type { ReactNode } from "react";
import { BaseModulePage } from "@/types/base-module-page";

export abstract class BaseModuleSettingsPage extends BaseModulePage {
  constructor(
    private _lifeScoreFactor: number = 1.0,
  ) { 
    super(); 
  }

  public get lifeScoreFactor(): number {
    return this._lifeScoreFactor;
  }

  public set lifeScoreFactor(value: number) {
    this._lifeScoreFactor = this.validateFactor(value);
    this.onConfigurationChanged(); // Central hook for triggers/side-effects
  }

  // Fulfills the standard Content Area by placing the required configuration views inside it
  public override renderContentArea(): ReactNode {
    return (
      this.renderModuleCardConfigSection() ||
      this.renderModulePageConfigSection()
    );
  }

  // Purpose-built customization hooks
  abstract renderModuleCardConfigSection(): ReactNode;
  abstract renderModulePageConfigSection(): ReactNode;

  // Optional lifecycle hook that triggers whenever settings update
  protected onConfigurationChanged(): void {
    // Override in concrete implementations to save to localstorage or trigger a dispatcher
  }

  private validateFactor(value: number): number {
    if (value < 0 || value > 1) {
      throw new Error(`lifeScoreFactor must be between 0 and 1.`);
    }
    return value;
  }
}