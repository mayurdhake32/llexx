import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Clock, BookOpen, GraduationCap, ArrowRight, Check, X, ShieldCheck, Lock } from 'lucide-react';
import { Course } from '../../types';

export const CoursesView: React.FC = () => {
  const { courses, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');

  const categories = ['All', 'Corporate & Commercial', 'Real Estate & Property', 'Litigation & Procedure', 'Consumer & Citizen Rights'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter((course) => {
    if (!course.published) return false;

    if (selectedCategory !== 'All' && course.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'All' && course.difficulty !== selectedDifficulty) return false;

    if (priceFilter === 'free' && course.price > 0) return false;
    if (priceFilter === 'paid' && course.price === 0) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchesTitle = course.title.toLowerCase().includes(q);
      const matchesDesc = course.shortDescription.toLowerCase().includes(q);
      if (!matchesTitle && !matchesDesc) return false;
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
              Continuing Legal Education (CLE)
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F7F4ED] font-medium leading-tight">
              Practical Masterclasses & Legal Education
            </h1>
            <p className="text-sm sm:text-base text-[#D5D0C5] leading-relaxed">
              Taught directly by our chamber partners and senior advocates. Gain actionable mastery over commercial contract drafting, real estate litigation under RERA, and consumer justice.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-[#E4DFD3] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-[#101C2C] text-[#F7F4ED]'
                      : 'bg-[#EFECE3] text-[#232B38] hover:bg-[#E4DFD3]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F4ED] border border-[#E4DFD3] rounded focus:outline-none focus:border-[#B99A5B]"
              />
            </div>
          </div>

          {/* Sub Filters: Difficulty & Price */}
          <div className="pt-3 border-t border-[#F7F4ED] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-neutral-500 font-medium">Difficulty:</span>
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-2.5 py-1 rounded transition ${
                    selectedDifficulty === d
                      ? 'bg-[#B99A5B] text-[#101C2C] font-semibold'
                      : 'text-[#5A6474] hover:text-[#101C2C]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-neutral-500 font-medium">Price:</span>
              <button
                onClick={() => setPriceFilter('all')}
                className={`px-2.5 py-1 rounded transition ${
                  priceFilter === 'all'
                    ? 'bg-[#101C2C] text-white font-semibold'
                    : 'text-[#5A6474] hover:text-[#101C2C]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPriceFilter('free')}
                className={`px-2.5 py-1 rounded transition ${
                  priceFilter === 'free'
                    ? 'bg-[#101C2C] text-white font-semibold'
                    : 'text-[#5A6474] hover:text-[#101C2C]'
                }`}
              >
                Free Only
              </button>
              <button
                onClick={() => setPriceFilter('paid')}
                className={`px-2.5 py-1 rounded transition ${
                  priceFilter === 'paid'
                    ? 'bg-[#101C2C] text-white font-semibold'
                    : 'text-[#5A6474] hover:text-[#101C2C]'
                }`}
              >
                Paid Masterclasses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => navigateTo('course-detail', course.slug)}
              className="bg-white rounded-lg border border-[#E4DFD3] hover:border-[#B99A5B] overflow-hidden shadow-sm hover:shadow-md transition duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative bg-[#0A121D]">
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
                  <div className="flex items-center space-x-3 text-xs text-[#5A6474] mb-2 font-mono">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-[#B99A5B]" />
                      {course.durationHours} hrs
                    </span>
                    <span>•</span>
                    <span className="capitalize">{course.difficulty}</span>
                    <span>•</span>
                    <span>{course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons</span>
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
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase block font-mono">
                    Tuition / Access
                  </span>
                  <span className="font-serif text-lg font-bold text-[#101C2C]">
                    {course.price === 0 ? (
                      <span className="text-emerald-700 font-semibold text-sm">Complimentary</span>
                    ) : (
                      `₹${course.price.toLocaleString('en-IN')}`
                    )}
                  </span>
                </div>

                <span className="text-xs text-[#B99A5B] font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>View Details</span>
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

export const CourseDetailView: React.FC<{ slug?: string }> = ({ slug }) => {
  const { courses, teamMembers, enrolledCourseIds, enrollInCourse, navigateTo } = useApp();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const course = courses.find((c) => c.slug === slug) || courses[0];
  const instructor = teamMembers.find((m) => m.id === course.instructorId);
  const isEnrolled = enrolledCourseIds.includes(course.id);

  const handleEnrollClick = () => {
    if (isEnrolled) {
      navigateTo('learn');
      return;
    }
    if (course.price === 0) {
      enrollInCourse(course.id);
      navigateTo('learn');
    } else {
      setCheckoutModalOpen(true);
    }
  };

  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentDone(true);
      enrollInCourse(course.id);
      setTimeout(() => {
        setCheckoutModalOpen(false);
        navigateTo('learn');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans">
      {/* Course Banner */}
      <section className="bg-[#101C2C] text-[#F7F4ED] py-16 sm:py-24 border-b border-[#1A2C42]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigateTo('courses')}
            className="text-xs text-[#B99A5B] hover:text-[#D4BA7E] inline-flex items-center space-x-1.5 mb-6 transition"
          >
            <span>← Back to All Courses</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-[#1A2C42] text-[#B99A5B] font-semibold px-2.5 py-1 rounded uppercase font-mono">
                  {course.category}
                </span>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-300 capitalize">{course.difficulty} Level</span>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-300">{course.durationHours} Hours Total</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F4ED] font-medium leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-[#D5D0C5] leading-relaxed">
                {course.fullDescription}
              </p>

              {instructor && (
                <div className="pt-4 flex items-center space-x-3 text-xs">
                  <img
                    src={instructor.imageUrl}
                    alt={instructor.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#B99A5B]"
                  />
                  <div>
                    <span className="text-neutral-400 block">Instructor:</span>
                    <span className="text-[#F7F4ED] font-semibold">{instructor.name}</span>
                    <span className="text-[#B99A5B] ml-2">({instructor.designation})</span>
                  </div>
                </div>
              )}
            </div>

            {/* Enrollment Action Box */}
            <div className="lg:col-span-4 bg-white text-[#232B38] p-6 rounded-lg border border-[#E4DFD3] shadow-xl space-y-5">
              <div className="overflow-hidden rounded-md h-40 relative">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-baseline justify-between border-b border-[#E4DFD3] pb-4">
                <span className="text-xs text-[#5A6474] font-medium uppercase font-mono">Enrollment Fee</span>
                <span className="font-serif text-2xl font-bold text-[#101C2C]">
                  {course.price === 0 ? (
                    <span className="text-emerald-700 text-lg">Free Public Access</span>
                  ) : (
                    `₹${course.price.toLocaleString('en-IN')}`
                  )}
                </span>
              </div>

              <button
                onClick={handleEnrollClick}
                className="w-full py-3 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow transition duration-200"
              >
                {isEnrolled ? 'Open Learning Dashboard →' : course.price === 0 ? 'Enroll for Free' : 'Enroll in Masterclass'}
              </button>

              <div className="space-y-2 text-xs text-[#5A6474]">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#B99A5B]" />
                  <span>Full access to video lectures & written materials</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#B99A5B]" />
                  <span>Downloadable procedural drafting templates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#B99A5B]" />
                  <span>Interactive assessment & Verifiable Certificate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum & Learning Outcomes */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-10">
            {/* Outcomes */}
            <div className="bg-white p-7 rounded-lg border border-[#E4DFD3] space-y-4">
              <h3 className="font-serif text-xl text-[#101C2C] font-semibold">
                What You Will Learn
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#5A6474]">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-[#B99A5B] flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E4DFD3] pb-3">
                <h3 className="font-serif text-2xl text-[#101C2C] font-semibold">
                  Course Curriculum
                </h3>
                <span className="text-xs text-[#5A6474] font-mono">
                  {course.modules.length} Modules • {course.modules.reduce((a, b) => a + b.lessons.length, 0)} Lessons
                </span>
              </div>

              <div className="space-y-4">
                {course.modules.map((mod, modIdx) => (
                  <div key={mod.id} className="bg-white rounded-lg border border-[#E4DFD3] overflow-hidden">
                    <div className="bg-[#EFECE3] px-5 py-3.5 border-b border-[#E4DFD3] font-serif text-sm font-semibold text-[#101C2C]">
                      {mod.title}
                    </div>
                    <div className="divide-y divide-[#F7F4ED]">
                      {mod.lessons.map((lesson) => (
                        <div key={lesson.id} className="p-4 flex items-center justify-between text-xs hover:bg-[#F7F4ED] transition">
                          <div className="flex items-center space-x-3">
                            <BookOpen className="w-4 h-4 text-[#B99A5B]" />
                            <span className="font-medium text-[#232B38]">{lesson.title}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-[#5A6474]">{lesson.durationMinutes} mins</span>
                            {lesson.isPreview ? (
                              <span className="px-2 py-0.5 bg-[#B99A5B]/20 text-[#967A3D] font-semibold rounded text-[10px]">
                                Free Preview
                              </span>
                            ) : (
                              <Lock className="w-3.5 h-3.5 text-neutral-400" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prerequisites */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-[#E4DFD3] space-y-3">
              <h4 className="font-serif text-base font-semibold text-[#101C2C]">
                Prerequisites & Target Audience
              </h4>
              <ul className="space-y-2 text-xs text-[#5A6474]">
                {course.prerequisites.map((pre, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#B99A5B] font-bold">•</span>
                    <span>{pre}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal (Razorpay Indian Payment Integration Simulation) */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white max-w-md w-full rounded-lg shadow-2xl p-6 text-[#232B38] font-sans relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#E4DFD3]">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#B99A5B]" />
                <span className="font-serif text-lg font-bold text-[#101C2C]">
                  Secure Course Enrollment
                </span>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="text-neutral-400 hover:text-black p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-5 space-y-4 text-xs">
              <div>
                <span className="text-neutral-400 block">Course Selected:</span>
                <span className="font-semibold text-sm text-[#101C2C]">{course.title}</span>
              </div>

              <div className="p-3 bg-[#F7F4ED] rounded border border-[#E4DFD3] space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span>Tuition Fee:</span>
                  <span>₹{course.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>GST (18% Included):</span>
                  <span>₹{Math.round(course.price * 0.18).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-[#E4DFD3] pt-1.5 text-sm text-[#101C2C]">
                  <span>Total Payable:</span>
                  <span>₹{course.price.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded border border-neutral-200 text-[11px] text-neutral-600">
                <strong>Razorpay Payment Gateway Integration:</strong> Test mode enabled. Clicking below validates server-side enrollment state and issues immediate course access.
              </div>

              {paymentDone ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-center rounded font-semibold animate-in fade-in">
                  ✓ Payment Verified! Redirecting to student dashboard...
                </div>
              ) : (
                <button
                  onClick={handleConfirmPayment}
                  disabled={isProcessingPayment}
                  className="w-full py-3 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow transition flex items-center justify-center space-x-2"
                >
                  {isProcessingPayment ? (
                    <span>Verifying Transaction with Gateway...</span>
                  ) : (
                    <span>Confirm & Pay ₹{course.price.toLocaleString('en-IN')}</span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
