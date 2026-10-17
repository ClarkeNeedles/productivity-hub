import { notFound } from "next/navigation";
import ModulePage from "@/components/module-shell/module-page";
import { FOCUSED_MODULE_IDS, type FocusedModuleId } from "@/configs/modules-config";

type ModuleRouteProps = {
  params: Promise<{ moduleId: string }>;
};

export default async function ModuleRoute({ params }: ModuleRouteProps) {
  const { moduleId } = await params;

  if (!FOCUSED_MODULE_IDS.includes(moduleId as FocusedModuleId)) {
    notFound();
  }

  return <ModulePage moduleId={moduleId as FocusedModuleId} />;
}
