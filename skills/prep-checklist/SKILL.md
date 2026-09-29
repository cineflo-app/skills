---
name: prep-checklist
description: Turn a CineFlo project's breakdown and schedule into department to-do lists with owners and due dates. Use when the user asks for a prep checklist, department tasks, what each department needs to do before the shoot, or to set up the to-do board.
---

# Build the prep checklist

Work backwards from the shoot dates: every element in the breakdown is a job
for some department, due before the first day it's needed.

## 1. Gather the plan

- `get_schedule` for shoot days and which scenes shoot when.
- `get_breakdown` for the elements and the scenes they're tagged in.
- `get_cast_and_crew` for crew by department, to suggest owners.
- `get_todos` for existing lists and tasks, so you add to them and don't
  duplicate.

## 2. Turn elements into tasks

For each element, find the first shoot date of any scene it's tagged in, and
make a task due enough days before it:

| Breakdown category | List | Typical tasks and lead time |
| - | - | - |
| cast | Casting | Confirm casting, fittings, rehearsals: 2–3 weeks |
| extrasSilent, extrasAtmosphere | Casting | Book background with counts: 1 week |
| props, setDressing, greenery | Art | Source, build or rent, and approve: 1–2 weeks |
| wardrobe, makeup | Costume & Wardrobe, Hair & Makeup | Fittings, tests, continuity doubles: 1–2 weeks |
| vehicles | Transportation | Picture cars and drivers booked: 2 weeks |
| animals, animalWrangler | Production | Wrangler booked, permits: 2–3 weeks |
| stunts | Stunts | Coordinator, rehearsal, safety plan: 2–3 weeks |
| sfx, mechanicalEffects | Special Effects | Rigs built and tested: 1–2 weeks |
| vfx | Visual Effects | Plates, markers and supervisor on set: 1 week |
| specialEquipment, camera | Camera, Grip | Rentals booked: 1 week |
| sound, music | Sound | Playback cleared and loaded: 1 week |

Name lists after CineFlo's crew departments as above (Casting, Art,
Costume & Wardrobe, Hair & Makeup, Transportation, Stunts, Special Effects,
Visual Effects, Camera, Grip, Sound, Locations, Production), so tasks line up
with the crew list.

Also add the per-location jobs: permits, parking, and a tech scout of each
location a week before its first day. Combine elements into one task when
they go to the same person on the same day ("Pull diner props: menus,
ketchup bottles, tip jar").

Adjust lead times to the size of the production and to what the user tells
you; these are starting points, not rules.

## 3. Propose, then save

Show the checklist grouped by list, with due dates and suggested owners.
When the user agrees, save with `save_todos` (up to 100 per call): `list` by
name creates the department list if it's missing, `dueDate` as YYYY-MM-DD,
and `assignee` by the crew member's name. Assignees who are project members
are linked; others are kept as text. Never put an email address in a task.

## Notes

- Keep task titles short and actionable; put the scenes and details in
  `notes`.
- Re-running is safe if you check the existing tasks first; update due dates
  when the schedule moves instead of adding new tasks.
