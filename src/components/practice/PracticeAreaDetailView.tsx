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
  ChevronDown,
  ArrowRight,
  BookOpen,
  Calendar,
  ShieldAlert,
  ArrowLeft,
} from 'lucide-react';

export const PracticeAreaDetailView: React.FC<{ slug?: string }> = ({ slug }) => {
  const { practiceAreas, teamMembers, courses, blogs, navigateTo } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const practice = practiceAreas.find((p) => p.slug === slug) || practiceAreas[0];
  const leadAdvocate = teamMembers.find((m) => m.id === practice.leadAdvocateId);

  const relatedCourseObjects = courses.filter((c) => practice.relatedCourses.includes(c.id));
  const relatedBlogObjects = blogs.filter((b) => practice.relatedBlogs.includes(b.id));

  const getIcon = (name: string) => {
    switch (name) {
      case 'Scale':
        return <Scale className="w-8 h-8 text-[#B99A5B]" />;
      case 'Building':
        return <Building className="w-8 h-8 text-[#B99A5B]" />;
      case 'FileText':
        return <FileText className="w-8 h-8 text-[#B99A5B]" />;
      case 'Shield':
        return <Shield className="w-8 h-8 text-[#B99A5B]" />;
      case 'Award':
        return <Award className="w-8 h-8 text-[#B99A5B]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-8 h-8 text-[#B99A5B]" />;
      case 'Home':
        return <Home className="w-8 h-8 text-[#B99A5B]" />;
      case 'Send':
        return <Send className="w-8 h-8 text-[#B99A5B]" />;
      default:
        return <Briefcase className="w-8 h-8 text-[#B99A5B]" />;
    }
  };

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans">
      {/* Header */}
      <section className="bg-[#101C2C] text-[#F7F4ED] py-16 sm:py-24 border-b border-[#1A2C42]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigateTo('practice-areas')}
            className="text-xs text-[#B99A5B] hover:text-[#D4BA7E] inline-flex items-center space-x-1.5 mb-6 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Practice Areas</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded bg-[#1A2C42] border border-[#B99A5B] flex items-center justify-center">
                  {getIcon(practice.iconName)}
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#B99A5B]">
                  Practice Focus
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl text-[#F7F4ED] font-medium leading-tight">
                {practice.title}
              </h1>
              <p className="text-sm sm:text-base text-[#D5D0C5] leading-relaxed">
                {practice.shortDesc}
              </p>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => navigateTo('book-consultation')}
                className="px-6 py-3.5 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow transition flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation for this Area</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. Overview */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-[#101C2C] font-semibold border-b border-[#E4DFD3] pb-3">
                Overview & Judicial Scope
              </h2>
              <p className="text-sm sm:text-base text-[#5A6474] leading-relaxed">
                {practice.longDesc}
              </p>
            </div>

            {/* 2. Statutory Framework */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E4DFD3] space-y-4">
              <h3 className="font-serif text-xl text-[#101C2C] font-semibold flex items-center space-x-2">
                <Scale className="w-5 h-5 text-[#B99A5B]" />
                <span>Applicable Indian Statutory Framework</span>
              </h3>
              <p className="text-xs text-[#5A6474]">
                Our pleadings and strategic defenses are grounded in these core enactments and authoritative judicial interpretations:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#232B38] pt-2">
                {practice.statutoryFramework.map((stat, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99A5B] mt-2 flex-shrink-0" />
                    <span className="font-medium">{stat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Common Issues & Concerns */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-[#101C2C] font-semibold border-b border-[#E4DFD3] pb-3">
                Key Disputes & Common Legal Concerns
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {practice.keyIssues.map((issue, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-[#EFECE3] border border-[#E4DFD3] flex items-start space-x-3">
                    <span className="text-xs font-mono font-bold text-[#B99A5B] mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="text-xs sm:text-sm text-[#232B38] font-medium leading-relaxed">
                      {issue}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. General Process Workflow */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-[#101C2C] font-semibold border-b border-[#E4DFD3] pb-3">
                General Procedural Steps & Timeline
              </h3>
              <div className="space-y-4">
                {practice.processSteps.map((step, idx) => (
                  <div key={idx} className="p-5 rounded-lg bg-white border border-[#E4DFD3] flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-[#101C2C] text-[#F7F4ED] font-serif text-sm font-semibold flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#101C2C] font-semibold">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#5A6474] mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. FAQs */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-[#101C2C] font-semibold border-b border-[#E4DFD3] pb-3">
                Practice Area FAQs
              </h3>
              <div className="space-y-3">
                {practice.faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className="bg-white rounded-lg border border-[#E4DFD3] overflow-hidden">
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full text-left p-5 flex items-center justify-between font-serif text-base text-[#101C2C] hover:text-[#B99A5B] transition"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-[#B99A5B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-xs sm:text-sm text-[#5A6474] leading-relaxed border-t border-[#F7F4ED] pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legal Information Disclaimer */}
            <div className="p-4 rounded-lg bg-[#EFECE3] border border-[#E4DFD3] text-xs text-[#5A6474] flex items-start space-x-2.5">
              <ShieldAlert className="w-4 h-4 text-[#B99A5B] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Information Disclaimer:</strong> The explanations provided on this practice area page are intended exclusively for general educational and informational guidance under Indian law. They do not constitute formal legal counsel. For specific issues, please arrange an official consultation with the chamber.
              </span>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Lead Advocate Card */}
            {leadAdvocate && (
              <div className="bg-white rounded-lg border border-[#E4DFD3] overflow-hidden shadow-sm p-6 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B99A5B] block mb-3 font-semibold">
                  Designated Lead Counsel
                </span>
                <img
                  src={leadAdvocate.imageUrl}
                  alt={leadAdvocate.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-[#B99A5B] mb-3"
                />
                <h4 className="font-serif text-lg font-bold text-[#101C2C]">
                  {leadAdvocate.name}
                </h4>
                <p className="text-xs text-[#5A6474]">{leadAdvocate.designation}</p>
                <div className="text-[11px] font-mono text-[#B99A5B] mt-1">
                  {leadAdvocate.barEnrollment}
                </div>

                <div className="mt-4 pt-4 border-t border-[#F7F4ED] space-y-2">
                  <button
                    onClick={() => navigateTo('team-detail', leadAdvocate.slug)}
                    className="w-full py-2 bg-[#F7F4ED] hover:bg-[#EFECE3] text-xs font-semibold text-[#101C2C] rounded border border-[#E4DFD3] transition"
                  >
                    View Full Advocate Profile
                  </button>
                  <button
                    onClick={() => navigateTo('book-consultation')}
                    className="w-full py-2 bg-[#B99A5B] hover:bg-[#D4BA7E] text-xs font-semibold text-[#101C2C] rounded transition"
                  >
                    Schedule Direct Consultation
                  </button>
                </div>
              </div>
            )}

            {/* Related Courses */}
            {relatedCourseObjects.length > 0 && (
              <div className="bg-white rounded-lg border border-[#E4DFD3] p-6 space-y-4">
                <h4 className="font-serif text-base font-semibold text-[#101C2C] flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-[#B99A5B]" />
                  <span>Related Courses</span>
                </h4>
                <div className="space-y-3">
                  {relatedCourseObjects.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => navigateTo('course-detail', c.slug)}
                      className="p-3 rounded bg-[#F7F4ED] hover:bg-[#EFECE3] border border-[#E4DFD3] cursor-pointer group transition"
                    >
                      <h5 className="font-serif text-xs font-bold text-[#101C2C] group-hover:text-[#B99A5B] line-clamp-2">
                        {c.title}
                      </h5>
                      <span className="text-[11px] text-[#5A6474] mt-1 block">
                        {c.durationHours} hrs • {c.price === 0 ? 'Free' : `₹${c.price.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Articles */}
            {relatedBlogObjects.length > 0 && (
              <div className="bg-white rounded-lg border border-[#E4DFD3] p-6 space-y-4">
                <h4 className="font-serif text-base font-semibold text-[#101C2C] flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#B99A5B]" />
                  <span>Related Legal Commentary</span>
                </h4>
                <div className="space-y-3">
                  {relatedBlogObjects.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => navigateTo('blog-detail', b.slug)}
                      className="p-3 rounded bg-[#F7F4ED] hover:bg-[#EFECE3] border border-[#E4DFD3] cursor-pointer group transition"
                    >
                      <h5 className="font-serif text-xs font-bold text-[#101C2C] group-hover:text-[#B99A5B] line-clamp-2">
                        {b.title}
                      </h5>
                      <span className="text-[11px] text-[#5A6474] mt-1 block">
                        {b.publishedDate} • {b.readTimeMinutes} min read
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
