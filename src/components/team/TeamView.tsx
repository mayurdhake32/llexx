import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ArrowRight, ShieldCheck, Mail, MapPin } from 'lucide-react';

export const TeamView: React.FC = () => {
  const { teamMembers, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');

  const roles = ['All', 'Partner', 'Senior Associate', 'Associate', 'Research'];

  const filteredTeam = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.bio.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedRole !== 'All') {
      if (selectedRole === 'Partner' && !member.designation.includes('Partner')) return false;
      if (selectedRole === 'Senior Associate' && !member.designation.includes('Senior Associate')) return false;
      if (selectedRole === 'Associate' && member.designation !== 'Associate' && !member.designation.includes('Associate –')) return false;
      if (selectedRole === 'Research' && !member.designation.includes('Research')) return false;
    }

    return true;
  });

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans">
      {/* Header */}
      <section className="bg-[#101C2C] text-[#F7F4ED] py-16 sm:py-20 border-b border-[#1A2C42]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B] block">
              Chambers Roster
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F7F4ED] font-medium leading-tight">
              The People Behind Your Legal Support
            </h1>
            <p className="text-sm sm:text-base text-[#D5D0C5] leading-relaxed">
              Our advocates and consultants combine rigorous academic training from premier Indian and global law schools with decades of contentious court experience.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-[#E4DFD3] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                  selectedRole === role
                    ? 'bg-[#101C2C] text-[#F7F4ED]'
                    : 'bg-[#EFECE3] text-[#232B38] hover:bg-[#E4DFD3]'
                }`}
              >
                {role === 'All' ? 'All Advocates' : role}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by advocate name or bio..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F4ED] border border-[#E4DFD3] rounded focus:outline-none focus:border-[#B99A5B]"
            />
          </div>
        </div>
      </section>

      {/* Team Roster Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeam.map((member) => (
            <div
              key={member.id}
              onClick={() => navigateTo('team-detail', member.slug)}
              className="bg-white rounded-lg border border-[#E4DFD3] hover:border-[#B99A5B] overflow-hidden shadow-sm hover:shadow-md transition duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-72 overflow-hidden bg-[#0A121D]">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono text-[#B99A5B] font-semibold">
                      {member.barEnrollment}
                    </span>
                    <span className="text-[11px] text-[#5A6474]">
                      {member.experienceYears}+ yrs exp
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#101C2C] group-hover:text-[#B99A5B] transition">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#5A6474] font-medium mt-0.5">{member.designation}</p>

                  <p className="text-xs text-[#5A6474] mt-3 line-clamp-3 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#F7F4ED] space-y-1 text-xs text-[#232B38]">
                    <div className="flex items-center text-neutral-500 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-[#B99A5B]" />
                      <span>{member.jurisdiction.split(',')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-[#F7F4ED] flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-mono text-[11px]">
                  {member.languages.join(', ')}
                </span>
                <span className="text-[#B99A5B] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>View Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const TeamMemberDetailView: React.FC<{ slug?: string }> = ({ slug }) => {
  const { teamMembers, practiceAreas, navigateTo } = useApp();

  const member = teamMembers.find((m) => m.slug === slug) || teamMembers[0];
  const memberPractices = practiceAreas.filter((p) => member.practiceAreaIds.includes(p.id));

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans">
      <section className="bg-[#101C2C] text-[#F7F4ED] py-16 sm:py-20 border-b border-[#1A2C42]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigateTo('team')}
            className="text-xs text-[#B99A5B] hover:text-[#D4BA7E] inline-flex items-center space-x-1.5 mb-6 transition"
          >
            <span>← Back to All Team Members</span>
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B99A5B]">
                {member.barEnrollment}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-[#F7F4ED] font-medium">
                {member.name}
              </h1>
              <p className="text-sm text-[#D5D0C5]">{member.designation}</p>
            </div>

            <button
              onClick={() => navigateTo('book-consultation')}
              className="px-6 py-3 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow transition flex-shrink-0"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-lg overflow-hidden border border-[#E4DFD3] shadow-md bg-[#0A121D]">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-96 object-cover object-top"
              />
              <div className="p-6 bg-[#101C2C] text-[#F7F4ED] border-t border-[#1A2C42] space-y-3 text-xs">
                <div>
                  <strong className="text-[#B99A5B] block">Email (Confidential Inquiries):</strong>
                  <span className="font-mono text-neutral-300">{member.email}</span>
                </div>
                <div>
                  <strong className="text-[#B99A5B] block">Principal Courts:</strong>
                  <span className="text-neutral-300">{member.jurisdiction}</span>
                </div>
                <div>
                  <strong className="text-[#B99A5B] block">Languages Spoken:</strong>
                  <span className="text-neutral-300">{member.languages.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-[#101C2C] font-semibold border-b border-[#E4DFD3] pb-3">
                Professional Biography
              </h2>
              <p className="text-sm sm:text-base text-[#5A6474] leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Education */}
            <div className="p-6 rounded-lg bg-white border border-[#E4DFD3] space-y-3">
              <h3 className="font-serif text-lg text-[#101C2C] font-semibold">
                Academic Background & Qualifications
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5A6474]">
                {member.education.map((edu, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#B99A5B] font-bold">•</span>
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practice Areas */}
            {memberPractices.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-lg text-[#101C2C] font-semibold">
                  Primary Practice Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {memberPractices.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => navigateTo('practice-detail', p.slug)}
                      className="px-3 py-1.5 bg-white hover:bg-[#EFECE3] border border-[#E4DFD3] hover:border-[#B99A5B] rounded text-xs text-[#101C2C] font-medium transition"
                    >
                      {p.title} →
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Publications */}
            {member.publications.length > 0 && (
              <div className="p-6 rounded-lg bg-white border border-[#E4DFD3] space-y-3">
                <h3 className="font-serif text-lg text-[#101C2C] font-semibold">
                  Publications & Research Contributions
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#5A6474]">
                  {member.publications.map((pub, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-[#B99A5B] font-bold">•</span>
                      <span>{pub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
