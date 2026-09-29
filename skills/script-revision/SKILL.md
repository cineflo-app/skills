---
name: script-revision
description: Bring a CineFlo project up to date after a new script draft is imported. Use when the user has a new draft, revised pages or a new revision colour, or asks what changed in the script and what it affects in the breakdown, shot lists or schedule.
---

# Update the project for a script revision

A new draft ripples through everything built from the old one. Find what
changed, show what it touches, and update what the user agrees to.

## 1. Get the new draft in

If the user hasn't imported it yet, give them the link from
`start_script_import`: the screenplay is uploaded in CineFlo, and a new import
is a revision that keeps tagged elements and the previous draft.

## 2. See what changed

`get_script_info` gives the revision (colour and cycle, such as "2nd Blue"),
its date, and each scene's status against the previous draft: unchanged,
changed, new or omitted. Work only on the scenes that aren't unchanged.

For each changed or new scene, read the new text with `get_scene_text` (up to
40 scenes per call with `sceneNumbers`). You can't see the old text, so judge
the change from the new text against the current breakdown and shots.

## 3. Work out the impact

For each scene that changed, check:

- **Breakdown** (`get_breakdown` for the scene): elements the new text no
  longer mentions, and new ones it needs (a new character, prop, vehicle or
  effect).
- **Shots** (`get_scene`): shots whose description no longer matches the
  action, speakers who now need coverage, and shots for moments that were cut.
- **Schedule** (`get_schedule`): the scene's shoot day, whether its page
  length changed, and cast added or dropped for that day.

For omitted scenes: whether they still have shots, and whether they're
scheduled. An omitted scene keeps its number; don't reuse it.

## 4. Report, then update

Report per scene in a compact list: what changed and what it affects. Put
the things that cost time or money first: new cast, new locations, stunts or
effects, and schedule moves. Then offer the updates:

- Breakdown: `save_breakdown` for new elements. Remove tags that no longer
  apply with `delete_breakdown_tag` only after the user agrees.
- Shots: propose revised shots and save with `save_shots`. Don't delete shots
  on your own: ask, or mark them `skipped`.
- Schedule: unschedule omitted scenes with `update_stripboard`
  (`unschedule_scene`) when the user agrees, and flag days that are now too
  long or too short.

## Notes

- Don't renumber existing scenes in a revision: call sheets and shot lists
  already use those numbers. New scenes take the number printed in the
  script, or the next free one, and a number in use is never reused.
- If Script pages are off for the project, you can still report statuses from
  `get_script_info` but not read the text; say so.
