import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, GraduationCap, Scale, X, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    switchUserRole,
    navigateTo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'client' | 'student' | 'chamber'>(authModalTab);

  // Form states
  const [clientMatterRef, setClientMatterRef] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [chamberUser, setChamberUser] = useState('');
  const [chamberPin, setChamberPin] = useState('');

  useEffect(() => {
    setActiveTab(authModalTab);
  }, [authModalTab]);

  if (!isAuthModalOpen) return null;

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchUserRole('client');
    closeAuthModal();
    navigateTo('client-portal');
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchUserRole('student');
    closeAuthModal();
    navigateTo('learn');
  };

  const handleChamberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchUserRole('admin');
    closeAuthModal();
    navigateTo('admin-dashboard');
  };

  const quickFillClient = () => {
    setClientMatterRef('CS (COMM) 184/2025');
    setClientEmail('aarav.sharma@example.com');
  };

  const quickFillStudent = () => {
    setStudentEmail('pooja.iyer@lawschool.ac.in');
  };

  const quickFillChamber = () => {
    setChamberUser('Adv. Vikramaditya Kashyap');
    setChamberPin('••••••••');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans animate-in fade-in duration-200">
      <div className="bg-[#101C2C] border border-[#B99A5B]/40 max-w-md w-full rounded-lg shadow-2xl text-[#F7F4ED] overflow-hidden relative">
        {/* Header */}
        <div className="p-5 border-b border-[#1A2C42] flex items-center justify-between bg-[#0A121D]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded border border-[#B99A5B] flex items-center justify-center text-[#B99A5B]">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-base font-semibold block leading-tight">
                Lex Global Advocacy
              </span>
              <span className="text-[10px] text-[#B99A5B] tracking-wider uppercase font-mono">
                Privileged Portal Access
              </span>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-neutral-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Access Category Tabs */}
        <div className="grid grid-cols-3 bg-[#0A121D] border-b border-[#1A2C42] text-xs">
          <button
            onClick={() => setActiveTab('client')}
            className={`py-3 px-2 text-center border-b-2 font-medium transition flex flex-col items-center space-y-1 ${
              activeTab === 'client'
                ? 'border-[#B99A5B] text-[#B99A5B] bg-[#101C2C]'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Client Matter</span>
          </button>

          <button
            onClick={() => setActiveTab('student')}
            className={`py-3 px-2 text-center border-b-2 font-medium transition flex flex-col items-center space-y-1 ${
              activeTab === 'student'
                ? 'border-[#B99A5B] text-[#B99A5B] bg-[#101C2C]'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student CLE</span>
          </button>

          <button
            onClick={() => setActiveTab('chamber')}
            className={`py-3 px-2 text-center border-b-2 font-medium transition flex flex-col items-center space-y-1 ${
              activeTab === 'chamber'
                ? 'border-[#B99A5B] text-[#B99A5B] bg-[#101C2C]'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Chamber Login</span>
          </button>
        </div>

        {/* Tab Forms */}
        <div className="p-6">
          {/* CLIENT FORM */}
          {activeTab === 'client' && (
            <form onSubmit={handleClientSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 block mb-1">
                  Court Matter / Case Reference Number *
                </label>
                <input
                  type="text"
                  value={clientMatterRef}
                  onChange={(e) => setClientMatterRef(e.target.value)}
                  placeholder="e.g. CS (COMM) 184/2025"
                  className="w-full p-2.5 rounded bg-[#0A121D] border border-[#1A2C42] focus:outline-none focus:border-[#B99A5B] text-[#F7F4ED]"
                  required
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">
                  Verified Client Email Address *
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="e.g. aarav.sharma@example.com"
                  className="w-full p-2.5 rounded bg-[#0A121D] border border-[#1A2C42] focus:outline-none focus:border-[#B99A5B] text-[#F7F4ED]"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <button
                  type="button"
                  onClick={quickFillClient}
                  className="text-[#B99A5B] hover:underline"
                >
                  ⚡ Quick Fill Verified Client (Aarav Sharma)
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold uppercase tracking-wider rounded transition flex items-center justify-center space-x-1.5"
              >
                <span>Authenticate & View Matter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-[11px] text-neutral-400 text-center flex items-center justify-center space-x-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B99A5B]" />
                <span>Protected under Sec 126 of Indian Evidence Act</span>
              </div>
            </form>
          )}

          {/* STUDENT FORM */}
          {activeTab === 'student' && (
            <form onSubmit={handleStudentSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 block mb-1">
                  Enrolled Student Email *
                </label>
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="e.g. pooja.iyer@lawschool.ac.in"
                  className="w-full p-2.5 rounded bg-[#0A121D] border border-[#1A2C42] focus:outline-none focus:border-[#B99A5B] text-[#F7F4ED]"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <button
                  type="button"
                  onClick={quickFillStudent}
                  className="text-[#B99A5B] hover:underline"
                >
                  ⚡ Quick Fill Enrolled Student (Pooja Iyer)
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold uppercase tracking-wider rounded transition flex items-center justify-center space-x-1.5"
              >
                <span>Open Student Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* CHAMBER ADMIN FORM */}
          {activeTab === 'chamber' && (
            <form onSubmit={handleChamberSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 block mb-1">
                  Designated Advocate / Staff ID *
                </label>
                <input
                  type="text"
                  value={chamberUser}
                  onChange={(e) => setChamberUser(e.target.value)}
                  placeholder="e.g. Adv. Vikramaditya Kashyap"
                  className="w-full p-2.5 rounded bg-[#0A121D] border border-[#1A2C42] focus:outline-none focus:border-[#B99A5B] text-[#F7F4ED]"
                  required
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">
                  Chamber Security Passcode *
                </label>
                <input
                  type="password"
                  value={chamberPin}
                  onChange={(e) => setChamberPin(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-2.5 rounded bg-[#0A121D] border border-[#1A2C42] focus:outline-none focus:border-[#B99A5B] text-[#F7F4ED]"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <button
                  type="button"
                  onClick={quickFillChamber}
                  className="text-[#B99A5B] hover:underline"
                >
                  ⚡ Quick Fill Senior Advocate Chambers
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold uppercase tracking-wider rounded transition flex items-center justify-center space-x-1.5"
              >
                <span>Access Master Chamber Control</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
