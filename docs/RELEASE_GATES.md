# Production Release Gates / do not bypass

This is a PREVIEW starter and is not operationally production-ready merely because npm tests pass.

## Required next steps

1. Source and design authority: pin donor SHA, approved visuals, customer licenses and screenshot baselines.
2. Client identity: verify business name, phone, email, locations served, licensing and proof before replacing preview markers.
3. Real original content: useful market/service details specific to every published location; no thin city-swaps or doorway networks.
4. Useful action: authorized lead form with input validation, spam control, consent, privacy notice and tenant-scoped storage. Never publish an inert form as functional.
5. Security: server-only secrets, role permissions, RLS, cross-tenant negative tests, rate limiting, dependency review and incident response.
6. Infrastructure: bind the existing authoritative queue, one heartbeat, idempotent jobs, worker leases, dead letters and receipts. No second scheduler.
7. Deployment: branch-only preview, correct Vercel project identity, preview URL, TLS, canonical/sitemap/indexation checks, rollback SHA and independent smoke tests.
8. UX: test navigation, actual gallery images, form paths, keyboard access, focus, reduced motion and performance on desktop 1440x900, tablet and mobile 390x844.
9. Independent verification: 100% of applicable executable tests pass, no mandatory UNKNOWN gate, visually approved comparison, source and deployment SHA match.
10. Operator release authorization for live provisioning, public publishing, DNS, payment/spend, production database, secrets, customer messages or default-branch merge.

## SEO rules

Follow official Google Search Essentials. No guarantees of Page 1, no fake offices or reviews, and no low-value scaled content whose purpose is ranking manipulation. Use verified structured data and actual serviceability. Publication should follow useful differentiation and human review, not arbitrary output count.

## State model

CONFIGURED -> PREVIEW_READY -> VALIDATED -> APPROVED -> LIVE, or BLOCKED/FAILED at any gate.

Generated HTML with a SHA-256 manifest means GENERATED, not DEPLOYED or LIVE. Missing live deployment receipt remains UNKNOWN.
