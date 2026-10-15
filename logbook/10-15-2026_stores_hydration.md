---
title: "stores hydration"
date: 10-15-2026
project-phase: in-progress
version: 0.6.1
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

TODO
update all the naming conventions to explictly use archetype - DONE
need to update the other stores with the createStore method - WAITING
need to ensure we use webp files instead of gifs - WAITING