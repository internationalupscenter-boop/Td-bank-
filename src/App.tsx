import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Calculators from './components/Calculators';
import ProductSuite from './components/ProductSuite';
import CardFinderQuiz from './components/CardFinderQuiz';
import SupportSection from './components/SupportSection';
import Footer from './components/Footer';
import EasyWebSimulator from './components/EasyWebSimulator';
import ApplicationModal from './components/ApplicationModal';
import AdminPortal, { UserAccount } from './components/AdminPortal';
import { Landmark, ArrowUp, X, Sparkles, RefreshCw } from 'lucide-react';
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

const INITIAL_USERS: UserAccount[] = [
  {
    id: 'user-1',
    username: 'John Doe',
    card: '4520148902506412',
    pass: 'DemoSecurePass123!',
    balances: { checking: 1248.50, savings: 12450.00, credit: -348.20, investing: 45390.00 },
    transactions: [
      { id: 'tx-1', date: '2026-10-06', description: 'Metro Groceries Store', amount: 82.40, type: 'debit', account: 'credit' },
      { id: 'tx-2', date: '2026-10-05', description: 'Payroll Direct Deposit Grant', amount: 1850.00, type: 'credit', account: 'checking' },
      { id: 'tx-3', date: '2026-10-04', description: 'Tim Hortons #4890', amount: 6.50, type: 'debit', account: 'credit' }
    ]
  },
  {
    id: 'user-2',
    username: 'Sarah Smith',
    card: '4520999988887777',
    pass: 'SarahPass456!',
    balances: { checking: 8250.00, savings: 64100.00, credit: -1250.00, investing: 120400.00 },
    transactions: [
      { id: 'tx-s1', date: '2026-10-06', description: 'Expedia Booking Flight', amount: 750.00, type: 'debit', account: 'credit' },
      { id: 'tx-s2', date: '2026-10-04', description: 'Savings Interest Accrued', amount: 142.50, type: 'credit', account: 'savings' }
    ]
  },
  {
    id: 'user-3',
    username: 'Robert Watson',
    card: '4520111122223333',
    pass: 'RobertPass789!',
    balances: { checking: 350.00, savings: 1800.00, credit: 0.00, investing: 0.00 },
    transactions: []
  }
];

export default function App() {
  // Navigation & UI States
  const [isEasyWebOpen, setIsEasyWebOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [targetApplyProduct, setTargetApplyProduct] = useState('');
  
  // Interactive User States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  // Multi-User Global Database States
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Back to Top Button
  const [showScrollTop, setShowScrollTop] = useState(false);

  // App Alert State
  const [showAlert, setShowAlert] = useState(true);

  // Secure Admin Route filter checking for "?mode=admin" or "?admin=true" in address URL
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isAdminPortalActive, setIsAdminPortalActive] = useState(false);

  // Synchronize customer directory with Cloud Firestore in Real-Time
  useEffect(() => {
    const path = 'users';
    const unsubscribe = onSnapshot(collection(db, path), async (snapshot) => {
      const list: UserAccount[] = [];
      snapshot.forEach(doc => {
        list.push(doc.data() as UserAccount);
      });

      if (list.length === 0) {
        // Seed initial users into Firestore
        try {
          for (const u of INITIAL_USERS) {
            await setDoc(doc(db, 'users', u.id), u);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, 'users');
        }
      } else {
        // Sort users consistently by username
        list.sort((a, b) => a.username.localeCompare(b.username));
        setUsers(list);
        setIsLoading(false);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'admin' || params.get('admin') === 'true' || window.location.pathname === '/admin') {
      setIsAdminRoute(true);
    }
  }, []);

  useEffect(() => {
    const handleHashAndPath = () => {
      setIsAdminPortalActive(
        window.location.hash === '#admin-portal' || 
        window.location.hash === '#admin' || 
        window.location.pathname === '/admin'
      );
    };
    window.addEventListener('hashchange', handleHashAndPath);
    window.addEventListener('popstate', handleHashAndPath);
    handleHashAndPath();
    return () => {
      window.removeEventListener('hashchange', handleHashAndPath);
      window.removeEventListener('popstate', handleHashAndPath);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenEasyWeb = () => {
    setIsEasyWebOpen(true);
  };

  const handleCloseEasyWeb = () => {
    setIsEasyWebOpen(false);
  };

  const handleLoginSuccess = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    setIsEasyWebOpen(true); // Remain in EasyWeb workspace but logged in!
    alert(`Successfully signed in to EasyWeb online banking as ${user}. Enjoy your simulation workspace!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setIsEasyWebOpen(false);
    alert('You have successfully signed out of your secure EasyWeb session.');
  };

  const handleApplyForProduct = (productName: string) => {
    setTargetApplyProduct(productName);
    setIsApplyModalOpen(true);
  };

  const handleApplySuccess = (approvedUserName: string) => {
    // Automatically log the user in to make the flow incredibly delightful!
    setIsLoggedIn(true);
    setUsername(approvedUserName);
  };

  // Push updates back to Firestore to trigger multi-user real-time snapshot synchronizations
  const handleUpdateUsers = async (updatedList: UserAccount[]) => {
    try {
      for (const nextUser of updatedList) {
        const existingUser = users.find(u => u.id === nextUser.id);
        // Optimize writes by only executing if there are changes
        if (JSON.stringify(existingUser) !== JSON.stringify(nextUser)) {
          await setDoc(doc(db, 'users', nextUser.id), nextUser);
        }
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'users');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] flex flex-col justify-center items-center font-sans">
        <div className="text-center space-y-4">
          <RefreshCw className="w-10 h-10 text-[#007a2c] animate-spin mx-auto" />
          <p className="text-sm font-bold text-neutral-600">Connecting securely to Cloud Firestore...</p>
        </div>
      </div>
    );
  }

  if (isAdminPortalActive) {
    return (
      <AdminPortal 
        onClose={() => { 
          if (window.location.pathname === '/admin') {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
          } else {
            window.location.hash = ''; 
          }
        }} 
        users={users}
        onUpdateUsers={handleUpdateUsers}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f4] flex flex-col justify-between selection:bg-[#98e298] selection:text-[#005a20]">
      
      {/* Top Banner Warning or Welcome Ticker */}
      {showAlert && (
        <div className="bg-[#005a20] text-emerald-100 py-2.5 px-4 text-xs font-semibold flex items-center justify-between text-center border-b border-white/10 relative z-50">
          <div className="mx-auto flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#98e298]" />
            <span>
              {lang === 'en' 
                ? "Interactive Multi-Feature Simulator: Lock in special 4-year fixed mortgage rates or access mock EasyWeb online banking."
                : "Simulateur interactif multi-fonction : Bloquez des taux hypothécaires fixes spéciaux de 4 ans ou accédez aux services bancaires simulés d'EasyWeb."
              }
            </span>
          </div>
          <button 
            onClick={() => setShowAlert(false)} 
            className="p-1 hover:bg-white/15 rounded text-white/70 hover:text-white transition-all focus:outline-none"
            aria-label="Close Alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main App Layout */}
      <Header 
        onOpenEasyWeb={handleOpenEasyWeb} 
        isLoggedIn={isLoggedIn}
        username={username}
        onLogout={handleLogout}
        lang={lang}
        onChangeLang={setLang}
      />

      <main className="flex-grow">
        {/* Hero Area */}
        <Hero 
          onSelectAction={scrollToSection} 
          onOpenEasyWeb={handleOpenEasyWeb}
          onApplyForProduct={handleApplyForProduct}
        />

        {/* Product Card Grids */}
        <ProductSuite onApplyForProduct={handleApplyForProduct} />

        {/* Credit Card Match Quiz Widget */}
        <CardFinderQuiz onApplyForProduct={handleApplyForProduct} />

        {/* Dynamic Financial Calculators */}
        <Calculators onApplyForProduct={handleApplyForProduct} />

        {/* Support Section, Locator, FAQs */}
        <SupportSection onApplyForProduct={handleApplyForProduct} />
      </main>

      <Footer />

      {/* MODAL SIMULATOR: EasyWeb Secure Online Banking Portal */}
      <EasyWebSimulator
        isOpen={isEasyWebOpen}
        onClose={handleCloseEasyWeb}
        onLoginSuccess={handleLoginSuccess}
        isLoggedIn={isLoggedIn}
        username={username}
        onLogout={handleLogout}
        isAdminRoute={isAdminRoute}
        users={users}
        onUpdateUsers={handleUpdateUsers}
        lang={lang}
      />

      {/* MODAL APPLICATION: Custom approval assessment portal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        productName={targetApplyProduct}
        onClose={() => setIsApplyModalOpen(false)}
        onSuccess={handleApplySuccess}
      />

      {/* Float Actions (Back to Top) */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-[#007a2c] hover:bg-[#006022] text-white p-3.5 rounded-full shadow-2xl z-40 transition-all duration-300 transform scale-100 hover:scale-110 flex items-center justify-center focus:outline-none"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
