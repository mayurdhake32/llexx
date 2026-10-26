import React from 'react';
import { useApp } from '../../context/AppContext';
import { Scale, ArrowRight, ShieldCheck, Award, BookOpen } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="relative bg-[#101C2C] text-[#F7F4ED] overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[#1A2C42]">
      {/* Background Architectural Texture Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B99A5B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-7 space-y-6">
            {/* Regulatory Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#1A2C42]/80 border border-[#B99A5B]/40 text-xs font-sans text-[#EFECE3]">
              <span className="w-2 h-2 rounded-full bg-[#B99A5B] animate-pulse" />
              <span>Chambers at Delhi High Court & Nariman Point, Mumbai</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F7F4ED] leading-[1.12] tracking-tight font-medium">
              Trusted Legal Guidance. <br />
              <span className="italic font-normal text-[#D4BA7E]">
                Thoughtful Representation.
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#D5D0C5] max-w-2xl leading-relaxed">
              Professional legal services, practical legal education, and clear guidance designed to help individuals and businesses better understand their legal options across civil disputes, commercial arbitration, real estate, and corporate governance.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 font-sans">
              <button
                onClick={() => navigateTo('book-consultation')}
                className="px-6 py-3.5 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow-md transition duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('practice-areas')}
                className="px-6 py-3.5 bg-transparent hover:bg-[#1A2C42] text-[#F7F4ED] font-medium text-xs uppercase tracking-wider rounded border border-[#B99A5B]/50 transition duration-200 flex items-center justify-center"
              >
                Explore Practice Areas
              </button>
            </div>

            {/* Key Assurance Indicators */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#1A2C42]/80 text-xs text-neutral-300">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#B99A5B] flex-shrink-0" />
                <span>Privileged & Confidential</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-[#B99A5B] flex-shrink-0" />
                <span>Supreme Court Bar</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#B99A5B] flex-shrink-0" />
                <span>Accredited LMS</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural & Advocate Portrait Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold border frame */}
              <div className="absolute -inset-2 rounded-xl border border-[#B99A5B]/30 transform -rotate-1 pointer-events-none" />

              <div className="relative rounded-lg overflow-hidden border border-[#233852] shadow-2xl bg-[#0A121D]">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=900"
                  alt="Lex Global Advocacy High Court Chambers"
                  className="w-full h-80 sm:h-96 object-cover object-center filter brightness-90 hover:scale-105 transition duration-700"
                />

                {/* Editorial Caption Card */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0A121D] via-[#0A121D]/90 to-transparent p-5 text-xs">
                  <div className="flex items-center space-x-2 text-[#B99A5B] font-mono text-[11px] mb-1">
                    <Scale className="w-3.5 h-3.5" />
                    <span>FOUNDED 1998</span>
                  </div>
                  <div className="font-serif text-[#F7F4ED] text-base font-semibold">
                    Chambers of Lex Global Advocacy
                  </div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">
                    Senior Advocate, Supreme Court of India & High Court of Delhi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
