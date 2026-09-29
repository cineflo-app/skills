---
name: crew-and-cast-setup
description: Set up or update a CineFlo project's cast list and crew list. Use when the user wants to add cast or crew, number the cast, organize crew by department, set default call times, or fix cast numbers so the breakdown, stripboard and call sheets agree.
---

# Set up cast and crew

The cast list's numbers are what the breakdown, the stripboard and every
call sheet refer to, and the crew list's order is how call sheets print.
Get both right once.

## 1. See what exists

`get_cast_and_crew` returns cast (character and number), crew (department and
title) and clients, with default call, pickup and dismissal times. Contact
details are never available here; the user adds those in CineFlo.

## 2. Number the cast

Cast numbers follow the call-sheet convention: 1 for the lead, then by size
of role (usually the number of scenes), with the numbers kept stable once
call sheets go out.

- Get the characters from the breakdown (`get_breakdown` with category
  `cast`) and count their scenes to suggest an order.
- Add characters with `save_cast_and_crew`: `type` `cast`, `character` as
  scripted in capitals ("SARAH"), and `castNumber`. Leave the actor's `name`
  empty until they're cast.
- Changing a number also updates the scenes the character is tagged in, and
  two numbers can be swapped in one call. Warn the user before renumbering
  once call sheets exist.

## 3. Build the crew list

Add crew with `type` `crew`, `name`, `title` (the job, such as "Gaffer") and
`department` from the list `save_cast_and_crew` accepts (Camera, Grip,
Electric, Art, Costume & Wardrobe, Hair & Makeup, Sound and so on). Clients
go in as `type` `client` with their role in `title`.

Then set the call-sheet order of each department with `reorder_crew`, head of
department first: for example Director of Photography, 1st AC, 2nd AC, DIT in
Camera; Gaffer, Best Boy Electric, Electrician in Electric. `reorder_crew`
needs every member of that department, in order.

## 4. Default times

Set each person's usual `callTime`, and `pickupTime` for cast with
transport, when the user gives them. Call sheets start from these defaults.

## Notes

- Up to 100 people per call, all or nothing.
- Never put phone numbers or emails in any field; CineFlo keeps contact
  details separately and doesn't share them here.
