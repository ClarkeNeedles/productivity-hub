---
title: "database research"
date: 10-13-2026
project-phase: in-progress
version: 0.5.6
---

- store images and gifs inside of public/images and public/animations going forwards
    - resort to images instead of lucide icons
    - we should also look into using Lottie Animations for that responsive feel
        - this would be something we implement at the end
    - ensure all the images are in webp format at the end
    - gifs and images look way better
        - be sure to use webp + next/images for best performance
- start looking into how we should implement the first version of the database?
    - this will force us to then create the backend API
    - consider just starting with Supabase straight away?
        - Docker containers for the backend
- for the first version of the backend
    - use Supabase with direct querying from frontend via BaaS (Backed as a Service) capabilities
    - this means we don't need a backend service and is very quick and easy
    - good for getting the app off the ground and running
    - in the future we can upgrade the backend to use a dedicated DB and NestJS backend
        - this would be when releasing for production
- I should do the following next:
    - create the supabase instance
    - create a store file for the streak counter module
    - identify what the database should look like
        - how it should store data
    - we should be able to add a streak counter module and it should update in the database
    - be able to pull the active modules from the database into the store
    - we should try to incorporate the streak counter if possible
