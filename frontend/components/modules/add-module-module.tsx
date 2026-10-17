import type { ModuleDefinition } from "@/types/module-definition";
import ModuleCardPreview from "@/components/module-shell/module-card-preview";
import { MODULE_IDS } from "@/configs/modules-config";
import { useRouter } from "next/navigation";
import { useModulesStore } from "@/providers/modules-store-provider";
import { useShallow } from "zustand/react/shallow";
import { ADD_MODULE_ID } from "@/configs/modules-config";

function AddModulePage() {
  const router = useRouter();
  const activeModuleIds = useModulesStore(useShallow((state) => state.activeModuleIds));
  const availableModuleIds = MODULE_IDS.filter((id) => !activeModuleIds.includes(id));
  const addModuleId = useModulesStore((state) => state.addModuleId);

  const handleAddModule = async (moduleId: (typeof MODULE_IDS)[number]) => {
    await addModuleId(moduleId);
    router.push("/modules");
  };

  if (availableModuleIds.length === 0) {
    return (
      <div className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
        All available modules have been added to your dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Select a module to add to your dashboard.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {availableModuleIds.map((id) => {
          return <ModuleCardPreview key={id} moduleId={id} onSelect={() => handleAddModule(id)} />;
        })}
      </div>
    </div>
  );
}

export const addModuleModule = {
  id: ADD_MODULE_ID,
  title: "Add Module",
  card: {
    showOptions: false,
    showTitle: false,
    maxMetrics: 2,
  },
  page: AddModulePage,
  settingsPage: null,
} satisfies ModuleDefinition<typeof ADD_MODULE_ID>;
