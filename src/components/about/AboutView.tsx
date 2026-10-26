import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Scale, Award, BookOpen, GraduationCap, FileDown, ArrowRight, Printer, X, ShieldCheck } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { firmDetails, teamMembers, navigateTo } = useApp();
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);

  const founder = teamMembers.find((m) => m.slug === 'vikramaditya-kashyap') || teamMembers[0];

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans">
      {/* Editorial Header */}
      <section className="bg-[#101C2C] text-[#F7F4ED] py-16 sm:py-24 border-b border-[#1A2C42]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B] block">
              About The Firm & Senior Counsel
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F7F4ED] font-medium leading-tight">
              A Tradition of Rigorous Jurisprudence and Unyielding Integrity
            </h1>
            <p className="text-sm sm:text-base text-[#D5D0C5] leading-relaxed">
              Established in 1998, Lex Global Advocacy provides disciplined representation and counsel across appellate litigation, commercial arbitration, and corporate advisory.
            </p>
          </div>
        </div>
      </section>

      {/* Main Biography Section */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Portrait & Credentials Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-lg overflow-hidden border border-[#E4DFD3] shadow-md bg-[#0A121D]">
              <img
                src={founder.imageUrl}
                alt={founder.name}
                className="w-full h-96 object-cover object-top"
              />
              <div className="p-6 bg-[#101C2C] text-[#F7F4ED] border-t border-[#1A2C42]">
                <div className="font-mono text-xs text-[#B99A5B]">{founder.barEnrollment}</div>
                <h3 className="font-serif text-2xl font-semibold mt-1">{founder.name}</h3>
                <p className="text-xs text-neutral-400 mt-0.5">{founder.designation}</p>

                <div className="mt-4 pt-4 border-t border-[#1A2C42] space-y-2 text-xs">
                  <div className="text-neutral-300">
                    <strong className="text-[#B99A5B]">Jurisdiction: </strong>
                    {founder.jurisdiction}
                  </div>
                  <div className="text-neutral-300">
                    <strong className="text-[#B99A5B]">Litigation Experience: </strong>
                    {founder.experienceYears}+ Years Contentious Practice
                  </div>
                </div>
              </div>
            </div>

            {/* Download Firm Brochure CTA */}
            <div className="p-5 rounded-lg bg-[#EFECE3] border border-[#E4DFD3] space-y-3">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#101C2C]">
                <FileDown className="w-4 h-4 text-[#B99A5B]" />
                <span>Download Firm Profile & Credentials</span>
              </div>
              <p className="text-xs text-[#5A6474]">
                Official PDF overview of chamber history, advocate qualifications, and practice focus for corporate boards and institutional clients.
              </p>
              <button
                onClick={() => setBrochureModalOpen(true)}
                className="w-full py-2.5 px-4 bg-[#101C2C] hover:bg-[#1A2C42] text-[#F7F4ED] text-xs font-medium rounded transition flex items-center justify-center space-x-2"
              >
                <span>View & Print Chamber Profile</span>
              </button>
            </div>
          </div>

          {/* Detailed Narrative Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B] block">
                Founding Philosophy
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#101C2C] font-medium">
                "Advocacy is an exercise in truth-seeking, disciplined statutory analysis, and unwavering loyalty to the Constitution."
              </h2>
              <div className="w-16 h-0.5 bg-[#B99A5B]" />
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#5A6474] leading-relaxed">
              <p>
                Vikramaditya Kashyap began his legal career following graduation with top honors from the National Law School of India University (NLSIU), Bengaluru, and subsequently reading commercial law at the University of Cambridge.
              </p>
              <p>
                Enrolled with the Bar Council of Delhi in 1998, he has argued over 1,400 contentious matters spanning constitutional writ petitions under Article 226, high-stakes infrastructure arbitrations, property title cancellations, and civil recovery suits. He is frequently retained by domestic conglomerates and family offices to formulate dispute strategies and argue landmark matters before High Courts and the Supreme Court of India.
              </p>
              <p>
                Under his leadership, Lex Global Advocacy has expanded from a solitary appellate chamber into a premier practice operating across New Delhi and Mumbai, while strictly upholding the professional ethics prescribed under the Bar Council of India Rules.
              </p>
            </div>

            {/* Verified Qualifications Accordion / List */}
            <div className="p-6 rounded-lg bg-white border border-[#E4DFD3] space-y-4">
              <h3 className="font-serif text-lg text-[#101C2C] font-semibold flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-[#B99A5B]" />
                <span>Verified Academic Qualifications</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5A6474]">
                {founder.education.map((edu, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#B99A5B] font-bold">•</span>
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Publications */}
            <div className="p-6 rounded-lg bg-white border border-[#E4DFD3] space-y-4">
              <h3 className="font-serif text-lg text-[#101C2C] font-semibold flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#B99A5B]" />
                <span>Selected Scholarly Publications</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5A6474]">
                {founder.publications.map((pub, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#B99A5B] font-bold">•</span>
                    <span>{pub}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => navigateTo('book-consultation')}
                className="px-6 py-3 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow transition"
              >
                Schedule Consultation
              </button>
              <button
                onClick={() => navigateTo('team')}
                className="px-6 py-3 bg-white hover:bg-[#EFECE3] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded border border-[#E4DFD3] transition flex items-center space-x-1"
              >
                <span>Meet the Entire Legal Team</span>
                <ArrowRight className="w-4 h-4 text-[#B99A5B]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Printable Brochure Modal */}
      {brochureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full rounded-lg shadow-2xl p-8 text-[#232B38] font-sans relative my-8">
            <div className="flex justify-between items-center pb-4 border-b border-[#E4DFD3]">
              <div className="flex items-center space-x-2">
                <Scale className="w-5 h-5 text-[#B99A5B]" />
                <span className="font-serif text-xl font-bold text-[#101C2C]">
                  {firmDetails.name} — Chamber Profile
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-[#101C2C] text-white text-xs rounded flex items-center space-x-1.5 hover:bg-[#1A2C42]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setBrochureModalOpen(false)}
                  className="p-1.5 text-neutral-500 hover:text-black rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="py-6 space-y-6 text-xs sm:text-sm text-[#5A6474] leading-relaxed">
              <div className="border-b border-[#E4DFD3] pb-4">
                <h4 className="font-serif text-lg text-[#101C2C] font-semibold">Chambers Overview</h4>
                <p className="mt-1">
                  Lex Global Advocacy is a premier Indian and international litigation chamber founded in 1998. The firm handles commercial arbitrations, civil litigation, property disputes, and corporate legal advisory.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-[#E4DFD3] pb-4">
                <div>
                  <strong className="text-[#101C2C] block">Delhi High Court Chamber:</strong>
                  <span>{firmDetails.headOffice.addressLine1}, {firmDetails.headOffice.addressLine2}, {firmDetails.headOffice.city} – {firmDetails.headOffice.pincode}</span>
                  <span className="block mt-1 font-mono text-[#B99A5B]">{firmDetails.headOffice.phone}</span>
                </div>
                <div>
                  <strong className="text-[#101C2C] block">Mumbai Office:</strong>
                  <span>{firmDetails.branchOffice.addressLine1}, {firmDetails.branchOffice.city} – {firmDetails.branchOffice.pincode}</span>
                  <span className="block mt-1 font-mono text-[#B99A5B]">{firmDetails.branchOffice.phone}</span>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg text-[#101C2C] font-semibold mb-2">Practice Roster & Lead Advocates</h4>
                <div className="space-y-2">
                  {teamMembers.map((m) => (
                    <div key={m.id} className="p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-[#101C2C]">{m.name}</span>
                        <span className="text-xs text-neutral-500 block">{m.designation}</span>
                      </div>
                      <span className="text-xs font-mono text-[#B99A5B]">{m.barEnrollment}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 border-t border-[#E4DFD3] pt-4">
                * This document contains factual informational profile data prepared in accordance with Rule 36 of Bar Council of India Rules. It does not constitute an advertisement or commercial solicitation.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
