# Now — NGF Systems marketing site (www.ngfsystems.com)

_Last updated 2026-11-09. Overwrite, don't append; git keeps the history._

**Status:** Production serves `2ce0499`, a preview from PR #4's branch (`claude/upbeat-brahmagupta-f26h0g`) that Nick promoted on 2026-09-23: six pages (`/`, `/services`, `/work`, `/pricing`, `/about`, `/contact`), the Direction A design and capability pricing. `main` (`0cc1abe`, 2026-09-18) is still the old one-page site.

**Do not merge or push to `main` until PR #4 is merged.** A build from `main` would roll the live site back to the old one-page site.

**Next (Nick):** review PR #4, mark it ready and merge it. Its last commit, `f22bbdb` (the claims audit: removes "daily backups", the 2am uptime promise and others), is not live. www.ngfsystems.com still says "daily backups" (checked 2026-11-09).

**Also waiting on Nick:**
- Before merging: the audit says "there is no product catalog", but the app has had Products since 2026-10-01. Recheck the Store copy.
- Sign off the prices still in `UNCONFIRMED_PRICING`: monthly setup fee, booking and store. They render as "Quoted" until set.
- Check the Neon PITR window; it decides whether "every version saved" should also mention a database restore.
- Add client screenshots at `public/work/<slug>.jpg`. PR #4 renamed the editor field keys (`feature0`…`feature8` → `services.pillars`), so content published against the old keys is orphaned.

**Open PRs:** #4 (draft, → `main`).
