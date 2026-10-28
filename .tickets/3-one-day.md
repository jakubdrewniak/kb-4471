Split from support ticket #4471 (412 reports merged by subject line).

**Covers 5 reports** (filed and counted under the parser in #1, as the desk counts them): R-41202, R-41209, R-41236, R-41344, R-41620.

These dates move by one day; they are not a day/month swap. Tuesday 12 May shows as Monday 11 May; every June booking is one day off; one meeting is Tuesday in Lisbon and Monday in Toronto; an invite arrives before the booking was made. This looks like a timezone or midnight-UTC bug. The desk already read these as a one-day move (`src/lib/data/desk-notes.json`), but #4471 filed them under the parser by tenant.

- Tenants: kettle.books, alder.physio, nine.lanterns, pale.harbour, lantern.row.
- Channels: email ×3, app ×2.
- Seen: 2026-04-02 → 2026-10-04.

Count: unique report ids in `src/lib/data/reports-4471.json`, grouped by `groupByProblem` in `src/lib/kb/problems.ts`. Page: `src/routes/kb/incidents/4471-split/+page.svx`.
