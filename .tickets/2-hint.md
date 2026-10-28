Split from support ticket #4471 (412 reports merged by subject line).

**Covers 33 reports.**

The booking-v3 form prints `MM/DD/YYYY` under its date field. Day-first tenants on booking-v3 have their people type the date month first, as the hint says, and the form then reads it day first. This is not the parser bug: fixing the parser does not fix these.

- Tenants: alder.physio (de-DE), copper.studio (es-ES), pale.harbour (pt-PT), all on booking-v3.
- Channel: form ×33 only.
- Seen: 2026-04-17 → 2026-09-22.

Fix: print the date hint from the tenant's locale (booking-v2 prints `DD/MM/YYYY`).

Count: unique report ids in `src/lib/data/reports-4471.json`, grouped by `groupByProblem` in `src/lib/kb/problems.ts`. Page: `src/routes/kb/incidents/4471-split/+page.svx`.
