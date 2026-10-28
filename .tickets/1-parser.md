Split from support ticket #4471 (412 reports merged by subject line).

**Covers 379 reports** (the desk's count, by cause; 5 of them are the one-day moves in #3).

The shared parser reads every date month first. Tenants whose locale writes the day first get the day and month swapped: a booking for 7 April goes out as 4 July, 2 December as 12 February.

- Tenants: all 11 day-first tenants on file (en-GB, en-IE, nl-NL, cs-CZ, it-IT, fr-FR, pl-PL, da-DK, de-DE, es-ES, pt-PT).
- Channels: app ×204, email ×150, form ×25.
- Seen: 2026-04-01 → 2026-10-04.
- Placed by tenant locale and booking form, not by intake's tag (intake guesses from the reporter's browser).

Fix: parse dates in the tenant's locale.

Count: unique report ids in `src/lib/data/reports-4471.json`, grouped by `groupByProblem` in `src/lib/kb/problems.ts`. Page: `src/routes/kb/incidents/4471-split/+page.svx`.
