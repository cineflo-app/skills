---
name: location-scouting
description: Log location scouts and manage filming locations in a CineFlo project, and link scenes to them. Use when the user describes a location or a recce, wants to record scout notes, compare options for a location, link scenes to places, or plan around a location's availability.
---

# Scout and manage locations

Record what the scout found in a form the rest of the crew can use, and tie
each scene to the place it will shoot.

## 1. Know the places

`get_locations` returns the named locations (name, INT/EXT type, address,
notes) and the scouts, with their dates and notes. Use it to avoid
duplicates: saving a location whose name already exists returns that one.

## 2. Log a scout

From what the user describes, save a scout with `save_locations`:

- `name` for the visit ("Rosie's Diner, 2nd recce"), `scoutDate`, and the
  planned `shootDate` if known.
- Link it to a named location by `locationName`; create the location in the
  same call if it's new, with its `type` and `address`.
- Sort the observations into the note fields the crew looks for:
  - **creative**: `framing`, `lighting`, `color`, `atmosphere`
  - **technical**: `measurements`, `power`, `logistics`, `sunPath`
  - **practical**: `access`, `noise`, `control`, `safety`

Ask about the things a scout report usually needs and the user didn't
mention, in one message: power, parking and access, noise (flight paths,
traffic, neighbours), control of the space, and the sun's path for
exteriors.

## 3. Compare options

When there are several candidates for one location, compare them on what
matters for the scenes set there: the look (creative notes against the script
text from `get_scene_text` when Script pages are on), company moves from the
other locations on the same days, power and parking, cost if the user gives
it, and availability against the schedule.

## 4. Link scenes to places

Link each scene to where it will shoot with `save_scenes`: `locationName`
(or `locationId`) on the scene. For call sheets, set `callSheetLocation` to
the slot (1–3) the scene films at when the user tells you.

Then check the schedule (`get_schedule`): scenes at the same place on
different days may be worth grouping, which the plan-shoot-days skill covers.

## Notes

- Photos, video, GPS and weather can't be added here; the user adds photos in
  CineFlo.
- Addresses are the production's locations; don't add anyone's personal
  address or contact details.
