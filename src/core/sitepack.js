import { INDUSTRIES, findIndustry } from '../data/catalog.js';
import { STOCK_DESIGNS } from './stockDesigns.js';
import { compileStockTemplate } from './stockTemplateCompiler.js';

export const DONOR = Object.freeze({
  repository: 'XTREME-SYSTEMS/digital-dominance',
  commit_sha: 'b65d4cbfbaa2e3feeb84c073dde801e3d9082e30',
  approved_reference: 'https://website-launch-engine-xps.vercel.app/'
});

export function createSitePack(options = {}) {
  const industry = findIndustry(options.industryKey || INDUSTRIES[0].key) || INDUSTRIES[0];
  const design = STOCK_DESIGNS.find(x => x.key === (options.designKey || 'signature')) || STOCK_DESIGNS[0];
  const brandName = String(options.brandName || 'Concept Studio').trim().slice(0, 90);
  const city = String(options.city || 'Preview Market').trim().slice(0, 90);
  return {
    pack_id: 'draft-' + industry.key + '-' + design.key,
    version: '1.0.0',
    source: { repository: DONOR.repository, commit_sha: DONOR.commit_sha, template_id: design.key },
    brand: { name: brandName, contact_phone: 'UNVERIFIED', legal_business_name: 'UNVERIFIED PREVIEW BUSINESS' },
    industry: { slug: industry.key, services: [...industry.services] },
    design: { approved_reference: DONOR.approved_reference, design_token_version: 'launch-home-2026-10-source' },
    locations: [{ city, region: String(options.region || 'UNVERIFIED'), country: 'US', verified_service_area: false, unique_value: 'Preview concept only. Location-specific serviceability and unique helpful facts require operator-supplied evidence.' }],
    provisioning: { mode: 'preview', approval_required: true, noindex_until_validated: true },
    requested_quantity: Number(options.quantity) || 1
  };
}

export function validateSitePack(pack) {
  const errors = [];
  const warnings = [];
  if (!pack || typeof pack !== 'object') return { ok: false, state: 'BLOCKED', errors: ['SitePack must be an object'], warnings, release_eligible: false };
  if (typeof pack.pack_id !== 'string' || pack.pack_id.length < 3) errors.push('Missing pack_id');
  if (typeof pack.source?.commit_sha !== 'string' || !/^[a-f0-9]{40}$/i.test(pack.source.commit_sha)) errors.push('Source commit SHA missing or malformed');
  if (!findIndustry(pack.industry?.slug)) errors.push('Industry not in reviewed catalog');
  if (!STOCK_DESIGNS.some(x => x.key === pack.source?.template_id)) errors.push('Unknown template ID');
  if (!pack.brand?.name || !pack.brand?.legal_business_name || !pack.brand?.contact_phone) errors.push('Brand identity fields required');
  if (!Array.isArray(pack.industry?.services) || pack.industry.services.length === 0) errors.push('At least one industry service is required');
  if (!Array.isArray(pack.locations) || pack.locations.length === 0) errors.push('Location record required');
  else for (const loc of pack.locations) {
    if (!loc.city || !loc.region || !loc.country) errors.push('Location city, region and country required');
    if (typeof loc.verified_service_area !== 'boolean') errors.push('Location serviceability must be explicitly true or false');
    if (!loc.unique_value || loc.unique_value.length < 30) errors.push('Location needs 30+ characters of useful differentiation');
    if (!loc.verified_service_area) warnings.push('Market is not verified; release remains blocked');
  }
  if (pack.provisioning?.mode !== 'preview' || pack.provisioning?.approval_required !== true || pack.provisioning?.noindex_until_validated !== true) errors.push('Preview/noindex/operator approval contract required');
  if (pack.requested_quantity != null && (!Number.isInteger(pack.requested_quantity) || pack.requested_quantity < 1 || pack.requested_quantity > 1000)) errors.push('Draft quantity must be 1 to 1000');
  if (pack.brand?.contact_phone === 'UNVERIFIED') warnings.push('Real contact routing is not configured');
  if (pack.brand?.legal_business_name === 'UNVERIFIED PREVIEW BUSINESS') warnings.push('Legal business identity is not verified');
  return { ok: errors.length === 0, state: errors.length ? 'BLOCKED' : 'PREVIEW_ONLY', errors, warnings, release_eligible: false };
}

export function compilePreview(pack) {
  const report = validateSitePack(pack);
  if (!report.ok) throw new Error('Preview rejected: ' + report.errors.join('; '));
  const industry = findIndustry(pack.industry.slug);
  const design = STOCK_DESIGNS.find(x => x.key === pack.source.template_id);
  const html = compileStockTemplate(industry, design, { name: pack.brand.name });
  if (!html.includes('name="robots" content="noindex,nofollow"')) throw new Error('Missing noindex on preview');
  return html;
}
