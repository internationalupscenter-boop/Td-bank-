import React, { useState } from 'react';
import { Search, Menu, X, Landmark, ChevronDown, Globe, MapPin, Phone, User, LogIn } from 'lucide-react';

interface HeaderProps {
  onOpenEasyWeb: () => void;
  isLoggedIn: boolean;
  username: string;
  onLogout: () => void;
  lang: 'en' | 'fr';
  onChangeLang: (l: 'en' | 'fr') => void;
}

export default function Header({ onOpenEasyWeb, isLoggedIn, username, onLogout, lang, onChangeLang }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = lang === 'en' ? [
    { name: 'Products', items: ['Checking Accounts', 'Savings Accounts', 'Credit Cards', 'Mortgages', 'Loans & Lines of Credit', 'Investing'] },
    { name: 'Solutions', items: ['New to Canada', 'Student Banking', 'Cross-Border Banking', 'Retirement Planning', 'Buying your First Home'] },
    { name: 'Investing', items: ['TD Direct Investing', 'TD Wealth', 'Mutual Funds', 'GICs & Term Deposits'] },
    { name: 'Offers', items: ['New Checking Offer', 'Cash Back Credit Cards', 'Mortgage Rates', 'Student Welcome Package'] },
  ] : [
    { name: 'Produits', items: ['Comptes-chèques', 'Comptes d\'épargne', 'Cartes de crédit', 'Prêts hypothécaires', 'Prêts et marges', 'Investissement'] },
    { name: 'Solutions', items: ['Nouveau au Canada', 'Étudiants', 'Transfrontalières', 'Retraite', 'Achat maison'] },
    { name: 'Investissement', items: ['Placements directs TD', 'Gestion de patrimoine TD', 'Fonds communs', 'Dépôts à terme'] },
    { name: 'Offres', items: ['Offre chèques', 'Cartes de crédit Remise', 'Taux hypothécaires', 'Trousse étudiant'] },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Search simulation for: "${searchQuery}". We found 12 matches. Click on a product to learn more!`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <header className="relative w-full z-50 shadow-sm font-sans">
      {/* Top Utility Bar */}
      <div className="bg-[#1c1c1c] text-white text-[12px] py-1.5 px-4 md:px-8 flex justify-between items-center border-b border-neutral-800">
        <div className="flex items-center gap-4">
          <button className="font-semibold text-[#00b140] hover:text-[#008a00] transition-colors border-b-2 border-[#00b140] pb-0.5">Personal</button>
          <button className="text-neutral-300 hover:text-white transition-colors pb-0.5">Business</button>
          <button className="text-neutral-300 hover:text-white transition-colors pb-0.5">Commercial</button>
          <button className="text-neutral-300 hover:text-white transition-colors pb-0.5">Investing</button>
        </div>
        <div className="hidden lg:flex items-center gap-6 text-neutral-300">
          <div className="flex items-center gap-1 text-[11px] font-bold">
            <Globe className="w-3.5 h-3.5 text-neutral-400 mr-1" />
            <button
              onClick={() => onChangeLang('en')}
              className={`hover:text-white transition-all px-1.5 py-0.5 rounded ${lang === 'en' ? 'bg-[#13b143] text-white font-black' : 'text-neutral-400'}`}
            >
              EN
            </button>
            <span className="text-neutral-700 select-none">|</span>
            <button
              onClick={() => onChangeLang('fr')}
              className={`hover:text-white transition-all px-1.5 py-0.5 rounded ${lang === 'fr' ? 'bg-[#13b143] text-white font-black' : 'text-neutral-400'}`}
            >
              FR
            </button>
          </div>
          <a href="#locations" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5" />
            <span>Find Branch / ATM</span>
          </a>
          <a href="#support" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span>Contact Us: 1-800-459-6415</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-[#111c14]/95 backdrop-blur-md text-white py-4 px-4 md:px-8 flex justify-between items-center relative border-b-4 border-[#13b143] shadow-lg">
        <div className="flex items-center gap-8">
          {/* TD Bank Logo matching the clean look from Image 2 */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="bg-white px-3.5 py-1.5 rounded-lg shadow-md flex items-center gap-2.5 hover:scale-[1.02] active:scale-98 transition-all duration-200 border border-neutral-100">
              {/* Green Square with white TD */}
              <div className="bg-[#13b143] w-6.5 h-6.5 rounded flex items-center justify-center font-black text-white text-[13px] leading-none select-none">
                TD
              </div>
              {/* Dark Forest Green Bold 'Bank' Text */}
              <span className="text-lg font-extrabold tracking-tight text-[#113b24] font-sans">
                Bank
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                <button
                  onClick={() => toggleDropdown(link.name)}
                  className="flex items-center gap-1 text-sm font-medium hover:text-[#c4f2c4] transition-colors py-2 focus:outline-none"
                >
                  <span>{link.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === link.name && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setActiveDropdown(null)} />
                    <div className="absolute top-full left-0 mt-1.5 bg-white text-neutral-900 w-64 rounded-lg shadow-xl py-3 border border-neutral-100 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                      {link.items.map((item, idx) => (
                        <a
                          key={idx}
                          href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[#007a2c] font-medium transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-full hover:bg-[#008a00] transition-colors text-white focus:outline-none"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Login / Portal Actions */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end text-xs">
                <span className="text-[#c4f2c4] font-medium">{lang === 'en' ? 'Signed in' : 'Connecté'}</span>
                <span className="font-semibold">{username}</span>
              </div>
              <button
                onClick={onOpenEasyWeb}
                className="bg-white text-[#007a2c] hover:bg-[#e6f5ea] transition-all px-4 py-1.5 rounded font-semibold text-sm flex items-center gap-1.5 shadow-sm"
              >
                <User className="w-4 h-4" />
                <span>{lang === 'en' ? 'My EasyWeb' : 'Mon EasyWeb'}</span>
              </button>
              <button
                onClick={onLogout}
                className="text-xs text-[#c4f2c4] hover:text-white underline transition-colors"
              >
                {lang === 'en' ? 'Sign Out' : 'Déconnexion'}
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenEasyWeb}
              className="bg-[#00b140] hover:bg-[#00c546] active:bg-[#009b36] text-white border border-[#2ce169] transition-all px-5 py-2 rounded font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg focus:ring-2 focus:ring-[#98e298] focus:ring-offset-2 focus:ring-offset-[#007a2c]"
            >
              <LogIn className="w-4 h-4" />
              <span>{lang === 'en' ? 'EasyWeb Login' : 'Connexion EasyWeb'}</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-[#008a00] transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Interactive Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-neutral-900 shadow-lg border-b border-neutral-200 py-4 px-4 md:px-8 z-50 animate-in slide-in-from-top-4 duration-200">
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="What are you looking for today? (e.g., mortgages, card finder, savings accounts)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#007a2c] focus:ring-2 focus:ring-[#c4f2c4] text-neutral-800 font-medium placeholder-neutral-400 outline-none transition-all"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="bg-[#007a2c] hover:bg-[#006022] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2.5 text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Cancel
            </button>
          </form>
          <div className="max-w-4xl mx-auto mt-3 flex items-center gap-3 text-xs text-neutral-500 font-medium px-1">
            <span className="font-semibold text-neutral-700">Popular searches:</span>
            <button type="button" onClick={() => setSearchQuery('Mortgage Rate')} className="hover:text-[#007a2c] underline">Mortgage Rate</button>
            <span>•</span>
            <button type="button" onClick={() => setSearchQuery('EasyWeb Register')} className="hover:text-[#007a2c] underline">EasyWeb Register</button>
            <span>•</span>
            <button type="button" onClick={() => setSearchQuery('Cash Back Credit Card')} className="hover:text-[#007a2c] underline">Cash Back Card</button>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-full left-0 w-full bg-[#1c1c1c] text-white shadow-2xl py-6 px-5 z-50 flex flex-col gap-6 animate-in slide-in-from-top-6 duration-200 lg:hidden max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase font-bold tracking-wider text-neutral-400 border-b border-neutral-800 pb-1.5">Personal Banking</span>
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-1.5">
                  <span className="font-bold text-[#98e298] text-sm mt-2">{link.name}</span>
                  <div className="grid grid-cols-2 gap-2 pl-2">
                    {link.items.map((item, idx) => (
                      <a
                        key={idx}
                        href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-xs text-neutral-300 hover:text-white transition-colors py-1"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-800 pt-4 flex flex-col gap-3 text-sm">
              <span className="text-xs uppercase font-bold tracking-wider text-neutral-400 border-b border-neutral-800 pb-1.5">Help & Locations</span>
              <a href="#locations" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors">
                <MapPin className="w-4 h-4 text-[#00b140]" />
                <span>Find Branch / ATM</span>
              </a>
              <a href="#support" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#00b140]" />
                <span>Contact Us: 1-800-459-6415</span>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
