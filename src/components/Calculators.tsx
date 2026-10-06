import React, { useState, useEffect } from 'react';
import { Home, TrendingUp, Calculator, ArrowRightLeft, Percent, ShieldAlert, Award, ChevronRight } from 'lucide-react';

interface CalculatorsProps {
  onApplyForProduct: (productName: string) => void;
}

export default function Calculators({ onApplyForProduct }: CalculatorsProps) {
  // Calculator Tabs: 'mortgage' | 'currency'
  const [activeCalc, setActiveCalc] = useState<'mortgage' | 'currency'>('mortgage');

  // --- MORTGAGE CALCULATOR STATE ---
  const [homePrice, setHomePrice] = useState(650000);
  const [downPayPct, setDownPayPct] = useState(15);
  const [downPayAmt, setDownPayAmt] = useState(97500);
  const [interestRate, setInterestRate] = useState(4.89);
  const [amortization, setAmortization] = useState(25);
  const [frequency, setFrequency] = useState<'monthly' | 'biweekly' | 'weekly'>('monthly');
  const [calculatedPayment, setCalculatedPayment] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  // Synchronize Percentage and Dollar Down Payments
  useEffect(() => {
    const amt = Math.round(homePrice * (downPayPct / 100));
    setDownPayAmt(amt);
  }, [homePrice, downPayPct]);

  // Recalculate Mortgage
  useEffect(() => {
    const loanAmount = homePrice - downPayAmt;
    if (loanAmount <= 0) {
      setCalculatedPayment(0);
      setTotalCost(0);
      setTotalInterest(0);
      return;
    }

    const annualRate = interestRate / 100;
    let paymentsPerYear = 12;
    if (frequency === 'biweekly') paymentsPerYear = 26;
    if (frequency === 'weekly') paymentsPerYear = 52;

    const r = annualRate / paymentsPerYear;
    const n = amortization * paymentsPerYear;

    let payment = 0;
    if (r === 0) {
      payment = loanAmount / n;
    } else {
      payment = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPaid = payment * n;
    const totalInt = totalPaid - loanAmount;

    setCalculatedPayment(payment);
    setTotalCost(totalPaid);
    setTotalInterest(totalInt);
  }, [homePrice, downPayAmt, interestRate, amortization, frequency]);

  const handleDownPayAmtChange = (val: number) => {
    const cleanVal = Math.min(val, homePrice);
    setDownPayAmt(cleanVal);
    setDownPayPct(parseFloat(((cleanVal / homePrice) * 100).toFixed(1)));
  };

  // --- CURRENCY CALCULATOR STATE ---
  const [cadAmount, setCadAmount] = useState('1000');
  const [usdAmount, setUsdAmount] = useState('735.00');
  const [direction, setDirection] = useState<'cad2usd' | 'usd2cad'>('cad2usd');
  const exchangeRate = 0.735; // 1 CAD = 0.735 USD

  const handleCadChange = (val: string) => {
    setCadAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setUsdAmount((num * exchangeRate).toFixed(2));
    } else {
      setUsdAmount('');
    }
  };

  const handleUsdChange = (val: string) => {
    setUsdAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setCadAmount((num / exchangeRate).toFixed(2));
    } else {
      setCadAmount('');
    }
  };

  const swapCurrency = () => {
    if (direction === 'cad2usd') {
      setDirection('usd2cad');
    } else {
      setDirection('cad2usd');
    }
  };

  return (
    <section id="calculators" className="py-16 bg-[#f4f7f4] font-sans scroll-mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title with zero-pill visual anchors */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold text-emerald-700 tracking-wider uppercase mb-1.5 flex items-center justify-center gap-1">
            <Calculator className="w-4 h-4" />
            <span>Interactive Calculators Suite</span>
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight text-wrap-balance mb-3">
            Plan your financial goals with confidence
          </h2>
          <p className="text-sm text-neutral-600">
            Estimate your future mortgage payments or calculate current global currency exchange rates in real-time.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="bg-neutral-200/60 p-1 rounded-xl flex items-center gap-1 shadow-sm border border-neutral-300/40">
            <button
              onClick={() => setActiveCalc('mortgage')}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeCalc === 'mortgage'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Mortgage Payment Calculator</span>
            </button>
            <button
              onClick={() => setActiveCalc('currency')}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeCalc === 'currency'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Cross-Border Currency Exchange</span>
            </button>
          </div>
        </div>

        {/* CALCULATOR WORKSPACE */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden min-h-[500px] transition-all duration-300">
          {activeCalc === 'mortgage' ? (
            /* A. MORTGAGE CALCULATOR */
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
              
              {/* Sliders Container (Left Column) */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                <div>
                  <h3 className="font-bold text-neutral-800 text-lg">Define your home loan details</h3>
                  <p className="text-xs text-neutral-500 mt-1">Adjust sliders to see payment change instantly.</p>
                </div>

                {/* Home Price Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-neutral-600">Purchase Price</span>
                    <span className="font-mono font-bold text-neutral-800 text-sm">
                      ${homePrice.toLocaleString('en-US')} CAD
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="2500000"
                    step="10000"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-full accent-[#007a2c] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 font-semibold font-mono">
                    <span>$100K</span>
                    <span>$1.3M</span>
                    <span>$2.5M</span>
                  </div>
                </div>

                {/* Down Payment Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-8 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-neutral-600">Down Payment (Amount)</span>
                      <span className="font-mono font-bold text-neutral-800">
                        ${downPayAmt.toLocaleString('en-US')} CAD
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="1"
                      value={downPayPct}
                      onChange={(e) => setDownPayPct(Number(e.target.value))}
                      className="w-full accent-[#007a2c] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-400 font-semibold font-mono">
                      <span>5% min</span>
                      <span>25%</span>
                      <span>50% max</span>
                    </div>
                  </div>

                  <div className="sm:col-span-4 self-end">
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-semibold">%</span>
                      <input
                        type="number"
                        min="5"
                        max="90"
                        value={downPayPct}
                        onChange={(e) => {
                          const pct = Number(e.target.value);
                          if (pct >= 5 && pct <= 90) setDownPayPct(pct);
                        }}
                        className="w-full p-2 pl-6 border border-neutral-300 rounded-lg text-sm text-neutral-800 font-bold outline-none focus:border-[#007a2c]"
                      />
                    </div>
                  </div>
                </div>

                {/* Interest Rate & Amortization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-neutral-600">Interest Rate</span>
                      <span className="font-mono font-bold text-neutral-800">{interestRate}%</span>
                    </div>
                    <div className="relative">
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-bold">%</span>
                      <input
                        type="number"
                        step="0.01"
                        min="1"
                        max="15"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-800 font-semibold focus:border-[#007a2c] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-neutral-600">Amortization Period</span>
                    <select
                      value={amortization}
                      onChange={(e) => setAmortization(Number(e.target.value))}
                      className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-800 font-semibold bg-neutral-50 focus:border-[#007a2c] outline-none"
                    >
                      <option value={10}>10 Years</option>
                      <option value={15}>15 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={25}>25 Years (Standard)</option>
                      <option value={30}>30 Years</option>
                    </select>
                  </div>
                </div>

                {/* Frequency */}
                <div className="space-y-2">
                  <span className="block text-xs font-bold text-neutral-600">Payment Frequency</span>
                  <div className="grid grid-cols-3 gap-2">
                    {['weekly', 'biweekly', 'monthly'].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFrequency(f as any)}
                        className={`py-2 px-4 rounded-lg text-xs font-bold capitalize transition-all border ${
                          frequency === f
                            ? 'bg-emerald-50 border-[#007a2c] text-[#007a2c]'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {f === 'biweekly' ? 'Bi-Weekly' : f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculations Result (Right Column) */}
              <div className="lg:col-span-5 bg-neutral-50/50 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="border-b border-neutral-200 pb-4 mb-6">
                    <span className="text-[10px] font-bold text-[#007a2c] uppercase tracking-wider block">Estimate Output</span>
                    <p className="text-xs text-neutral-500 mt-0.5">Calculated based on live-like TD standard fixed rates</p>
                  </div>

                  {/* Payment Value Display */}
                  <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm text-center mb-6">
                    <span className="text-xs text-neutral-500 font-semibold block uppercase tracking-wide">
                      Your {frequency} Mortgage Payment
                    </span>
                    <div className="text-3xl font-extrabold font-mono text-neutral-900 tracking-tight my-2 tabular-nums">
                      ${calculatedPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-semibold">Principal & Interest included</span>
                  </div>

                  {/* Calculations Details */}
                  <div className="space-y-3.5 text-xs text-neutral-600 font-medium">
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span>Total Loan Amount:</span>
                      <span className="font-bold text-neutral-800 font-mono">
                        ${(homePrice - downPayAmt).toLocaleString('en-US')} CAD
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span>Total Interest Paid:</span>
                      <span className="font-bold text-neutral-800 font-mono">
                        ${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })} CAD
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Total Cost of Mortgage:</span>
                      <span className="font-bold text-neutral-800 font-mono">
                        ${totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })} CAD
                      </span>
                    </div>
                  </div>

                  {/* Visual Donut representation */}
                  <div className="mt-6">
                    <div className="h-2 w-full bg-emerald-700 rounded-full flex overflow-hidden">
                      <div 
                        className="bg-neutral-300 h-full transition-all duration-300"
                        style={{ width: `${(totalInterest / totalCost) * 100}%` }}
                        title={`Interest: ${Math.round((totalInterest / totalCost) * 100)}%`}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-neutral-400 font-semibold mt-2">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-700" />
                        <span>Principal Paid ({Math.round(100 - (totalInterest / totalCost) * 100)}%)</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-neutral-300" />
                        <span>Interest Paid ({Math.round((totalInterest / totalCost) * 100)}%)</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-neutral-200 pt-6">
                  <button
                    onClick={() => onApplyForProduct(`TD ${amortization}-Yr Fixed Mortgage Pre-Approval`)}
                    className="w-full bg-[#007a2c] hover:bg-[#006022] active:bg-[#004a1a] text-white font-bold py-3 px-4 rounded-lg text-xs transition-colors shadow flex items-center justify-center gap-1.5"
                  >
                    <span>Get Pre-Approved for this Loan</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* B. CURRENCY EXCHANGE CALCULATOR */
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
              
              {/* Inputs & Convert Pane (Left Column) */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                <div>
                  <h3 className="font-bold text-neutral-800 text-lg">Cross-Border Currency Exchange</h3>
                  <p className="text-xs text-neutral-500 mt-1">Simulate CAD/USD rate conversions based on live-like retail index values.</p>
                </div>

                <div className="space-y-5">
                  {/* Source Currency Input */}
                  <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-xl relative">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                      {direction === 'cad2usd' ? 'You Sell (CAD)' : 'You Sell (USD)'}
                    </span>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-2xl font-bold font-mono text-neutral-800">
                        {direction === 'cad2usd' ? 'CA$' : 'US$'}
                      </span>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={direction === 'cad2usd' ? cadAmount : usdAmount}
                        onChange={(e) => direction === 'cad2usd' ? handleCadChange(e.target.value) : handleUsdChange(e.target.value)}
                        className="bg-transparent w-full border-none outline-none text-xl font-mono text-neutral-900 font-bold focus:ring-0 p-0"
                      />
                    </div>
                  </div>

                  {/* Swap Trigger Button */}
                  <div className="flex justify-center -my-3.5 relative z-10">
                    <button
                      type="button"
                      onClick={swapCurrency}
                      className="bg-white p-2.5 rounded-full border border-neutral-200 hover:border-[#007a2c] shadow-md hover:shadow-lg transition-all text-neutral-500 hover:text-[#007a2c]"
                    >
                      <ArrowRightLeft className="w-4 h-4 rotate-90" />
                    </button>
                  </div>

                  {/* Destination Currency Input */}
                  <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-xl relative">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                      {direction === 'cad2usd' ? 'You Buy (USD)' : 'You Buy (CAD)'}
                    </span>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-2xl font-bold font-mono text-neutral-800">
                        {direction === 'cad2usd' ? 'US$' : 'CA$'}
                      </span>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={direction === 'cad2usd' ? usdAmount : cadAmount}
                        onChange={(e) => direction === 'cad2usd' ? handleUsdChange(e.target.value) : handleCadChange(e.target.value)}
                        className="bg-transparent w-full border-none outline-none text-xl font-mono text-neutral-900 font-bold focus:ring-0 p-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-3.5 flex gap-2.5 text-xs">
                  <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Exchange Guarantee:</strong> Simulated rates include a standard 1.5% retail banking spread. For high-value business transfers (&gt; $50,000), please visit a TD Branch to lock in customized corporate quotes.
                  </p>
                </div>
              </div>

              {/* Conversion Statistics (Right Column) */}
              <div className="lg:col-span-5 bg-neutral-50/50 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="border-b border-neutral-200 pb-4 mb-6">
                    <span className="text-[10px] font-bold text-[#007a2c] uppercase tracking-wider block">Standard retail index</span>
                    <p className="text-xs text-neutral-500 mt-0.5">Rates updated as of today (simulated)</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase block">Conversion Rate</span>
                      <p className="font-mono text-sm font-extrabold text-neutral-800 mt-1">
                        1 CAD = {exchangeRate} USD
                      </p>
                      <p className="font-mono text-xs text-neutral-400 mt-0.5">
                        1 USD = {(1 / exchangeRate).toFixed(4)} CAD
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-neutral-600 font-medium">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400">Popular Conversions</span>
                      <div className="flex justify-between py-1 border-b border-neutral-100">
                        <span>$500 CAD:</span>
                        <span className="font-bold text-neutral-800 font-mono">${(500 * exchangeRate).toFixed(2)} USD</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-100">
                        <span>$2,500 CAD:</span>
                        <span className="font-bold text-neutral-800 font-mono">${(2500 * exchangeRate).toFixed(2)} USD</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>$10,000 CAD:</span>
                        <span className="font-bold text-neutral-800 font-mono">${(10000 * exchangeRate).toFixed(2)} USD</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-neutral-200 pt-6">
                  <button
                    onClick={() => alert(`Opening currency reservation form for conversion of $${direction === 'cad2usd' ? cadAmount : usdAmount} ${direction === 'cad2usd' ? 'CAD' : 'USD'}. Form loaded successfully.`)}
                    className="w-full bg-[#007a2c] hover:bg-[#006022] text-white font-bold py-3 px-4 rounded-lg text-xs transition-colors shadow flex items-center justify-center gap-1.5"
                  >
                    <span>Reserve Cash at Nearest Branch</span>
                    <ChevronRight className="w-4 h-4" />
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
