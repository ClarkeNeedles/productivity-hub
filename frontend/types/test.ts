import type { DashboardWidget } from "./dashboard-widget";
import { ModuleCard } from "./module-card";
import { ModulePage } from "./module-page";
import { ModuleSettingsPage } from "./module-settings-page";
import { BaseModule } from "./base-module";

// 1. Define a shared state shape so the Settings Page can customize the Preview Card
interface ServerModuleState {
  selectedCardStats: DashboardWidget[];
  activeCharts: string[];
}

// 2. Concrete Parts implementations
class ServerModuleCard extends ModuleCard {
  constructor(private state: ServerModuleState) {
    super(true);
    this.activeStats = this.initializeDefaultTelemetry();
  }
  
  initializeDefaultTelemetry() { return []; /* Default CPU/Ram widgets */ }
  render() { return "Server Card Markup"; }
}

class ServerModulePage extends ModulePage {
  renderHeader() { return "Server Node Overview Header"; }
  renderContentArea() { return "Primary Sandbox Shell Server Workspace UI"; }
  renderSecondaryUtilities() { return "Telemetry Feed Sidebar Widgets"; }
}

class ServerSettingsPage extends ModuleSettingsPage {
  constructor(private state: ServerModuleState) { super(); }
  
  renderHeader() { return "Server Settings Header Grid"; }
  renderSecondaryUtilities() { return "Node Utility Actions Bar"; }
  
  // 1.3 Preview Card Configuration 
  renderModuleCardConfigSection() { 
    return "UI to update state.selectedCardStats (Max 2 stats limit enforced)"; 
  }
  
  // 1.3 Open Module View Configuration
  renderModulePageConfigSection() { 
    return "UI to toggle active chart IDs within state.activeCharts"; 
  }
}

// 3. Main Standard Module Instantiation Assembly
export class ServerModule extends BaseModule<ServerModuleCard, ServerModulePage, ServerSettingsPage> {
  constructor() {
    // Generate a unified local state context for this specific module package instance
    const sharedModuleContextState: ServerModuleState = {
      selectedCardStats: [],
      activeCharts: ['default-cpu']
    };

    super(
      "server-monitoring-node",
      "Core Infrastructure Node",
      new ServerModuleCard(sharedModuleContextState), // Automatically handles 2 flex columns
      new ServerModulePage(),
      new ServerSettingsPage(sharedModuleContextState)
    );
  }
}
