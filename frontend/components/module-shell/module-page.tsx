"use client";

import { addModuleModule } from "@/components/modules/add-module-module";
import { ModulePageFrame } from "@/components/module-shell/module-page-frame";
import { MODULE_LIST } from "@/configs/add-module-config";
import { ADD_MODULE_ID, type FocusedModuleId } from "@/configs/modules-config";

type ModulePageProps = {
  moduleId: FocusedModuleId;
};

export default function ModulePage({ moduleId }: ModulePageProps) {
  const module = moduleId === ADD_MODULE_ID ? addModuleModule : MODULE_LIST[moduleId];

  // Guard safety fallback check if the module was unmounted while open
  if (!module) return null;

  const Page = module.page;

  return (
    <ModulePageFrame title={module.title} backHref="/modules" backLabel="Back to modules">
      <Page />
    </ModulePageFrame>
  );
}
