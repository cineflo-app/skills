---
name: plan-shoot-days
description: "Build or rework the shooting schedule on CineFlo's stripboard. Use this whenever the user wants to schedule scenes, plan or balance shoot days, find what isn't scheduled, fit the film into a number of days, group scenes by location or cast, or move scenes between days, even if they just ask 'how many days do we need' or 'what should we shoot first'."
---

# Plan shoot days

Lay unscheduled scenes onto shoot days the way a first AD builds a
stripboard, then save the schedule in CineFlo.

## Before you start

Find the project with `list_projects`. If only one fits what the user said,
use it without asking; if several could, ask which, since writing to the
wrong production is hard to notice later. If a tool says a tab isn't shared
or is view-only, tell the user it's set in CineFlo under Settings → Privacy &
Data → Connected Apps, and carry on with what you can do.
If no CineFlo tools are available at all, CineFlo isn't connected yet:
follow the connect-cineflo skill.

The steps below are good production practice, not rules to hold to: when
the user asks for something different, do it their way.

## 1. See where things stand

- `list_projects`, then `get_schedule` for the stripboard: shoot days in date
  order with their strips, and the scenes that aren't scheduled yet.
- `get_scene` for scenes you need details on (INT/EXT, location, time of day,
  page length in eighths, cast numbers), and `get_cast_and_crew` for the cast
  list.
- Ask for anything the schedule depends on that you can't read: the shoot
  dates or how many days, days off, cast availability, and locations with
  fixed dates.

## 2. Group the scenes

Build days that a crew can actually shoot:

- Keep a location together, and within it INT and EXT, and day and night.
  Minimize company moves: at most one move a day, and none on a heavy day.
- Don't jump from nights back to an early day call: put nights at the end of
  a week or together.
- Group each cast member's scenes to keep their days consecutive; schedule
  scenes with the most cast, or with minors, animals or stunts, early in a day.
- Aim for a steady page count per day (for an indie drama, roughly 3 to 5
  pages; action, stunts and big crowds take far longer) and state the eighths
  per day.
- Weather-dependent exteriors early in the schedule, with an interior cover
  set in reserve if the user has one.

## 3. Propose, then save

Show the plan as a day-by-day list: date, location, scenes with their eighths,
cast numbers, and the total pages. Save when the user agrees. For example:

```
Day 1 · Mon Oct 12 · Rosie's Diner (INT, night)
  Sc 12  2 1/8  cast 1, 2      Sc 14  1 4/8  cast 1, 2, 5      Sc 3  6/8  cast 1
  Total 4 3/8 pages · one location, no company move
Day 2 · Tue Oct 13 · Mercy Hospital (INT, day) → parking lot (EXT, dusk)
  ...
Unscheduled: Sc 27 (needs the rain rig; suggest Day 5 with the other exteriors)
```

- Create or edit days with `save_shoot_days` (a date holds one shoot day;
  add a `title` such as "Diner" and a `unit` if there's more than one).
- Place scenes with `schedule_scenes`: `schedule_scene` for each scene with
  its `date` and `position` (0 is the top of the day), in shooting order.
  Then use `edit_schedule_day` to add meal breaks with `add_break` where the
  user wants them and set times with `edit_strip`; `reorder_day` reorders a
  whole day at once. `unschedule_items` takes scenes or breaks off again.
- Up to 100 operations per call, applied in order, all or nothing.

## Notes

- Moving a shoot day to another date moves its scenes' shoot dates too.
- Scheduling a scene sets its shoot date in Scenes & Shots, which needs edit
  access there; if the tool refuses, say which tab to share.
- Rework an existing schedule with `move_scene` and `unschedule_scene` rather
  than rebuilding it, and say what moved.
