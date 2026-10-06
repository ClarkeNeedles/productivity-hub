---
title: "streak counter design"
date: 10-5-2026
project-phase: in-progress
version: 0.5.4
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
realized that the way we currently store metrics per module will not hold for multiple modules
    may just have to move the active metrics into the class instances within the modules store
        update BaseModule to have a metrics list with maximum 2 elements (for now)
            force the default metrics where the module definitions are modules/
        update modules.ts store with a function for setting the active metrics
leave the types as immutable blueprints as we initially designed
    create a metrics store file instead that holds a dictionary of metrics keyed by module id
    create a singular metrics config file that holds all the possibe metrics
    allows us to assign default metrics to module cards right away in the metrics store file
create a ModuleId type that forces us to use a module id in the predetermined list
    also created MetricId
    we have to replace locations that should be using these types
updating the METRIC_LIST so that we can assign default metrics in one shot
    create a dedicated DEFAULT_MODULE_METRICS as well as a AVAILABLE_MODULE_METRICS
    one is defaults and one is what we can choose from
we need to get rid of all the get functions in the zustand stores - DONE
    they are essentially telling zustand to not refresh when the store updates
    use inline expressions like .map() and .find() on the data instead
fix the now broken ModuleCard component after changing the metrics structure and introducing new config file + store - DONE
I think that we should move the modules folder in the components/ folder - WAITING
    and move the metrics folder there as well
    put all modules in components/modules/ and metrics in components/metrics/

