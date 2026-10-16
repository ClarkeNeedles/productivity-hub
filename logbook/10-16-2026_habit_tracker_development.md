---
title: "habit tracker development"
date: 10-16-2026
project-phase: in-progress
version: 0.6.9
---

most of the types like the BaseModuleCard are just classes with data constructors
    a type mimics this exactly, prefer this
need to revisit the types structure - DONE
    many classes can just turn into a type structure
    consider transitioning the BaseModulePage class to just a function
    rename the file names for the types - DONE
update modules-store function names to show they are using with ids - DONE
bump to v0.6.9
start using conventional commits
after the first release, we can implement a workflow which auto bumps the project version
start working on the habit tracking module - IN PROGRESS
    I think that we should create a list component that can eventually be reused for the todo list
        there was an original plan of linking the habits in the todo list, but we arent doing this right now
    what components do we want to have on the page?
        Today's Habits List (Top of Page)
            only displays the subset of habit tasks scheduled for the current day
            you may have daily habits and habits once a week
        Streaks Dashboard Section
            Displays current best streak and its associated habit name.
            Displays longest lifetime streak and its historical habit name.
            Displays the current overall perfect day streak.
        Visual Analytics & Data Charts
            A GitHub-style density grid displaying the total volume of daily completed to-dos


TODO
start working on the life score module - WAITING
    design ideas are in a logbook entry
    this is essentially our dashboard module