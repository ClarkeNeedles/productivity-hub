import { create } from "zustand";
import type { BaseModule } from "@/types/base-module";

interface ModulesState {
  activeModules: BaseModule<any, any, any>[];
  focusedModule: BaseModule<any, any, any> | null;
  addModule: (module: BaseModule<any, any, any>) => void;
  removeModule: (moduleId: string) => void;
  setFocusedModule: (module: BaseModule<any, any, any> | null) => void;
}

export const useModulesStore = create<ModulesState>((set) => ({
  activeModules: [],
  focusedModule: null,
  
  addModule: (newModule) =>
    set((state) => ({ 
      activeModules: [...state.activeModules, newModule],
      focusedModule: null 
    })),
    
  removeModule: (moduleId) =>
    set((state) => ({
      activeModules: state.activeModules.filter((item) => item.id !== moduleId),
    })),

  setFocusedModule: (module) => set({ focusedModule: module }),
}));
