---
title: "module architecture implementation"
date: 9-30-2026
project-phase: in-progress
version: 0.3.0
---

implemented new types for the module structure
    DashboardWidgets --> for both module cards and module pages (small and large)
    ModuleCard --> Uses dashboard widgets
    ModulePage --> uses dashboard widgets
    ModuleSettingsPage --> extends ModulePage
    BaseModule --> A generics class that has a ModuleCard, ModulePage, ModuleSettingsPage
                   It strictly enforces that the developer usese a class that extends these base classes when creating a new module

I want to look into even putting the jsx formatting code and main formatting as part of the base classes in way
take the main <div> wrappers which include the size and formatting for the card or page and try not to duplicate it per module
    still working on this a little

formatted the data structures into the types and they work with corresponding components very well
    provides a nice form of abstraction so that modules just need to fill out the data structures with information

TODO
try and move more of the module specific html code into the corresponding components tsx files
still need to link the settings page to the settings icon
once a module is added, it should be removed from the list of modules that can be added or hidden
    only one copy of each module
    once a module is removed, it appears back in the add module page