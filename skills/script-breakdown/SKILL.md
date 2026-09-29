---
name: script-breakdown
description: Break down a screenplay in a CineFlo project into production elements. Use when the user asks to break down the script or a scene, tag props, wardrobe, cast, extras, vehicles or effects, or build the elements list a stripboard and budget need.
---

# Break down the script

Tag every element a scene needs, the way a first AD or script supervisor
marks up a script, and save it to the project's breakdown.

## 1. Check what's there

- `list_projects`, then `get_script_info` to see the current draft and, after
  a revision, which scenes are new or changed. On a revised script, break
  down only the new and changed scenes unless the user asks for all of them.
- `get_breakdown` for the scenes you'll work on, so you reuse existing
  elements and don't tag the same thing twice.
- If there's no script yet, give the user the importer link from
  `start_script_import`: the screenplay is uploaded in CineFlo, not here.

## 2. Read the scenes

`get_scene_text` returns up to 40 scenes per call (`sceneNumbers`). Work in
batches: read a batch, save its breakdown, then move on. Script pages must be
switched on for the project; if they're off, say so and stop.

## 3. Decide each element's category

Use the breakdown categories exactly as `save_breakdown` lists them. The
common calls:

- **cast**: speaking or named characters, as scripted in capitals ("SARAH").
  Tagging a cast element also adds the character to the cast list and the
  scene's cast.
- **extrasAtmosphere** (background) vs **extrasSilent** (featured, no lines);
  give `quantity` when the script implies a number.
- **props**: anything a character handles. **setDressing**: what's in the set
  that nobody handles. **greenery**: plants and landscaping.
- **wardrobe** and **makeup**: tie them to a character with
  `linkedCastNumber` when they belong to one (blood on MAYA's scrubs).
- **vehicles**, **animals** (plus **animalWrangler**), **stunts**.
- **sfx** for practical on-set effects such as rain or smoke;
  **mechanicalEffects** for rigged mechanisms; **vfx** for anything added in
  post.
- **sound** and **music** for playback or anything heard that must be on set;
  **specialEquipment** and **camera** for gear the scene demands (a crane, an
  underwater housing).

When a scene is ambiguous, pick the most useful category and add a scene
note on the tag rather than asking.

## 4. Save

- Use one `save_breakdown` call per batch, with up to 100 elements. Give each
  element's `tags` the scenes it appears in (`sceneNumber`) and a short
  `phrase` from the script so the tag anchors to the words that call for it.
- An element with the same name in the same category is reused, not
  duplicated, and a repeated tag is skipped, so re-running a scene is safe.
- Per-scene notes go on the tag (`notes`), not on the element.

## 5. Report

Summarize per scene: how many elements were tagged, by category, and anything
that needs a decision (an unclear character, a stunt that needs a
coordinator, a vehicle that needs a picture car). Use `update_breakdown_tags`
to fix notes or move a tag to another scene afterwards.
