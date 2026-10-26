import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SMART_CONSULTATION_TREE } from '../../data/mockData';
import { HelpCircle, ArrowRight, RotateCcw, Calendar, BookOpen, ShieldCheck } from 'lucide-react';

export const SmartConsultationAssistant: React.FC = () => {
  const { navigateTo } = useApp();
  const [currentStepId, setCurrentStepId] = useState<string>('q-mat-type');
  const [history, setHistory] = useState<string[]>([]);
  const [completedGuidance, setCompletedGuidance] = useState<{
    guidance: string;
    practiceAreaId?: string;
    recommendedCourse?: string;
  } | null>(null);

  const currentQuestionObj = SMART_CONSULTATION_TREE.find((q) => q.id === currentStepId);

  const handleOptionClick = (opt: any) => {
    if (opt.guidance) {
      setCompletedGuidance({
        guidance: opt.guidance,
        practiceAreaId: opt.practiceAreaId,
        recommendedCourse: opt.recommendedCourse,
      });
    } else if (opt.next) {
      setHistory((prev) => [...prev, currentStepId]);
      setCurrentStepId(opt.next);
    }
  };

  const handleReset = () => {
    setCurrentStepId('q-mat-type');
    setHistory([]);
    setCompletedGuidance(null);
  };

  const handleBack = () => {
    if (completedGuidance) {
      setCompletedGuidance(null);
      return;
    }
    if (history.length > 0) {
      const prevStep = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentStepId(prevStep);
    }
  };

  return (
    <div className="bg-[#101C2C] border border-[#B99A5B]/30 rounded-xl p-6 sm:p-8 text-[#F7F4ED] shadow-xl font-sans relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
        <HelpCircle className="w-56 h-56 text-[#B99A5B]" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#1A2C42] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#B99A5B] uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Legal Guidance Assistant</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#F7F4ED] font-medium mt-1">
            Identify Your Legal Matter & Recommended Next Steps
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Answer 2 quick questions to understand the applicable Indian statutory framework and prepare for your consultation.
          </p>
        </div>

        {(history.length > 0 || completedGuidance) && (
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 text-xs text-[#B99A5B] hover:text-[#D4BA7E] border border-[#B99A5B]/40 px-3 py-1.5 rounded transition self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Over</span>
          </button>
        )}
      </div>

      <div className="py-6">
        {!completedGuidance && currentQuestionObj && (
          <div className="space-y-4">
            <div className="text-xs text-[#B99A5B] font-mono">
              Step {history.length + 1} of 2
            </div>
            <h4 className="font-serif text-lg sm:text-xl text-[#F7F4ED]">
              {currentQuestionObj.question}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentQuestionObj.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className="p-4 rounded-lg bg-[#0A121D] hover:bg-[#1A2C42] border border-[#1A2C42] hover:border-[#B99A5B]/50 text-left transition flex items-center justify-between group"
                >
                  <span className="text-sm text-neutral-200 group-hover:text-[#F7F4ED]">
                    {opt.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#B99A5B] flex-shrink-0 ml-2" />
                </button>
              ))}
            </div>

            {history.length > 0 && (
              <div className="pt-2">
                <button
                  onClick={handleBack}
                  className="text-xs text-neutral-400 hover:text-[#F7F4ED] underline"
                >
                  ← Go back to previous question
                </button>
              </div>
            )}
          </div>
        )}

        {completedGuidance && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="p-5 rounded-lg bg-[#0A121D] border border-[#B99A5B]/40 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#B99A5B] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Directional Legal Assessment</span>
              </div>
              <p className="text-sm text-neutral-200 leading-relaxed">
                {completedGuidance.guidance}
              </p>
              <div className="p-3 bg-[#101C2C] rounded text-xs text-neutral-400 border border-[#1A2C42]">
                <strong>Important Note:</strong> This assessment is provided strictly for educational orientation and does not constitute a definitive legal opinion or create an advocate-client relationship.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigateTo('book-consultation')}
                className="px-5 py-2.5 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded shadow transition flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Chamber Consultation for this Matter</span>
              </button>

              {completedGuidance.practiceAreaId && (
                <button
                  onClick={() => navigateTo('practice-detail', completedGuidance.practiceAreaId)}
                  className="px-4 py-2.5 bg-[#1A2C42] hover:bg-[#233852] text-[#F7F4ED] text-xs font-medium rounded border border-[#233852] transition flex items-center space-x-2"
                >
                  <span>Explore Practice Area Details</span>
                </button>
              )}

              {completedGuidance.recommendedCourse && (
                <button
                  onClick={() => navigateTo('course-detail', completedGuidance.recommendedCourse)}
                  className="px-4 py-2.5 bg-[#1A2C42] hover:bg-[#233852] text-[#B99A5B] text-xs font-medium rounded border border-[#B99A5B]/30 transition flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>View Related Legal Masterclass</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
