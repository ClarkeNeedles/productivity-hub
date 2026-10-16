import { createStore } from "zustand";
import { MODULE_IDS, type ModuleId, type FocusedModuleId } from "@/configs/modules-config";
import { createClient } from "@/utils/supabase/client";

export interface ModulesStateProps {
  userId: string | null;
  activeModuleIds: ModuleId[];
  focusedModuleId: FocusedModuleId | null;
  error: string | null;
}

export interface ModulesActions {
  fetchModules: () => Promise<void>;
  addModule: (moduleId: ModuleId) => Promise<void>;
  removeModule: (moduleId: ModuleId) => Promise<void>;
  setFocusedModuleId: (moduleId: FocusedModuleId | null) => void;
}

export type ModulesStore = ModulesStateProps & ModulesActions;

const supabase = createClient();

// Create a function that constructs the store instance on-demand
export const createModulesStore = (initProps: Partial<ModulesStateProps> = {}) => {
  return createStore<ModulesStore>((set, get) => ({
    userId: null,
    activeModuleIds: [],
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
        const activeModuleIds = savedIds.filter(
          (id): id is ModuleId => MODULE_IDS.some((moduleId) => moduleId === id),
        );

        set({ activeModuleIds });
      }
    },

    addModule: async (moduleId) => {
      const { userId, activeModuleIds } = get();
      if (!userId) return;

      set({
        activeModuleIds: [
          ...activeModuleIds.filter((activeModuleId) => activeModuleId !== moduleId),
          moduleId,
        ],
        focusedModuleId: null,
      });

      // Insert the relational row securely over the wire
      const { error } = await supabase.from("user_modules").insert({
        user_id: userId,
        module_id: moduleId,
      });

      if (error) {
        console.error("Failed to sync pinned module to cloud:", error.message);
        set({ error: "Failed to persist module selection configuration." });
      }
    },

    removeModule: async (moduleId) => {
      const { userId, activeModuleIds } = get();
      if (!userId) return;

      // Optimistically slide the component away locally
      set({
        activeModuleIds: activeModuleIds.filter((item) => item !== moduleId),
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
