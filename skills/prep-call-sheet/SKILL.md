---
name: prep-call-sheet
description: Draft or update a call sheet for a shoot day in CineFlo. Use when the user asks for a call sheet, tomorrow's calls, call times, the day's schedule for cast and crew, or to prepare a shoot day.
---

# Prep a call sheet

Draft the day's call sheet from the stripboard, fill in what the stripboard
doesn't know, and leave sending to the user in CineFlo.

## 1. Start from the schedule

- `list_projects`, then `get_callsheets` for the date to see whether a sheet
  exists already.
- If there's none, create it with `save_callsheet` and the `date` only: CineFlo
  fills it from that day's stripboard (scenes, times, D/N labels, breaks, the
  cast those scenes need, and "Day X of Y").
- If the stripboard changed since the sheet was made, `refillFromSchedule`
  re-syncs scenes and cast, keeping entries added by hand.

## 2. Fill in the day

Ask for what you can't know, in one message, then update the sheet with
`save_callsheet` and its `callSheetId`:

- **Times**: crew call, shooting call (first shot, usually 60 to 90 minutes
  after crew call), meal (no more than 6 hours after crew call) and an
  estimated wrap.
- **Locations**: slot 1 basecamp, 2 parking, 3 set, with addresses, and the
  nearest hospital's address. Never guess an address: ask, or leave it for
  the user.
- **Cast**: each person's call, pickup, and work status: `SW` start work, `W`
  work, `WF` work finish, `SWF` start/work/finish, `H` hold, and the rest as
  listed in `save_callsheet`. Cast call is usually after crew call, staggered
  by hair, makeup and wardrobe time.
- **Crew**: a call only for anyone who differs from the general crew call.
- **Notes**: safety notes for stunts, weapons, water, heights or night work,
  and anything special for the day (a picture car, a drone, a minor on set).

## 3. Hand it over

Summarize the sheet: day X of Y, calls, scenes and pages, cast called, and
anything still missing. Say plainly that CineFlo does not send call sheets
from here: the user reviews it and sends it from CineFlo.

## Notes

- Addresses need the Locations tab shared; contact details are never
  available here, which is expected.
- Given lists replace the current ones on an edit: when changing one cast
  member, send the full cast list back.
