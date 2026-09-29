---
name: shoot-day-tracking
description: Track a shoot day in CineFlo as it happens. Use when the user reports shots done, retakes or skips on set ("we got 4A", "4C needs another take"), asks what's left today or whether the day will make it, or needs to move unfinished work to another day.
---

# Track the shoot day

Keep the shot list and the stripboard in step with what actually happens on
set, and tell the user where the day stands.

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

## 4. Move unfinished work

Moving work to another day changes the schedule, so propose it and wait for
a yes:

- A whole scene: `update_stripboard` with `move_scene` and the new `date`.
- A scene that's partly shot: keep it on today's day, and record the
  remaining shots' plan in their `notes` and on the new day as the user
  prefers.

Report what moved and the new page count of each affected day.

## Notes

- Don't change a shot's status because it looks likely: only on the user's
  report.
- If the Scenes & Shots tab is view-only, say you can report but not record,
  and where edit access is set.
