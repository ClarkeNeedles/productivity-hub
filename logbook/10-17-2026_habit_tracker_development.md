---
title: "habit tracker development"
date: 10-17-2026
project-phase: in-progress
version: 0.8.0
---

start working on the habit tracking module - DONE
    considered creating the todo list first and reusing/linking with habit tracker, but more complicated than anticipated
        create a habit list that will pottentially be very similar if not mimic todo list component (could be reused)
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
    what sort of data do we have to store?
        list of habits
        habit contains
            id, title, completed, repeats on (daily, weekly, monthly, custom (2 times a week))
        list of completed habits
            id, title, date completed
completed the first version of the habit tracker module
bump to v0.8.0
get rid of old BaseModuleSettinsPage - DONE
convert the habit tracker edit to a settings page - DONE
Move the settings page into the module file itself - DONE
prefer using form rather than FormEvent (depricated) - 
make the routing for settings pages generic - DONE

TODO
start working on the life score module - WAITING
    design ideas are in a logbook entry
    this is essentially our dashboard module
after adding module, it gets stuck on add module page before returning to /modules - WAITING
overall loading is slow and there are visible transitions - WAITING
    need to pre load all the module cards as well as metrics before hand
    the module pages themselves are loading just fine