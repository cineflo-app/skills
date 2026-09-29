---
name: lookbook
description: Build a mood board or lookbook in a CineFlo project for the whole film, a location or a character. Use when the user wants a lookbook, mood board, visual references, a colour palette, or to capture the tone, lighting or camera style of the project.
---

# Build a lookbook

Turn the conversation about how the film should look into a mood board whose
sections read as lookbook chapters.

## 1. Choose the board

`get_moodboards` lists existing boards with their subject and sections. Add
to a matching board instead of making a second one. A new board is about one
subject:

- **project**: the whole film. Default sections: Tone, Palette, Lighting,
  Camera.
- **location**: one place (`locationId` from `get_locations`).
- **character**: one cast member (`castRoleId` from `get_cast_and_crew`).

Create it with `save_moodboard` (`title`, `subject`). Add sections by preset
(`tone`, `palette`, `lighting`, `camera`, `design`, `wardrobe`, `location`,
`character`, or `custom` with a title). On an edit, `sections` is the full
ordered list, and a section left out is deleted with its cards: always send
every section you want to keep, with its `sectionId`.

The free plan allows one board per project; if the tool says so, add to the
existing board.

## 2. Fill it

Use `save_moodboard_cards` (up to 100 per call), each card in the section it
belongs to:

- **note** cards for the ideas: a sentence of intent per card, and `tone`
  `quote` for a line that should stand out ("The diner is the only warm place
  in the film").
- **palette** cards for colour: 1–6 swatches with hex values and labels
  ("sodium orange #F2A33A").
- **link** cards for references the user names: a film still, a painting, a
  photographer's page. Only add links the user gives you or asks for: don't
  invent URLs.

Give every card a short `caption`, as it would read in a printed lookbook.
Link cards to the scenes they're for with `sceneIds` (from `get_scene`).

## 3. Shape it

Order the sections the way the story is told, lead each with its strongest
card (`order` 0), and mark the best references `favorite`. Images the user
uploads in CineFlo can become the cover: `coverCardId` takes an image card.

## Notes

- Image cards can't be created here; the user adds images in CineFlo, and
  their captions can be edited from here.
- Keep the board specific to this film: what the camera, light and colour
  should do and why, rather than general genre notes.
