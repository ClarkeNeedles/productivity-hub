import { notFound } from "next/navigation";
import ModuleSettingsPage from "@/components/module-shell/module-settings-page";
import { MODULE_IDS, type ModuleId } from "@/configs/modules-config";

type ModuleSettingsRouteProps = {
  params: Promise<{ moduleId: string }>;
};

export default async function ModuleSettingsRoute({ params }: ModuleSettingsRouteProps) {
  const { moduleId } = await params;

  if (!MODULE_IDS.includes(moduleId as ModuleId)) {
    notFound();
  }

  return <ModuleSettingsPage moduleId={moduleId as ModuleId} />;
}