---
title: "stores hydration"
date: 10-15-2026
project-phase: in-progress
version: 0.6.8
---

we need to determine when we will hydrate the stores (fetch from the database)
    should it just be one large file at the beginning? - for now this is okay
we are resorting to using the createStore from Zustand along with store-providers
    these providers will be for each layout file (each page like /dashboard)
I am updating the file naming convention so that we explicitly say what the file is
    like in store/metrics.ts --> store/metrics-store.ts
Issue with inserting JSONB with the UI, it turns the JSON into a string
    create a test page that inserts the data directly into DB
    was getting permission denied even with RLS rules enabled
    had to tell the table to use authenticate:
```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_module_data TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
```
there was a variable naming issue that was silently failing, now fixed
updated to v0.6.1
should we delete the module data upon removal from modules page
    no I don't think it is necessary
    if the user wants to clear the data, they can do so in the module settings page
what sort of data do we actually want to have inside of the streak counter module?
    active streak --> should count days since "reset streak" button was pressed
    best streak
    history of when the "reset streak" button was pressed
    github type heatmap showing when we reset
    other graphs that we may think of
updated all stores to use createStore instead and the change was seamless
updated to v0.6.2
stopped passing userId into functions that call the db so that we can easily call them from components
    did this by passing in the userId on store creating in the provider
updated to v0.6.3
created a reset button and added the logic for determining the streak
    streak based on a 24hr timer that checks when the timestamp was reset vs current timestamp
    reset button resets the timestamp
created the streak counter page
update all the naming conventions to explictly use archetype - DONE
need to update the other stores with the createStore method - DONE
    we can just add this to the modules provider
    I was considering adding it to the root layout, but dashboard and settings dont need this
    in the future maybe we create a root layout provider for the life score module
updated to v0.6.4
created a reset-heatmap-metric
updated to v0.6.5
fixed an issue with the MODULE_LIST and the ModuleId
    move the add-module out of ActiveModules and prefer creating the component on the page instead
    this gets rid of redundant moduleId !== "add-module" checks
go over the current structure of our MODULES_LIST - DONE
    may want to use a different method for this. consider a ModuleId and ActiveModuleId types
    current BREAKING, need to fix ASAP
take the add-module out of modules list and metrics list entirely as it will never change
    this is a far cleaner approach
you have to ensure that the table has both RLS policies for read and write as well as it is authenticated
```sql
create policy "Users can modify their own modules"
on public.user_modules
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
```
```sql
create policy "Users can view their own modules"
on public.user_modules
for select
to authenticated
using ((select auth.uid()) = user_id);
```
updated to v0.6.6
there was a small bug with the heatmap where it was not showing the dates in order - fixed
One additional improvement: store activeModuleIds: ModuleId[] rather than instantiated BaseModule[]. The components can resolve instances from MODULE_LIST. This follows the project’s own rule that Zustand state should contain flat primitives rather than class instances. - DONE
```ts
export const MODULE_LIST = {
  "habit-tracker": new HabitTrackerModule(),
  "streak-counter": new StreakCounterModule(),
} satisfies Record<ModuleId, BaseModule>;
```
updated to v0.6.7
we can get rid of the renderMicro vs renderLarge variant functions, just use a single renderMetric function - DONE
need to ensure we use webp files instead of gifs - DONE
updated to v0.6.8
big realization
    I thought that we would maybe have to implement the settings page soon, but not exactly
    we are currently just developing for personal usage, so we can postpone this
    the settings page was only for user customization of module card and module page
        if we are tailoring it to ourselves, we do not have to worry about this for now

TODO
finish implementing the rest of the streak counter module end-to-end - IN PROGRESS
    functionality for tracking the streak - DONE
    storing streak resetting history - DONE
    implement the actual expanded view of the streak tracker - DONE
    implement the large variant of the metrics - DONE
        could we create components for a small variant and large variant for all metrics?
    settings page - WAITING
        need to implement choosing the module card metrics user wants to show
        what metrics they want to show on the expanded view of the module
need to revisit the types structure - WAITING
    many classes can just turn into a type structure
    consider transitioning the BaseModulePage class to just a function
start working on the habit tracking module - WAITING
    the design ideas are in a logbook entry
start working on the life score module - WAITING
    design ideas are in a logbook entry
    this is essentially our dashboard module