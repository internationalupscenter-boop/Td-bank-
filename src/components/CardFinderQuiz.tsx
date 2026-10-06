import React, { useState } from 'react';
import { CreditCard, Award, ArrowRight, ShieldCheck, RefreshCw, Check, Star } from 'lucide-react';

interface CardFinderQuizProps {
  onApplyForProduct: (productName: string) => void;
}

interface CardProfile {
  name: string;
  category: 'travel' | 'cashback' | 'nofee' | 'student';
  fee: string;
  rate: string;
  welcomeOffer: string;
  rewards: string[];
  perks: string[];
  gradient: string;
}

export default function CardFinderQuiz({ onApplyForProduct }: CardFinderQuizProps) {
  const [currentStep, setCurrentStep] = useState<'intro' | 'q1' | 'q2' | 'result'>('intro');
  const [rewardPref, setRewardPref] = useState<'travel' | 'cashback' | 'nofee' | 'student' | null>(null);
  const [spendPref, setSpendPref] = useState<string | null>(null);

  const cardsList: CardProfile[] = [
    {
      name: 'TD Aeroplan® Visa Infinite* Card',
      category: 'travel',
      fee: '$139 (First year rebated)',
      rate: '20.99% purchase / 22.99% cash advance',
      welcomeOffer: 'Earn up to 50,000 Aeroplan points + First Year Free!',
      rewards: [
        '1.5 pts per $1 spent on gas, groceries, and Air Canada',
        '1 pt per $1 spent on all other standard purchases',
        'Double points at participating Starbucks® locations'
      ],
      perks: [
        'First checked bag free on Air Canada flights',
        'Comprehensive Travel Insurance & Auto Rental coverage',
        'Access to Visa Infinite Luxury Hotel Collection'
      ],
      gradient: 'from-[#111827] via-[#1f2937] to-[#374151]'
    },
    {
      name: 'TD Cash Back Visa Infinite* Card',
      category: 'cashback',
      fee: '$139 (First year rebated)',
      rate: '20.99% purchase / 22.99% cash advance',
      welcomeOffer: 'Earn 10% Cash Back on all purchases for the first 3 months!',
      rewards: [
        '3% cash back on gas & groceries',
        '3% cash back on recurring bill payments',
        '1% cash back on all other retail spending'
      ],
      perks: [
        'Deluxe TD Auto Club Membership (Roadside assistance)',
        'Mobile Device Insurance up to $1,000 coverage',
        'Purchase Security and Extended Warranty Protection'
      ],
      gradient: 'from-[#064e3b] via-[#047857] to-[#10b981]'
    },
    {
      name: 'TD First Class Travel® Visa Infinite* Card',
      category: 'travel',
      fee: '$139',
      rate: '20.99% purchase / 22.99% cash advance',
      welcomeOffer: 'Get up to 75,000 TD Rewards Points ($375 value on travel)!',
      rewards: [
        '8 pts per $1 spent when booking travel via Expedia® For TD',
        '6 pts per $1 spent on groceries and restaurants',
        '2 pts per $1 spent on all other daily purchases'
      ],
      perks: [
        'Annual $100 TD Travel Credit on Expedia bookings',
        'Comprehensive travel medical & trip cancellation insurance',
        'No expiry on accumulated TD Rewards points'
      ],
      gradient: 'from-[#1e3a8a] via-[#2563eb] to-[#3b82f6]'
    },
    {
      name: 'TD Cash Back Visa® Card',
      category: 'nofee',
      fee: '$0 (No Annual Fee)',
      rate: '19.99% purchase / 22.99% cash advance',
      welcomeOffer: 'Get 5% Cash Back on purchases for the first 3 months!',
      rewards: [
        '1% cash back on gas, groceries, and bills',
        '0.5% cash back on all other daily purchases',
        'No minimum threshold to redeem rewards'
      ],
      perks: [
        'Purchase Security & Extended Warranty',
        'Save 3¢/L on fuel at participating Pioneer/Chevron',
        'Up to 10% off car rentals at Avis and Budget'
      ],
      gradient: 'from-[#0f172a] via-[#1e293b] to-[#475569]'
    },
    {
      name: 'TD Rewards Visa* Card (Student Special)',
      category: 'student',
      fee: '$0 (No Annual Fee)',
      rate: '19.99% purchase / 22.99% cash advance',
      welcomeOffer: 'Get 15,150 TD Rewards Points to kickstart your savings!',
      rewards: [
        '3 pts per $1 spent on Expedia For TD bookings',
        '2 pts per $1 spent on gas, groceries, and dining',
        '1 pt per $1 spent on all other educational supplies'
      ],
      perks: [
        'No credit history required for full-time students',
        'Instant Starbucks Reward integrations',
        'Standard zero liability security guarantee'
      ],
      gradient: 'from-[#581c87] via-[#7e22ce] to-[#a855f7]'
    }
  ];

  const handleStartQuiz = () => {
    setRewardPref(null);
    setSpendPref(null);
    setCurrentStep('q1');
  };

  const selectReward = (pref: 'travel' | 'cashback' | 'nofee' | 'student') => {
    setRewardPref(pref);
    setCurrentStep('q2');
  };

  const selectSpend = (spend: string) => {
    setSpendPref(spend);
    setCurrentStep('result');
  };

  const getRecommendedCard = (): CardProfile => {
    // Recommendation logic based on answers
    if (rewardPref === 'student') {
      return cardsList.find(c => c.category === 'student') || cardsList[4];
    }
    if (rewardPref === 'nofee') {
      return cardsList.find(c => c.category === 'nofee') || cardsList[3];
    }
    if (rewardPref === 'travel') {
      if (spendPref === 'high') return cardsList[0]; // Aeroplan Infinite
      return cardsList[2]; // First Class Travel
    }
    // Default or Cashback
    if (spendPref === 'high') return cardsList[1]; // Cash Back Infinite
    return cardsList[3]; // Standard Cash Back
  };

  const recCard = getRecommendedCard();

  return (
    <section id="card-finder" className="py-16 bg-white font-sans scroll-mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-emerald-700 tracking-wider uppercase mb-1.5 flex items-center justify-center gap-1">
            <CreditCard className="w-4 h-4" />
            <span>Interactive Tool</span>
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight text-wrap-balance mb-3">
            Find the TD Credit Card that fits your lifestyle
          </h2>
          <p className="text-sm text-neutral-600">
            Answer a few simple questions to match your spending habits with a premium TD credit card.
          </p>
        </div>

        {/* QUIZ WIDGET BOARD */}
        <div className="max-w-4xl mx-auto bg-neutral-50 rounded-2xl border border-neutral-200 shadow-lg overflow-hidden min-h-[360px] flex flex-col justify-between">
          
          {/* STEP A: INTRO */}
          {currentStep === 'intro' && (
            <div className="p-8 sm:p-12 text-center flex-1 flex flex-col justify-between items-center">
              <div className="max-w-lg">
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-[#007a2c] mx-auto mb-5 border border-emerald-100">
                  <CreditCard className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-neutral-900 text-xl mb-3">Welcome to the TD Credit Card Selector</h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  Whether you are seeking robust Aeroplan travel rewards, high cash back on grocery runs, or simply a card with no annual fee, this tool matches you in less than 30 seconds.
                </p>
              </div>

              <button
                onClick={handleStartQuiz}
                className="bg-[#007a2c] hover:bg-[#006022] text-white font-bold py-3 px-8 rounded-lg text-sm transition-all shadow flex items-center gap-2 group"
              >
                <span>Launch Selector Quiz</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

          {/* STEP B: Q1 - REWARD PREFERENCE */}
          {currentStep === 'q1' && (
            <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs text-neutral-400 font-bold mb-4">
                  <span>STEP 1 OF 2</span>
                  <span>PREFERENCE</span>
                </div>
                <h3 className="font-extrabold text-neutral-900 text-lg mb-6">What rewards or features do you value most in a credit card?</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => selectReward('travel')}
                    className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-[#007a2c] hover:bg-emerald-50/20 text-left transition-all"
                  >
                    <span className="font-bold text-neutral-800 text-sm block">✈ Travel points & flight perks</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Earn Aeroplan or TD Rewards miles for your next vacation.</span>
                  </button>

                  <button
                    onClick={() => selectReward('cashback')}
                    className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-[#007a2c] hover:bg-emerald-50/20 text-left transition-all"
                  >
                    <span className="font-bold text-neutral-800 text-sm block">💵 High cash-back returns</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Get direct cash rebates on groceries, gas, and recurring bills.</span>
                  </button>

                  <button
                    onClick={() => selectReward('nofee')}
                    className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-[#007a2c] hover:bg-emerald-50/20 text-left transition-all"
                  >
                    <span className="font-bold text-neutral-800 text-sm block">🛡 No annual fees</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Enjoy reliable security and basic credit perks with $0 annual fees.</span>
                  </button>

                  <button
                    onClick={() => selectReward('student')}
                    className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-[#007a2c] hover:bg-emerald-50/20 text-left transition-all"
                  >
                    <span className="font-bold text-neutral-800 text-sm block">🎓 Student / No Credit History</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Ideal card to build Canadian credit history with no fee.</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 border-t border-neutral-200 pt-4 flex justify-between items-center">
                <button onClick={() => setCurrentStep('intro')} className="text-xs font-bold text-neutral-400 hover:text-neutral-700">
                  Back
                </button>
              </div>
            </div>
          )}

          {/* STEP C: Q2 - SPENDING ESTIMATES */}
          {currentStep === 'q2' && (
            <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs text-neutral-400 font-bold mb-4">
                  <span>STEP 2 OF 2</span>
                  <span>ESTIMATED SPEND</span>
                </div>
                <h3 className="font-extrabold text-neutral-900 text-lg mb-6">What is your typical monthly spending on credit cards?</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => selectSpend('low')}
                    className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-[#007a2c] hover:bg-emerald-50/20 text-center transition-all"
                  >
                    <span className="font-bold text-neutral-800 text-sm block mb-1">Under $1,000</span>
                    <span className="text-xs text-neutral-500">Everyday convenience banking</span>
                  </button>

                  <button
                    onClick={() => selectSpend('mid')}
                    className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-[#007a2c] hover:bg-emerald-50/20 text-center transition-all"
                  >
                    <span className="font-bold text-neutral-800 text-sm block mb-1">$1,000 to $3,000</span>
                    <span className="text-xs text-neutral-500">Regular family expenses & bills</span>
                  </button>

                  <button
                    onClick={() => selectSpend('high')}
                    className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-[#007a2c] hover:bg-emerald-50/20 text-center transition-all"
                  >
                    <span className="font-bold text-neutral-800 text-sm block mb-1">Over $3,000</span>
                    <span className="text-xs text-neutral-500">Premium spending, rewards focus</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 border-t border-neutral-200 pt-4 flex justify-between items-center">
                <button onClick={() => setCurrentStep('q1')} className="text-xs font-bold text-neutral-500 hover:text-neutral-800">
                  Back
                </button>
              </div>
            </div>
          )}

          {/* STEP D: RESULTS */}
          {currentStep === 'result' && (
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
              
              {/* Left Column (Match Spotlight Card Layout) */}
              <div className="md:col-span-5 p-6 sm:p-8 bg-neutral-100 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider block mb-3 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-emerald-600 stroke-none" />
                    <span>Your Recommended Match</span>
                  </span>

                  {/* Visa Card Graphic Representation */}
                  <div className={`aspect-[1.58] w-full rounded-xl bg-gradient-to-br ${recCard.gradient} text-white p-5 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all duration-300`}>
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mb-10" />
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-[#98e298]">TD</span>
                        <h4 className="text-xs font-extrabold tracking-tight mt-0.5 leading-none truncate max-w-[150px]">{recCard.name.replace('TD ', '')}</h4>
                      </div>
                      <div className="bg-white/10 px-1.5 py-0.5 rounded text-[8px] font-mono border border-white/25">
                        VISA
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="w-7 h-5 bg-yellow-500/80 rounded border border-yellow-400" />
                      <div className="text-[9px] font-mono tracking-widest opacity-80">•••• •••• •••• 5062</div>
                    </div>

                    <div className="flex justify-between items-end">
                      <span className="text-[8px] font-mono tracking-wider opacity-70 uppercase">John Doe</span>
                      <span className="text-[10px] font-bold italic tracking-wider text-[#98e298]">Infinite</span>
                    </div>
                  </div>

                  <h4 className="font-extrabold text-neutral-800 text-sm mt-5 leading-snug">{recCard.name}</h4>
                  <p className="text-xs text-emerald-700 font-bold mt-1">{recCard.welcomeOffer}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 text-center">
                  <button
                    onClick={handleStartQuiz}
                    className="text-xs text-neutral-500 hover:text-neutral-900 font-bold flex items-center justify-center gap-1 mx-auto"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake Match Selector</span>
                  </button>
                </div>
              </div>

              {/* Right Column (Card Details List) */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
                    <div>
                      <span className="block text-[10px] text-neutral-400 font-bold uppercase">Annual Fee</span>
                      <span className="font-bold text-neutral-800">{recCard.fee}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-neutral-400 font-bold uppercase">Interest Rate</span>
                      <span className="font-semibold text-neutral-700">{recCard.rate.split('/')[0]}</span>
                    </div>
                  </div>

                  {/* Rewards Bullet List */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="block text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-2">How you earn rewards:</span>
                      <ul className="space-y-1.5">
                        {recCard.rewards.map((rew, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700 font-medium leading-relaxed">
                            <span className="text-[#007a2c] font-bold mt-0.5">•</span>
                            <span>{rew}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="block text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-2">Top Card Benefits:</span>
                      <ul className="space-y-1.5">
                        {recCard.perks.map((per, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-neutral-600 font-medium">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{per}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-5">
                  <button
                    onClick={() => onApplyForProduct(recCard.name)}
                    className="w-full bg-[#007a2c] hover:bg-[#006022] active:bg-[#004a1a] text-white font-bold py-3 px-6 rounded-lg text-xs transition-colors shadow flex items-center justify-center gap-1.5"
                  >
                    <span>Instant Credit Card Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
