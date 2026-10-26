import React, { useState } from 'react';
import { DOCUMENT_CHECKLISTS } from '../../data/mockData';
import { CheckSquare, Printer, Check, Info } from 'lucide-react';

export const LegalDocumentChecklists: React.FC = () => {
  const [selectedChecklistId, setSelectedChecklistId] = useState(DOCUMENT_CHECKLISTS[0].id);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const currentChecklist = DOCUMENT_CHECKLISTS.find((c) => c.id === selectedChecklistId) || DOCUMENT_CHECKLISTS[0];

  const toggleCheck = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const totalItems = currentChecklist.items.length;
  const completedCount = currentChecklist.items.filter((item) => !!checkedItems[item.id]).length;
  const completionPercentage = Math.round((completedCount / totalItems) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#F7F4ED] border border-[#E4DFD3] rounded-xl p-6 sm:p-8 text-[#232B38] font-sans shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E4DFD3] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#B99A5B] uppercase tracking-wider">
            <CheckSquare className="w-4 h-4" />
            <span>Interactive Procedural Checklists</span>
          </div>
          <h3 className="font-serif text-2xl text-[#101C2C] font-medium mt-1">
            Legal Document & Procedural Due Diligence
          </h3>
          <p className="text-xs text-[#5A6474] mt-1">
            Review and track mandatory evidentiary records before initiating transactions or court proceedings.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-1.5 text-xs text-[#101C2C] hover:text-[#B99A5B] border border-[#101C2C]/30 hover:border-[#B99A5B] bg-white px-3 py-2 rounded transition self-start"
          title="Print or Save Checklist as PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Export Checklist</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 pt-6 pb-4">
        {DOCUMENT_CHECKLISTS.map((chk) => (
          <button
            key={chk.id}
            onClick={() => {
              setSelectedChecklistId(chk.id);
              setCheckedItems({});
            }}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition ${
              selectedChecklistId === chk.id
                ? 'bg-[#101C2C] text-[#F7F4ED]'
                : 'bg-[#EFECE3] text-[#232B38] hover:bg-[#E4DFD3]'
            }`}
          >
            {chk.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Checklist Header */}
      <div className="bg-[#EFECE3] p-4 rounded-lg mb-6 border border-[#E4DFD3]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-serif text-lg text-[#101C2C] font-semibold">
              {currentChecklist.title}
            </h4>
            <p className="text-xs text-[#5A6474] mt-0.5">{currentChecklist.description}</p>
          </div>
          <div className="text-right sm:flex-shrink-0">
            <span className="text-xs font-bold text-[#101C2C]">
              {completedCount} of {totalItems} verified ({completionPercentage}%)
            </span>
            <div className="w-36 h-2 bg-[#E4DFD3] rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-[#B99A5B] transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Item List */}
      <div className="space-y-2.5">
        {currentChecklist.items.map((item, idx) => {
          const isDone = !!checkedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-lg border transition cursor-pointer flex items-start space-x-3 select-none ${
                isDone
                  ? 'bg-white border-[#B99A5B] shadow-sm'
                  : 'bg-white/70 border-[#E4DFD3] hover:bg-white'
              }`}
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border transition ${
                  isDone
                    ? 'bg-[#B99A5B] border-[#B99A5B] text-white'
                    : 'border-[#5A6474]/50 bg-white'
                }`}
              >
                {isDone && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="flex-1">
                <span
                  className={`text-sm ${
                    isDone ? 'text-[#101C2C] font-medium' : 'text-[#232B38]'
                  }`}
                >
                  <span className="text-xs font-mono text-neutral-400 mr-2">{idx + 1}.</span>
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-start space-x-2 text-xs text-[#5A6474] bg-white p-3 rounded border border-[#E4DFD3]">
        <Info className="w-4 h-4 text-[#B99A5B] flex-shrink-0 mt-0.5" />
        <span>
          <strong>Disclaimer:</strong> Statutory checklist requirements vary by state revenue laws and municipal jurisdiction. Consult an advocate to review certified registry extracts and encumbrance certificates prior to concluding transactions.
        </span>
      </div>
    </div>
  );
};
