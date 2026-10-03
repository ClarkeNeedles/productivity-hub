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
look into creating multiple folders for the components file - DONE
    folder for app like app-shell and sidebar-nav
    folder for metrics
    folder for modules page specifically
    we even have a dedicated modules page currently modules/
        i think this is a good place for them
work on improving the AddModulePage - DONE
    reuse the main modules page ModuleCard logic
    so that it shows the user what the default preview would look like
    but we need a good way to tell the user they are choosing a module
    maybe we need to add like some text that says Choose a Module to Add or something

    created ModuleCardFrame component so that we can create both a
        ModuleCardPreview which sets options off and adds a little label at the bottom
            used with the AddModulePage
        ModuleCard
            which extends the ModuleCardFrame and has the same usage as before
is there actually any point in having the BaseModuleCard or BaseModulePage if they are only a couple of lines long? - DONE
    would it be better to just have them embedded in the BaseModule type instead?
    this way the constructor would be far simpler as well when creating the modules

    we can rework this a little bit
what is the proper structure for storing the data? - DONE
    should we create the variables inside the class and then store it in store by fetching it?
    or should we be putting any runtime variables in the store and not worry about storing it in the class type at all?

    answer:
    module config
        -> metric definitions
        -> default active metric IDs
    module class
        -> immutable module/card/page/settings blueprint
    Zustand store
        -> active metric IDs
        -> live metric values
        -> user preferences and runtime state
    component
        -> reads store state
        -> resolves metric definitions
        -> renders the metric
as of right now we are only taking a slice of the metrics and not actually using the currently active ones
    const visibleMetrics = metrics.slice(0, maxMetrics);
    I think we just create a store function for getActiveMetrics and setActiveMetrics
    this is already in place in the store file, just need to use in in the component for MetricSlots