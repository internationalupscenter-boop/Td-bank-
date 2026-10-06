import { useState } from 'react';
import { ArrowRight, ShieldCheck, Award, TrendingUp, Sparkles, Home, CreditCard, PiggyBank, Briefcase } from 'lucide-react';

interface HeroProps {
  onSelectAction: (sectionId: string) => void;
  onOpenEasyWeb: () => void;
  onApplyForProduct: (productName: string) => void;
}

export default function Hero({ onSelectAction, onOpenEasyWeb, onApplyForProduct }: HeroProps) {
  const [activeTab, setActiveTab] = useState(0);

  const heroOffers = [
    {
      id: 'checking',
      label: 'TD Unlimited Checking',
      badge: 'EXCLUSIVE ONLINE OFFER',
      title: 'Get up to a $400 cash bonus',
      description: 'Open a new TD Unlimited Checking Account and complete qualifying digital banking transactions. Enjoy unlimited transactions, waived fees at non-TD ATMs, and no monthly fee with a minimum balance.',
      ctaText: 'Open checking account',
      secondaryText: 'See terms & details',
      productName: 'TD Unlimited Checking Account',
      bullets: ['Unlimited Interac e-Transfer transactions', 'Waived monthly fee with $4,000 minimum balance', 'Get free personalized standard checks'],
      themeColor: 'from-[#005a20] to-[#008a30]',
      icon: <PiggyBank className="w-8 h-8 text-[#98e298]" />,
    },
    {
      id: 'credit-card',
      label: 'TD Aeroplan® Visa Infinite*',
      badge: 'LIMITED TIME VALUE',
      title: 'Get up to 50,000 Aeroplan points',
      description: 'Plus, get your first year annual fee rebated! Accelerate your points on gas, groceries, and direct Air Canada purchases. Perfect for your next getaway in Canada or abroad.',
      ctaText: 'Apply online now',
      secondaryText: 'Compare credit cards',
      productName: 'TD Aeroplan® Visa Infinite* Card',
      bullets: ['Free first checked bag for you and companions', 'Earn 1.5 points for every $1 spent on gas & groceries', 'Complimentary Maple Leaf Lounge access'],
      themeColor: 'from-[#111827] to-[#1f2937]',
      icon: <CreditCard className="w-8 h-8 text-[#98e298]" />,
    },
    {
      id: 'mortgage',
      label: 'Mortgages & Home Loans',
      badge: 'SPECIAL 4-YEAR FIXED RATE',
      title: 'Lock in your rate with peace of mind',
      description: 'Ready to buy your first home, move, or refinance? Talk to a dedicated TD Mortgage Specialist. Lock in a competitive rate and enjoy flexible payment options customized to your budget.',
      ctaText: 'Get pre-approved online',
      secondaryText: 'Try mortgage calculator',
      productName: 'TD 4-Year Fixed Rate Mortgage',
      bullets: ['Lock in competitive rates for 120 days', 'Flexible payment options (weekly, bi-weekly, monthly)', 'Up to 15% prepayment allowances yearly'],
      themeColor: 'from-[#022c22] to-[#115e59]',
      icon: <Home className="w-8 h-8 text-[#98e298]" />,
    },
    {
      id: 'new-to-canada',
      label: 'New to Canada Package',
      badge: 'WELCOME TO CANADA',
      title: 'Get up to $500+ in banking value',
      description: 'We welcome you with $0 monthly fees for 12 months, free international money transfers, and customized credit cards with no Canadian credit history required. Build your financial future in Canada with TD.',
      ctaText: 'Book appointment to start',
      secondaryText: 'Explore package details',
      productName: 'TD New to Canada Banking Package',
      bullets: ['No monthly checking fee for the first 12 months', 'Eligible credit card with no credit history required', 'Unlimited international money transfers for 12 months'],
      themeColor: 'from-[#065f46] to-[#0f766e]',
      icon: <Briefcase className="w-8 h-8 text-[#98e298]" />,
    },
  ];

  const activeOffer = heroOffers[activeTab];

  return (
    <section className="relative bg-white pb-8 font-sans">
      {/* Top Banner Accent Lines */}
      <div className="h-1.5 bg-gradient-to-r from-[#005a20] via-[#008a00] to-[#00b140]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Hero Promo Card */}
          <div className="lg:col-span-8 flex flex-col">
            <div className={`flex-1 rounded-2xl p-6 sm:p-10 text-white bg-gradient-to-br ${activeOffer.themeColor} shadow-xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 min-h-[440px]`}>
              
              {/* Abstract decorative accent circle background */}
              <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mb-20 pointer-events-none" />
              <div className="absolute left-1/3 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -ml-20 -mt-20 pointer-events-none" />

              <div>
                {/* Storefront Sign Visual Block representing IMG_1161.jpeg */}
                {activeOffer.id === 'checking' && (
                  <div className="w-full h-36 bg-[#0c1510] rounded-xl mb-6 relative overflow-hidden border border-emerald-500/15 shadow-inner flex flex-col justify-between p-4 group select-none">
                    {/* Glass city reflection overlays */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
                    {/* Reflected skyscraper outlines (drawn as vertical CSS bars) */}
                    <div className="absolute inset-y-0 right-1/4 w-8 bg-white/3 transform skew-x-12 blur-xs pointer-events-none" />
                    <div className="absolute inset-y-0 right-1/3 w-4 bg-white/4 transform skew-x-12 blur-xs pointer-events-none" />
                    <div className="absolute inset-y-0 left-10 w-16 bg-white/3 transform -skew-x-6 blur-md pointer-events-none" />

                    {/* Core TD Bank Signage reproducing IMG_1161.jpeg */}
                    <div className="flex items-center gap-4 relative z-10 my-auto">
                      {/* Signature Green TD Square Logo */}
                      <div className="bg-[#13b143] w-12 h-12 rounded shadow flex items-center justify-center font-black text-white text-[24px] leading-none select-none tracking-tight">
                        TD
                      </div>
                      {/* Bold White storefront text */}
                      <span className="text-3xl font-extrabold text-white tracking-tight font-sans">
                        Bank
                      </span>
                    </div>

                    {/* ATM terminals inside the glass storefront */}
                    <div className="absolute bottom-3 right-6 w-14 h-20 bg-neutral-900 border border-neutral-800 rounded p-1 flex flex-col justify-between pointer-events-none shadow-lg">
                      <div className="w-full h-8 bg-neutral-950 border border-emerald-500/20 rounded flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      </div>
                      <div className="flex justify-between items-center text-[6px] text-neutral-500">
                        <span>TD ATM</span>
                        <div className="bg-[#13b143] w-2.5 h-2.5 rounded-sm" />
                      </div>
                    </div>

                    {/* Storefront Bright Green Bar running across the bottom */}
                    <div className="w-full h-3 bg-[#13b143] rounded-sm relative z-10" />
                  </div>
                )}

                {/* Secondary unboxed label */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[11px] font-extrabold tracking-wider bg-white/15 px-2.5 py-1 rounded text-white backdrop-blur-sm">
                    {activeOffer.badge}
                  </span>
                  <span aria-hidden="true" className="text-white/40">·</span>
                  <span className="text-xs text-emerald-200 font-semibold tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Special Offer
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight max-w-2xl text-wrap-balance">
                  {activeOffer.title}
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-emerald-50 max-w-xl mb-6 font-normal leading-relaxed">
                  {activeOffer.description}
                </p>

                {/* Key Bullet Points */}
                <ul className="space-y-2 mb-8">
                  {activeOffer.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95">
                      <ShieldCheck className="w-5 h-5 text-[#98e298] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t border-white/10 pt-6">
                <button
                  onClick={() => onApplyForProduct(activeOffer.productName)}
                  className="bg-white hover:bg-emerald-50 text-[#005a20] font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <span>{activeOffer.ctaText}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  onClick={() => {
                    if (activeOffer.id === 'mortgage') onSelectAction('mortgage-calculator');
                    else if (activeOffer.id === 'credit-card') onSelectAction('card-finder');
                    else onSelectAction('product-suite');
                  }}
                  className="bg-transparent hover:bg-white/10 text-white border border-white/35 hover:border-white font-semibold text-sm px-5 py-3 rounded-lg transition-all duration-200 text-center"
                >
                  {activeOffer.secondaryText}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Access Sidebar Portal */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-neutral-50 rounded-2xl p-6 border border-neutral-200 shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-neutral-200 pb-3">
                <div className="bg-[#e6f5ea] p-1.5 rounded-lg">
                  <Award className="w-5 h-5 text-[#007a2c]" />
                </div>
                <div>
                  <h2 className="font-bold text-neutral-800 text-sm">Quick EasyWeb Access</h2>
                  <p className="text-[11px] text-neutral-500">Secure banking simulations</p>
                </div>
              </div>

              <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                Log in securely to EasyWeb online banking to simulate transfers, view mock statement balances, and test deposit actions.
              </p>

              <button
                onClick={onOpenEasyWeb}
                className="w-full bg-[#007a2c] hover:bg-[#006022] active:bg-[#004a1a] text-white font-bold py-3 px-4 rounded-lg text-xs transition-colors shadow flex items-center justify-center gap-2"
              >
                <span>Access Online Banking Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-6 space-y-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block border-b border-neutral-100 pb-1">
                  Popular Tools
                </span>
                
                <button
                  onClick={() => onSelectAction('mortgage-calculator')}
                  className="w-full flex items-center justify-between text-left p-2.5 rounded-lg hover:bg-neutral-100 text-xs text-neutral-700 font-semibold transition-colors group"
                >
                  <span className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-emerald-600" />
                    <span>Mortgage Calculator</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
                </button>

                <button
                  onClick={() => onSelectAction('card-finder')}
                  className="w-full flex items-center justify-between text-left p-2.5 rounded-lg hover:bg-neutral-100 text-xs text-neutral-700 font-semibold transition-colors group"
                >
                  <span className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span>Compare & Find Credit Cards</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
                </button>

                <button
                  onClick={() => onSelectAction('currency-converter')}
                  className="w-full flex items-center justify-between text-left p-2.5 rounded-lg hover:bg-neutral-100 text-xs text-neutral-700 font-semibold transition-colors group"
                >
                  <span className="flex items-center gap-2.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Exchange Rates Calculator</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* Comfort Chair Mascot Card matching Image 3 */}
            <div className="mt-6 bg-[#edf5ef] border border-[#cbe3d2] rounded-xl p-4 flex items-center gap-4 relative overflow-hidden shadow-xs">
              <div className="flex-1">
                <span className="text-[9px] font-black text-[#13b143] tracking-widest uppercase block mb-0.5">TD MASCOT</span>
                <h4 className="text-xs font-extrabold text-[#113b24]">The Comfort of Green</h4>
                <p className="text-[10px] text-neutral-600 mt-1 leading-normal">
                  Experience a bank that values your comfort. Stop by any branch to chat with our advisors in our signature green chairs.
                </p>
              </div>
              {/* SVG green chair matching Image 3 */}
              <div className="w-16 h-16 shrink-0 relative select-none">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                  {/* Background Soft Shadow */}
                  <ellipse cx="50" cy="85" rx="30" ry="6" fill="rgba(0,0,0,0.08)" />
                  {/* Chair Legs (Light Wood Tapered) */}
                  <line x1="28" y1="70" x2="20" y2="88" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
                  <line x1="72" y1="70" x2="80" y2="88" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
                  <line x1="38" y1="72" x2="34" y2="84" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="62" y1="72" x2="66" y2="84" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Rounded Back Support */}
                  <path d="M 28 56 C 28 22, 72 22, 72 56 Z" fill="#4d8563" />
                  <rect x="30" y="28" width="40" height="28" rx="4" fill="#3f7a56" />
                  {/* Main Seat Frame */}
                  <rect x="22" y="50" width="56" height="20" rx="4" fill="#2c5c3e" />
                  {/* Plush Seat Cushion */}
                  <rect x="20" y="54" width="60" height="12" rx="3" fill="#3f7a56" />
                  {/* Armrests */}
                  <rect x="14" y="42" width="10" height="24" rx="3" fill="#2c5c3e" />
                  <rect x="76" y="42" width="10" height="24" rx="3" fill="#2c5c3e" />
                </svg>
              </div>
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-4 flex items-center gap-3 text-neutral-500">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Security Guarantee:</span>
              <span className="text-[11px] text-neutral-600">Simulated 128-bit Encryption</span>
            </div>
          </div>
        </div>

        {/* Dynamic Selector Tabs to navigate the Hero Offer Slider */}
        <div className="mt-8 border-b border-neutral-200">
          <div className="flex overflow-x-auto no-scrollbar gap-2 py-1 scroll-smooth">
            {heroOffers.map((offer, idx) => (
              <button
                key={offer.id}
                onClick={() => setActiveTab(idx)}
                className={`whitespace-nowrap flex items-center gap-2.5 py-3.5 px-5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
                  activeTab === idx
                    ? 'border-[#007a2c] text-[#007a2c] bg-emerald-50/50'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <span className={activeTab === idx ? 'text-[#007a2c]' : 'text-neutral-400'}>
                  {idx === 0 && <PiggyBank className="w-4 h-4" />}
                  {idx === 1 && <CreditCard className="w-4 h-4" />}
                  {idx === 2 && <Home className="w-4 h-4" />}
                  {idx === 3 && <Briefcase className="w-4 h-4" />}
                </span>
                <span>{offer.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
