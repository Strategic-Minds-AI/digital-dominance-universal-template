# Digital Dominance Universal Template

Private, source-traceable and preview-only GitHub starter extracted from the verified Digital Dominance codebase. Built for Strategic Minds AI to reuse premium designs and a deterministic 10-layout generator without cloning the entire Base44 application.

**Status: development branch. No production deployment, live CRM, DNS mutation, autonomous scheduler, paid provisioning or customer communications.**

## What you get

- Original Digital Dominance cinematic hero and supporting visual components, copied from pinned source.
- Ten real design configurations and a standalone HTML compiler adapted to accept only local, approved image paths.
- Six sample industry configurations with industry-specific information, rather than fake listings, ratings, testimonials or office claims.
- Full-page in-browser website previews with noindex metadata and no operational lead forms.
- SitePack JSON generator with approval-required and noindex flags.
- Offline batch preview generation: 6 industries times 10 designs equals 60 synthetic HTML concepts.
- SHA-256 manifest that distinguishes generated previews from deployed websites.
- Automated negative tests and a GitHub Actions quality workflow.
- Vercel-compatible Vite app configuration, with noindex headers.
- Adapter boundaries for existing X1, Supabase, Railway, Vercel and CRM, **not cloned or silently enabled**.

## Get started

1. Clone this repo and check out feature/verified-digital-dominance-template-v1 until the reviewed branch is merged.
2. Run: npm install
3. Run: npm run dev
4. Open the local Vite development URL. Choose a market and one of ten template styles.
5. Use Full-page preview or Export JSON SitePack. The export produces a review draft only.
6. Run: npm run test
7. Run: npm run generate -- --all
8. Inspect preview/preview-receipt.json and the 60 generated, noindex concept pages.
9. Run: npm run build for the static Vite build.

Do not deploy to a public production domain or turn off noindex before release validation and operator approval. The repository itself is separate from a production app.

## Repository template status

To enable the GitHub **Use this template** button, an organization admin must mark the repository as a Template repository in GitHub Settings -> General -> Template repository. This repository is populated on a feature branch; merging to the default branch is a separate protected decision.

## Modules

- src/components/launch-engine: extracted premium visual components.
- src/core/stockDesigns.js: ten original layout signatures.
- src/core/stockTemplateCompiler.js: extracted HTML compiler, adapted to remove Base44 media dependencies.
- src/core/sitepack.js: explicit preview-only contract and validator.
- src/data/catalog.js: synthetic, useful demo vertical data without invented business proofs.
- sitepacks/example.json: review-only example.
- scripts/generate.mjs: local noindex preview factory.
- tests/: deterministic and negative validation.
- docs/SOURCE_PROVENANCE.md: exact donor paths and blob hashes.
- docs/RELEASE_GATES.md: implementation, SEO and operational controls.

## Source authority

Original donor: https://github.com/XTREME-SYSTEMS/digital-dominance

Pinned source commit: b65d4cbfbaa2e3feeb84c073dde801e3d9082e30

Visually approved reference for future parity work: https://website-launch-engine-xps.vercel.app/

This extract preserves the hero source rather than inventing a replacement, but a 99% browser-measured visual-parity pass has NOT been performed for this independent starter.

## Safety design

The standalone preview has no Base44 SDK, backend credential, email action or queue worker. Rendering HTML, exporting a SitePack, or creating a local synthetic preview is **not** a release operation. Automated quality tests are necessary but do not replace visual, accessibility, tenant, lead-routing or deployment tests.

For adaptation into a client production app, follow docs/RELEASE_GATES.md, use a new repo from this private template, supply verified client content, and wire to **one** authoritative queue and worker after approved tenant-specific provisioning.
