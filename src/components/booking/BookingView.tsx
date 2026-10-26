import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, ShieldCheck, CheckCircle2, AlertCircle, Scale, Phone, Mail, User, FileText } from 'lucide-react';
import { isValidIndianPhoneNumber } from '../../utils/legalLogic';

export const BookingView: React.FC = () => {
  const { practiceAreas, teamMembers, bookAppointment, appointments, navigateTo } = useApp();

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    practiceAreaId: practiceAreas[0]?.id || 'civil-litigation',
    advocateId: '',
    date: '',
    timeSlot: '11:00 AM - 11:45 AM',
    consultationType: 'In-Person (Office)' as const,
    caseSummary: '',
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const timeSlots = [
    '10:15 AM - 11:00 AM',
    '11:00 AM - 11:45 AM',
    '12:00 PM - 12:45 PM',
    '02:30 PM - 03:15 PM',
    '03:30 PM - 04:15 PM',
    '05:00 PM - 05:45 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.clientName.trim()) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }
    if (!formData.clientEmail.trim() || !formData.clientEmail.includes('@')) {
      setErrorMsg('Please provide a valid email address for confirmation notifications.');
      return;
    }
    if (!isValidIndianPhoneNumber(formData.clientPhone)) {
      setErrorMsg('Please enter a valid 10-digit Indian phone number (e.g., 9820045678).');
      return;
    }
    if (!formData.date) {
      setErrorMsg('Please select a preferred consultation date.');
      return;
    }
    if (!formData.caseSummary.trim()) {
      setErrorMsg('Please provide a brief initial summary of your legal matter.');
      return;
    }

    const result = bookAppointment({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      practiceAreaId: formData.practiceAreaId,
      advocateId: formData.advocateId || undefined,
      date: formData.date,
      timeSlot: formData.timeSlot,
      consultationType: formData.consultationType,
      caseSummary: formData.caseSummary,
    });

    if (result.success && result.reference) {
      setSuccessRef(result.reference);
    } else {
      setErrorMsg(result.error || 'Failed to reserve appointment slot.');
    }
  };

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans min-h-screen">
      {/* Header */}
      <section className="bg-[#101C2C] text-[#F7F4ED] py-16 sm:py-20 border-b border-[#1A2C42]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B] block">
              Chamber Appointments
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F7F4ED] font-medium leading-tight">
              Schedule a Confidential Consultation
            </h1>
            <p className="text-sm sm:text-base text-[#D5D0C5] leading-relaxed">
              Meet with our senior advocates in-person at our Delhi High Court or Mumbai chambers, or arrange an encrypted virtual video conference.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form or Confirmation */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {successRef ? (
          <div className="bg-white rounded-lg border-2 border-[#B99A5B] p-8 shadow-xl space-y-6 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-[#B99A5B] block font-bold">
              Consultation Slot Reserved
            </span>

            <h2 className="font-serif text-3xl font-bold text-[#101C2C]">
              Appointment Reference: {successRef}
            </h2>

            <p className="text-xs sm:text-sm text-[#5A6474] max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{formData.clientName}</strong>. Your consultation request for <strong>{formData.date}</strong> at <strong>{formData.timeSlot}</strong> ({formData.consultationType}) has been logged in our chamber calendar.
            </p>

            <div className="p-4 bg-[#F7F4ED] rounded-lg border border-[#E4DFD3] text-left text-xs max-w-md mx-auto space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-500">Practice Area:</span>
                <span className="font-semibold text-[#101C2C]">
                  {practiceAreas.find((p) => p.id === formData.practiceAreaId)?.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Contact Email:</span>
                <span className="font-semibold text-[#101C2C]">{formData.clientEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Status:</span>
                <span className="font-semibold text-[#B99A5B] uppercase">Pending Conflict Check</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Our chamber clerk will review conflicts and contact you on {formData.clientPhone} within 4 working hours to confirm diary placement and conference link.
            </p>

            <div className="pt-4 flex justify-center space-x-4">
              <button
                onClick={() => {
                  setSuccessRef(null);
                  setFormData({
                    clientName: '',
                    clientEmail: '',
                    clientPhone: '',
                    practiceAreaId: practiceAreas[0]?.id || 'civil-litigation',
                    advocateId: '',
                    date: '',
                    timeSlot: '11:00 AM - 11:45 AM',
                    consultationType: 'In-Person (Office)',
                    caseSummary: '',
                  });
                }}
                className="px-6 py-2.5 bg-[#101C2C] text-white text-xs font-semibold rounded hover:bg-[#1A2C42]"
              >
                Book Another Appointment
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="px-6 py-2.5 bg-[#EFECE3] text-[#101C2C] text-xs font-semibold rounded hover:bg-[#E4DFD3]"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg border border-[#E4DFD3] p-6 sm:p-10 shadow-sm space-y-8"
          >
            {errorMsg && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Matter & Mode */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#101C2C] font-semibold flex items-center space-x-2">
                <Scale className="w-5 h-5 text-[#B99A5B]" />
                <span>1. Select Practice Discipline & Consultation Mode</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#232B38] block mb-1">
                    Practice Area *
                  </label>
                  <select
                    value={formData.practiceAreaId}
                    onChange={(e) => setFormData({ ...formData, practiceAreaId: e.target.value })}
                    className="w-full text-xs p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                  >
                    {practiceAreas.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#232B38] block mb-1">
                    Preferred Advocate (Optional)
                  </label>
                  <select
                    value={formData.advocateId}
                    onChange={(e) => setFormData({ ...formData, advocateId: e.target.value })}
                    className="w-full text-xs p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                  >
                    <option value="">Chamber Lead / Available Partner</option>
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.designation.split('–')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#232B38] block mb-2">
                  Consultation Mode *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    'In-Person (Office)',
                    'Secure Video Call',
                    'Telephonic',
                  ].map((mode) => (
                    <label
                      key={mode}
                      className={`p-3 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition ${
                        formData.consultationType === mode
                          ? 'bg-[#101C2C] text-[#F7F4ED] border-[#101C2C]'
                          : 'bg-[#F7F4ED] text-[#232B38] border-[#E4DFD3] hover:bg-[#EFECE3]'
                      }`}
                    >
                      <span className="font-medium">{mode}</span>
                      <input
                        type="radio"
                        name="consultationType"
                        checked={formData.consultationType === mode}
                        onChange={() =>
                          setFormData({ ...formData, consultationType: mode as any })
                        }
                        className="text-[#B99A5B]"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Date & Available Slot */}
            <div className="space-y-4 border-t border-[#E4DFD3] pt-6">
              <h3 className="font-serif text-xl text-[#101C2C] font-semibold flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-[#B99A5B]" />
                <span>2. Preferred Date & Available Time Slot</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#232B38] block mb-1">
                    Select Date (Monday – Saturday) *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full text-xs p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    * Chambers are closed Sundays for court preparation.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#232B38] block mb-1">
                    Select Available Slot *
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full text-xs p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Client Identity & Case Summary */}
            <div className="space-y-4 border-t border-[#E4DFD3] pt-6">
              <h3 className="font-serif text-xl text-[#101C2C] font-semibold flex items-center space-x-2">
                <User className="w-5 h-5 text-[#B99A5B]" />
                <span>3. Client Identification & Matter Brief</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#232B38] block mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full text-xs p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#232B38] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full text-xs p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#232B38] block mb-1">
                    Mobile Number (10 Digits) *
                  </label>
                  <input
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    placeholder="e.g. 9820045678"
                    className="w-full text-xs p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#232B38] block mb-1">
                  Initial Summary of Dispute / Inquiry *
                </label>
                <textarea
                  rows={4}
                  value={formData.caseSummary}
                  onChange={(e) => setFormData({ ...formData, caseSummary: e.target.value })}
                  placeholder="Outline key facts, contract dates, court forum, and current stage of the dispute..."
                  className="w-full text-xs p-3 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                />
              </div>
            </div>

            {/* Privilege Notice */}
            <div className="p-4 rounded-lg bg-[#EFECE3] border border-[#E4DFD3] text-xs text-[#5A6474] flex items-start space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-[#B99A5B] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Confidentiality Assurance:</strong> Communications submitted through this portal are treated as privileged preliminary client information protected under Indian law.
              </span>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow transition duration-200"
              >
                Confirm & Reserve Consultation Slot
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
