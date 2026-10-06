import React, { useState } from 'react';
import { 
  X, Landmark, ShieldCheck, Lock, Eye, EyeOff, AlertCircle, RefreshCw, 
  Send, FileText, CheckCircle, ArrowRightLeft, Camera, TrendingUp, Check
} from 'lucide-react';
import { UserAccount } from './AdminPortal';

interface EasyWebSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
  isLoggedIn: boolean;
  username: string;
  onLogout: () => void;
  isAdminRoute: boolean;
  users: UserAccount[];
  onUpdateUsers: (updatedUsers: UserAccount[]) => void;
  lang: 'en' | 'fr';
}

export default function EasyWebSimulator({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  isLoggedIn, 
  username, 
  onLogout,
  isAdminRoute,
  users,
  onUpdateUsers,
  lang
}: EasyWebSimulatorProps) {
  // Login Form States
  const [accessCard, setAccessCard] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Tab navigation inside EasyWeb
  const [activeTab, setActiveTab] = useState<'accounts' | 'transfer' | 'etransfer' | 'billpay' | 'deposit' | 'admin'>('accounts');

  // Form states for banking tasks
  const [transferSource, setTransferSource] = useState<'checking' | 'savings'>('checking');
  const [transferDest, setTransferDest] = useState<'savings' | 'checking' | 'credit'>('savings');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferSuccess, setTransferSuccess] = useState('');

  const [etransferEmail, setEtransferEmail] = useState('');
  const [etransferName, setEtransferName] = useState('');
  const [etransferAmount, setEtransferAmount] = useState('');
  const [etransferQuestion, setEtransferQuestion] = useState('');
  const [etransferAnswer, setEtransferAnswer] = useState('');
  const [etransferSuccess, setEtransferSuccess] = useState('');

  const [billPayee, setBillPayee] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [billSource, setBillSource] = useState<'checking' | 'savings'>('checking');
  const [billSuccess, setBillSuccess] = useState('');

  const [checkValue, setCheckValue] = useState('');
  const [checkImageState, setCheckImageState] = useState<'empty' | 'capturing' | 'captured'>('empty');
  const [depositSuccess, setDepositSuccess] = useState('');

  // Admin Control Overrides States (for Admin role login)
  const [adminActionType, setAdminActionType] = useState<'deposit' | 'withdraw'>('deposit');
  const [adminTargetAcct, setAdminTargetAcct] = useState<'checking' | 'savings' | 'credit' | 'investing'>('checking');
  const [adminSelectedUserId, setAdminSelectedUserId] = useState(users[0]?.id || '');
  const [adminAmount, setAdminAmount] = useState('');
  const [adminMemo, setAdminMemo] = useState('Admin Balance Adjustment');
  const [adminSuccessMsg, setAdminSuccessMsg] = useState('');

  // Find active logged-in user matching standard username
  const activeUser = users.find(u => u.username === username);

  const renderAvatar = (user: UserAccount, sizeClass = 'w-10 h-10') => {
    if (user.profileImage) {
      if (user.profileImage.startsWith('avatar-')) {
        const template = [
          { id: 'avatar-green', gradient: 'from-[#13b143] to-[#113b24]' },
          { id: 'avatar-blue', gradient: 'from-[#2563eb] to-[#1d4ed8]' },
          { id: 'avatar-gold', gradient: 'from-[#d97706] to-[#b45309]' },
          { id: 'avatar-purple', gradient: 'from-[#7c3aed] to-[#6d28d9]' },
        ].find(t => t.id === user.profileImage) || { gradient: 'from-[#13b143] to-[#113b24]' };
        return (
          <div className={`${sizeClass} rounded-full bg-gradient-to-tr ${template.gradient} flex items-center justify-center text-white font-extrabold text-[10px] tracking-wider uppercase border border-white/20 shadow-md shrink-0`}>
            {user.username.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
        );
      }
      return (
        <img 
          src={user.profileImage} 
          alt={user.username} 
          className={`${sizeClass} rounded-full object-cover border border-[#13b143]/40 shadow-md shrink-0`}
          referrerPolicy="no-referrer"
        />
      );
    }
    return (
      <div className={`${sizeClass} rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 flex items-center justify-center font-extrabold text-[10px] tracking-wider uppercase shadow-inner shrink-0`}>
        {user.username.split(' ').map(n => n[0]).join('').slice(0, 2)}
      </div>
    );
  };

  // Fallback default balances in case session is guest
  const balances = activeUser ? activeUser.balances : {
    checking: 0,
    savings: 0,
    credit: 0,
    investing: 0
  };

  const transactions = activeUser ? activeUser.transactions : [];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCard.trim() || !password.trim()) {
      setLoginError(lang === 'en' ? 'Please enter a valid Access Card and Password.' : 'Veuillez saisir une carte et un mot de passe valides.');
      return;
    }

    // Match users array
    const matchedUser = users.find(u => u.card === accessCard && u.pass === password);
    if (matchedUser) {
      setLoginError('');
      onLoginSuccess(matchedUser.username);
      setActiveTab('accounts');
    } else if (accessCard === 'admin' && password === 'AdminSecureOverride!99') {
      setLoginError('');
      onLoginSuccess('System Administrator');
      setActiveTab('admin');
    } else {
      setLoginError(lang === 'en' ? 'Incorrect card number or password.' : 'Numéro de carte ou mot de passe incorrect.');
    }
  };

  const useDemoCredentials = () => {
    setAccessCard('4520148902506412');
    setPassword('DemoSecurePass123!');
    setLoginError('');
  };

  // Persists local actions into the global multi-user state manager
  const commitUserUpdate = (nextBalances: typeof balances, nextTx: any) => {
    if (!activeUser) return;
    const updated = users.map(u => {
      if (u.id === activeUser.id) {
        return {
          ...u,
          balances: nextBalances,
          transactions: [nextTx, ...u.transactions]
        };
      }
      return u;
    });
    onUpdateUsers(updated);
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid transfer amount.');
      return;
    }

    const currentSourceBal = transferSource === 'checking' ? balances.checking : balances.savings;
    if (amount > currentSourceBal) {
      alert('Insufficient funds in the source account.');
      return;
    }

    const nextBalances = { ...balances };
    nextBalances[transferSource] -= amount;
    if (transferDest === 'credit') {
      nextBalances.credit += amount; // paying credit card adds credit limit/reduces debt
    } else {
      nextBalances[transferDest] += amount;
    }

    const newTx = {
      id: `tx-tf-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: `Transfer to ${transferDest.toUpperCase()}`,
      amount: amount,
      type: 'debit' as const,
      account: transferSource
    };

    commitUserUpdate(nextBalances, newTx);
    setTransferSuccess(`Successfully transferred $${amount.toFixed(2)} to ${transferDest.toUpperCase()}.`);
    setTransferAmount('');
    setTimeout(() => setTransferSuccess(''), 4000);
  };

  const handleEtransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(etransferAmount);
    if (!etransferEmail || !etransferName || isNaN(amount) || amount <= 0) {
      alert('Please complete all e-Transfer fields.');
      return;
    }

    if (amount > balances.checking) {
      alert('Insufficient funds in checking account.');
      return;
    }

    const nextBalances = { ...balances };
    nextBalances.checking -= amount;

    const newTx = {
      id: `tx-et-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: `Interac e-Transfer to ${etransferName}`,
      amount: amount,
      type: 'debit' as const,
      account: 'checking'
    };

    commitUserUpdate(nextBalances, newTx);
    setEtransferSuccess(`Interac e-Transfer of $${amount.toFixed(2)} sent to ${etransferName}.`);
    setEtransferAmount('');
    setEtransferEmail('');
    setEtransferName('');
    setTimeout(() => setEtransferSuccess(''), 4000);
  };

  const handleBillPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(billAmount);
    if (!billPayee || isNaN(amount) || amount <= 0) {
      alert('Select payee and enter a valid payment amount.');
      return;
    }

    const currentSourceBal = billSource === 'checking' ? balances.checking : balances.savings;
    if (amount > currentSourceBal) {
      alert('Insufficient funds.');
      return;
    }

    const nextBalances = { ...balances };
    nextBalances[billSource] -= amount;

    const newTx = {
      id: `tx-bill-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: `Bill Payment - ${billPayee}`,
      amount: amount,
      type: 'debit' as const,
      account: billSource
    };

    commitUserUpdate(nextBalances, newTx);
    setBillSuccess(`Successfully paid $${amount.toFixed(2)} to ${billPayee}.`);
    setBillAmount('');
    setBillPayee('');
    setTimeout(() => setBillSuccess(''), 4000);
  };

  const triggerCameraFlash = () => {
    setCheckImageState('capturing');
    setTimeout(() => {
      setCheckImageState('captured');
    }, 1200);
  };

  const handleCheckDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(checkValue);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid check amount.');
      return;
    }
    if (checkImageState !== 'captured') {
      alert('Please snap check photos first.');
      return;
    }

    const nextBalances = { ...balances };
    nextBalances.checking += amount;

    const newTx = {
      id: `tx-dep-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: `Mobile Check Deposit`,
      amount: amount,
      type: 'credit' as const,
      account: 'checking'
    };

    commitUserUpdate(nextBalances, newTx);
    setDepositSuccess(`Successfully deposited check of $${amount.toFixed(2)} to Checking.`);
    setCheckValue('');
    setCheckImageState('empty');
    setTimeout(() => setDepositSuccess(''), 5000);
  };

  // Actions for ADMIN USER logged inside EasyWeb
  const handleAdminAction = (e: React.FormEvent) => {
    e.preventDefault();
    const amtVal = parseFloat(adminAmount);
    if (isNaN(amtVal) || amtVal <= 0) {
      alert('Please enter a valid override amount.');
      return;
    }

    const targetUser = users.find(u => u.id === adminSelectedUserId);
    if (!targetUser) {
      alert('No user selected.');
      return;
    }

    const updated = users.map(u => {
      if (u.id === targetUser.id) {
        const nextBalances = { ...u.balances };
        if (adminActionType === 'deposit') {
          if (adminTargetAcct === 'credit') {
            nextBalances.credit += amtVal;
          } else {
            nextBalances[adminTargetAcct] += amtVal;
          }
        } else {
          if (adminTargetAcct === 'credit') {
            nextBalances.credit -= amtVal;
          } else {
            nextBalances[adminTargetAcct] -= amtVal;
          }
        }

        const newAdminTx = {
          id: `tx-adm-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          description: adminMemo,
          amount: amtVal,
          type: adminActionType === 'deposit' ? ('credit' as const) : ('debit' as const),
          account: adminTargetAcct
        };

        return {
          ...u,
          balances: nextBalances,
          transactions: [newAdminTx, ...u.transactions]
        };
      }
      return u;
    });

    onUpdateUsers(updated);
    setAdminSuccessMsg(`Admin Overrode successfully! Managed balance change on ${targetUser.username}.`);
    setAdminAmount('');
    setTimeout(() => setAdminSuccessMsg(''), 5000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 overflow-y-auto font-sans backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Simulator Top bar */}
        <div className="bg-[#111] text-white py-3.5 px-6 flex justify-between items-center border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-[#00b140]" />
            <span className="font-bold text-sm tracking-tight text-neutral-200">
              TD EasyWeb® Secure Simulator
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] bg-neutral-800 text-neutral-300 py-1 px-2.5 rounded font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00b140] animate-pulse" />
              <span>ENVIRONMENT: SIMULATED</span>
            </span>
            <button 
              onClick={onClose} 
              className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Inner Layout */}
        {!isLoggedIn ? (
          /* SECTION A: LOGIN SCREEN */
          <div className="flex-1 p-6 sm:p-10 bg-neutral-50 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto">
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#007a2c] p-2 rounded-xl shadow">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-neutral-800">Secure Online Banking</h1>
                    <p className="text-xs text-neutral-500">TD EasyWeb Secure Login Simulation</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-4 mb-6 flex gap-3 text-xs">
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold mb-1">Interactive Education Sandbox</p>
                    <p className="leading-relaxed text-amber-800">
                      This is a high-fidelity visual and functional simulator of TD EasyWeb. Log in as a customer using the preloaded credentials below to test checking actions, bill payments, and statements.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={useDemoCredentials}
                    className="w-full bg-emerald-50 hover:bg-emerald-100 text-[#007a2c] border border-emerald-200 py-2.5 px-4 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4 animate-spin-slow" />
                    <span>Use Preloaded Demo Credentials</span>
                  </button>

                  {isAdminRoute && (
                    <button
                      onClick={() => {
                        setAccessCard('admin');
                        setPassword('AdminSecureOverride!99');
                        setLoginError('');
                      }}
                      className="w-full bg-[#1c1c1c] hover:bg-[#2c2c2c] text-white border border-neutral-700 py-2.5 px-4 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Lock className="w-4 h-4 text-[#13b143]" />
                      <span>Platform Admin Login</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Security info cards */}
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6">
                <div className="flex gap-2 text-xs text-neutral-600">
                  <ShieldCheck className="w-5 h-5 text-[#007a2c] shrink-0" />
                  <span><strong>TD Double Security Guarantee</strong> protects eligible transactions.</span>
                </div>
                <div className="flex gap-2 text-xs text-neutral-600">
                  <Lock className="w-5 h-5 text-[#007a2c] shrink-0" />
                  <span><strong>128-bit Encryption</strong> is modeled in this React portal sandbox.</span>
                </div>
              </div>
            </div>

            {/* Login Form card */}
            <div className="lg:col-span-5 bg-white rounded-xl shadow-lg border border-neutral-200 p-6 self-start">
              <h3 className="font-bold text-neutral-800 text-base mb-4 border-b border-neutral-100 pb-2">EasyWeb Sign In</h3>
              
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="text-xs text-red-600 bg-red-50 border border-red-200 p-2.5 rounded font-medium">
                    {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">Access Card or Username</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Card Number (e.g. 4520...)"
                    value={accessCard}
                    onChange={(e) => setAccessCard(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm text-neutral-800 focus:border-[#007a2c] focus:ring-1 focus:ring-[#007a2c] outline-none transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm text-neutral-800 focus:border-[#007a2c] focus:ring-1 focus:ring-[#007a2c] outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs py-1">
                  <label className="flex items-center gap-1.5 text-neutral-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-neutral-300 text-[#007a2c] focus:ring-[#007a2c]"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-[#007a2c] font-semibold hover:underline">Forgot login info?</a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#007a2c] hover:bg-[#006022] text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-sm mt-2"
                >
                  Log In
                </button>
              </form>

              <div className="mt-4 border-t border-neutral-100 pt-3 text-center">
                <a href="#" className="text-xs text-neutral-500 hover:text-neutral-800 font-medium">New to Online Banking? Register now</a>
              </div>
            </div>
          </div>
        ) : (
          /* SECTION B: BANKING CONSOLE */
          <div className="flex-1 flex flex-col md:flex-row bg-neutral-100 overflow-hidden min-h-[500px]">
            {/* Console Left Sidebar Navigation */}
            <div className="w-full md:w-60 bg-white border-r border-neutral-200 flex flex-col justify-between py-4">
              <div className="space-y-1">
                {/* User Card */}
                <div className="px-5 py-4 mb-4 border-b border-neutral-100 flex items-center gap-3">
                  {activeUser ? renderAvatar(activeUser, 'w-10 h-10') : (
                    <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-500 font-bold text-xs uppercase shadow-inner">
                      ADM
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-bold text-neutral-400">{lang === 'en' ? 'Welcome Back' : 'Bienvenue'}</p>
                    <p className="font-bold text-neutral-800 text-sm truncate">{username}</p>
                    <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{lang === 'en' ? 'Secure Session Active' : 'Session sécurisée active'}</span>
                    </p>
                  </div>
                </div>

                {activeUser && (
                  <>
                    <button
                      onClick={() => setActiveTab('accounts')}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold transition-all text-left ${
                        activeTab === 'accounts'
                          ? 'bg-emerald-50 text-[#007a2c] border-l-4 border-[#007a2c]'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 border-l-4 border-transparent'
                      }`}
                    >
                      <Landmark className="w-4 h-4 shrink-0" />
                      <span>My Accounts</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('transfer')}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold transition-all text-left ${
                        activeTab === 'transfer'
                          ? 'bg-emerald-50 text-[#007a2c] border-l-4 border-[#007a2c]'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 border-l-4 border-transparent'
                      }`}
                    >
                      <ArrowRightLeft className="w-4 h-4 shrink-0" />
                      <span>Transfer Funds</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('etransfer')}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold transition-all text-left ${
                        activeTab === 'etransfer'
                          ? 'bg-emerald-50 text-[#007a2c] border-l-4 border-[#007a2c]'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 border-l-4 border-transparent'
                      }`}
                    >
                      <Send className="w-4 h-4 shrink-0" />
                      <span>Interac e-Transfer®</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('billpay')}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold transition-all text-left ${
                        activeTab === 'billpay'
                          ? 'bg-emerald-50 text-[#007a2c] border-l-4 border-[#007a2c]'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 border-l-4 border-transparent'
                      }`}
                    >
                      <FileText className="w-4 h-4 shrink-0" />
                      <span>Pay Bills</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('deposit')}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold transition-all text-left ${
                        activeTab === 'deposit'
                          ? 'bg-emerald-50 text-[#007a2c] border-l-4 border-[#007a2c]'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 border-l-4 border-transparent'
                      }`}
                    >
                      <Camera className="w-4 h-4 shrink-0" />
                      <span>Mobile Check Deposit</span>
                    </button>
                  </>
                )}

                {/* Secure Administration Tab (Only visible if isAdminRoute is true or user is Admin) */}
                {(isAdminRoute || username === 'System Administrator') && (
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`w-full flex items-center justify-between px-5 py-3 text-xs font-bold transition-all text-left border-l-4 ${
                      activeTab === 'admin'
                        ? 'bg-amber-50 text-amber-800 border-amber-600'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 shrink-0 text-amber-600" />
                      <span>Admin Control Board</span>
                    </div>
                  </button>
                )}
              </div>

              <div className="px-5 pt-4 border-t border-neutral-100">
                <button
                  onClick={onLogout}
                  className="w-full py-2 border border-neutral-200 hover:bg-red-50 hover:border-red-200 hover:text-red-700 rounded-lg text-xs font-semibold text-neutral-600 transition-all text-center"
                >
                  End Secure Session
                </button>
              </div>
            </div>

            {/* Console Main Workspace */}
            <div className="flex-grow p-6 overflow-y-auto max-h-[600px] w-full">
              {/* TAB 1: ACCOUNTS LIST */}
              {activeTab === 'accounts' && activeUser && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold text-neutral-800">Financial Summary</h2>
                      <p className="text-xs text-neutral-500">Live simulation overview for {activeUser.username}</p>
                    </div>
                  </div>

                  {/* Account Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-neutral-400 block tracking-wider uppercase">Checking</span>
                        <h4 className="font-bold text-neutral-800 text-sm mt-0.5">TD Every Day Checking</h4>
                      </div>
                      <div className="mt-4 flex justify-between items-end border-t border-neutral-50 pt-2">
                        <span className="text-xs text-neutral-500 font-medium">Available Balance</span>
                        <span className="text-2xl font-bold font-mono tracking-tight text-[#007a2c] tabular-nums">
                          ${balances.checking.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-neutral-400 block tracking-wider uppercase">Savings</span>
                        <h4 className="font-bold text-neutral-800 text-sm mt-0.5">TD High Interest Savings</h4>
                      </div>
                      <div className="mt-4 flex justify-between items-end border-t border-neutral-50 pt-2">
                        <span className="text-xs text-neutral-500 font-medium">Available Balance</span>
                        <span className="text-2xl font-bold font-mono tracking-tight text-[#007a2c] tabular-nums">
                          ${balances.savings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#b91c1c] block tracking-wider uppercase">Credit Card</span>
                        <h4 className="font-bold text-neutral-800 text-sm mt-0.5">TD Cash Back Visa*</h4>
                      </div>
                      <div className="mt-4 flex justify-between items-end border-t border-neutral-50 pt-2">
                        <span className="text-xs text-neutral-500 font-medium">Outstanding Balance</span>
                        <span className={`text-2xl font-bold font-mono tracking-tight tabular-nums ${balances.credit >= 0 ? 'text-[#007a2c]' : 'text-neutral-800'}`}>
                          ${balances.credit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#1d4ed8] block tracking-wider uppercase">Wealth / Mutual Funds</span>
                        <h4 className="font-bold text-neutral-800 text-sm mt-0.5">TD Direct Investing (RRSP)</h4>
                      </div>
                      <div className="mt-4 flex justify-between items-end border-t border-neutral-50 pt-2">
                        <span className="text-xs text-neutral-500 font-medium">Portfolio Value</span>
                        <span className="text-2xl font-bold font-mono tracking-tight text-[#1d4ed8] tabular-nums">
                          ${balances.investing.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Transaction History Section */}
                  <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
                    <div className="flex justify-between items-center mb-4 border-b border-neutral-100 pb-3">
                      <h3 className="font-bold text-neutral-800 text-sm flex items-center">
                        Recent Activity
                      </h3>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-neutral-100 text-[11px] uppercase text-neutral-400 font-bold">
                            <th className="py-2.5">Date</th>
                            <th className="py-2.5">Description</th>
                            <th className="py-2.5">Account</th>
                            <th className="py-2.5 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50 text-xs font-medium text-neutral-700">
                          {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-neutral-50/50 transition-colors">
                              <td className="py-2.5 text-neutral-400 font-mono whitespace-nowrap">{tx.date}</td>
                              <td className="py-2.5 font-semibold text-neutral-800">{tx.description}</td>
                              <td className="py-2.5 text-neutral-500 font-mono uppercase">{tx.account}</td>
                              <td className={`py-2.5 text-right font-bold font-mono tracking-tight tabular-nums ${
                                tx.type === 'credit' ? 'text-[#007a2c]' : 'text-red-500'
                              }`}>
                                {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                          {transactions.length === 0 && (
                            <tr>
                              <td colSpan={4} className="py-10 text-center text-neutral-400 font-semibold italic">
                                No recent transaction history.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TRANSFER FUNDS */}
              {activeTab === 'transfer' && activeUser && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-800">Transfer Funds</h2>
                    <p className="text-xs text-neutral-500">Instantly move funds between your simulated accounts.</p>
                  </div>

                  {transferSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-[#007a2c] text-xs p-3.5 rounded-lg flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{transferSuccess}</span>
                    </div>
                  )}

                  <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
                    <form onSubmit={handleTransfer} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">From Account</label>
                        <select
                          value={transferSource}
                          onChange={(e) => setTransferSource(e.target.value as any)}
                          className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-800 font-semibold bg-neutral-50"
                        >
                          <option value="checking">TD Every Day Checking - (${balances.checking.toFixed(2)})</option>
                          <option value="savings">TD High Interest Savings - (${balances.savings.toFixed(2)})</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">To Account</label>
                        <select
                          value={transferDest}
                          onChange={(e) => setTransferDest(e.target.value as any)}
                          className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-800 font-semibold bg-neutral-50"
                        >
                          <option value="savings">TD High Interest Savings - (${balances.savings.toFixed(2)})</option>
                          <option value="checking">TD Every Day Checking - (${balances.checking.toFixed(2)})</option>
                          <option value="credit">TD Cash Back Visa® - (Outstanding: ${balances.credit.toFixed(2)})</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">Amount ($ CAD)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={transferAmount}
                          onChange={(e) => setTransferAmount(e.target.value)}
                          className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-850 font-semibold focus:border-[#007a2c] outline-none"
                        />
                      </div>

                      <button type="submit" className="w-full bg-[#007a2c] text-white font-bold py-3 rounded-lg text-sm shadow">
                        Complete Transfer
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 3: INTERAC E-TRANSFER */}
              {activeTab === 'etransfer' && activeUser && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-800">Interac e-Transfer®</h2>
                    <p className="text-xs text-neutral-500">Send simulated funds securely via email.</p>
                  </div>

                  {etransferSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-[#007a2c] text-xs p-3.5 rounded-lg">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{etransferSuccess}</span>
                    </div>
                  )}

                  <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
                    <form onSubmit={handleEtransfer} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-1">Recipient Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Sarah"
                            value={etransferName}
                            onChange={(e) => setEtransferName(e.target.value)}
                            className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-1">Recipient Email</label>
                          <input
                            type="email"
                            required
                            placeholder="sarah@example.com"
                            value={etransferEmail}
                            onChange={(e) => setEtransferEmail(e.target.value)}
                            className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">Amount ($ CAD)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={etransferAmount}
                          onChange={(e) => setEtransferAmount(e.target.value)}
                          className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-850 font-semibold focus:border-[#007a2c]"
                        />
                      </div>

                      <button type="submit" className="w-full bg-[#007a2c] text-white font-bold py-3 rounded-lg text-sm shadow">
                        Send Interac e-Transfer
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 4: BILL PAYMENTS */}
              {activeTab === 'billpay' && activeUser && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-800">Pay Bills</h2>
                    <p className="text-xs text-neutral-500">Pay simulated utility services in Canada.</p>
                  </div>

                  {billSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-[#007a2c] text-xs p-3.5 rounded-lg flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{billSuccess}</span>
                    </div>
                  )}

                  <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
                    <form onSubmit={handleBillPayment} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">Select Payee</label>
                        <select
                          required
                          value={billPayee}
                          onChange={(e) => setBillPayee(e.target.value)}
                          className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm bg-neutral-50 font-semibold"
                        >
                          <option value="">-- Choose payee --</option>
                          <option value="Rogers Communications">Rogers Communications (Internet & Mobile)</option>
                          <option value="Bell Canada">Bell Canada (Cable & Phone)</option>
                          <option value="Toronto Hydro">Toronto Hydro (Electricity)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">From Account</label>
                        <select
                          value={billSource}
                          onChange={(e) => setBillSource(e.target.value as any)}
                          className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm font-semibold bg-neutral-50"
                        >
                          <option value="checking">TD Every Day Checking - (${balances.checking.toFixed(2)})</option>
                          <option value="savings">TD High Interest Savings - (${balances.savings.toFixed(2)})</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">Amount ($ CAD)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={billAmount}
                          onChange={(e) => setBillAmount(e.target.value)}
                          className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm font-semibold text-neutral-850"
                        />
                      </div>

                      <button type="submit" className="w-full bg-[#007a2c] text-white font-bold py-3 rounded-lg text-sm shadow animate-pop-in">
                        Submit Bill Payment
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 5: MOBILE CHECK DEPOSIT */}
              {activeTab === 'deposit' && activeUser && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-800">Mobile Check Deposit</h2>
                    <p className="text-xs text-neutral-500">Deposit a check by snapping mock front & back pictures.</p>
                  </div>

                  {depositSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-[#007a2c] text-xs p-3.5 rounded-lg flex items-start gap-2.5 font-medium">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{depositSuccess}</span>
                    </div>
                  )}

                  <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
                    <form onSubmit={handleCheckDeposit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">Check Value ($ CAD)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          placeholder="e.g. 250.00"
                          value={checkValue}
                          onChange={(e) => setCheckValue(e.target.value)}
                          className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-800 font-semibold focus:border-[#007a2c] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">Capture Check Images</label>
                        
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          {/* Front of Check */}
                          <div className="aspect-[1.6] border-2 border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center relative overflow-hidden bg-neutral-50">
                            {checkImageState === 'empty' && (
                              <button 
                                type="button" 
                                onClick={triggerCameraFlash}
                                className="flex flex-col items-center text-neutral-400 hover:text-[#007a2c] transition-colors"
                              >
                                <Camera className="w-6 h-6 mb-1" />
                                <span className="text-[10px] font-bold">Snap Front Photo</span>
                              </button>
                            )}

                            {checkImageState === 'capturing' && (
                              <div className="absolute inset-0 bg-white animate-flash flex items-center justify-center">
                                <span className="text-[11px] text-neutral-500 font-semibold animate-pulse">Capturing...</span>
                              </div>
                            )}

                            {checkImageState === 'captured' && (
                              <div className="absolute inset-0 p-3 bg-emerald-50/50 flex flex-col justify-between border border-emerald-200 rounded-lg text-neutral-800 text-left">
                                <div className="flex justify-between items-start">
                                  <span className="text-[10px] font-bold text-neutral-400">FRONT</span>
                                  <Check className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="text-[11px] font-mono border-t border-dashed border-neutral-200 pt-1">
                                  <p className="font-semibold">Pay to: {activeUser.username}</p>
                                  <p className="text-[9px] text-neutral-400">⑆ 02410 ⑈ 4890 ⑉ 321</p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Back of Check */}
                          <div className="aspect-[1.6] border-2 border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center relative overflow-hidden bg-neutral-50">
                            {checkImageState === 'empty' && (
                              <button 
                                type="button" 
                                onClick={triggerCameraFlash}
                                className="flex flex-col items-center text-neutral-400 hover:text-[#007a2c] transition-colors"
                              >
                                <Camera className="w-6 h-6 mb-1" />
                                <span className="text-[10px] font-bold">Snap Back Photo</span>
                              </button>
                            )}

                            {checkImageState === 'capturing' && (
                              <div className="absolute inset-0 bg-white animate-flash flex items-center justify-center">
                                <span className="text-[11px] text-neutral-500 font-semibold animate-pulse">Capturing...</span>
                              </div>
                            )}

                            {checkImageState === 'captured' && (
                              <div className="absolute inset-0 p-3 bg-emerald-50/50 flex flex-col justify-between border border-emerald-200 rounded-lg text-neutral-800 text-left">
                                <div className="flex justify-between items-start">
                                  <span className="text-[10px] font-bold text-neutral-400">BACK</span>
                                  <Check className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="text-[10px] font-mono italic text-center text-neutral-400 border-2 border-dotted border-neutral-200 py-1 rounded">
                                  Endorsed for Mobile Deposit
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={checkImageState !== 'captured'}
                        className={`w-full font-bold py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2 ${
                          checkImageState === 'captured'
                            ? 'bg-[#007a2c] hover:bg-[#006022] text-white shadow-sm'
                            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                        }`}
                      >
                        <span>Deposit Check Now</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 6: ADMINISTRATIVE CONTROL BOARD PANEL (For direct login as Admin inside EasyWeb) */}
              {activeTab === 'admin' && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900">Admin Control Board</h2>
                    <p className="text-xs text-neutral-500">Perform direct overrides on any client profile balance.</p>
                  </div>

                  {adminSuccessMsg && (
                    <div className="bg-emerald-50 border border-emerald-200 text-[#007a2c] text-xs p-3.5 rounded-lg flex items-start gap-2.5 font-medium">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{adminSuccessMsg}</span>
                    </div>
                  )}

                  <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm space-y-4">
                    {/* User Profile Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1">Select Simulated Account Profile</label>
                      <select
                        value={adminSelectedUserId}
                        onChange={(e) => setAdminSelectedUserId(e.target.value)}
                        className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-800 bg-neutral-50"
                      >
                        {users.map(u => (
                          <option key={u.id} value={u.id}>{u.username} (Card ID: ...{u.card.slice(-4)})</option>
                        ))}
                      </select>
                    </div>

                    {/* Action Operation Selector */}
                    <div className="space-y-1.5">
                      <span className="block text-xs font-semibold text-neutral-600">Select Operation</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setAdminActionType('deposit');
                            setAdminMemo('Admin Balance Funding Override');
                          }}
                          className={`py-2 px-4 rounded-lg text-xs font-bold transition-all border ${
                            adminActionType === 'deposit'
                              ? 'bg-emerald-50 border-[#007a2c] text-[#007a2c]'
                              : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          📥 Deposit (Fund)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setAdminActionType('withdraw');
                            setAdminMemo('Admin Balance Debit Override');
                          }}
                          className={`py-2 px-4 rounded-lg text-xs font-bold transition-all border ${
                            adminActionType === 'withdraw'
                              ? 'bg-red-50 border-red-500 text-red-700'
                              : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          📤 Withdraw (Deduct)
                        </button>
                      </div>
                    </div>

                    {/* Target Sub-Account */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1">Target Sub-Account</label>
                      <select
                        value={adminTargetAcct}
                        onChange={(e) => setAdminTargetAcct(e.target.value as any)}
                        className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs bg-neutral-50 text-neutral-800 font-semibold"
                      >
                        <option value="checking">Checking Account</option>
                        <option value="savings">Savings Account</option>
                        <option value="credit">Credit Card Account</option>
                        <option value="investing">Direct Investing Account</option>
                      </select>
                    </div>

                    {/* Override Value */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1">Amount ($ CAD)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        placeholder="0.00"
                        value={adminAmount}
                        onChange={(e) => setAdminAmount(e.target.value)}
                        className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-800 font-bold"
                      />
                    </div>

                    {/* Audit Journal Memo */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1">Audit Journal Ledger Memo</label>
                      <input
                        type="text"
                        required
                        value={adminMemo}
                        onChange={(e) => setAdminMemo(e.target.value)}
                        className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs"
                      />
                    </div>

                    {/* Submit Overrides */}
                    <button
                      type="button"
                      onClick={handleAdminAction}
                      className={`w-full font-bold py-3 rounded-lg text-xs text-white transition-colors shadow flex items-center justify-center gap-1.5 ${
                        adminActionType === 'deposit' ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-red-700 hover:bg-red-800'
                      }`}
                    >
                      <span>Commit Balance Adjustment Override</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
