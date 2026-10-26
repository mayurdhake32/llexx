import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Scale,
  Menu,
  X,
  Search,
  Lock,
  GraduationCap,
  LayoutDashboard,
  ShieldAlert,
  Phone,
  Mail,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    navigateTo,
    currentUser,
    openAuthModal,
    signOut,
    setIsSearchOpen,
    firmDetails,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'About the Firm', view: 'about' },
    { label: 'Practice Areas', view: 'practice-areas' },
    { label: 'Our Team', view: 'team' },
    { label: 'Courses', view: 'courses' },
    { label: 'Legal Hub', view: 'blogs' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: string) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  const isClient = currentUser.role === 'client';
  const isStudent = currentUser.role === 'student';
  const isAdmin = currentUser.role === 'admin';
  const isLoggedIn = isClient || isStudent || isAdmin;

  return (
    <>
      {/* Top Authentic Law Firm Communications & Registry Strip */}
      <div className="bg-[#0A121D] text-[#D5D0C5] text-xs py-2 px-4 sm:px-8 border-b border-[#1A2C42] flex flex-wrap justify-between items-center font-sans">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-[#B99A5B] font-medium">
            <Scale className="w-3.5 h-3.5 mr-1.5" />
            <span>Supreme Court of India & High Courts Practice</span>
          </div>
          <span className="hidden md:inline text-neutral-600">•</span>
          <a
            href={`tel:${firmDetails.headOffice.phone}`}
            className="hidden md:flex items-center text-neutral-300 hover:text-[#B99A5B] transition"
          >
            <Phone className="w-3 h-3 mr-1 text-[#B99A5B]" />
            <span className="font-mono">{firmDetails.headOffice.phone}</span>
          </a>
          <span className="hidden lg:inline text-neutral-600">•</span>
          <span className="hidden lg:inline text-neutral-400">
            Delhi & Mumbai Chambers • Est. 1998
          </span>
        </div>

        {/* Right: Authenticated User Status OR Clean Client/Student/Chamber Login Links */}
        <div className="flex items-center space-x-4 text-[11px]">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <span className="text-neutral-400">
                Welcome, <strong className="text-[#F7F4ED]">{currentUser.name}</strong>
              </span>

              {isClient && (
                <button
                  onClick={() => navigateTo('client-portal')}
                  className="px-2 py-0.5 bg-[#101C2C] text-[#B99A5B] border border-[#B99A5B]/40 rounded hover:bg-[#1A2C42] transition"
                >
                  My Matter
                </button>
              )}

              {isStudent && (
                <button
                  onClick={() => navigateTo('learn')}
                  className="px-2 py-0.5 bg-[#101C2C] text-[#B99A5B] border border-[#B99A5B]/40 rounded hover:bg-[#1A2C42] transition"
                >
                  My Learning
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => navigateTo('admin-dashboard')}
                  className="px-2 py-0.5 bg-[#101C2C] text-[#B99A5B] border border-[#B99A5B]/40 rounded hover:bg-[#1A2C42] transition"
                >
                  Admin Chamber
                </button>
              )}

              <button
                onClick={signOut}
                className="flex items-center space-x-1 text-neutral-400 hover:text-red-400 transition ml-2"
                title="Sign out to public website"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3 text-neutral-300">
              <button
                onClick={() => openAuthModal('client')}
                className="flex items-center space-x-1 hover:text-[#B99A5B] transition"
              >
                <Lock className="w-3 h-3 text-[#B99A5B]" />
                <span>Client Portal</span>
              </button>
              <span className="text-neutral-600">|</span>
              <button
                onClick={() => openAuthModal('student')}
                className="flex items-center space-x-1 hover:text-[#B99A5B] transition"
              >
                <GraduationCap className="w-3 h-3 text-[#B99A5B]" />
                <span>Student Login</span>
              </button>
              <span className="text-neutral-600">|</span>
              <button
                onClick={() => openAuthModal('chamber')}
                className="hover:text-[#B99A5B] transition text-neutral-400"
              >
                Chambers Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#101C2C]/95 backdrop-blur-md border-b border-[#1A2C42] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Seal */}
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-10 h-10 border border-[#B99A5B] rounded flex items-center justify-center bg-[#1A2C42]/50 group-hover:border-[#D4BA7E] transition">
                <Scale className="w-5 h-5 text-[#B99A5B]" />
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl text-[#F7F4ED] tracking-wide block leading-tight font-medium">
                  LEX GLOBAL ADVOCACY
                </span>
                <span className="text-[10px] sm:text-xs text-[#B99A5B] tracking-widest uppercase block font-sans">
                  Advocates & International Legal Consultants
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-sans">
              {navLinks.map((link) => {
                const isActive =
                  currentView === link.view ||
                  (link.view === 'practice-areas' && currentView === 'practice-detail') ||
                  (link.view === 'team' && currentView === 'team-detail') ||
                  (link.view === 'courses' && currentView === 'course-detail') ||
                  (link.view === 'blogs' && currentView === 'blog-detail');

                return (
                  <button
                    key={link.view}
                    onClick={() => handleNavClick(link.view)}
                    className={`transition-colors py-1 relative ${
                      isActive
                        ? 'text-[#B99A5B] font-medium'
                        : 'text-[#EFECE3]/80 hover:text-[#F7F4ED]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B99A5B] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Actions: Search, Portal, Consultation */}
            <div className="hidden sm:flex items-center space-x-3 font-sans">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#D5D0C5] hover:text-[#B99A5B] hover:bg-[#1A2C42] rounded transition"
                title="Search practices, team, courses, articles"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Portal Access Button */}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    if (isClient) navigateTo('client-portal');
                    else if (isStudent) navigateTo('learn');
                    else if (isAdmin) navigateTo('admin-dashboard');
                  }}
                  className="flex items-center space-x-1.5 px-3 py-2 text-xs font-medium text-[#F7F4ED] bg-[#1A2C42] hover:bg-[#233852] border border-[#B99A5B]/40 rounded transition"
                >
                  <Lock className="w-3.5 h-3.5 text-[#B99A5B]" />
                  <span>
                    {isClient ? 'Client Matter' : isStudent ? 'Learning Hub' : 'Admin Chamber'}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal('client')}
                  className="flex items-center space-x-1.5 px-3 py-2 text-xs font-medium text-[#F7F4ED] bg-[#1A2C42] hover:bg-[#233852] border border-[#233852] rounded transition"
                >
                  <Lock className="w-3.5 h-3.5 text-[#B99A5B]" />
                  <span>Client Access</span>
                </button>
              )}

              {/* Consultation CTA */}
              <button
                onClick={() => handleNavClick('book-consultation')}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#101C2C] bg-[#B99A5B] hover:bg-[#D4BA7E] rounded shadow transition duration-200"
              >
                Book Consultation
              </button>
            </div>

            {/* Mobile Menu & Search Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#D5D0C5] hover:text-[#B99A5B]"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#D5D0C5] hover:text-[#B99A5B]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#B99A5B]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A121D] border-t border-[#1A2C42] px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`w-full text-left py-2 px-3 rounded text-sm font-sans ${
                  currentView === link.view
                    ? 'bg-[#1A2C42] text-[#B99A5B] font-semibold'
                    : 'text-[#EFECE3] hover:bg-[#101C2C]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 border-t border-[#1A2C42] space-y-2">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      if (isClient) handleNavClick('client-portal');
                      else if (isStudent) handleNavClick('learn');
                      else if (isAdmin) handleNavClick('admin-dashboard');
                    }}
                    className="w-full text-left py-2 px-3 rounded text-sm font-sans flex items-center space-x-2 text-[#B99A5B] bg-[#1A2C42]"
                  >
                    <Lock className="w-4 h-4" />
                    <span>My Authorized Portal</span>
                  </button>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-3 rounded text-xs text-red-400 hover:bg-[#101C2C] flex items-center space-x-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      openAuthModal('client');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-3 rounded text-sm font-sans flex items-center space-x-2 text-[#EFECE3] hover:bg-[#101C2C]"
                  >
                    <Lock className="w-4 h-4 text-[#B99A5B]" />
                    <span>Client Matter Portal</span>
                  </button>
                  <button
                    onClick={() => {
                      openAuthModal('student');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-3 rounded text-sm font-sans flex items-center space-x-2 text-[#EFECE3] hover:bg-[#101C2C]"
                  >
                    <GraduationCap className="w-4 h-4 text-[#B99A5B]" />
                    <span>Student CLE Login</span>
                  </button>
                  <button
                    onClick={() => {
                      openAuthModal('chamber');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-3 rounded text-sm font-sans flex items-center space-x-2 text-[#EFECE3] hover:bg-[#101C2C]"
                  >
                    <Scale className="w-4 h-4 text-[#B99A5B]" />
                    <span>Chambers Login</span>
                  </button>
                </>
              )}
            </div>

            <div className="pt-3">
              <button
                onClick={() => handleNavClick('book-consultation')}
                className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#101C2C] bg-[#B99A5B] rounded"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export const Footer: React.FC = () => {
  const { firmDetails, navigateTo, openAuthModal } = useApp();

  return (
    <footer className="bg-[#0A121D] text-[#D5D0C5] border-t border-[#1A2C42] font-sans pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1A2C42]">
          {/* Col 1: Identity & Chambers */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 border border-[#B99A5B] rounded flex items-center justify-center bg-[#101C2C]">
                <Scale className="w-4 h-4 text-[#B99A5B]" />
              </div>
              <span className="font-serif text-lg text-[#F7F4ED] tracking-wide font-medium">
                {firmDetails.name}
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Dedicated to rigorous legal research, disciplined trial advocacy, and high-standard counsel before the Supreme Court of India, Delhi High Court, and arbitral tribunals.
            </p>
            <div className="pt-2 text-xs text-[#B99A5B] font-mono">
              Bar Council of Delhi Registration: D/458/1998
            </div>
          </div>

          {/* Col 2: Practice Areas Quick Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-[#F7F4ED] border-b border-[#B99A5B]/30 pb-2 mb-3">
              Core Practices
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button
                  onClick={() => navigateTo('practice-detail', 'civil-litigation')}
                  className="hover:text-[#B99A5B] transition text-left"
                >
                  Civil Litigation & Appellate Writs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('practice-detail', 'property-and-real-estate-disputes')}
                  className="hover:text-[#B99A5B] transition text-left"
                >
                  Property & RERA Adjudication
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('practice-detail', 'contract-and-commercial-disputes')}
                  className="hover:text-[#B99A5B] transition text-left"
                >
                  Commercial Contracts & Arbitration
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('practice-detail', 'criminal-law-and-investigations')}
                  className="hover:text-[#B99A5B] transition text-left"
                >
                  Criminal Defense & Section 138 NI Act
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('practice-detail', 'consumer-protection-and-e-commerce')}
                  className="hover:text-[#B99A5B] transition text-left"
                >
                  Consumer Redressal & NCDRC
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('practice-areas')}
                  className="text-[#B99A5B] font-medium hover:underline pt-1 inline-block"
                >
                  View All Practice Areas →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & Knowledge Hub */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-[#F7F4ED] border-b border-[#B99A5B]/30 pb-2 mb-3">
              Knowledge & LMS
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button onClick={() => navigateTo('courses')} className="hover:text-[#B99A5B] transition">
                  Continuing Legal Education Courses
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blogs')} className="hover:text-[#B99A5B] transition">
                  Legal Commentary & Case Analysis
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('team')} className="hover:text-[#B99A5B] transition">
                  Advocate Profiles & Publications
                </button>
              </li>
              <li>
                <button onClick={() => openAuthModal('client')} className="hover:text-[#B99A5B] transition">
                  Secure Client Matter Access
                </button>
              </li>
              <li>
                <button onClick={() => openAuthModal('chamber')} className="hover:text-[#B99A5B] transition">
                  Chambers Administration Login
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Chambers Info */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-[#F7F4ED] border-b border-[#B99A5B]/30 pb-2 mb-3">
              Chambers & Registry
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-300">
              <div>
                <span className="font-semibold text-[#F7F4ED] block">New Delhi Chamber:</span>
                <span className="text-neutral-400 block">{firmDetails.headOffice.addressLine1}</span>
                <span className="text-neutral-400 block">{firmDetails.headOffice.addressLine2}</span>
                <span className="text-neutral-400 block">{firmDetails.headOffice.city} – {firmDetails.headOffice.pincode}</span>
                <span className="text-[#B99A5B] block mt-0.5">{firmDetails.headOffice.phone}</span>
              </div>
              <div className="pt-1">
                <span className="font-semibold text-[#F7F4ED] block">Mumbai Office:</span>
                <span className="text-neutral-400 block">{firmDetails.branchOffice.addressLine1}</span>
                <span className="text-neutral-400 block">{firmDetails.branchOffice.city} – {firmDetails.branchOffice.pincode}</span>
              </div>
              <div className="pt-1 text-[11px] text-neutral-400">
                {firmDetails.workingHours}
              </div>
            </div>
          </div>
        </div>

        {/* Bar Council Mandatory Regulatory Disclaimer */}
        <div className="py-6 border-b border-[#1A2C42] text-[11px] text-neutral-400 leading-relaxed">
          <div className="flex items-start space-x-2">
            <ShieldAlert className="w-4 h-4 text-[#B99A5B] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#EFECE3] font-medium">Bar Council of India Disclaimer: </strong>
              {firmDetails.bciDisclaimer}
            </div>
          </div>
        </div>

        {/* Bottom copyright & statutory links */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-400 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} {firmDetails.name}. All Rights Reserved. Prepared in compliance with BCI guidelines.
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={() => navigateTo('privacy')} className="hover:text-[#B99A5B] transition">
              Privacy Policy (DPDP Act)
            </button>
            <button onClick={() => navigateTo('terms')} className="hover:text-[#B99A5B] transition">
              Terms of Use
            </button>
            <button onClick={() => navigateTo('disclaimer')} className="hover:text-[#B99A5B] transition">
              Legal Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
