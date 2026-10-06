import React, { useState } from 'react';
import { 
  Phone, Calendar, MapPin, Search, ChevronRight, CheckCircle, 
  ChevronDown, Landmark, Sparkles, AlertCircle, Clock 
} from 'lucide-react';

interface SupportSectionProps {
  onApplyForProduct: (productName: string) => void;
}

interface Branch {
  name: string;
  address: string;
  phone: string;
  hours: string;
  distance: string;
}

export default function SupportSection({ onApplyForProduct }: SupportSectionProps) {
  // Appointment Scheduler state
  const [bookingStep, setBookingStep] = useState<'topic' | 'datetime' | 'contact' | 'confirmed'>('topic');
  const [bookingTopic, setBookingTopic] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  // Branch Locator State
  const [postalSearch, setPostalSearch] = useState('');
  const [searchedBranches, setSearchedBranches] = useState<Branch[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // FAQ Accordion states
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const mockBranches: { [key: string]: Branch[] } = {
    toronto: [
      { name: 'TD Bay & Front Street Branch', address: '161 Bay St, Toronto, ON M5J 2S1', phone: '416-982-8222', hours: '8:00 AM - 5:00 PM', distance: '0.2 km' },
      { name: 'TD Yonge & Bloor Branch', address: '789 Yonge St, Toronto, ON M4W 2G8', phone: '416-982-2515', hours: '9:00 AM - 6:00 PM', distance: '2.4 km' },
      { name: 'TD Queen West Branch', address: '490 Queen St W, Toronto, ON M5V 2B2', phone: '416-982-3561', hours: '9:00 AM - 5:00 PM', distance: '1.8 km' }
    ],
    vancouver: [
      { name: 'TD Robson & Thurlow Branch', address: '1025 Robson St, Vancouver, BC V6E 1A9', phone: '604-664-3250', hours: '8:30 AM - 5:30 PM', distance: '0.4 km' },
      { name: 'TD Georgia & Granville Branch', address: '700 W Georgia St, Vancouver, BC V7Y 1A1', phone: '604-664-8841', hours: '9:00 AM - 5:00 PM', distance: '0.8 km' }
    ],
    calgary: [
      { name: 'TD 8th Avenue SW Branch', address: '304 8 Ave SW, Calgary, AB T2P 1C2', phone: '403-294-3112', hours: '8:30 AM - 5:00 PM', distance: '0.1 km' }
    ]
  };

  const handleBranchSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = postalSearch.toLowerCase().trim();
    setHasSearched(true);

    if (query.includes('tor') || query.includes('m5') || query.includes('m4')) {
      setSearchedBranches(mockBranches.toronto);
    } else if (query.includes('van') || query.includes('v6')) {
      setSearchedBranches(mockBranches.vancouver);
    } else if (query.includes('cal') || query.includes('t2')) {
      setSearchedBranches(mockBranches.calgary);
    } else {
      // Default to Toronto
      setSearchedBranches(mockBranches.toronto);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingEmail) {
      alert('Please fill out all contact fields.');
      return;
    }
    const randCode = 'TD-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(randCode);
    setBookingStep('confirmed');
  };

  const resetBooking = () => {
    setBookingTopic('');
    setBookingDate('');
    setBookingTime('');
    setBookingName('');
    setBookingPhone('');
    setBookingEmail('');
    setBookingStep('topic');
  };

  const faqs = [
    {
      q: 'How do I qualify for the $400 unlimited checking cash bonus?',
      a: 'To earn the $400 bonus: Open a TD Unlimited Checking Account today. Complete any 2 of the following by December 15, 2026: Set up an eligible recurring Direct Deposit, make a recurring pre-authorized bill payment of $50+, or make an eligible Interac e-Transfer transaction of $50+. The bonus will be credited within 60 days of meeting requirements.'
    },
    {
      q: 'What is EasyWeb online banking and is it safe to use?',
      a: 'EasyWeb is TD Canada Trust\'s secure online client portal. It utilizes 128-bit security encryption, multi-factor credential validations, and a comprehensive online guarantee that reimburses 100% of any unauthorized transactions, provided you protect your personal access keys.'
    },
    {
      q: 'Can I apply for products if I am new to Canada with no credit history?',
      a: 'Yes! The TD New to Canada Banking Package is specifically structured for newcomers. We do not require Canadian credit history for our starter checking accounts, international transfer waivers, or the TD Cash Back Visa® starter credit card. Simply book an appointment with a local specialist to get started.'
    },
    {
      q: 'How are mortgage interest rates determined and can I lock my rate?',
      a: 'Mortgage rates fluctuate based on Bank of Canada index valuations. When you complete a TD Mortgage Pre-Approval, we guarantee and lock in your personal fixed interest rate for up to 120 days, protecting your home purchasing power while you shop.'
    }
  ];

  return (
    <section id="support" className="py-16 bg-white font-sans scroll-mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold text-emerald-700 tracking-wider uppercase mb-1.5 flex items-center justify-center gap-1">
            <Phone className="w-4 h-4" />
            <span>Support & Assistance</span>
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight text-wrap-balance mb-3">
            We are here to assist you, online or in person
          </h2>
          <p className="text-sm text-neutral-600">
            Book a private advisory appointment, locate branches/ATMs, or find immediate answers to common banking questions.
          </p>
        </div>

        {/* TWO COLUMN SUPPORT ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* COLUMN 1: APPOINTMENT SCHEDULER WIDGET (7 Cols) */}
          <div className="lg:col-span-7 bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 border-b border-neutral-200 pb-4 mb-6">
              <div className="bg-[#e6f5ea] p-2 rounded-xl text-[#007a2c]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-neutral-800 text-base">Book a TD Financial Advisor Appointment</h3>
                <p className="text-xs text-neutral-500">Virtual or in-branch professional planning advice</p>
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex justify-between text-[10px] font-bold text-neutral-400 mb-6 border-b border-neutral-100 pb-2">
              <span className={bookingStep === 'topic' ? 'text-[#007a2c]' : ''}>1. TOPIC</span>
              <span className={bookingStep === 'datetime' ? 'text-[#007a2c]' : ''}>2. DATE & TIME</span>
              <span className={bookingStep === 'contact' ? 'text-[#007a2c]' : ''}>3. DETAILS</span>
              <span className={bookingStep === 'confirmed' ? 'text-emerald-700 font-extrabold' : ''}>4. CONFIRMED</span>
            </div>

            {/* STEP 1: TOPIC */}
            {bookingStep === 'topic' && (
              <div className="space-y-4">
                <span className="block text-xs font-bold text-neutral-600 mb-2">What financial service would you like to discuss?</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Mortgage or Home Financing', value: 'mortgage' },
                    { label: 'New Checking & Savings Accounts', value: 'accounts' },
                    { label: 'Mutual Funds & Retirement Investing', value: 'investing' },
                    { label: 'Credit Card Application Help', value: 'cards' }
                  ].map((topic) => (
                    <button
                      key={topic.value}
                      onClick={() => {
                        setBookingTopic(topic.label);
                        setBookingStep('datetime');
                      }}
                      className="p-4 bg-white border border-neutral-200 rounded-xl hover:border-[#007a2c] hover:bg-emerald-50/10 text-left transition-all"
                    >
                      <span className="font-bold text-neutral-800 text-xs block">{topic.label}</span>
                      <span className="text-[10px] text-neutral-400 mt-0.5 block">Estimated discussion: 45 min</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: DATETIME */}
            {bookingStep === 'datetime' && (
              <div className="space-y-5">
                <span className="block text-xs font-bold text-[#007a2c] uppercase tracking-wider">Select Date & Preferred Slot</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">Select Date</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-800 focus:border-[#007a2c] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">Preferred Time Slot</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-800 focus:border-[#007a2c] bg-white outline-none"
                    >
                      <option value="">-- Choose time slot --</option>
                      <option value="9:30 AM">9:30 AM (In-Branch Only)</option>
                      <option value="11:00 AM">11:00 AM (In-Branch or Virtual)</option>
                      <option value="1:30 PM">1:30 PM (In-Branch or Virtual)</option>
                      <option value="3:00 PM">3:00 PM (In-Branch Only)</option>
                      <option value="4:30 PM">4:30 PM (Virtual Only)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-neutral-200 pt-4">
                  <button onClick={() => setBookingStep('topic')} className="text-xs font-bold text-neutral-500 hover:text-neutral-800">
                    Back
                  </button>
                  <button
                    disabled={!bookingDate || !bookingTime}
                    onClick={() => setBookingStep('contact')}
                    className={`py-2 px-6 rounded-lg text-xs font-bold transition-all ${
                      bookingDate && bookingTime
                        ? 'bg-[#007a2c] text-white hover:bg-[#006022]'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT DETAILS */}
            {bookingStep === 'contact' && (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <span className="block text-xs font-bold text-neutral-600">Verify your personal contact info</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:border-[#007a2c] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 416-555-0199"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:border-[#007a2c] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john.doe@example.com"
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:border-[#007a2c] outline-none"
                  />
                </div>

                <div className="flex justify-between items-center border-t border-neutral-200 pt-4">
                  <button type="button" onClick={() => setBookingStep('datetime')} className="text-xs font-bold text-neutral-500 hover:text-neutral-800">
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-[#007a2c] hover:bg-[#006022] text-white font-bold py-2.5 px-6 rounded-lg text-xs transition-colors shadow-sm"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: CONFIRMED */}
            {bookingStep === 'confirmed' && (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4 border border-emerald-100">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-neutral-900 text-lg">Advisor Appointment Confirmed!</h4>
                <p className="text-xs text-[#007a2c] font-bold mt-1 font-mono tracking-wider">CONFIRMATION ID: {confirmationCode}</p>
                
                <div className="my-6 max-w-sm mx-auto bg-white rounded-xl border border-neutral-200 p-4 text-xs text-neutral-700 text-left space-y-2 shadow-inner">
                  <div className="flex justify-between border-b border-neutral-50 pb-1.5">
                    <span className="font-semibold text-neutral-400">Discussion:</span>
                    <span className="font-bold text-neutral-800">{bookingTopic}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-50 pb-1.5">
                    <span className="font-semibold text-neutral-400">Date & Time:</span>
                    <span className="font-bold text-neutral-800">{bookingDate} at {bookingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-neutral-400">Consultant:</span>
                    <span className="font-bold text-neutral-800">Senior Branch Planner</span>
                  </div>
                </div>

                <button
                  onClick={resetBooking}
                  className="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold py-2 px-6 rounded-lg text-xs transition-colors"
                >
                  Book Another Appointment
                </button>
              </div>
            )}

          </div>

          {/* COLUMN 2: BRANCH & ATM LOCATOR (5 Cols) */}
          <div id="locations" className="lg:col-span-5 bg-neutral-50 rounded-2xl border border-neutral-200 p-6 shadow-sm scroll-mt-6">
            <div className="flex items-center gap-2.5 border-b border-neutral-200 pb-4 mb-5">
              <div className="bg-[#e6f5ea] p-2 rounded-xl text-[#007a2c]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-neutral-800 text-base">TD ATM & Branch Locator</h3>
                <p className="text-xs text-neutral-500">Find operating hours & services in Canada</p>
              </div>
            </div>

            <form onSubmit={handleBranchSearch} className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter city (e.g., Toronto, Vancouver)"
                  value={postalSearch}
                  onChange={(e) => setPostalSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs text-neutral-800 outline-none focus:border-[#007a2c] bg-white font-medium"
                />
              </div>
              <button
                type="submit"
                className="bg-[#007a2c] hover:bg-[#006022] text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors"
              >
                Search
              </button>
            </form>

            {/* BRANCHES LIST */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {!hasSearched ? (
                <div className="text-center py-10 text-neutral-400 font-medium text-xs">
                  <MapPin className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                  <p>Type &quot;Toronto&quot; or &quot;Vancouver&quot; to locate close branches.</p>
                </div>
              ) : searchedBranches.length === 0 ? (
                <div className="text-center py-10 text-neutral-400 font-medium text-xs">
                  <AlertCircle className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                  <p>No direct branch matches found. Try searching &quot;Toronto&quot;.</p>
                </div>
              ) : (
                searchedBranches.map((branch, index) => (
                  <div key={index} className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm text-xs space-y-2">
                    <div className="flex justify-between items-start border-b border-neutral-50 pb-1.5">
                      <h4 className="font-bold text-neutral-800">{branch.name}</h4>
                      <span className="font-mono text-[10px] text-[#007a2c] font-semibold">{branch.distance}</span>
                    </div>
                    <p className="text-neutral-500 font-medium">{branch.address}</p>
                    <div className="flex justify-between items-center text-[11px] text-neutral-600 font-semibold pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#007a2c]" />
                        <span>Hours: {branch.hours}</span>
                      </span>
                      <span>Call: {branch.phone}</span>
                    </div>
                    <button
                      onClick={() => {
                        setBookingTopic('Checking Account Setup');
                        setBookingStep('datetime');
                        alert(`Setting appointment branch to ${branch.name}. Select date and time next!`);
                      }}
                      className="w-full mt-2 bg-neutral-100 hover:bg-[#007a2c]/5 hover:text-[#007a2c] text-neutral-600 font-bold py-1.5 rounded-lg text-[10px] text-center border border-neutral-200 transition-all"
                    >
                      Book at this Location
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* RECENT FREQUENT QUESTIONS - FAQ SECTION */}
        <div className="max-w-4xl mx-auto border-t border-neutral-200 pt-16">
          <h3 className="font-extrabold text-neutral-900 text-lg mb-6 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-3.5">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-5 font-bold text-neutral-800 text-xs sm:text-sm text-left hover:bg-neutral-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="p-5 pt-0 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
