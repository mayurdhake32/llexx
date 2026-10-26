import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail, Clock, ShieldAlert, CheckCircle2, AlertCircle, Send, Scale } from 'lucide-react';
import { isValidIndianPhoneNumber } from '../../utils/legalLogic';

export const ContactView: React.FC = () => {
  const { firmDetails, practiceAreas, submitInquiry } = useApp();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    practiceAreaId: practiceAreas[0]?.id || '',
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (!form.email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!isValidIndianPhoneNumber(form.phone)) {
      setErrorMsg('Please enter a valid 10-digit Indian telephone number.');
      return;
    }

    const res = submitInquiry({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
      practiceAreaId: form.practiceAreaId || undefined,
    });

    if (res.success) {
      setSuccessRef(res.reference);
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        practiceAreaId: practiceAreas[0]?.id || '',
      });
    }
  };

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans min-h-screen">
      {/* Header */}
      <section className="bg-[#101C2C] text-[#F7F4ED] py-16 sm:py-20 border-b border-[#1A2C42]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B] block">
              Contact & Chambers Registry
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F7F4ED] font-medium leading-tight">
              Get in Touch with Our Legal Team
            </h1>
            <p className="text-sm sm:text-base text-[#D5D0C5] leading-relaxed">
              Reach our principal chambers at the Delhi High Court complex or our corporate branch office in Nariman Point, Mumbai.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Chamber Locations Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E4DFD3] shadow-sm space-y-6">
              <h3 className="font-serif text-xl text-[#101C2C] font-semibold flex items-center space-x-2 border-b border-[#E4DFD3] pb-3">
                <Scale className="w-5 h-5 text-[#B99A5B]" />
                <span>Verified Chamber Addresses</span>
              </h3>

              {/* Delhi Office */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-[#101C2C] text-sm block">
                  New Delhi Principal Chamber (Delhi High Court)
                </span>
                <p className="text-[#5A6474] leading-relaxed">
                  {firmDetails.headOffice.addressLine1} <br />
                  {firmDetails.headOffice.addressLine2} <br />
                  {firmDetails.headOffice.city}, {firmDetails.headOffice.state} – {firmDetails.headOffice.pincode}
                </p>
                <div className="pt-1 space-y-1">
                  <div className="flex items-center space-x-2 text-[#101C2C]">
                    <Phone className="w-3.5 h-3.5 text-[#B99A5B]" />
                    <a href={`tel:${firmDetails.headOffice.phone}`} className="hover:text-[#B99A5B] font-mono">
                      {firmDetails.headOffice.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-[#101C2C]">
                    <Mail className="w-3.5 h-3.5 text-[#B99A5B]" />
                    <a href={`mailto:${firmDetails.headOffice.email}`} className="hover:text-[#B99A5B] font-mono">
                      {firmDetails.headOffice.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Mumbai Office */}
              <div className="space-y-2 text-xs border-t border-[#F7F4ED] pt-4">
                <span className="font-bold text-[#101C2C] text-sm block">
                  Mumbai Corporate & Arbitration Chamber
                </span>
                <p className="text-[#5A6474] leading-relaxed">
                  {firmDetails.branchOffice.addressLine1} <br />
                  {firmDetails.branchOffice.city}, {firmDetails.branchOffice.state} – {firmDetails.branchOffice.pincode}
                </p>
                <div className="pt-1">
                  <div className="flex items-center space-x-2 text-[#101C2C]">
                    <Phone className="w-3.5 h-3.5 text-[#B99A5B]" />
                    <a href={`tel:${firmDetails.branchOffice.phone}`} className="hover:text-[#B99A5B] font-mono">
                      {firmDetails.branchOffice.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="p-4 rounded bg-[#F7F4ED] border border-[#E4DFD3] text-xs space-y-1">
                <div className="flex items-center space-x-2 text-[#101C2C] font-semibold">
                  <Clock className="w-4 h-4 text-[#B99A5B]" />
                  <span>Working Hours & Registry Openings</span>
                </div>
                <p className="text-[#5A6474]">{firmDetails.workingHours}</p>
              </div>
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-lg border border-[#E4DFD3] shadow-sm space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#B99A5B] font-semibold block">
                  Confidential Inquiry Form
                </span>
                <h3 className="font-serif text-2xl text-[#101C2C] font-semibold mt-1">
                  Transmit an Official Communication
                </h3>
              </div>

              {successRef ? (
                <div className="p-6 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-3 animate-in fade-in">
                  <div className="flex items-center space-x-2 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Inquiry Successfully Logged!</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Your inquiry has been assigned reference code <strong className="font-mono">{successRef}</strong>. Our designated registry clerk will review your communication and respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSuccessRef(null)}
                    className="text-xs text-emerald-800 underline font-semibold"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-[#232B38] block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Adv. Amit Saxena / Sh. Rajesh"
                        className="w-full text-xs p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#232B38] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. amit@example.com"
                        className="w-full text-xs p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-[#232B38] block mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. 9810123456"
                        className="w-full text-xs p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#232B38] block mb-1">
                        Relevant Practice Area
                      </label>
                      <select
                        value={form.practiceAreaId}
                        onChange={(e) => setForm({ ...form, practiceAreaId: e.target.value })}
                        className="w-full text-xs p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                      >
                        {practiceAreas.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#232B38] block mb-1">
                      Subject / Matter Reference *
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. Commercial lease agreement vetting or NCLT dispute"
                      className="w-full text-xs p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#232B38] block mb-1">
                      Message / Inquiry Details *
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please do not disclose confidential bank account numbers, passwords, or privileged strategy documents in this public contact form."
                      className="w-full text-xs p-3 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                    />
                  </div>

                  {/* Warning Box as mandated by master prompt */}
                  <div className="p-3 rounded bg-[#EFECE3] border border-[#E4DFD3] text-xs text-[#5A6474] flex items-start space-x-2">
                    <ShieldAlert className="w-4 h-4 text-[#B99A5B] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Notice:</strong> Please do not submit confidential case documents, passwords, or sensitive court pleadings through this general inquiry form. Official case materials should be shared only through the Secure Client Portal.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow transition flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
