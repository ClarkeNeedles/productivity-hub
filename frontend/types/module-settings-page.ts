import type { ReactNode } from "react";
import { ModulePage } from "@/types/module-page";

export abstract class ModuleSettingsPage extends ModulePage {
  private _lifeScoreFactor: number;

  constructor(lifeScoreFactor = 1.0) {
    super("Settings");
    this._lifeScoreFactor = lifeScoreFactor
  }

  public get lifeScoreFactor(): number {
    return this._lifeScoreFactor;
  }

  public set lifeScoreFactor(value: number) {
    this._lifeScoreFactor = this.validateFactor(value);
    this.onConfigurationChanged(); // Central hook for triggers/side-effects
  }

  private validateFactor(value: number): number {
    if (value < 0 || value > 1) {
      throw new Error(`lifeScoreFactor must be between 0 and 1.`);
    }
    return value;
  }

  // Optional lifecycle hook that triggers whenever settings update
  protected onConfigurationChanged(): void {
    // Override in concrete implementations to save to localstorage or trigger a dispatcher
  }

  // Purpose-built customization hooks
  abstract renderModuleCardConfigSection(): ReactNode;
  abstract renderModulePageConfigSection(): ReactNode;

  // Fulfills the standard Content Area by placing the required configuration views inside it
  public override renderContentArea(): ReactNode {
    return (
      this.renderModuleCardConfigSection() ||
      this.renderModulePageConfigSection()
    );
  }
}