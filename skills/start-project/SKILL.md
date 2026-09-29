---
name: start-project
description: Start a new film project in CineFlo from a conversation. Use when the user wants to create a CineFlo project, set up a new production, or get a screenplay, treatment or pitch into CineFlo.
---

# Start a project

Create the project, get the screenplay in, and point the user at the next
steps.

## 1. Create it

Ask only for what you need: the title, and if they're handy the logline,
director, DP, producer and production company. Then call `create_project`.
The new project is shared with this connection at edit on every tab; the user
can narrow that in CineFlo under Settings → Privacy & Data → Connected Apps.

## 2. Get the screenplay in

Screenplays are imported in CineFlo, not uploaded here. Give the user the
importer link that `create_project` returns (or `start_script_import` for an
existing project) and tell them to choose the PDF, Final Draft (.fdx) or
Fountain file there. CineFlo builds the scenes, page counts and script pages
from it. Don't claim anything was uploaded.

If the user shared a treatment or outline in the chat instead of a
screenplay, offer to create the scenes from it with `save_scenes` (numbers,
headings, INT/EXT, time of day and a synopsis each).

## 3. Next steps

When the import is done (`get_script_info` shows the draft), offer the usual
order of work:

1. Break down the script.
2. Settle how it will be shot (coverage style and camera package) and build
   the shot lists.
3. Schedule the shoot days.
4. Set up the budget.
