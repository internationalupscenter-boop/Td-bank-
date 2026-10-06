import React from 'react';
import { Landmark, ShieldCheck, Twitter, Facebook, Linkedin, Youtube, Shield } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Personal Banking',
      links: [
        { name: 'Checking Accounts', href: '#checking-accounts' },
        { name: 'Savings Accounts', href: '#savings-accounts' },
        { name: 'Credit Cards', href: '#credit-cards' },
        { name: 'Mortgages', href: '#mortgages' },
        { name: 'Personal Loans', href: '#loans' }
      ]
    },
    {
      title: 'Wealth & Investing',
      links: [
        { name: 'TD Direct Investing', href: '#investing' },
        { name: 'TD Wealth Management', href: '#investing' },
        { name: 'Mutual Funds', href: '#investing' },
        { name: 'Retirement Planning', href: '#solutions' },
        { name: 'Financial Advice', href: '#support' }
      ]
    },
    {
      title: 'About TD',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Newsroom', href: '#news' },
        { name: 'Careers', href: '#careers' },
        { name: 'Community Impact', href: '#community' },
        { name: 'Investor Relations', href: '#investors' }
      ]
    },
    {
      title: 'Security & Legal',
      links: [
        { name: 'Privacy & Security', href: '#privacy' },
        { name: 'Legal Agreements', href: '#legal' },
        { name: 'CDIC Member Info', href: '#cdic' },
        { name: 'AdChoices', href: '#adchoices' },
        { name: 'Accessibility', href: '#access' }
      ]
    }
  ];

  const marketTicks = [
    { name: 'S&P/TSX Index', value: '22,489.10', change: '+142.30', pct: '+0.64%', up: true },
    { name: 'S&P 500 Index', value: '5,130.40', change: '-12.80', pct: '-0.25%', up: false },
    { name: 'CAD/USD Rate', value: '0.7352', change: '+0.0014', pct: '+0.19%', up: true },
    { name: 'Dow Jones Index', value: '39,087.38', change: '+90.22', pct: '+0.23%', up: true }
  ];

  return (
    <footer className="bg-[#1c1c1c] text-neutral-400 font-sans border-t-4 border-[#007a2c] text-xs">
      
      {/* Financial Market Ticker Line */}
      <div className="bg-[#111] py-3.5 px-4 md:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#00b140] flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#00b140] animate-pulse" />
            <span>TD Market Pulse (Simulated Rates)</span>
          </span>
          <div className="flex flex-wrap items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar">
            {marketTicks.map((tick, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px] font-medium whitespace-nowrap">
                <span className="text-neutral-300">{tick.name}:</span>
                <span className="font-mono font-bold text-white tabular-nums">{tick.value}</span>
                <span className={`font-mono text-[10px] font-bold ${tick.up ? 'text-emerald-500' : 'text-red-500'}`}>
                  {tick.change} ({tick.pct})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((cat, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">{cat.title}</h4>
              <ul className="space-y-2.5">
                {cat.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a href={link.href} className="hover:text-white hover:underline transition-colors font-medium">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Security / Guarantee Segment */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-neutral-800 p-2 rounded-xl text-white">
              <Landmark className="w-6 h-6 text-[#00b140]" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">TD Canada Trust</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Licensed Member of Canada Deposit Insurance Corporation (CDIC)</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <a href="#" className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full text-neutral-300 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full text-neutral-300 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full text-neutral-300 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full text-neutral-300 hover:text-white transition-colors" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Legal disclosures & CDIC */}
        <div className="mt-8 pt-6 border-t border-neutral-800 text-[10px] text-neutral-500 space-y-4 leading-normal">
          <div className="flex gap-2 items-start">
            <Shield className="w-4 h-4 text-[#00b140] shrink-0 mt-0.5" />
            <p>
              <strong>Double Security Guarantee:</strong> TD online banking simulations protect users under standard verification policies. This application serves as an educational banking replication workspace for previewing full homepage layouts. None of the financial products represent real money lending, debt, or financial commitments.
            </p>
          </div>
          <p>
            * Trade-marks of Aeroplan Inc. and Air Canada, used under license. Visa Infinite and Visa are registered trademarks of Visa International Service Association and used under license.
          </p>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-2 gap-2 text-[9px] font-semibold text-neutral-600">
            <span>© {currentYear} TD Canada Trust. All rights reserved. Simulated for Preview Workspace.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Privacy Statement</a>
              <span>•</span>
              <a href="#" className="hover:underline">Terms of Use</a>
              <span>•</span>
              <a href="#" className="hover:underline">CDIC Membership</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
