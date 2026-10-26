import React from 'react';
import { useApp } from '../../context/AppContext';
import { Scale, ShieldCheck } from 'lucide-react';

export const BciDisclaimerModal: React.FC = () => {
  const { bciAccepted, acceptBciDisclaimer, firmDetails } = useApp();

  if (bciAccepted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-[#101C2C] border-2 border-[#B99A5B]/60 max-w-2xl w-full rounded-lg shadow-2xl p-6 sm:p-8 text-[#F7F4ED] font-sans relative">
        <div className="flex items-center space-x-3 pb-4 border-b border-[#1A2C42]">
          <div className="w-12 h-12 rounded border border-[#B99A5B] bg-[#1A2C42] flex items-center justify-center flex-shrink-0">
            <Scale className="w-6 h-6 text-[#B99A5B]" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#F7F4ED] tracking-wide font-medium">
              Bar Council of India Disclaimer
            </h3>
            <span className="text-xs text-[#B99A5B] uppercase tracking-wider block font-sans">
              Rule 36, Section IV, Chapter II, Part VI of BCI Rules
            </span>
          </div>
        </div>

        <div className="my-5 space-y-3.5 text-xs sm:text-sm text-neutral-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          <p>
            Under the rules of the <strong>Bar Council of India</strong>, advocates and law firms are strictly prohibited from soliciting work, advertising, or creating commercial inducements in any manner.
          </p>
          <div className="p-4 bg-[#0A121D] rounded border border-[#1A2C42] space-y-2">
            <p className="text-neutral-300">
              By clicking <strong className="text-[#B99A5B]">"Acknowledge & Enter Chambers"</strong> below, you expressly confirm and acknowledge:
            </p>
            <ul className="list-disc list-inside space-y-1 text-neutral-400 text-xs pl-1">
              <li>You are seeking information about {firmDetails.name} of your own independent volition.</li>
              <li>There has been no advertisement, personal communication, solicitation, invitation, or inducement of any sort whatsoever by or on behalf of the firm.</li>
              <li>The information provided is solely for educational, informational, and knowledge purposes and does not create an advocate-client relationship.</li>
              <li>The contents of this site should not be construed as legal advice or judicial representation.</li>
            </ul>
          </div>
          <p className="text-neutral-400 text-xs">
            Neither {firmDetails.name} nor its partners shall be liable for any consequence of any action taken by the user relying on material or information provided on this website.
          </p>
        </div>

        <div className="pt-4 border-t border-[#1A2C42] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center text-xs text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-[#B99A5B] mr-1.5" />
            <span>Strict Client Confidentiality & Privileged Communication</span>
          </div>
          <button
            onClick={acceptBciDisclaimer}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow transition"
          >
            Acknowledge & Enter Chambers
          </button>
        </div>
      </div>
    </div>
  );
};
