# Verified source provenance / 2026-10-15

Donor repository: XTREME-SYSTEMS/digital-dominance

Pinned main SHA: b65d4cbfbaa2e3feeb84c073dde801e3d9082e30

Source baseline is evidence of original code, **not proof that each feature works in production**.

| Original path | Extracted path | Original blob SHA | Treatment |
| --- | --- | --- | --- |
| src/components/launch-engine/LaunchHero.jsx | same | 54d02f1e5f19814b349ebc04c564959b71f937c0 | Exact |
| src/components/launch-engine/LaunchHeroCopy.jsx | same | bcdb897c5d742ab5d4898b2f490257504fce82b1 | Exact |
| src/components/launch-engine/CinematicHeroVisual.jsx | same | 9ef8f0424aa72da2349d3a520e6bce75e53a5d83 | Exact |
| src/components/launch-engine/RoofingLaptop.jsx | same | 576619240edbe76aaf1d6c716d990196f3d57b9c | Exact |
| src/components/launch-engine/FloatingTemplateScreen.jsx | same | 0f124fd4638e5a10a69aeb0057f7e7d7d77da0b7 | Exact |
| src/components/launch-engine/cinematicHero.css | same | 246529d6edbbc85a5b40f0e149917b5015b4e7f7 | Exact |
| src/components/launch-engine/HowItWorks.jsx | same | 922e61ea14e0e6890a18dfd390172ec77d61311d | Exact |
| base44/shared/stockDesigns.js | src/core/stockDesigns.js | 41cb0941fbec672cd2af24e7512b33c0fc0469d3 | Exact |
| base44/shared/stockIndustryGuidance.js | src/core/stockIndustryGuidance.js | ae432b077a92e7ad7dc5fa929943b07d612c535d | Exact |
| base44/shared/stockTemplateStyles.js | src/core/stockTemplateStyles.js | ccfc411caaa0ab2eb684130db697f5f3d2a91f27 | Adapted: inert placeholder styling |
| base44/shared/stockTemplateCompiler.js | src/core/stockTemplateCompiler.js | 36aa3f9f5d92e77bcfad5d152a498b2a5123b508 | Adapted: local asset whitelist, inert fallback, remote video disabled |
| src/index.css | src/styles.css theme variables | 195b7c9a61ba892535a2a23e55c918d7864c82ce | Selected tokens; remaining UI CSS new |
| src/components/launch-engine/LaunchHeroNav.jsx | src/components/launch-engine/LaunchHeroNav.jsx | ee9c1caa12bea3fbba5fbb0efaa5f18e68f19869 | Replaced: no admin route or live auth |

Excluded: original Base44 SDK client and entity hooks, production integration wrappers, autonomous schedulers, CRM writes, DNS/provisioning calls, unverified homepage industry image approvals, fabricated claims, customer data, secrets, production application identifiers, and high-risk score/rating claims.

Visual acceptance requires independently measured desktop, tablet and mobile screenshots against approved reference. External Unsplash images referenced by the original cinematic hero CSS require rights/availability review before commercial public use.

The ten copied design families retain distinct hero compositions; no fake conversion-rate or ranking numbers are shipped.

## Original governance patterns

The donor qualityConstitution.ts was inspected and its defensible release principles were carried into docs/RELEASE_GATES.md: missing tests are UNKNOWN, hard-gate failure blocks release, builders do not self-certify, and no invented trust signals.
