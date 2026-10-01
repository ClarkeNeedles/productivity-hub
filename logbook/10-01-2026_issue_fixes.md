---
title: "issue fixes"
date: 10-1-2026
project-phase: in-progress
version: 0.3.0
---

Move more module-specific HTML code directly into their respective `.tsx` component files.
Link the `ModuleSettingsPage` to the module settings icon.
Hide or remove active modules from the "Add Modules" list so only one copy can exist at a time (and restore them to the list if deleted).
Add stat widgets sections to the module cards. (`ModuleMetric` type)
I want to know if the MVP model is good approach or if we are already doing it/could be doing it better
can we mitigate the number of CSS tags in the HTML <div> blocks?

we are starting off by addressing the TODO: Hide or remove active modules from the "Add Modules" list so only one copy can exist at a time (and restore them to the list if deleted).
    ran into sort of an architectural fork
    I realized that hiding the module in the AddModulePage is actually far harder than I anticipated
    It shows flaws in the scalability of this current approach
        currently we would be re-instantiating the AddPageModule each time the module list changes
    Look into Zustand for global store instead
        put a store for each page and module and put them in store/