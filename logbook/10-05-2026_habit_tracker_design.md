---
title: "habit tracker design"
date: 10-5-2026
project-phase: in-progress
version: 0.5.1
---

changed the BaseModuleCard back to a class for now
fixed the instantiating a module from the AddModuleModule
    we were essentially getting into an infinite creating loop
only pass a temporary copy of a module to the ModulePreviewCard
only access activeModules type when we absolutely need the class (For example when we pass it to ModuleCardFrame)
    otherwise we can use the activeModuleIds instead and getActiveModule from id
the AddModuleModule is officially only created by default at compile time in the modules.ts store file

TODO
review usage of useShallow()
review usage of useMemo()
    both are used in AddModulePage and in ModuleCard component