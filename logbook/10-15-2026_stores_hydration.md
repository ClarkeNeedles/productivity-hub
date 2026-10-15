---
title: "stores hydration"
date: 10-15-2026
project-phase: in-progress
version: 0.6.2
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

TODO
update all the naming conventions to explictly use archetype - DONE
need to update the other stores with the createStore method - DONE
    we can just add this to the modules provider
    I was considering adding it to the root layout, but dashboard and settings dont need this
    in the future maybe we create a root layout provider for the life score module
finish implementing the rest of the streak counter module end-to-end - WAITING
    settings page
        need to implement choosing the module card metrics user wants to show
        what metrics they want to show on the expanded view of the module
    functionality for tracking the streak
    storing streak resetting history
    implement the actual expanded view of the streak tracker
        implement the large variant of the metrics
            could we create components for a small variant and large variant for all metrics?
need to ensure we use webp files instead of gifs - WAITING