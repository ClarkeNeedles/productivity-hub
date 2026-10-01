---
title: "issue fixes"
date: 10-1-2026
project-phase: in-progress
version: 0.3.0
---

Move more module-specific HTML code directly into their respective `.tsx` component files.
Link the `ModuleSettingsPage` to the module settings icon.
Add stat widgets sections to the module cards. (`ModuleMetric` type)
can we mitigate the number of CSS tags in the HTML <div> blocks?

we are starting off by addressing the TODO: Hide or remove active modules from the "Add Modules" list so only one copy can exist at a time (and restore them to the list if deleted).
    ran into sort of an architectural fork
    I realized that hiding the module in the AddModulePage is actually far harder than I anticipated
    It shows flaws in the scalability of this current approach
        currently we would be re-instantiating the AddPageModule each time the module list changes
    Look into Zustand for global store instead
        put a store for each page and module and put them in store/

got Zustand working with the AddModulePage, so we will be using this going forwards
    this fixed the issue we had with no being able to easily hide the modules after adding them
    also makes setting the focused module very easy

I want to know if the MVP model is good approach or if we are already doing it/could be doing it better
    no MVP is not good for Next.js, what we are doing is good
    essentially we are doing a form of model, view, view-model
    we have the types which are the models, the view-models which are the components, and the view which are the pages

made the entire ModuleCard clickable by extending the button area outwards

renamed all the base types to BaseModuleCard, BaseModulePage, etc...

instead of using dependency injection for some functions, we can just use Zustand store instead
utilize State Normalization (or Data Decoupling)
    passing a primitive string id through the component tree rather than the actual list of modules
    when we actually need the module, then we can get it
we are also moving the hardcoded AddModuleModule from the modules/page.tsx into the components themselves