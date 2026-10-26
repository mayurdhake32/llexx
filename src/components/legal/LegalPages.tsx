import React from 'react';
import { useApp } from '../../context/AppContext';
import { Scale, ShieldCheck, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyView: React.FC = () => {
  const { firmDetails, navigateTo } = useApp();

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-lg border border-[#E4DFD3] shadow-sm space-y-6">
        <button
          onClick={() => navigateTo('home')}
          className="text-xs text-[#B99A5B] hover:text-[#D4BA7E] inline-flex items-center space-x-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="border-b border-[#E4DFD3] pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B99A5B]">
            Regulatory Disclosure
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#101C2C] mt-1">
            Privacy Policy & Data Protection Notice
          </h1>
          <p className="text-xs text-[#5A6474] mt-1">
            Compliant with the Digital Personal Data Protection Act, 2023 (DPDP) and the Information Technology Act, 2000.
          </p>
        </div>

        <div className="prose prose-sm text-[#5A6474] space-y-4 text-xs sm:text-sm leading-relaxed">
          <h3 className="font-serif text-base text-[#101C2C] font-semibold">1. Data Fiduciary Commitment</h3>
          <p>
            {firmDetails.name} acts as Data Fiduciary under the Digital Personal Data Protection Act, 2023 regarding personal data provided through consultation booking, contact forms, or course registrations.
          </p>

          <h3 className="font-serif text-base text-[#101C2C] font-semibold">2. Purpose of Collection & Limitation</h3>
          <p>
            We collect personal data (Name, Email, Mobile Number, Matter Details) exclusively for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Scheduling confidential advocate consultations and conducting conflict checks.</li>
            <li>Delivering continuing legal education course materials and issuing verified certificates.</li>
            <li>Transmitting requested procedural checklists and official legal commentaries.</li>
          </ul>

          <h3 className="font-serif text-base text-[#101C2C] font-semibold">3. Privileged Communications</h3>
          <p>
            Case documents uploaded via the Client Portal are subject to statutory attorney-client privilege under Section 126 of the Indian Evidence Act. They are stored with encryption and will never be disclosed to third parties or used for profiling.
          </p>

          <h3 className="font-serif text-base text-[#101C2C] font-semibold">4. Grievance Officer & Contact</h3>
          <p>
            Under the DPDP Act, our designated Grievance Officer can be contacted at: <br />
            <strong>Adv. Vikramaditya Kashyap (Managing Partner, Lex Global Advocacy)</strong> <br />
            Email: <span className="font-mono text-[#B99A5B]">chambers@lexglobal.in</span> <br />
            Chamber 402, Lawyers Chambers Block, Delhi High Court Complex, New Delhi – 110503.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsOfUseView: React.FC = () => {
  const { firmDetails, navigateTo } = useApp();

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-lg border border-[#E4DFD3] shadow-sm space-y-6">
        <button
          onClick={() => navigateTo('home')}
          className="text-xs text-[#B99A5B] hover:text-[#D4BA7E] inline-flex items-center space-x-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="border-b border-[#E4DFD3] pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B99A5B]">
            Legal Terms
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#101C2C] mt-1">
            Website Terms of Use
          </h1>
          <p className="text-xs text-[#5A6474] mt-1">
            Terms governing access to the digital chambers and knowledge portal of {firmDetails.name}.
          </p>
        </div>

        <div className="prose prose-sm text-[#5A6474] space-y-4 text-xs sm:text-sm leading-relaxed">
          <h3 className="font-serif text-base text-[#101C2C] font-semibold">1. Informational & Academic Use Only</h3>
          <p>
            All content on this website—including articles, statutory analyses, and procedural checklists—is published strictly for educational purposes and does not create an advocate-client relationship.
          </p>

          <h3 className="font-serif text-base text-[#101C2C] font-semibold">2. Absence of Formal Engagement</h3>
          <p>
            Submitting an appointment request or contact form does not bind {firmDetails.name} to represent you. An advocate-client relationship is formally constituted solely upon written confirmation, conflict clearance, and execution of a formal Vakalatnama.
          </p>

          <h3 className="font-serif text-base text-[#101C2C] font-semibold">3. Jurisdiction & Governing Law</h3>
          <p>
            Any disputes arising out of the use of this website shall be governed by the laws of India and subject to the exclusive jurisdiction of the Courts at New Delhi.
          </p>
        </div>
      </div>
    </div>
  );
};

export const LegalDisclaimerView: React.FC = () => {
  const { firmDetails, navigateTo } = useApp();

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-lg border border-[#E4DFD3] shadow-sm space-y-6">
        <button
          onClick={() => navigateTo('home')}
          className="text-xs text-[#B99A5B] hover:text-[#D4BA7E] inline-flex items-center space-x-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="border-b border-[#E4DFD3] pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B99A5B]">
            Regulatory Mandate
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#101C2C] mt-1">
            Bar Council of India Regulatory Disclaimer
          </h1>
          <p className="text-xs text-[#5A6474] mt-1">
            In compliance with Rule 36 of the Bar Council of India Rules.
          </p>
        </div>

        <div className="prose prose-sm text-[#5A6474] space-y-4 text-xs sm:text-sm leading-relaxed">
          <p>
            As per the rules of the <strong>Bar Council of India</strong> (Rule 36, Section IV, Chapter II, Part VI of the Bar Council of India Rules), advocates are prohibited from soliciting work or advertising in any form or manner.
          </p>

          <div className="p-4 bg-[#F7F4ED] rounded border border-[#E4DFD3] space-y-2">
            <h4 className="font-serif font-bold text-[#101C2C]">Solemn Affirmation by User</h4>
            <p>
              By accessing this website, the user acknowledges that the information provided is at their own request, of their own free will, and solely for informational and educational purposes.
            </p>
          </div>

          <p>
            The contents of this website do not constitute legal advice, nor should they be acted upon without seeking independent counsel from a licensed advocate. {firmDetails.name} accepts no liability for any reliance placed on materials published herein.
          </p>
        </div>
      </div>
    </div>
  );
};
