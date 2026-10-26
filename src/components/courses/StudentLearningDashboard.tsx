import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  FileDown,
  Award,
  ArrowRight,
  Printer,
  RotateCcw,
  Scale,
  Play,
  Lock,
} from 'lucide-react';
import { Course, Lesson } from '../../types';
import { QuizResult } from '../../utils/legalLogic';

export const StudentLearningDashboard: React.FC = () => {
  const {
    currentUser,
    courses,
    enrolledCourseIds,
    completedLessonIds,
    markLessonComplete,
    certificates,
    submitCourseQuiz,
    navigateTo,
  } = useApp();

  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    enrolledCourses[0]?.id || courses[0]?.id
  );

  const activeCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const allLessons = activeCourse.modules.flatMap((m) => m.lessons);

  const [activeLessonId, setActiveLessonId] = useState<string>(allLessons[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'lecture' | 'quiz' | 'certificate'>('lecture');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const currentLesson: Lesson =
    allLessons.find((l) => l.id === activeLessonId) || allLessons[0];

  const completedInCourse = allLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const progressPercentage = allLessons.length > 0 ? Math.round((completedInCourse / allLessons.length) * 100) : 0;

  const existingCert = certificates.find((c) => c.courseId === activeCourse.id);

  const handleLessonSelect = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveTab('lecture');
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleQuizSubmit = () => {
    const res = submitCourseQuiz(activeCourse.id, quizAnswers);
    setQuizResult(res);
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizResult(null);
  };

  if (enrolledCourses.length === 0) {
    return (
      <div className="bg-[#F7F4ED] min-h-[70vh] py-16 flex items-center justify-center font-sans">
        <div className="max-w-md w-full bg-white p-8 rounded-lg border border-[#E4DFD3] text-center space-y-4 shadow-sm">
          <GraduationCap className="w-12 h-12 text-[#B99A5B] mx-auto" />
          <h2 className="font-serif text-2xl text-[#101C2C]">No Enrolled Courses Yet</h2>
          <p className="text-xs text-[#5A6474]">
            Browse our continuing legal education catalog to enroll in complimentary citizen rights courses or advanced commercial masterclasses.
          </p>
          <button
            onClick={() => navigateTo('courses')}
            className="px-6 py-2.5 bg-[#B99A5B] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded"
          >
            Browse Course Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans min-h-screen">
      {/* Top Header Bar */}
      <section className="bg-[#101C2C] text-[#F7F4ED] py-6 px-4 sm:px-8 border-b border-[#1A2C42]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#B99A5B]">
              <GraduationCap className="w-4 h-4" />
              <span>Student Learning Dashboard • {currentUser.name}</span>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl font-medium">
              {activeCourse.title}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Course Selector Dropdown if multiple enrolled */}
            {enrolledCourses.length > 1 && (
              <select
                value={selectedCourseId}
                onChange={(e) => {
                  setSelectedCourseId(e.target.value);
                  const newC = courses.find((c) => c.id === e.target.value);
                  if (newC && newC.modules[0]?.lessons[0]) {
                    setActiveLessonId(newC.modules[0].lessons[0].id);
                  }
                  setActiveTab('lecture');
                  setQuizResult(null);
                }}
                className="bg-[#1A2C42] text-xs text-[#F7F4ED] border border-[#B99A5B]/30 rounded px-3 py-1.5 focus:outline-none"
              >
                {enrolledCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={() => navigateTo('courses')}
              className="text-xs text-[#B99A5B] hover:text-[#D4BA7E]"
            >
              Browse More Courses
            </button>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: Modules & Lessons */}
          <div className="lg:col-span-4 bg-white rounded-lg border border-[#E4DFD3] shadow-sm overflow-hidden space-y-4">
            {/* Progress Card */}
            <div className="p-5 bg-[#EFECE3] border-b border-[#E4DFD3]">
              <div className="flex justify-between items-center text-xs font-semibold text-[#101C2C] mb-1.5">
                <span>Course Progress</span>
                <span className="font-mono text-[#B99A5B]">{progressPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-[#E4DFD3] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B99A5B] transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-[11px] text-[#5A6474] mt-1.5 block">
                {completedInCourse} of {allLessons.length} lessons completed
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="px-4 flex space-x-2 border-b border-[#E4DFD3] pb-2 text-xs">
              <button
                onClick={() => setActiveTab('lecture')}
                className={`py-1.5 px-3 rounded font-medium transition ${
                  activeTab === 'lecture'
                    ? 'bg-[#101C2C] text-[#F7F4ED]'
                    : 'text-[#5A6474] hover:text-[#101C2C]'
                }`}
              >
                Lessons
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`py-1.5 px-3 rounded font-medium transition ${
                  activeTab === 'quiz'
                    ? 'bg-[#101C2C] text-[#F7F4ED]'
                    : 'text-[#5A6474] hover:text-[#101C2C]'
                }`}
              >
                Assessment Quiz
              </button>
              {(existingCert || quizResult?.hasPassed) && (
                <button
                  onClick={() => setActiveTab('certificate')}
                  className={`py-1.5 px-3 rounded font-medium transition ${
                    activeTab === 'certificate'
                      ? 'bg-[#B99A5B] text-[#101C2C] font-semibold'
                      : 'text-[#B99A5B] hover:text-[#967A3D]'
                  }`}
                >
                  Certificate 🏆
                </button>
              )}
            </div>

            {/* Module Accordions */}
            <div className="p-3 space-y-3 max-h-[60vh] overflow-y-auto">
              {activeCourse.modules.map((mod) => (
                <div key={mod.id} className="rounded border border-[#E4DFD3] overflow-hidden">
                  <div className="bg-[#F7F4ED] p-2.5 text-xs font-serif font-bold text-[#101C2C]">
                    {mod.title}
                  </div>
                  <div className="divide-y divide-[#F7F4ED]">
                    {mod.lessons.map((lesson) => {
                      const isComplete = completedLessonIds.includes(lesson.id);
                      const isSelected = activeLessonId === lesson.id && activeTab === 'lecture';
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonSelect(lesson.id)}
                          className={`w-full text-left p-3 text-xs flex items-center justify-between transition ${
                            isSelected
                              ? 'bg-[#101C2C] text-[#F7F4ED]'
                              : 'hover:bg-[#F7F4ED] text-[#232B38]'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mr-2">
                            {isComplete ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-neutral-300 flex-shrink-0" />
                            )}
                            <span className="line-clamp-1 font-medium">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] opacity-70 flex-shrink-0">
                            {lesson.durationMinutes}m
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Main Pane: Lecture Content, Quiz, or Certificate */}
          <div className="lg:col-span-8">
            {/* TAB 1: Lecture View */}
            {activeTab === 'lecture' && currentLesson && (
              <div className="bg-white rounded-lg border border-[#E4DFD3] p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E4DFD3] gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#B99A5B] uppercase block">
                      Active Lesson
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
                      {currentLesson.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => markLessonComplete(currentLesson.id)}
                    className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition flex items-center space-x-1.5 self-start ${
                      completedLessonIds.includes(currentLesson.id)
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {completedLessonIds.includes(currentLesson.id)
                        ? 'Lesson Completed'
                        : 'Mark as Complete'}
                    </span>
                  </button>
                </div>

                {/* Video Lecture Simulation */}
                <div className="aspect-video bg-[#0A121D] rounded-lg overflow-hidden relative flex items-center justify-center border border-[#1A2C42]">
                  <div className="text-center p-6 space-y-2">
                    <div className="w-14 h-14 rounded-full bg-[#B99A5B]/20 border border-[#B99A5B] flex items-center justify-center mx-auto text-[#B99A5B]">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                    <div className="font-serif text-[#F7F4ED] text-base">
                      {currentLesson.title} — Lecture Recording
                    </div>
                    <div className="text-xs text-neutral-400">
                      Duration: {currentLesson.durationMinutes} minutes • High Court Advocacy Masterclass
                    </div>
                  </div>
                </div>

                {/* Lesson Notes & Statutory Content */}
                <div className="prose prose-sm max-w-none text-[#232B38] space-y-4 leading-relaxed border-t border-[#E4DFD3] pt-6">
                  <div className="whitespace-pre-line text-xs sm:text-sm">
                    {currentLesson.content}
                  </div>
                </div>

                {/* Downloadable Resource */}
                {currentLesson.downloadableResource && (
                  <div className="p-4 rounded-lg bg-[#F7F4ED] border border-[#E4DFD3] flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileDown className="w-5 h-5 text-[#B99A5B]" />
                      <div>
                        <span className="font-semibold text-xs text-[#101C2C] block">
                          {currentLesson.downloadableResource.name}
                        </span>
                        <span className="text-[11px] text-[#5A6474]">
                          Authorized statutory draft template • {currentLesson.downloadableResource.size} ({currentLesson.downloadableResource.format})
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Downloading verified template: ${currentLesson.downloadableResource?.name}`)}
                      className="px-3 py-1.5 bg-[#101C2C] hover:bg-[#1A2C42] text-white text-xs font-medium rounded transition"
                    >
                      Download
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Quiz Assessment */}
            {activeTab === 'quiz' && (
              <div className="bg-white rounded-lg border border-[#E4DFD3] p-6 sm:p-8 shadow-sm space-y-6">
                <div className="pb-4 border-b border-[#E4DFD3]">
                  <span className="text-xs font-mono text-[#B99A5B] uppercase block">
                    Continuing Education Assessment
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
                    {activeCourse.title} — Final Knowledge Assessment
                  </h2>
                  <p className="text-xs text-[#5A6474] mt-1">
                    Pass with 70% or higher to generate your verifiable Certificate of Completion.
                  </p>
                </div>

                {quizResult ? (
                  <div className="space-y-6 animate-in fade-in">
                    <div
                      className={`p-6 rounded-lg text-center border ${
                        quizResult.hasPassed
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                          : 'bg-red-50 border-red-300 text-red-900'
                      }`}
                    >
                      <div className="font-serif text-3xl font-bold">
                        {quizResult.scorePercentage}%
                      </div>
                      <p className="font-medium text-sm mt-1">
                        {quizResult.hasPassed
                          ? 'Congratulations! You have passed the certification examination.'
                          : 'Passing grade is 70%. Review the module notes and attempt again.'}
                      </p>
                      {quizResult.hasPassed && (
                        <div className="mt-4">
                          <button
                            onClick={() => setActiveTab('certificate')}
                            className="px-6 py-2.5 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow transition inline-flex items-center space-x-2"
                          >
                            <Award className="w-4 h-4" />
                            <span>View Your Certificate</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Question Feedback */}
                    <div className="space-y-4">
                      {quizResult.feedback.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg bg-[#F7F4ED] border border-[#E4DFD3] space-y-2 text-xs"
                        >
                          <div className="flex items-start justify-between font-medium text-[#101C2C]">
                            <span>
                              Question {idx + 1}: {activeCourse.quiz[idx].question}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                                item.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {item.isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>
                          <div className="text-[#5A6474] leading-relaxed">
                            <strong>Explanation: </strong>
                            {item.explanation}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleResetQuiz}
                        className="flex items-center space-x-1.5 text-xs text-[#101C2C] hover:text-[#B99A5B] border border-[#E4DFD3] px-4 py-2 rounded"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake Assessment</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {activeCourse.quiz.map((q, qIdx) => (
                      <div key={q.id} className="space-y-3 p-4 rounded-lg bg-[#F7F4ED] border border-[#E4DFD3]">
                        <div className="font-serif text-sm font-semibold text-[#101C2C]">
                          {qIdx + 1}. {q.question}
                        </div>
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => (
                            <label
                              key={optIdx}
                              className={`flex items-center space-x-3 p-3 rounded-lg border text-xs cursor-pointer transition ${
                                quizAnswers[qIdx] === optIdx
                                  ? 'bg-[#101C2C] text-[#F7F4ED] border-[#101C2C]'
                                  : 'bg-white hover:bg-[#EFECE3] border-[#E4DFD3] text-[#232B38]'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${qIdx}`}
                                checked={quizAnswers[qIdx] === optIdx}
                                onChange={() => handleAnswerSelect(qIdx, optIdx)}
                                className="text-[#B99A5B]"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-[#E4DFD3]">
                      <button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizAnswers).length < activeCourse.quiz.length}
                        className="px-6 py-3 bg-[#B99A5B] hover:bg-[#D4BA7E] disabled:opacity-50 text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow transition"
                      >
                        Submit Answers for Evaluation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Verifiable Certificate of Completion */}
            {activeTab === 'certificate' && (
              <div className="bg-white rounded-lg border-2 border-[#B99A5B] p-8 shadow-xl space-y-6 font-serif relative">
                <div className="text-right">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-[#101C2C] text-white text-xs font-sans rounded hover:bg-[#1A2C42] inline-flex items-center space-x-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save Certificate</span>
                  </button>
                </div>

                <div className="border-4 border-[#101C2C] p-8 text-center space-y-4 relative bg-[#F7F4ED]">
                  {/* Seal */}
                  <div className="w-16 h-16 rounded-full border-2 border-[#B99A5B] flex items-center justify-center mx-auto bg-[#101C2C] text-[#B99A5B]">
                    <Scale className="w-8 h-8" />
                  </div>

                  <span className="text-xs font-sans uppercase tracking-widest text-[#B99A5B] font-bold block">
                    LEX GLOBAL ADVOCACY • CONTINUING LEGAL EDUCATION
                  </span>

                  <h2 className="text-3xl font-serif text-[#101C2C] tracking-wide">
                    Certificate of Competency & Completion
                  </h2>

                  <p className="font-sans text-xs text-[#5A6474]">
                    This is to solemnly verify that
                  </p>

                  <div className="text-2xl font-bold text-[#101C2C] border-b border-[#B99A5B] pb-1 max-w-md mx-auto">
                    {existingCert?.studentName || currentUser.name || 'Advocate / Legal Professional'}
                  </div>

                  <p className="font-sans text-xs text-[#5A6474] max-w-lg mx-auto leading-relaxed">
                    has satisfactorily completed all procedural modules, statutory lecture hours, and successfully passed the examination for:
                  </p>

                  <h3 className="text-xl font-bold text-[#101C2C] max-w-lg mx-auto">
                    "{activeCourse.title}"
                  </h3>

                  <div className="pt-6 grid grid-cols-2 gap-8 font-sans text-xs text-[#5A6474] border-t border-[#E4DFD3] max-w-lg mx-auto">
                    <div>
                      <span className="font-serif font-bold text-sm text-[#101C2C] block">
                        Vikramaditya Kashyap
                      </span>
                      <span>Senior Advocate, Director CLE</span>
                    </div>
                    <div>
                      <span className="font-mono text-[#B99A5B] block font-bold">
                        {existingCert?.verificationCode || quizResult?.certificateId || 'CERT-2026-9901'}
                      </span>
                      <span>Verifiable Accreditation Code</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
