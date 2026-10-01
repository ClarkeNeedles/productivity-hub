import { create } from "zustand";
import type { BaseModule } from "@/types/base-module";
import { AddModuleModule } from "@/modules/add-module";

interface ModulesState {
  activeModules: BaseModule<any, any, any>[];
  focusedModuleId: string | null;
  addModule: (module: BaseModule<any, any, any>) => void;
  removeModule: (moduleId: string) => void;
  getActiveModule: (moduleId: string) => BaseModule<any, any, any> | undefined;
  setFocusedModuleId: (moduleId: string | null) => void;
}

export const useModulesStore = create<ModulesState>((set, get) => ({
  activeModules: [new AddModuleModule()],
  focusedModuleId: null,
  
  addModule: (newModule) =>
    set((state) => {
      // Keep the "Add Module" fixed as the last item in the grid
      const addModuleModule = state.activeModules.find((m) => m.id === "add-module") ?? new AddModuleModule();;
      const standardModules = state.activeModules.filter((m) => m.id !== "add-module");
      
      return {
        activeModules: [...standardModules, newModule, addModuleModule],
        focusedModuleId: null // Auto-return back to dashboard grid view
      };
    }),
    
  removeModule: (moduleId) => {
    // Immediately abort if something tries to remove the utility card
    if (moduleId === "add-module") return;

    set((state) => ({
      activeModules: state.activeModules.filter(
        (item: BaseModule<any, any, any>) => item.id !== moduleId
      ),
    }));
  },
  
  // Allows any standalone component to securely fetch a module instance by its string ID
  getActiveModule: (moduleId) => {
    return get().activeModules.find((item) => item.id === moduleId);
  },

  setFocusedModuleId: (moduleId) => set({ focusedModuleId: moduleId }),
}));
