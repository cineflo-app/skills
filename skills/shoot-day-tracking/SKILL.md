---
name: shoot-day-tracking
description: "Track a shoot day live in CineFlo. Use this whenever the user reports from set ('we got 4A', '4C needs another take', 'we're dropping 12B'), asks what's left today, whether the day will make it, how far behind they are, or wants to push unfinished scenes to another day. Records reported results straight away."
---

# Track the shoot day

Keep the shot list and the stripboard in step with what actually happens on
set, and tell the user where the day stands.

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

## 1. Load the day

`list_projects`, then `get_schedule` with `from` and `to` set to today (or
the date the user names) for the day's scenes and strips in order. Then
`get_shots` with each scene's `sceneId` for the shots and their status.

Shot references on set combine the scene and the shot: "4A" is scene 4,
shot A. When a reference could match more than one shot, ask which.

## 2. Record what the user reports

The user reporting a result is the instruction: save it with `save_shots`
without asking again, then confirm in one line.

- Done: `status` `completed`.
- Needs another take: `needs-retake`.
- Dropped for the day or cut: `skipped`.
- In progress: `in-progress`.
- Take details the user gives go on the shot too: `takeCount`, `circleTake`
  (the circled takes) and `rollCardNumber`, per camera with `cameraSlot`.

Batch several reports into one `save_shots` call.

## 3. Say where the day stands

When asked, or after a batch of updates, give:

- Shots done and left, per scene, in shooting order.
- The time the remaining shots need, from their `estimatedMinutes`, against
  the scheduled wrap or the call sheet's wrap time (`get_callsheets` for the
  date).
- Whether the day will make it, and what to drop or move if not: suggest the
  shots with least story value, or whole scenes that can move without a
  company move.

For example:

```
2:40 PM · 11 of 19 shots done
Sc 12 done · Sc 14: 3 left (14C, 14D, 14E) · Sc 3: 5 left
Remaining ≈ 3h 50m against a 6:30 PM wrap → about 30 minutes over
Option: drop 14E (covered by 14C) and move Sc 3 to Day 5, where the diner is booked again
```

## 4. Move unfinished work

Moving work to another day changes the schedule, so propose it and wait for
a yes:

- A whole scene: `schedule_scenes` with `move_scene` and the new `date`.
- A scene that's partly shot: `schedule_scene` with the new `date` and the
  remaining shots as `shotIds` (and their `pages` if the user knows them).
  Then make today's strip list only the shots already done, with
  `edit_strip` and its `shotIds`, so today's call sheet and reports stay true
  and the new day lists only what's left.

Report what moved and the new page count of each affected day.

## Notes

- Change a shot's status only on the user's report, not because it looks
  likely: the shot list is the record the script supervisor and editor rely
  on, and a shot marked done that wasn't gets lost.
- If the Scenes & Shots tab is view-only, say you can report but not record,
  and where edit access is set.
