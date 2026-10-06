import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Landmark, Sparkles, RefreshCw } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  productName: string;
  onClose: () => void;
  onSuccess: (username: string) => void;
}

export default function ApplicationModal({ isOpen, productName, onClose, onSuccess }: ApplicationModalProps) {
  const [step, setStep] = useState<'form' | 'checking' | 'approved'>('form');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('65000');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [approvedLimit, setApprovedLimit] = useState(0);
  const [approvedRate, setApprovedRate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !salary || !address || !postalCode) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    setStep('checking');

    // Simulate Credit Scoring Assessment
    setTimeout(() => {
      const salNum = parseFloat(salary);
      let limit = 5000;
      let rate = '19.99%';

      if (salNum >= 120000) {
        limit = 18500;
        rate = '14.99% (Low Interest Special)';
      } else if (salNum >= 80000) {
        limit = 12000;
        rate = '19.99%';
      } else if (salNum >= 45000) {
        limit = 7500;
        rate = '19.99%';
      } else {
        limit = 2500;
        rate = '20.99%';
      }

      setApprovedLimit(limit);
      setApprovedRate(rate);
      setStep('approved');
      onSuccess(`${firstName} ${lastName}`);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 overflow-y-auto font-sans backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="bg-[#007a2c] text-white py-4 px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5" />
            <span className="font-extrabold text-sm tracking-tight text-white uppercase">TD Secure Application Portal</span>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-[#008a00] text-emerald-100 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic step rendering */}
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block mb-1">PRODUCT SELECTION</span>
              <h3 className="font-extrabold text-neutral-800 text-base leading-snug">{productName}</h3>
              <p className="text-xs text-neutral-500 mt-1">Complete your digital application to receive a decision within seconds.</p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:border-[#007a2c] outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:border-[#007a2c] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:border-[#007a2c] outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3.5">
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Home Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="123 King St W"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:border-[#007a2c] outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Postal Code</label>
                <input
                  type="text"
                  required
                  placeholder="M5V 2N1"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:border-[#007a2c] outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">Annual Personal Income ($ CAD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-bold">$</span>
                <input
                  type="number"
                  required
                  placeholder="65000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full pl-7 pr-3 py-2.5 border border-neutral-300 rounded-lg text-xs text-neutral-800 font-semibold focus:border-[#007a2c] outline-none"
                />
              </div>
            </div>

            <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-[10px] text-neutral-500 leading-relaxed flex gap-2">
              <ShieldCheck className="w-5 h-5 text-[#007a2c] shrink-0 mt-0.5" />
              <span>We value your privacy. Your submitted information is secured with 128-bit sandbox protocol simulation and will not be shared externally.</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#007a2c] hover:bg-[#006022] text-white font-bold py-3 rounded-lg text-xs transition-colors shadow-sm"
            >
              Submit Application
            </button>
          </form>
        )}

        {/* STEP B: SECURE ASSESSMENT SPLASH */}
        {step === 'checking' && (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-4">
            <RefreshCw className="w-10 h-10 text-[#007a2c] animate-spin-slow" />
            <h4 className="font-extrabold text-neutral-800 text-base">Securing Decision...</h4>
            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
              Evaluating credit worthiness and matching with TD personal account products. Please hold.
            </p>
          </div>
        )}

        {/* STEP C: APPROVED */}
        {step === 'approved' && (
          <div className="p-8 text-center space-y-6 animate-pop-in">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes stroke-draw {
                to {
                  stroke-dashoffset: 0;
                }
              }
              @keyframes scale-in {
                0% { transform: scale(0.3); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
              }
              .animate-checkmark-draw {
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                animation: stroke-draw 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
              }
              .animate-circle-fill {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                animation: stroke-draw 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
              }
              .animate-pop-in {
                animation: scale-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15) forwards;
              }
            `}} />

            {/* Custom Animated Checkmark SVG */}
            <div className="w-16 h-16 mx-auto flex items-center justify-center relative select-none">
              <svg className="w-full h-full text-emerald-600" viewBox="0 0 52 52">
                <circle className="animate-circle-fill stroke-[#13b143] fill-none" cx="26" cy="26" r="25" strokeWidth="3" />
                <path className="animate-checkmark-draw stroke-[#13b143] fill-none" strokeWidth="4" strokeLinecap="round" d="M14 27l7.5 7 16.5-16" />
              </svg>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-extrabold text-emerald-700 tracking-wider uppercase">Congratulations! Approved</span>
              </div>
              <h4 className="font-extrabold text-neutral-900 text-lg leading-tight">Welcome to TD Canada Trust</h4>
              <p className="text-xs text-neutral-500 mt-1">Your application for the <strong>{productName}</strong> has been successfully approved.</p>
            </div>

            {/* Custom Approval Offer Sheet */}
            <div className="max-w-sm mx-auto bg-[#f4f7f4] rounded-xl border border-emerald-100 p-4 text-xs text-neutral-700 text-left space-y-2 shadow-inner">
              <div className="flex justify-between border-b border-emerald-50/45 pb-2">
                <span className="font-semibold text-neutral-400 uppercase text-[9px]">Decision Status:</span>
                <span className="font-bold text-[#007a2c] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Approved
                </span>
              </div>
              <div className="flex justify-between border-b border-emerald-50/45 pb-2">
                <span className="font-semibold text-neutral-400 uppercase text-[9px]">Approved Account Credit Limit:</span>
                <span className="font-bold text-neutral-800 font-mono text-sm">${approvedLimit.toLocaleString('en-US')} CAD</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-neutral-400 uppercase text-[9px]">Annualized Interest Rate:</span>
                <span className="font-bold text-neutral-800 font-mono">{approvedRate}</span>
              </div>
            </div>

            <p className="text-[10px] text-neutral-400 leading-normal max-w-sm mx-auto">
              Your physical credentials will be mailed to you within 5 business days. You can access your temporary account instantly via EasyWeb online banking.
            </p>

            <button
              onClick={onClose}
              className="bg-[#007a2c] hover:bg-[#006022] text-white font-bold py-2.5 px-8 rounded-lg text-xs transition-colors shadow-sm"
            >
              Go to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
