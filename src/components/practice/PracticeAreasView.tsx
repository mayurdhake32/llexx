import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Scale,
  Building,
  FileText,
  Shield,
  Award,
  HeartHandshake,
  Home,
  Send,
  Briefcase,
  Search,
  ArrowRight,
} from 'lucide-react';

export const PracticeAreasView: React.FC = () => {
  const { practiceAreas, teamMembers, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Litigation' | 'Property' | 'Corporate' | 'Individual'>('All');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Scale':
        return <Scale className="w-6 h-6 text-[#B99A5B]" />;
      case 'Building':
        return <Building className="w-6 h-6 text-[#B99A5B]" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-[#B99A5B]" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-[#B99A5B]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#B99A5B]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#B99A5B]" />;
      case 'Home':
        return <Home className="w-6 h-6 text-[#B99A5B]" />;
      case 'Send':
        return <Send className="w-6 h-6 text-[#B99A5B]" />;
      default:
        return <Briefcase className="w-6 h-6 text-[#B99A5B]" />;
    }
  };

  const filteredPractices = practiceAreas.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.keyIssues.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === 'Litigation') {
      return ['civil-litigation', 'criminal-law', 'contract-commercial'].includes(p.id);
    }
    if (selectedCategory === 'Property') {
      return ['property-disputes', 'rent-tenancy'].includes(p.id);
    }
    if (selectedCategory === 'Corporate') {
      return ['corporate-support', 'contract-commercial'].includes(p.id);
    }
    if (selectedCategory === 'Individual') {
      return ['consumer-protection', 'family-matrimonial', 'legal-notices'].includes(p.id);
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
              Areas of Legal Practice
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F7F4ED] font-medium leading-tight">
              Comprehensive Litigation & Advisory Capabilities
            </h1>
            <p className="text-sm sm:text-base text-[#D5D0C5] leading-relaxed">
              Explore our 9 distinct practice areas. Each chamber wing is led by specialized advocates with extensive trial and advisory experience before Indian courts and specialized tribunals.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-[#E4DFD3] flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Litigation', 'Property', 'Corporate', 'Individual'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-[#101C2C] text-[#F7F4ED]'
                    : 'bg-[#EFECE3] text-[#232B38] hover:bg-[#E4DFD3]'
                }`}
              >
                {cat === 'All' ? 'All Practices' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by keyword or statute..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F4ED] border border-[#E4DFD3] rounded focus:outline-none focus:border-[#B99A5B]"
            />
          </div>
        </div>
      </section>

      {/* Grid of Practice Areas */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPractices.map((practice) => {
            const leadAdvocate = teamMembers.find((m) => m.id === practice.leadAdvocateId);
            return (
              <div
                key={practice.id}
                onClick={() => navigateTo('practice-detail', practice.slug)}
                className="bg-white rounded-lg border border-[#E4DFD3] hover:border-[#B99A5B] p-7 shadow-sm hover:shadow-md transition duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded bg-[#F7F4ED] border border-[#E4DFD3] flex items-center justify-center group-hover:border-[#B99A5B] transition">
                      {getIcon(practice.iconName)}
                    </div>
                    {leadAdvocate && (
                      <span className="text-[11px] text-[#5A6474] font-medium bg-[#EFECE3] px-2.5 py-1 rounded">
                        Lead: {leadAdvocate.name.split(' ')[0]}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl text-[#101C2C] font-semibold group-hover:text-[#B99A5B] transition">
                    {practice.title}
                  </h3>

                  <p className="text-xs text-[#5A6474] mt-2.5 leading-relaxed line-clamp-3">
                    {practice.shortDesc}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#F7F4ED] space-y-1.5">
                    <span className="text-[10px] uppercase font-mono text-[#B99A5B] block font-bold tracking-wider">
                      Statutory Framework
                    </span>
                    <ul className="text-xs text-[#5A6474] space-y-1">
                      {practice.statutoryFramework.slice(0, 2).map((stat, idx) => (
                        <li key={idx} className="line-clamp-1 flex items-center space-x-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#B99A5B]" />
                          <span>{stat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F7F4ED] flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-mono text-[11px]">
                    {practice.keyIssues.length} Key Issues
                  </span>
                  <span className="text-[#B99A5B] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Full Practice Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPractices.length === 0 && (
          <div className="py-16 text-center text-[#5A6474] text-sm">
            No practice areas matched your search filter "{searchTerm}".
          </div>
        )}
      </section>
    </div>
  );
};
