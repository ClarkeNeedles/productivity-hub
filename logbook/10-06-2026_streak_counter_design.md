---
title: "streak counter design"
date: 10-5-2026
project-phase: in-progress
version: 0.5.2
---

review usage of useShallow()
    good for not forcing a refresh every time a new reference is obtained
    good for when we are getting the list of activeIDs, we don't need to force a refresh here
        fixes the infinite refreshing looping issue
review usage of useMemo()
    both are used in AddModulePage and in ModuleCard component
    this is fine, may have to come back to this later on 

updated the sidenav logic for mobile and desktop to be simpler
    both only depend on a single expanded variable
    mobile closes sidenav after choosing a new page
    updated the icons for opening and closing the sidebar nav

going to start by developing a simpler module --> streak counter

