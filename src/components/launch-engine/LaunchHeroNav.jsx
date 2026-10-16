import React, { useState } from 'react';
import { Menu, Rocket, X } from 'lucide-react';
const links = [['Industries','#industries'], ['Templates','#templates'], ['How It Works','#how'], ['SitePack','#sitepack']];
export default function LaunchHeroNav() {
 const [open,setOpen] = useState(false);
 return <nav className="wle-home-nav" aria-label="Main navigation">
  <div className="wle-home-nav-in">
   <a href="#" className="wle-home-logo" aria-label="Digital Dominance universal template home">
    <span className="wle-home-logo-mark"><Rocket aria-hidden="true" /></span>
    <span className="wle-home-logo-wordmark"><strong>DIGITAL <span>DOMINANCE</span></strong><small>UNIVERSAL TEMPLATE / PRIVATE PREVIEW</small></span>
   </a>
   <div className="wle-home-nav-links">{links.map(([label,href]) => <a key={href} href={href}>{label}</a>)}</div>
   <a className="wle-home-phone" href="#sitepack" aria-label="Build a preview SitePack">BUILD A SITEPACK</a>
   <button type="button" className="wle-mobile-nav-toggle" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
  </div>
  {open && <div id="wle-mobile-nav" className="wle-mobile-nav">{links.map(([label,href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</div>}
 </nav>;
}
