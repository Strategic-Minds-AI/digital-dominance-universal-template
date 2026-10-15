import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { INDUSTRIES } from '../src/data/catalog.js';
import { STOCK_DESIGNS } from '../src/core/stockDesigns.js';
import { compilePreview, createSitePack, validateSitePack } from '../src/core/sitepack.js';

const output = 'preview';
const buildAll = process.argv.includes('--all');
const configurations = buildAll
  ? INDUSTRIES.flatMap(ind => STOCK_DESIGNS.map(design => createSitePack({ industryKey: ind.key, designKey: design.key, brandName: ind.label + ' Concept Studio' })))
  : [JSON.parse(await readFile('sitepacks/example.json', 'utf8'))];
const manifests = [];
for (const pack of configurations) {
  const gate = validateSitePack(pack);
  if (!gate.ok || gate.state !== 'PREVIEW_ONLY' || gate.release_eligible !== false) throw new Error('Blocked: ' + JSON.stringify(gate));
  const html = compilePreview(pack);
  const file = buildAll ? join(output, pack.industry.slug, pack.source.template_id + '.html') : join(output, 'example.html');
  await mkdir(file.slice(0, file.lastIndexOf('/')), { recursive: true });
  await writeFile(file, html, 'utf8');
  manifests.push({ path: file, sitepack_id: pack.pack_id, design_id: pack.source.template_id, sha256: createHash('sha256').update(html).digest('hex'), release_eligible: false, noindex: true });
}
const hashes = new Set(manifests.map(x => x.sha256));
if (hashes.size !== manifests.length) throw new Error('Duplicate preview output detected');
const receipt = {
  kind: 'DIGITAL_DOMINANCE_SYNTHETIC_PREVIEW_GENERATION',
  donor_sha: 'b65d4cbfbaa2e3feeb84c073dde801e3d9082e30',
  mode: 'offline_preview',
  generated: manifests.length,
  distinct_sha256: hashes.size,
  deployed: 0,
  released: 0,
  live_sites: 0,
  receipt_schema_version: 1,
  artifacts: manifests
};
await writeFile(join(output, 'preview-receipt.json'), JSON.stringify(receipt, null, 2), 'utf8');
console.log('PREVIEW_ONLY: generated ' + manifests.length + ' distinct HTML concepts; deployed 0; released 0');
