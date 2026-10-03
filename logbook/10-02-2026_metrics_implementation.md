---
title: "metrics implementation"
date: 10-2-2026
project-phase: in-progress
version: 0.5.0
---

start working on implementing little metric widgets
    start off with the add module metric widget for the add module module

### Metric Slot Implementation
* [ ] Build out standard data sub-blocks using the newly aligned `BaseModuleMetric` types to automatically render up to two center-aligned micro-variant stats (such as streak counters) inside active cards.

This is the structure we are going for:
module config
  -> available metric definitions
  -> default active metric IDs
module store
  -> current active metric IDs
  -> live metric values
MetricSlots component
  -> reads active IDs from the store
  -> resolves definitions
  -> renders up to maxMetricSlots

implemented MetricSlots which is used in ModuleCard component - DONE
used this for the AddModuleModule and AddModuleMetric - DONE
    handles 1 or 2 metrics
may be able to delete the return in BaseModuleCard type entirely - DONE
    could be done fully through Metric components now
look into creating multiple folders for the components file
    folder for app like app-shell and sidebar-nav
    folder for metrics
    folder for modules page specifically
    we even have a dedicated modules page currently modules/
        i think this is a good place for them