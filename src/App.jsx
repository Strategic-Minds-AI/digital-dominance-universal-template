import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Download, Eye, LockKeyhole, X } from 'lucide-react';
import LaunchHero from './components/launch-engine/LaunchHero.jsx';
import HowItWorks from './components/launch-engine/HowItWorks.jsx';
import { INDUSTRIES } from './data/catalog.js';
import { STOCK_DESIGNS } from './core/stockDesigns.js';
import { compilePreview, createSitePack, validateSitePack } from './core/sitepack.js';
import './styles.css';

export default function App() {
 const [industryKey, setIndustryKey] = useState('roofing');
 const [designKey, setDesignKey] = useState('signature');
 const [brandName, setBrandName] = useState('Concept Studio');
 const [city, setCity] = useState('Preview Market');
 const [region, setRegion] = useState('UNVERIFIED');
 const [quantity, setQuantity] = useState(1);
 const [previewOpen, setPreviewOpen] = useState(false);
 const pack = useMemo(() => createSitePack({ industryKey, designKey, brandName, city, region, quantity }), [industryKey, designKey, brandName, city, region, quantity]);
 const validation = useMemo(() => validateSitePack(pack), [pack]);
 const html = useMemo(() => validation.ok ? compilePreview(pack) : '', [pack, validation.ok]);
 const selectIndustry = (key) => { setIndustryKey(key); document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' }); };
 const exportPack = () => {
   const blob = new Blob([JSON.stringify(pack, null, 2)], { type: 'application/json' });
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a'); a.href = url; a.download = 'sitepack-preview.json'; a.click();
   URL.revokeObjectURL(url);
 };
 return <div className="bg-launch-home-background min-h-screen">
  <div className="notice-banner"><LockKeyhole size={15}/> PRIVATE TEMPLATE DEVELOPMENT / PREVIEW ONLY / NOT CONNECTED TO LIVE PROVISIONING</div>
  <LaunchHero onBrowse={() => document.getElementById('industries')?.scrollIntoView({ behavior: 'smooth' })}/>
  <section id="industries" className="factory-section white-section">
   <div className="factory-container">
    <p className="eyebrow-blue">01 / INDUSTRY CATALOG</p>
    <h2 className="factory-title">Choose your market.</h2>
    <p className="section-lead">Six working concept configurations, ready for verified business facts and more verticals. Not claims of live sites.</p>
    <div className="industry-grid">
     {INDUSTRIES.map((ind, i) => <button key={ind.key} type="button" onClick={() => selectIndustry(ind.key)} className={'industry-card ' + (industryKey === ind.key ? 'selected' : '')} aria-pressed={industryKey === ind.key}>
      <span className="industry-id">0{ i + 1 } / MARKET CONCEPT</span><strong>{ind.label}</strong><span>{ind.description}</span>
      <span className="industry-more">Explore styles <ArrowRight size={18}/></span>
     </button>)}
    </div>
   </div>
  </section>
  <section id="templates" className="factory-section dark-section">
   <div className="factory-container">
    <p className="eyebrow-blue">02 / ORIGINAL TEMPLATE ENGINE</p>
    <h2 className="factory-title">Ten distinct compositions.</h2>
    <p className="section-lead">These ten layouts are copied from the original Digital Dominance design registry. Select one to see a full-page noindex concept.</p>
    <div className="design-grid">
     {STOCK_DESIGNS.map((design, i) => <button key={design.key} type="button" onClick={() => {setDesignKey(design.key);setPreviewOpen(true);}} className={'design-card ' + (designKey === design.key ? 'selected' : '')} aria-label={'Preview ' + design.name}>
      <span className="design-swatch" style={{ background: design.surface, color: design.ink }}><span className="swatch-nav"/><span className="swatch-head" style={{ background: design.accent }}/><span className="swatch-line"/><span className="swatch-boxes"><i/><i/><i/></span></span>
      <span className="design-info"><span className="design-index">{String(i + 1).padStart(2,'0')} / {design.hero}</span><strong>{design.name}</strong><span>{design.detail}</span><span className="design-preview">Full page preview <Eye size={17}/></span></span>
     </button>)}
    </div>
   </div>
  </section>
  <HowItWorks/>
  <section id="sitepack" className="factory-section white-section">
   <div className="factory-container">
    <p className="eyebrow-blue">03 / APPROVAL-FIRST HANDOFF</p>
    <h2 className="factory-title">Generate a draft SitePack.</h2>
    <p className="section-lead">Export a safe, versioned manifest for your existing X1/GitHub/Vercel validation pipeline. Exporting does not publish, deploy, message leads, or start workers.</p>
    <div className="pack-layout">
     <form className="pack-form" onSubmit={e => e.preventDefault()}>
      <label>Concept brand name <input value={brandName} onChange={e => setBrandName(e.target.value)} maxLength={90} required/></label>
      <label>Preview city <input value={city} onChange={e => setCity(e.target.value)} maxLength={90} required/></label>
      <label>Region <input value={region} onChange={e => setRegion(e.target.value)} required/></label>
      <label>Draft quantity (not a provisioning request) <input type="number" min="1" max="1000" value={quantity} onChange={e => setQuantity(Number(e.target.value))}/></label>
      <div className="pack-actions">
       <button type="button" className="primary-action" onClick={() => setPreviewOpen(true)} disabled={!validation.ok}><Eye size={18}/> Full-page preview</button>
       <button type="button" className="secondary-action" onClick={exportPack} disabled={!validation.ok}><Download size={18}/> Export JSON SitePack</button>
      </div>
     </form>
     <div className="pack-summary">
      <span className="preview-status"><CheckCircle2 size={18}/> {validation.state} / RELEASE BLOCKED</span>
      <h3>{brandName || 'Unnamed concept'}</h3>
      <p><b>Market:</b> {INDUSTRIES.find(x => x.key === industryKey)?.label}</p>
      <p><b>Design:</b> {STOCK_DESIGNS.find(x => x.key === designKey)?.name}</p>
      <p><b>Locations:</b> {quantity} proposed, none verified</p>
      <p><b>Routing:</b> No live CRM, DNS, deployment or customer messages</p>
      <hr/>
      {validation.errors.map(msg => <p role="alert" key={msg} className="error-text">{msg}</p>)}
      {validation.warnings.map(msg => <p key={msg} className="warning-text">{msg}</p>)}
      <p className="small-print">Before any release, validate real location value, permissions, consent, original images, accessibility, SEO, click paths and operator approval.</p>
     </div>
    </div>
   </div>
  </section>
  <footer className="factory-footer"><strong>DIGITAL DOMINANCE / UNIVERSAL TEMPLATE</strong><span>A Strategic Minds AI development starter. Source-backed, safe-by-default, preview-only.</span></footer>
  {previewOpen && <div className="preview-overlay" role="dialog" aria-modal="true" aria-label="Full page website preview">
    <div className="preview-toolbar"><strong>{brandName} / {STOCK_DESIGNS.find(x=>x.key===designKey)?.name}</strong><span>NOINDEX / CONCEPT</span><button type="button" onClick={() => setPreviewOpen(false)} aria-label="Close preview"><X size={21}/></button></div>
    <iframe title="Full page preview, no live business or form actions" srcDoc={html} sandbox="" />
   </div>}
 </div>;
}
