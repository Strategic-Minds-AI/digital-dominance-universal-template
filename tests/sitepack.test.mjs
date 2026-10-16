import test from 'node:test';
import assert from 'node:assert/strict';
import { INDUSTRIES } from '../src/data/catalog.js';
import { STOCK_DESIGNS } from '../src/core/stockDesigns.js';
import { compilePreview, createSitePack, validateSitePack, DONOR } from '../src/core/sitepack.js';

test('donor SHA is pinned, six catalog industries and ten original design compositions', () => {
 assert.match(DONOR.commit_sha, /^[a-f0-9]{40}$/);
 assert.equal(INDUSTRIES.length, 6);
 assert.equal(STOCK_DESIGNS.length, 10);
 assert.equal(new Set(STOCK_DESIGNS.map(x => x.hero)).size, 10);
});
test('all 60 preview combinations compile distinct noindex HTML with inert contact section', () => {
 const hashes = new Set();
 for (const ind of INDUSTRIES) for (const design of STOCK_DESIGNS) {
  const pack = createSitePack({ industryKey: ind.key, designKey: design.key, brandName: 'Concept ' + ind.label });
  const gate = validateSitePack(pack);
  assert.equal(gate.ok, true, gate.errors.join(','));
  assert.equal(gate.state, 'PREVIEW_ONLY');
  assert.equal(gate.release_eligible, false);
  const html = compilePreview(pack);
  assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
  assert.match(html, /design preview, not an operating business/i);
  assert.doesNotMatch(html, /<form[\s>]/i);
  assert.doesNotMatch(html, /src=""/);
  assert.doesNotMatch(html, /media\.base44\.com/);
  assert.doesNotMatch(html, /https?:\/\/.*(?:api\.base44|supabase\.co\/rest|hooks\.zapier)/i);
  hashes.add(html);
 }
 assert.equal(hashes.size, 60);
});
test('preview sanitizes injected brand text', () => {
 const pack = createSitePack({ brandName: '<script>alert(1)</script>' });
 const html = compilePreview(pack);
 assert.ok(html.includes('&lt;script&gt;'));
 assert.doesNotMatch(html, /<script>alert/);
});
test('production flags and missing local value fail closed', () => {
 const pack = createSitePack();
 pack.provisioning.mode = 'live';
 assert.equal(validateSitePack(pack).ok, false);
 pack.provisioning.mode = 'preview';
 pack.provisioning.noindex_until_validated = false;
 assert.equal(validateSitePack(pack).ok, false);
 pack.provisioning.noindex_until_validated = true;
 pack.locations[0].unique_value = 'City name only';
 assert.equal(validateSitePack(pack).ok, false);
});
test('unknown niche, template and invalid quantity are blocked', () => {
 const pack = createSitePack();
 pack.industry.slug = 'invented-vertical';
 assert.equal(validateSitePack(pack).ok, false);
 pack.industry.slug = 'roofing';
 pack.source.template_id = 'not-a-design';
 assert.equal(validateSitePack(pack).ok, false);
 pack.source.template_id = 'signature';
 pack.requested_quantity = 1001;
 assert.equal(validateSitePack(pack).ok, false);
});
