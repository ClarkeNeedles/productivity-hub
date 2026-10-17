import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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

  return (
    <section className="min-h-[calc(100vh-4rem)]">
      <Link
        href="/modules"
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeft size={17} aria-hidden="true" />
        Back
      </Link>

      <div className="mt-10">
        <ModulePage moduleId={moduleId as FocusedModuleId} />
      </div>
    </section>
  );
}
