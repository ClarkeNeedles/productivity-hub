import { create } from "zustand";
import type { BaseModule } from "@/types/base-module";
import { AddModuleModule } from "@/modules/add-module/add-module";
import { ModuleId } from "@/config/modules";

interface ModulesState {
  activeModules: BaseModule[];
  focusedModuleId: ModuleId | null;
  addModule: (module: BaseModule) => void;
  removeModule: (moduleId: ModuleId) => void;
  setFocusedModuleId: (moduleId: ModuleId | null) => void;
}

export const useModulesStore = create<ModulesState>((set, get) => ({
  activeModules: [new AddModuleModule()],
  focusedModuleId: null,

  addModule: (newModule) =>
    set((state) => {
      // Strip out add-module and new module if it exists
      const standardModules = state.activeModules.filter(
        (m) => m.id !== "add-module" && m.id !== newModule.id
      );
      const addModuleModule = state.activeModules.find((m) => m.id === "add-module") ?? new AddModuleModule();

      return {
        activeModules: [...standardModules, newModule, addModuleModule],
        focusedModuleId: null, // Auto-return back to dashboard grid view
      };
    }),

  removeModule: (moduleId) => {
    // Immediately abort if something tries to remove the utility card
    if (moduleId === "add-module") return;

    set((state) => ({
      activeModules: state.activeModules.filter(
        (item) => item.id !== moduleId
      ),
    }));
  },

  setFocusedModuleId: (moduleId) => set({ focusedModuleId: moduleId }),
}));
