import React, { useState } from 'react';
import { PiggyBank, CreditCard, Home, Briefcase, Landmark, Check, ArrowRight, Star, ShieldCheck } from 'lucide-react';

interface ProductSuiteProps {
  onApplyForProduct: (productName: string) => void;
}

interface Product {
  id: string;
  category: 'accounts' | 'cards' | 'loans' | 'investing';
  name: string;
  tagline: string;
  perks: string[];
  cta: string;
  popular?: boolean;
}

export default function ProductSuite({ onApplyForProduct }: ProductSuiteProps) {
  const [filter, setFilter] = useState<'all' | 'accounts' | 'cards' | 'loans' | 'investing'>('all');

  const products: Product[] = [
    {
      id: 'prod-1',
      category: 'accounts',
      name: 'TD Unlimited Checking Account',
      tagline: 'Best for unlimited everyday transactions and Interac e-Transfers®.',
      perks: [
        '$400 welcome cash bonus (qualifying actions)',
        'No monthly fee with a minimum daily balance of $4,000',
        'Unlimited transactions in Canada'
      ],
      cta: 'Apply online now',
      popular: true
    },
    {
      id: 'prod-2',
      category: 'accounts',
      name: 'TD All-Inclusive Banking Plan',
      tagline: 'Our premium checking account with elite waivers.',
      perks: [
        'Free first-year rebate on selected TD credit cards',
        'No monthly fee with minimum balance of $5,000',
        'Free certified checks, drafts, and money orders'
      ],
      cta: 'Open Account'
    },
    {
      id: 'prod-3',
      category: 'cards',
      name: 'TD Cash Back Visa Infinite* Card',
      tagline: 'Accelerated cash back on standard living expenses.',
      perks: [
        '3% cash back on gas & grocery purchases',
        '3% cash back on pre-authorized recurring payments',
        'Deluxe roadside auto club coverage'
      ],
      cta: 'Apply Online',
      popular: true
    },
    {
      id: 'prod-4',
      category: 'loans',
      name: 'TD 4-Year Fixed Mortgage',
      tagline: 'Secure a fixed competitive mortgage rate with guaranteed stability.',
      perks: [
        'Competitive interest rates locked in for 120 days',
        'Generous 15% annual prepayment allowances',
        'Expert guidance from local TD mortgage specialists'
      ],
      cta: 'Get Pre-Approved'
    },
    {
      id: 'prod-5',
      category: 'investing',
      name: 'TD Direct Investing RRSP/TFSA',
      tagline: 'Empower yourself to self-direct your financial growth.',
      perks: [
        'Trade equities, options, and mutual funds smoothly',
        'Award-winning market research and webinar portals',
        '$0 commission on eligible TD Mutual Funds'
      ],
      cta: 'Open Investment Account'
    },
    {
      id: 'prod-6',
      category: 'accounts',
      name: 'TD High Interest Savings Account',
      tagline: 'Grow your Canadian savings balance at an accelerated rate.',
      perks: [
        'Higher interest rates for deposits of $5,000 or more',
        'Automated savings transfers (Pre-authorized plans)',
        '$0 fee if minimum balance is maintained'
      ],
      cta: 'Start Saving'
    }
  ];

  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);

  return (
    <section id="product-suite" className="py-16 bg-[#f4f7f4] font-sans scroll-mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-[#007a2c] tracking-wider uppercase mb-1.5 flex items-center gap-1">
              <Landmark className="w-4 h-4" />
              <span>Explore TD Offerings</span>
            </div>
            <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
              Featured banking products & plans
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Filter by category to explore customized accounts, mortgages, credit cards, and wealth planners.
            </p>
          </div>

          {/* Interactive filter controls (Buttons, which are allowed by Zero-Pill contract!) */}
          <div className="flex flex-wrap gap-1 p-1 bg-neutral-200/55 border border-neutral-300/40 rounded-xl self-start">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setFilter('accounts')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === 'accounts'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Checking & Savings
            </button>
            <button
              onClick={() => setFilter('cards')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === 'cards'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Credit Cards
            </button>
            <button
              onClick={() => setFilter('loans')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === 'loans'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Home Financing
            </button>
            <button
              onClick={() => setFilter('investing')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === 'investing'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Investing
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              {/* Star Badge for Popular items */}
              {product.popular && (
                <div className="absolute top-4 right-4 bg-emerald-50 text-[#007a2c] px-2.5 py-1 rounded text-[10px] font-extrabold tracking-wider flex items-center gap-1 border border-emerald-200">
                  <Star className="w-3 h-3 fill-[#007a2c]" />
                  <span>MOST POPULAR</span>
                </div>
              )}

              <div>
                {/* Category Icon */}
                <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-[#007a2c] mb-4 border border-neutral-100">
                  {product.category === 'accounts' && <PiggyBank className="w-5 h-5" />}
                  {product.category === 'cards' && <CreditCard className="w-5 h-5" />}
                  {product.category === 'loans' && <Home className="w-5 h-5" />}
                  {product.category === 'investing' && <Briefcase className="w-5 h-5" />}
                </div>

                {/* Info Text */}
                <h3 className="font-extrabold text-neutral-900 text-base leading-tight mb-1.5">{product.name}</h3>
                <p className="text-xs text-neutral-500 mb-5 leading-normal">{product.tagline}</p>

                {/* Perks bullet list */}
                <ul className="space-y-2 mb-6">
                  {product.perks.map((perk, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-neutral-600 font-medium">
                      <Check className="w-4 h-4 text-[#007a2c] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="border-t border-neutral-100 pt-4 mt-auto">
                <button
                  onClick={() => onApplyForProduct(product.name)}
                  className="w-full bg-[#007a2c] hover:bg-[#006022] text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5 group"
                >
                  <span>{product.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
