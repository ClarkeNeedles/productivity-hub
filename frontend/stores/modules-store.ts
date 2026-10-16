import { createStore } from "zustand";
import type { BaseModule } from "@/types/base-module";
import { MODULE_IDS, type ModuleId, type FocusedModuleId } from "@/configs/modules-config";
import { createClient } from "@/utils/supabase/client";
import { MODULE_LIST } from "@/configs/add-module-config";

export interface ModulesStateProps {
  userId: string | null;
  activeModules: BaseModule[];
  focusedModuleId: FocusedModuleId | null;
  error: string | null;
}

export interface ModulesActions {
  fetchModules: () => Promise<void>;
  addModule: (newModule: BaseModule<ModuleId>) => Promise<void>;
  removeModule: (moduleId: ModuleId) => Promise<void>;
  setFocusedModuleId: (moduleId: FocusedModuleId | null) => void;
}

export type ModulesStore = ModulesStateProps & ModulesActions;

const supabase = createClient();

// Create a function that constructs the store instance on-demand
export const createModulesStore = (initProps: Partial<ModulesStateProps> = {}) => {
  return createStore<ModulesStore>((set, get) => ({
    userId: null,
    activeModules: [],
    focusedModuleId: null,
    error: null,
    ...initProps, // Allows passing initial hydration data from Server Components

    fetchModules: async () => {
      const { userId } = get();
      if (!userId) return;

      // Select all rows (modules) for that user
      const { data, error } = await supabase
        .from("user_modules")
        .select("module_id")
        .eq("user_id", userId);

      if (error) {
        set({ error: error.message });
        return;
      }

      if (data) {
        // Extract the flat string list of active IDs
        const savedIds: string[] = data.map((row: { module_id: string }) => row.module_id);

        // Ignore unknown IDs so stale or invalid database rows cannot index the catalog
        const mappedModules = savedIds
          .filter((id): id is ModuleId => MODULE_IDS.some((moduleId) => moduleId === id))
          .map((id) => MODULE_LIST[id].instantiate());

        set({ activeModules: mappedModules });
      }
    },

    addModule: async (newModule) => {
      const { userId, activeModules } = get();
      if (!userId) return;

      set({
        activeModules: [...activeModules.filter((module) => module.id !== newModule.id), newModule],
        focusedModuleId: null,
      });

      // Insert the relational row securely over the wire
      const { error } = await supabase.from("user_modules").insert({
        user_id: userId,
        module_id: newModule.id,
      });

      if (error) {
        console.error("Failed to sync pinned module to cloud:", error.message);
        set({ error: "Failed to persist module selection configuration." });
      }
    },

    removeModule: async (moduleId) => {
      const { userId, activeModules } = get();
      if (!userId) return;

      // Optimistically slide the component away locally
      set({
        activeModules: activeModules.filter((item) => item.id !== moduleId),
      });

      // Wipe out the database relationship tracking row
      const { error } = await supabase
        .from("user_modules")
        .delete()
        .eq("user_id", userId)
        .eq("module_id", moduleId);

      if (error) {
        console.error("Failed to remove module from cloud registry:", error.message);
        set({ error: "Failed to remove dashboard module placement." });
      }
    },

    setFocusedModuleId: (moduleId) => set({ focusedModuleId: moduleId }),
  }));
};
