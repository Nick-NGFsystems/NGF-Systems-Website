# Now — NGF Systems marketing site (www.ngfsystems.com)

_Last updated 2026-11-16. Overwrite, don't append; git keeps the history._

**Status (checked 2026-11-16):** Vercel's latest production deploy (2026-11-15) is `27b5470` from PR #4's branch `claude/upbeat-brahmagupta-f26h0g`: the six-page rebuild (`/`, `/services`, `/work`, `/pricing`, `/about`, `/contact`) with the 2026-11-11 light, product-led redesign. Nick deploys that branch to production himself. `main` (`0cc1abe`, 2026-09-18) is still the old one-page site.

**Do not merge or push to `main` until PR #4 is merged.** A build of `main` would roll the live site back.

**Next (Nick):** review PR #4 (draft, 17 commits), mark it ready and merge it.

**Waiting on Nick:**
- Sign off the prices still listed in `UNCONFIRMED_PRICING` (`lib/pricing.ts` on PR #4): monthly setup fee, booking, store, custom. They render as "quoted" until set.
- Not done (PR #4's CLAUDE.md, "Verified / not verified"): a real device, the portal editor on the new markup, a live form submission.
- PR #4 renamed the editor field keys (`feature0`…`feature8`), so content published against the old keys is orphaned.
- Check the Neon point-in-time-restore window; it decides whether "every version saved" should also mention a database restore (as of 2026-11-09).

**Open PRs:** #4 (draft, → `main`), #5 (first NOW.md; this branch builds on it).
