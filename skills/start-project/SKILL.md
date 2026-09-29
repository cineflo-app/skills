---
name: start-project
description: "Create a new project in CineFlo and get the screenplay into it. Use this whenever the user wants to start or set up a new film, short, commercial or music video, create a CineFlo project, or get a screenplay, treatment or outline into CineFlo, including when they share a script or treatment in the chat and want to start planning it."
---

# Start a project

Create the project, get the screenplay in, and point the user at the next
steps.

## Before you start

Find the project with `list_projects`. If only one fits what the user said,
use it without asking; if several could, ask which, since writing to the
wrong production is hard to notice later. If a tool says a tab isn't shared
or is view-only, tell the user it's set in CineFlo under Settings → Privacy &
Data → Connected Apps, and carry on with what you can do.

The steps below are good production practice, not rules to hold to: when
the user asks for something different, do it their way.

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
from it. Say plainly that the import is theirs to do; otherwise they'll look
for scenes that aren't there yet.

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
