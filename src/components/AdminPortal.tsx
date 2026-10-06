import React, { useState, useRef } from 'react';
import { 
  Lock, Landmark, CheckCircle, RefreshCw, AlertCircle, LayoutDashboard, 
  User, ShieldAlert, ArrowRight, Upload, Image as ImageIcon, Check, 
  CreditCard, PiggyBank, Briefcase, FileText, X
} from 'lucide-react';

export interface UserAccount {
  id: string;
  username: string;
  card: string;
  pass: string;
  profileImage?: string; // Base64 data URL or SVG identification
  balances: {
    checking: number;
    savings: number;
    credit: number;
    investing: number;
  };
  transactions: {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
    account: string;
  }[];
}

interface AdminPortalProps {
  onClose: () => void;
  users: UserAccount[];
  onUpdateUsers: (updatedUsers: UserAccount[]) => void;
}

// Resilient inline SVG avatars so we have beautiful preloaded choices with no external URL requests
const AVATAR_TEMPLATES = [
  { id: 'avatar-green', name: 'Premium Client (Green)', color: '#13b143', gradient: 'from-[#13b143] to-[#113b24]' },
  { id: 'avatar-blue', name: 'Private Investor (Blue)', color: '#2563eb', gradient: 'from-[#2563eb] to-[#1d4ed8]' },
  { id: 'avatar-gold', name: 'Wealth Account (Gold)', color: '#d97706', gradient: 'from-[#d97706] to-[#b45309]' },
  { id: 'avatar-purple', name: 'VIP Privilege (Purple)', color: '#7c3aed', gradient: 'from-[#7c3aed] to-[#6d28d9]' },
];

export default function AdminPortal({ onClose, users, onUpdateUsers }: AdminPortalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessCard, setAccessCard] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Selected User Profile to Manage
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id || '');

  // Overrides Parameters
  const [adminActionType, setAdminActionType] = useState<'deposit' | 'withdraw'>('deposit');
  const [adminTargetAcct, setAdminTargetAcct] = useState<'checking' | 'savings' | 'credit' | 'investing'>('checking');
  const [adminAmount, setAdminAmount] = useState('');
  const [adminMemo, setAdminMemo] = useState('Admin Balance Adjustment');
  const [adminSuccessMsg, setAdminSuccessMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Find currently selected user object
  const activeUser = users.find(u => u.id === selectedUserId) || users[0];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCard === 'admin' && password === 'AdminSecureOverride!99') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Administrator Credentials.');
    }
  };

  const autofillAdmin = () => {
    setAccessCard('admin');
    setPassword('AdminSecureOverride!99');
    setLoginError('');
  };

  const handleAdminAction = (e: React.FormEvent) => {
    e.preventDefault();
    const amtVal = parseFloat(adminAmount);
    if (isNaN(amtVal) || amtVal <= 0) {
      alert('Please enter a valid currency override value.');
      return;
    }

    if (!activeUser) {
      alert('No simulated client profile selected.');
      return;
    }

    // Map updated users array
    const updatedUsers = users.map(user => {
      if (user.id === activeUser.id) {
        const nextBalances = { ...user.balances };
        
        if (adminActionType === 'deposit') {
          if (adminTargetAcct === 'credit') {
            nextBalances.credit += amtVal; // paying credit balance reduces overall debt/adds credit
          } else {
            nextBalances[adminTargetAcct] += amtVal;
          }
        } else {
          if (adminTargetAcct === 'credit') {
            nextBalances.credit -= amtVal; // charging credit card increases overall debt
          } else {
            nextBalances[adminTargetAcct] -= amtVal;
          }
        }

        const newTx = {
          id: `tx-adm-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          description: adminMemo,
          amount: amtVal,
          type: adminActionType === 'deposit' ? ('credit' as const) : ('debit' as const),
          account: adminTargetAcct
        };

        return {
          ...user,
          balances: nextBalances,
          transactions: [newTx, ...user.transactions]
        };
      }
      return user;
    });

    onUpdateUsers(updatedUsers);
    setAdminSuccessMsg(`Successfully executed ${adminActionType.toUpperCase()} of $${amtVal.toLocaleString('en-US', { minimumFractionDigits: 2 })} CAD on ${activeUser.username}'s ${adminTargetAcct.toUpperCase()} account.`);
    setAdminAmount('');
    setTimeout(() => setAdminSuccessMsg(''), 5000);
  };

  // Custom Local File Upload (Transforms image file into persistent client-side Base64 string)
  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image is too large. Please select an image under 2MB for in-memory persistence.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        updateUserProfileImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateUserProfileImage = (imageUrl: string) => {
    if (!activeUser) return;
    const updated = users.map(u => {
      if (u.id === activeUser.id) {
        return {
          ...u,
          profileImage: imageUrl
        };
      }
      return u;
    });
    onUpdateUsers(updated);
    setAdminSuccessMsg(`Successfully updated profile image for ${activeUser.username}.`);
    setTimeout(() => setAdminSuccessMsg(''), 4000);
  };

  // Renders beautiful initials inside colored circles or base64 photo
  const renderAvatar = (user: UserAccount, sizeClass = 'w-10 h-10') => {
    if (user.profileImage) {
      if (user.profileImage.startsWith('avatar-')) {
        const template = AVATAR_TEMPLATES.find(t => t.id === user.profileImage) || AVATAR_TEMPLATES[0];
        return (
          <div className={`${sizeClass} rounded-full bg-gradient-to-tr ${template.gradient} flex items-center justify-center text-white font-extrabold text-xs tracking-wider uppercase border border-white/20 shadow-md`}>
            {user.username.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
        );
      }
      return (
        <img 
          src={user.profileImage} 
          alt={user.username} 
          className={`${sizeClass} rounded-full object-cover border border-[#13b143]/40 shadow-md`}
          referrerPolicy="no-referrer"
        />
      );
    }
    // Default fallback initials circle
    return (
      <div className={`${sizeClass} rounded-full bg-neutral-850 border border-neutral-700 text-neutral-300 flex items-center justify-center font-extrabold text-xs tracking-wider uppercase shadow-inner`}>
        {user.username.split(' ').map(n => n[0]).join('').slice(0, 2)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-white font-sans flex flex-col justify-between selection:bg-[#13b143] selection:text-white">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-[#111c14] border-b-4 border-[#13b143] px-6 py-4 flex justify-between items-center shadow-lg relative z-50">
        <div className="flex items-center gap-3">
          <div className="bg-[#13b143] p-1.5 rounded-lg shadow-inner">
            <Landmark className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
              <span>TD</span>
              <span className="text-[#13b143]">Bank</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 font-extrabold px-2.5 py-1 rounded tracking-widest uppercase border border-amber-500/20">
                OVERRIDE SYSTEM
              </span>
            </h1>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="text-xs font-bold text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-500 px-4 py-2 rounded-lg transition-all hover:bg-neutral-900 flex items-center gap-1.5"
        >
          <X className="w-4 h-4" />
          <span>Exit Admin Portal</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-center items-center">
        {!isLoggedIn ? (
          /* FORM A: SECURE LOGIN GATEWAY */
          <div className="w-full max-w-md bg-[#111c14] rounded-2xl border border-[#cbe3d2]/10 p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-white text-lg tracking-tight">Administrator Secure Desk</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Enter simulated credential override values below. This environment operates completely client-side in safety-controlled sandbox mode.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="text-xs text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-lg font-bold text-center">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1.5 tracking-wider">Access Card / User ID</label>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={accessCard}
                  onChange={(e) => setAccessCard(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-white font-mono placeholder-neutral-600 outline-none focus:border-[#13b143] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1.5 tracking-wider">Security Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-white font-mono placeholder-neutral-600 outline-none focus:border-[#13b143] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#13b143] hover:bg-[#109c38] text-white font-bold py-3 rounded-lg text-xs transition-colors shadow-lg active:scale-98"
              >
                Unlock Administrative Overrides
              </button>
            </form>

            <div className="border-t border-neutral-800/40 pt-4 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={autofillAdmin}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 font-bold text-[10px] tracking-wider rounded-lg transition-colors border border-neutral-800 uppercase"
              >
                Autofill Secure Credentials
              </button>
              <div className="text-[10px] text-neutral-500 leading-normal text-center bg-[#0d1410] border border-[#13b143]/10 p-2.5 rounded-lg">
                🗝️ <strong>Secure Sandbox Credentials:</strong><br />
                ID: <span className="font-mono text-neutral-300 select-all">admin</span> · Password: <span className="font-mono text-neutral-300 select-all">AdminSecureOverride!99</span>
              </div>
            </div>
          </div>
        ) : (
          /* FORM B: ADMIN OVERRIDES CONSOLE */
          <div className="w-full space-y-8 animate-in fade-in duration-200">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-[#13b143]" />
                  <span>Platform Control & Override Center</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">List and override all simulated user checking, savings, card balances, and profile photos.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/15 text-[#13b143] border border-[#13b143]/20 text-[10px] font-bold py-1 px-3 rounded-lg select-none">
                  ADMIN ROUTE: /admin (Active)
                </span>
              </div>
            </div>

            {/* DIRECTORY SECTION: REGISTERED USER DIRECTORY */}
            <div className="bg-[#111c14] border border-[#cbe3d2]/10 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-[#13b143]" />
                    <span>Registered User Database Directory</span>
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Listing of all registered active users on this simulator. Click on any row to select and manage.</p>
                </div>
                <span className="bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 px-3 py-1 rounded font-mono font-bold">
                  TOTAL CLIENTS: {users.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-850 text-[10px] uppercase font-black text-neutral-400 tracking-wider">
                      <th className="py-3 px-2">Profile</th>
                      <th className="py-3 px-2">Access Card ID</th>
                      <th className="py-3 px-2">Passcode</th>
                      <th className="py-3 px-2 text-right">Checking Balance</th>
                      <th className="py-3 px-2 text-right">Savings Balance</th>
                      <th className="py-3 px-2 text-right">Credit Card Debt</th>
                      <th className="py-3 px-2 text-right">Investing Port.</th>
                      <th className="py-3 px-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-xs font-semibold text-neutral-300">
                    {users.map((u) => {
                      const isSelected = u.id === selectedUserId;
                      return (
                        <tr 
                          key={u.id}
                          onClick={() => setSelectedUserId(u.id)}
                          className={`hover:bg-neutral-900/60 cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-[#13b143]/10 border-l-4 border-l-[#13b143] text-white' 
                              : 'border-l-4 border-l-transparent'
                          }`}
                        >
                          <td className="py-3.5 px-2 flex items-center gap-3">
                            {renderAvatar(u, 'w-8 h-8')}
                            <span className="font-black text-white hover:text-[#13b143] transition-colors">{u.username}</span>
                          </td>
                          <td className="py-3.5 px-2 font-mono text-neutral-400">{u.card.replace(/(\d{4})/g, '$1 ')}</td>
                          <td className="py-3.5 px-2 font-mono text-neutral-500">{u.pass}</td>
                          <td className="py-3.5 px-2 text-right font-mono text-emerald-400">${u.balances.checking.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                          <td className="py-3.5 px-2 text-right font-mono text-emerald-400">${u.balances.savings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                          <td className="py-3.5 px-2 text-right font-mono text-red-400">${u.balances.credit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                          <td className="py-3.5 px-2 text-right font-mono text-blue-400">${u.balances.investing.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                          <td className="py-3.5 px-2 text-center">
                            {isSelected ? (
                              <span className="bg-[#13b143]/20 text-[#13b143] border border-[#13b143]/30 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">
                                Active Select
                              </span>
                            ) : (
                              <span className="text-neutral-600 text-[10px] font-medium">Inactive</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {adminSuccessMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-[#13b143] text-xs p-4 rounded-xl flex items-start gap-2.5 font-bold animate-bounce">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>{adminSuccessMsg}</span>
              </div>
            )}

            {/* LOWER PORTION: PROFILE IMAGE & FUNDING OVERRIDES */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left column - Selected user profile and picture uploading (5 Columns) */}
              <div className="lg:col-span-5 bg-[#111c14] border border-[#cbe3d2]/10 rounded-2xl p-6 shadow-xl space-y-6">
                <div>
                  <span className="text-[10px] font-black text-[#13b143] uppercase tracking-wider block border-b border-neutral-800 pb-2 mb-2">
                    Profile Image Customization
                  </span>
                  <p className="text-[11px] text-neutral-400 leading-normal">
                    Upload a custom profile image or choose from preset VIP client badges for the simulated account.
                  </p>
                </div>

                {activeUser && (
                  <div className="flex flex-col items-center justify-center p-6 bg-neutral-900/40 rounded-xl border border-neutral-850 text-center space-y-4">
                    <div className="relative group">
                      {renderAvatar(activeUser, 'w-24 h-24')}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 bg-[#13b143] hover:bg-[#109c38] p-2 rounded-full text-white shadow-lg transition-transform hover:scale-115 active:scale-95"
                        title="Upload profile picture"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-white">{activeUser.username}</h4>
                      <p className="text-[11px] text-neutral-500 font-mono mt-0.5">Card ID: ...{activeUser.card.slice(-4)}</p>
                    </div>

                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUploadChange} 
                      accept="image/*" 
                      className="hidden" 
                    />

                    {/* Quick presets list */}
                    <div className="w-full space-y-2 pt-3 border-t border-neutral-800">
                      <span className="text-[9px] font-black text-neutral-400 block uppercase tracking-widest">Select Resilient Preset Badges:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {AVATAR_TEMPLATES.map(temp => (
                          <button
                            key={temp.id}
                            type="button"
                            onClick={() => updateUserProfileImage(temp.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[10px] font-bold text-left transition-all border ${
                              activeUser.profileImage === temp.id 
                                ? 'bg-[#13b143]/10 border-[#13b143] text-white' 
                                : 'bg-neutral-950 border-neutral-850 text-neutral-400 hover:text-white hover:bg-neutral-900'
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: temp.color }} />
                            <span className="truncate">{temp.name.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 border border-neutral-800 hover:border-neutral-700 py-2.5 rounded-lg text-xs font-bold transition-all"
                    >
                      <ImageIcon className="w-4 h-4 text-[#13b143]" />
                      <span>Upload Custom File...</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Middle/Right column - Form Actions & Overrides (7 Columns) */}
              <div className="lg:col-span-7 bg-[#111c14] border border-[#cbe3d2]/10 rounded-2xl p-6 shadow-xl space-y-6">
                <form onSubmit={handleAdminAction} className="space-y-4">
                  <span className="text-[10px] font-black text-[#13b143] uppercase tracking-wider block border-b border-neutral-800 pb-2 mb-2">
                    Balance Adjustment Override desk
                  </span>

                  {/* Transaction Action */}
                  <div className="space-y-2">
                    <span className="block text-xs font-bold text-neutral-300">Operation Type</span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setAdminActionType('deposit');
                          setAdminMemo('Admin Balance Funding Override');
                        }}
                        className={`py-3 px-4 rounded-xl text-xs font-black transition-all border flex items-center justify-center gap-1.5 ${
                          adminActionType === 'deposit'
                            ? 'bg-emerald-500/10 border-[#13b143] text-[#13b143]'
                            : 'border-neutral-800 text-neutral-400 hover:bg-neutral-850'
                        }`}
                      >
                        📥 Direct Funding (Deposit)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAdminActionType('withdraw');
                          setAdminMemo('Admin Balance Withdrawal Override');
                        }}
                        className={`py-3 px-4 rounded-xl text-xs font-black transition-all border flex items-center justify-center gap-1.5 ${
                          adminActionType === 'withdraw'
                            ? 'bg-red-500/10 border-red-500 text-red-400'
                            : 'border-neutral-800 text-neutral-400 hover:bg-neutral-850'
                        }`}
                      >
                        📤 Debit Override (Withdrawal)
                      </button>
                    </div>
                  </div>

                  {/* Target Account */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Target Account</label>
                    <select
                      value={adminTargetAcct}
                      onChange={(e) => setAdminTargetAcct(e.target.value as any)}
                      className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-200 font-bold focus:border-[#13b143] outline-none"
                    >
                      <option value="checking">Checking Account (Every Day Checking)</option>
                      <option value="savings">Savings Account (High Interest Savings)</option>
                      <option value="credit">Credit Card Account (Cash Back Visa)</option>
                      <option value="investing">Direct Wealth Investment (TFSA / RRSP)</option>
                    </select>
                  </div>

                  {/* Override Value */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Override Amount ($ CAD)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500 font-mono">$</span>
                      <input
                        type="number"
                        step="0.01"
                        required
                        placeholder="e.g., 2500.00"
                        value={adminAmount}
                        onChange={(e) => setAdminAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono font-bold text-white outline-none focus:border-[#13b143] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Audit Entry Memo */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Audit Journal Ledger Memo</label>
                    <input
                      type="text"
                      required
                      value={adminMemo}
                      onChange={(e) => setAdminMemo(e.target.value)}
                      className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-200 outline-none focus:border-[#13b143]"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full font-bold py-3.5 rounded-lg text-xs text-white transition-all shadow-lg active:scale-99 ${
                      adminActionType === 'deposit'
                        ? 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-950/20'
                        : 'bg-red-700 hover:bg-red-800 shadow-red-950/20'
                    }`}
                  >
                    Confirm & Execute Override adjustment
                  </button>
                </form>

                {/* Audit Trail list */}
                <div className="border-t border-neutral-800/40 pt-4 space-y-3">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider block">Selected User's Balance Override Logs</span>
                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {activeUser?.transactions.length === 0 ? (
                      <p className="text-[11px] text-neutral-500 italic py-4 text-center">No transaction adjustments on file for this user.</p>
                    ) : (
                      activeUser?.transactions.map(tx => (
                        <div key={tx.id} className="p-3 bg-neutral-900 border border-neutral-850 rounded-lg text-[11px] space-y-1">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-neutral-500 font-mono">{tx.date}</span>
                            <span className={`font-mono font-black ${tx.type === 'credit' ? 'text-emerald-500' : 'text-red-500'}`}>
                              {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                            </span>
                          </div>
                          <p className="font-bold text-neutral-200">{tx.description}</p>
                          <span className="text-[9px] text-[#13b143] uppercase font-bold tracking-wider font-mono">TARGET: {tx.account}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="bg-[#0e1611]/50 border border-[#13b143]/10 p-3 rounded-lg text-[10px] text-neutral-400 leading-normal flex gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Administrative overrides reflect immediately across simulation modules. Double-check override values before confirming.</span>
                </div>

              </div>

            </div>
          </div>
        )}
      </main>

      {/* Corporate Admin Footer */}
      <footer className="bg-[#080d08] border-t border-neutral-900 py-5 px-6 text-center text-[10px] text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© 2026 TD Canada Trust. Standalone Platform Overrides Sandbox. Isolated Administrative routing module.</span>
        <span className="font-bold text-neutral-400 font-mono">ACCESS DESK: /admin or #admin-portal</span>
      </footer>

    </div>
  );
}
