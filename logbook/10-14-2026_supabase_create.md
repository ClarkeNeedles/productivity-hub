---
title: "supabase create"
date: 10-14-2026
project-phase: in-progress
version: 0.6.0
---

- I should do the following next:
    - create the supabase instance - DONE
    - create the database tables - DONE
    - create a store file for the streak counter module
    - identify what the database should look like
        - how it should store data
    - we should be able to add a streak counter module and it should update in the database
    - be able to pull the active modules from the database into the store
    - we should try to incorporate the streak counter if possible
- what sort of data do we actually want to have inside of the streak counter module?
    - active streak --> should count days since "reset streak" button was pressed
    - best streak
    - history of when the "reset streak" button was pressed
    - github type heatmap showing when we reset
    - other graphs that we may think of
- what should the database tables look like?
    - should we have an active modules table that just holding an enabled flag for each module?
        - then have a table for every single module?
    - should we have a table of the active modules with a JSONB entry for the actual settings related to the module?
    - go with a third option
        - have a table with the users and what modules they have enabled
        - have another table that holds the users and a JSONB entry for all the data for all modules
- creating the SQL tables
- **user_modules**
```sql
  CREATE TABLE public.user_modules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL, -- Deletes row on user account deletion
    module_id VARCHAR(50) NOT NULL, -- e.g., 'streak-counter', 'habit-tracker'
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_user_module UNIQUE (user_id, module_id) -- Enforce that a user can only pin a specific module once
  );
```
- **user_module_data**
```sql
  CREATE TABLE public.user_module_data (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,  -- Deletes row on user account deletion
    module_id VARCHAR(50) NOT NULL, -- e.g., 'streak-counter'
    state JSONB NOT NULL DEFAULT '{}'::jsonb, -- Flexible JSON storage bucket
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (user_id, module_id) -- Each module only exists once
  );
```

- we use the utils/supabase/server.ts for getting database data before the page even loads (server side)
- we use the utils/supabase/client.ts for the interactive widgets (client side)
- created a temporary test login file that auto logs me in at app/api/dev-login/route.ts
- we will load the dashboard first, check if the user is logged in, if not, kick them out to the auth page
- move supabase .env params into .env.local in frontend/
- created the login sequence fully using a middleware.ts
    - sends non authenticated users to /login
    - otherwise sends users to dashboard
- created the app/(auth)/login/page which has a login form and creates as server client using utils/supabase/server.ts if credentials are correct
    - this is done with an actions.ts file in the same location
- we will query the database once at the start for all the Zustand stores
    - saves so much overhead by storing the data in the stores
    - saving data means writing to the Zustand first, then to the database, creates a nice layer that we dont have to worry about writing to db, just update the store instead
- we can create a store file per module
- we need to determine when we will hydrate the stores (fetch from the database)
    - should it just be one large file at the beginning? - for now this is okay