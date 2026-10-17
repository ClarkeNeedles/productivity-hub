"use client";

import { ModulePageFrame } from "@/components/module-shell/module-page-frame";
import { MODULE_LIST } from "@/configs/add-module-config";
import type { ModuleId } from "@/configs/modules-config";

type ModuleSettingsPageProps = {
  moduleId: ModuleId;
};

export default function ModuleSettingsPage({ moduleId }: ModuleSettingsPageProps) {
  const module = MODULE_LIST[moduleId];
  const settingsPage = module.settingsPage;

  if (settingsPage === null) return null;

  const SettingsPage = settingsPage;
  return (
    <ModulePageFrame
      title={`${module.title} Settings`}
      backHref={`/modules/${module.id}`}
      backLabel={`Back to ${module.title}`}
    >
      <SettingsPage />
    </ModulePageFrame>
  );
}