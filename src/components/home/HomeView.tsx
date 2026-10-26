import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSection } from './HeroSection';
import { SmartConsultationAssistant } from '../tools/SmartConsultationAssistant';
import { LegalDocumentChecklists } from '../tools/LegalDocumentChecklists';
import {
  Scale,
  Building,
  FileText,
  Shield,
  Award,
  HeartHandshake,
  Home as HomeIcon,
  Send,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Calendar,
  BookOpen,
  GraduationCap,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { practiceAreas, teamMembers, courses, blogs, firmDetails, navigateTo } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Scale':
        return <Scale className="w-5 h-5 text-[#B99A5B]" />;
      case 'Building':
        return <Building className="w-5 h-5 text-[#B99A5B]" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-[#B99A5B]" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#B99A5B]" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#B99A5B]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#B99A5B]" />;
      case 'Home':
        return <HomeIcon className="w-5 h-5 text-[#B99A5B]" />;
      case 'Send':
        return <Send className="w-5 h-5 text-[#B99A5B]" />;
      default:
        return <Briefcase className="w-5 h-5 text-[#B99A5B]" />;
    }
  };

  const featuredPractices = practiceAreas.slice(0, 6);
  const featuredTeam = teamMembers.filter((m) => m.featured).slice(0, 4);
  const featuredCourses = courses.filter((c) => c.featured).slice(0, 3);
  const latestBlogs = blogs.filter((b) => b.status === 'published').slice(0, 3);

  const consultationSteps = [
    {
      num: '01',
      title: 'Preliminary Matter Assessment',
      desc: 'Submit your initial query and documentation securely through our booking portal. Our chamber reviews conflict of interest and jurisdictional standing.',
    },
    {
      num: '02',
      title: 'Evidentiary & Title Audit',
      desc: 'Prior to the consultation, our associates examine the paper trail, statutory limitation deadlines, and applicable High Court or Supreme Court precedents.',
    },
    {
      num: '03',
      title: 'Strategic Consultation',
      desc: 'Engage in a 45-minute confidential session with the designated advocate (in-person at our Delhi/Mumbai chambers or via encrypted video).',
    },
    {
      num: '04',
      title: 'Structured Action Plan',
      desc: 'Receive clear, unembellished guidance on legal remedies, procedural timelines, anticipated costs, and alternative dispute resolution options.',
    },
  ];

  const faqs = [
    {
      q: 'How do I book a consultation with Senior Advocate Vikramaditya Kashyap or designated partners?',
      a: 'You can reserve a consultation directly via our online booking system by selecting your practice area, preferred date, and time slot. Our chamber clerk verifies diary availability and confirms the appointment within 4 working hours.',
    },
    {
      q: 'Does submitting an inquiry on this website create an advocate-client relationship?',
      a: 'No. Under the Advocates Act, 1961 and Bar Council of India rules, no advocate-client relationship is created until a formal conflict check is completed, professional engagement agreed upon, and a formal Vakalatnama or retainer executed.',
    },
    {
      q: 'Are your continuing legal education courses open to law students and non-lawyers?',
      a: 'Yes. Our LMS platform offers courses ranging from foundational citizen rights (e.g., Consumer Protection under CPA 2019) to advanced trial advocacy and commercial contract drafting suitable for practitioners.',
    },
    {
      q: 'How is client confidentiality maintained during electronic consultations and document sharing?',
      a: 'All client portal documents, appointments, and inquiry communications are stored with strict access controls. We adhere to Section 126 of the Indian Evidence Act / BSA safeguarding professional privileged communications.',
    },
  ];

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Short Firm Introduction & Ethos */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B] block">
              About Lex Global Advocacy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#101C2C] leading-snug font-medium">
              Over two decades of principled courtroom advocacy and strategic counsel.
            </h2>
            <div className="w-16 h-0.5 bg-[#B99A5B]" />
          </div>

          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#5A6474] leading-relaxed">
            <p>
              Founded in 1998, Lex Global Advocacy represents clients before the Supreme Court of India, Delhi High Court, Bombay High Court, the National Company Law Appellate Tribunal (NCLAT), and international arbitral tribunals across India and globally.
            </p>
            <p>
              We prioritize intellectual rigor, absolute client confidentiality, and candid advice. We believe that an advocate’s highest duty is to provide objective, unvarnished assessments—assisting clients to resolve disputes through mediation whenever feasible, and mounting steadfast litigation when necessary.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('about')}
                className="text-xs font-semibold text-[#101C2C] hover:text-[#B99A5B] uppercase tracking-wider inline-flex items-center space-x-1.5 transition"
              >
                <span>Read Full Firm & Advocate Biography</span>
                <ArrowRight className="w-4 h-4 text-[#B99A5B]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Practice Areas */}
      <section className="py-16 bg-[#EFECE3] border-y border-[#E4DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B] block">
                Practice Areas
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#101C2C] font-medium mt-1">
                Disciplined Counsel Across Core Disciplines
              </h2>
            </div>
            <button
              onClick={() => navigateTo('practice-areas')}
              className="mt-4 md:mt-0 text-xs font-semibold text-[#101C2C] hover:text-[#B99A5B] uppercase tracking-wider inline-flex items-center space-x-1 transition"
            >
              <span>Explore All 9 Practice Areas</span>
              <ArrowRight className="w-4 h-4 text-[#B99A5B]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPractices.map((practice) => (
              <div
                key={practice.id}
                onClick={() => navigateTo('practice-detail', practice.slug)}
                className="bg-white p-7 rounded-lg border border-[#E4DFD3] hover:border-[#B99A5B] shadow-sm hover:shadow-md transition duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-[#F7F4ED] border border-[#E4DFD3] flex items-center justify-center mb-5 group-hover:border-[#B99A5B] transition">
                    {getIcon(practice.iconName)}
                  </div>
                  <h3 className="font-serif text-xl text-[#101C2C] font-medium group-hover:text-[#B99A5B] transition">
                    {practice.title}
                  </h3>
                  <p className="text-xs text-[#5A6474] mt-2.5 leading-relaxed line-clamp-3">
                    {practice.shortDesc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F7F4ED] flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-mono text-[11px]">
                    {practice.statutoryFramework[0]?.split('(')[0] || 'Indian Law'}
                  </span>
                  <span className="text-[#B99A5B] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Smart Tools (Consultation Assistant + Document Checklists) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B] block">
            Client Empowerment
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#101C2C] font-medium mt-1">
            Smart Legal Tools & Procedural Checklists
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6474] mt-2">
            Use our diagnostic assistant to understand applicable statutory frameworks, or prepare your evidentiary records with our downloadable procedural checklists.
          </p>
        </div>

        <SmartConsultationAssistant />

        <LegalDocumentChecklists />
      </section>

      {/* 5. Consultation Process Walkthrough */}
      <section className="py-20 bg-[#101C2C] text-[#F7F4ED] border-y border-[#1A2C42]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B] block">
              Consultation Protocol
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F4ED] font-medium mt-1">
              How Our Consultation Process Works
            </h2>
            <p className="text-xs text-neutral-400 mt-2">
              A transparent, methodical engagement structure designed to respect your time and provide actionable legal clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {consultationSteps.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-lg bg-[#0A121D] border border-[#1A2C42] hover:border-[#B99A5B]/50 transition duration-300 relative group"
              >
                <div className="text-3xl font-serif text-[#B99A5B] font-light mb-3">
                  {step.num}
                </div>
                <h3 className="font-serif text-lg text-[#F7F4ED] font-medium mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigateTo('book-consultation')}
              className="px-6 py-3 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow transition inline-flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Your Chamber Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. Meet Our Team Preview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B] block">
              Advocates & Counsel
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#101C2C] font-medium mt-1">
              The People Behind Your Legal Support
            </h2>
          </div>
          <button
            onClick={() => navigateTo('team')}
            className="mt-4 md:mt-0 text-xs font-semibold text-[#101C2C] hover:text-[#B99A5B] uppercase tracking-wider inline-flex items-center space-x-1 transition"
          >
            <span>View Full Chamber Roster</span>
            <ArrowRight className="w-4 h-4 text-[#B99A5B]" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTeam.map((member) => (
            <div
              key={member.id}
              onClick={() => navigateTo('team-detail', member.slug)}
              className="bg-white rounded-lg border border-[#E4DFD3] hover:border-[#B99A5B] overflow-hidden shadow-sm hover:shadow-md transition duration-200 cursor-pointer group"
            >
              <div className="h-64 overflow-hidden bg-[#0A121D]">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-mono text-[#B99A5B] uppercase block">
                  {member.barEnrollment}
                </span>
                <h3 className="font-serif text-lg text-[#101C2C] font-semibold mt-1 group-hover:text-[#B99A5B] transition">
                  {member.name}
                </h3>
                <p className="text-xs text-[#5A6474] mt-0.5 line-clamp-1">{member.designation}</p>
                <div className="mt-3 pt-3 border-t border-[#F7F4ED] text-[11px] text-neutral-400">
                  {member.experienceYears}+ years court experience
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Featured Legal Courses (LMS) */}
      <section className="py-20 bg-[#EFECE3] border-y border-[#E4DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B] block">
                Continuing Legal Education
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#101C2C] font-medium mt-1">
                Practical Legal Courses & Masterclasses
              </h2>
            </div>
            <button
              onClick={() => navigateTo('courses')}
              className="mt-4 md:mt-0 text-xs font-semibold text-[#101C2C] hover:text-[#B99A5B] uppercase tracking-wider inline-flex items-center space-x-1 transition"
            >
              <span>Explore All Courses</span>
              <ArrowRight className="w-4 h-4 text-[#B99A5B]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigateTo('course-detail', course.slug)}
                className="bg-white rounded-lg border border-[#E4DFD3] hover:border-[#B99A5B] overflow-hidden shadow-sm hover:shadow-md transition duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#101C2C]/90 text-[#F7F4ED] text-[10px] uppercase font-semibold px-2.5 py-1 rounded border border-[#B99A5B]/40">
                      {course.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-3 text-xs text-[#5A6474] mb-2">
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#B99A5B]" />
                        {course.durationHours} hours
                      </span>
                      <span>•</span>
                      <span className="capitalize">{course.difficulty}</span>
                    </div>

                    <h3 className="font-serif text-lg text-[#101C2C] font-semibold group-hover:text-[#B99A5B] transition leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#5A6474] mt-2 line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-[#F7F4ED] flex items-center justify-between">
                  <div className="font-serif text-lg font-bold text-[#101C2C]">
                    {course.price === 0 ? (
                      <span className="text-emerald-700 font-semibold text-sm">Complimentary</span>
                    ) : (
                      `₹${course.price.toLocaleString('en-IN')}`
                    )}
                  </div>
                  <span className="text-xs text-[#B99A5B] font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                    <span>View Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Latest Legal Commentary & Articles */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B] block">
              Legal Knowledge Hub
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#101C2C] font-medium mt-1">
              Case Analyses & Statutory Commentary
            </h2>
          </div>
          <button
            onClick={() => navigateTo('blogs')}
            className="mt-4 md:mt-0 text-xs font-semibold text-[#101C2C] hover:text-[#B99A5B] uppercase tracking-wider inline-flex items-center space-x-1 transition"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4 text-[#B99A5B]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigateTo('blog-detail', blog.slug)}
              className="bg-white rounded-lg border border-[#E4DFD3] hover:border-[#B99A5B] overflow-hidden shadow-sm hover:shadow-md transition duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#101C2C]/90 text-[#F7F4ED] text-[10px] uppercase font-semibold px-2.5 py-1 rounded">
                    {blog.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 text-[11px] text-[#5A6474] mb-2 font-mono">
                    <span>{blog.publishedDate}</span>
                    <span>•</span>
                    <span>{blog.readTimeMinutes} min read</span>
                  </div>

                  <h3 className="font-serif text-lg text-[#101C2C] font-semibold group-hover:text-[#B99A5B] transition leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-[#5A6474] mt-2 line-clamp-3 leading-relaxed">
                    {blog.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-[#F7F4ED]">
                <span className="text-xs text-[#B99A5B] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Frequently Asked Questions */}
      <section className="py-20 bg-[#EFECE3] border-t border-[#E4DFD3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B99A5B] block">
              Practical Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#101C2C] font-medium mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-[#E4DFD3] overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between text-sm sm:text-base font-serif font-medium text-[#101C2C] hover:text-[#B99A5B] transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#B99A5B] transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#5A6474] leading-relaxed border-t border-[#F7F4ED] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Final Consultation CTA */}
      <section className="py-20 bg-[#101C2C] text-[#F7F4ED] text-center border-t border-[#1A2C42]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="w-12 h-12 rounded border border-[#B99A5B] flex items-center justify-center mx-auto bg-[#1A2C42]">
            <Scale className="w-6 h-6 text-[#B99A5B]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F4ED] font-medium">
            Begin Your Legal Assessment Today
          </h2>
          <p className="text-xs sm:text-sm text-[#D5D0C5] max-w-xl mx-auto leading-relaxed">
            Schedule an in-person conference at our High Court chambers or arrange a confidential video consultation with our senior advocates.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('book-consultation')}
              className="px-8 py-3.5 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow transition"
            >
              Book a Consultation
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-8 py-3.5 bg-transparent hover:bg-[#1A2C42] text-[#F7F4ED] font-medium text-xs uppercase tracking-wider rounded border border-[#B99A5B]/40 transition"
            >
              Contact Chambers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
