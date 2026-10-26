import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  FileText,
  Upload,
  Calendar,
  Clock,
  Send,
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Scale,
  UserCheck,
} from 'lucide-react';

export const ClientPortalView: React.FC = () => {
  const {
    currentUser,
    switchUserRole,
    clientMatters,
    uploadClientDocument,
    sendMatterMessage,
    navigateTo,
    openAuthModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'matter' | 'documents' | 'messages'>('matter');
  const [docUploadModalOpen, setDocUploadModalOpen] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<'Client Uploads' | 'Evidence & Annexures' | 'Pleadings'>('Client Uploads');
  const [messageInput, setMessageInput] = useState('');

  // Find matter for current client or default demo matter
  const clientMatter = clientMatters[0];

  const handleDocUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;
    uploadClientDocument(clientMatter.id, newDocName, newDocCategory);
    setNewDocName('');
    setDocUploadModalOpen(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendMatterMessage(clientMatter.id, messageInput);
    setMessageInput('');
  };

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans min-h-screen">
      {/* Header */}
      <section className="bg-[#101C2C] text-[#F7F4ED] py-6 px-4 sm:px-8 border-b border-[#1A2C42]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#B99A5B]">
              <Lock className="w-3.5 h-3.5" />
              <span>Privileged Client Matter Portal • {currentUser.name}</span>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl font-medium">
              Matter Record: {clientMatter.matterNumber}
            </h1>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            {currentUser.role !== 'client' ? (
              <button
                onClick={() => openAuthModal('client')}
                className="px-3 py-1.5 bg-[#1A2C42] hover:bg-[#23354C] text-[#B99A5B] border border-[#B99A5B]/40 rounded flex items-center space-x-1"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Client Sign In</span>
              </button>
            ) : (
              <div className="text-neutral-400 font-mono">
                Client ID: <span className="text-[#F7F4ED]">CL-2025-184</span>
              </div>
            )}
            <div className="bg-[#0A121D] px-3 py-1 rounded text-neutral-400 border border-[#1A2C42]">
              Case Status: <span className="text-[#B99A5B] font-semibold">{clientMatter.status}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Matter Card & Tabs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-[#E4DFD3] shadow-sm space-y-4">
              <div>
                <span className="text-[10px] font-mono text-[#B99A5B] uppercase block">
                  Judicial Forum
                </span>
                <h3 className="font-serif text-lg font-bold text-[#101C2C]">
                  {clientMatter.courtForum}
                </h3>
                <p className="text-xs text-[#5A6474] mt-0.5">{clientMatter.caseType}</p>
              </div>

              <div className="p-3 bg-[#F7F4ED] rounded border border-[#E4DFD3] space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Matter Number:</span>
                  <span className="font-semibold text-[#101C2C]">{clientMatter.matterNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Institution Date:</span>
                  <span>{clientMatter.filingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Next Hearing:</span>
                  <span className="font-bold text-[#B99A5B]">
                    {clientMatter.nextHearingDate || 'Awaiting Cause List'}
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-1.5 pt-2 border-t border-[#E4DFD3]">
                <button
                  onClick={() => setActiveTab('matter')}
                  className={`w-full text-left p-2.5 rounded text-xs font-medium transition flex items-center justify-between ${
                    activeTab === 'matter'
                      ? 'bg-[#101C2C] text-[#F7F4ED]'
                      : 'hover:bg-[#F7F4ED] text-[#232B38]'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Scale className="w-4 h-4 text-[#B99A5B]" />
                    <span>Proceedings Timeline</span>
                  </div>
                  <span className="text-[10px] font-mono">
                    {clientMatter.stages.length} Stages
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('documents')}
                  className={`w-full text-left p-2.5 rounded text-xs font-medium transition flex items-center justify-between ${
                    activeTab === 'documents'
                      ? 'bg-[#101C2C] text-[#F7F4ED]'
                      : 'hover:bg-[#F7F4ED] text-[#232B38]'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[#B99A5B]" />
                    <span>Case Documents & Pleadings</span>
                  </div>
                  <span className="text-[10px] font-mono">
                    {clientMatter.documents.length} Files
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full text-left p-2.5 rounded text-xs font-medium transition flex items-center justify-between ${
                    activeTab === 'messages'
                      ? 'bg-[#101C2C] text-[#F7F4ED]'
                      : 'hover:bg-[#F7F4ED] text-[#232B38]'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4 text-[#B99A5B]" />
                    <span>Advocate Communications</span>
                  </div>
                  <span className="text-[10px] font-mono">
                    {clientMatter.messages.length} Messages
                  </span>
                </button>
              </div>
            </div>

            {/* Privilege Security Card */}
            <div className="p-4 rounded-lg bg-[#EFECE3] border border-[#E4DFD3] text-xs text-[#5A6474] space-y-2">
              <div className="flex items-center space-x-1.5 text-[#101C2C] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#B99A5B]" />
                <span>Privilege & Security Safeguards</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All pleadings and hearing notes within this client portal are protected by professional privilege under Section 126 of the Indian Evidence Act.
              </p>
            </div>
          </div>

          {/* Right Column: Tab View */}
          <div className="lg:col-span-8">
            {/* TAB 1: Proceedings Timeline */}
            {activeTab === 'matter' && (
              <div className="bg-white rounded-lg border border-[#E4DFD3] p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-[#B99A5B] uppercase block">
                    Judicial Progress
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
                    Chronological Hearing Schedule
                  </h2>
                  <p className="text-xs text-[#5A6474] mt-1">{clientMatter.summary}</p>
                </div>

                <div className="space-y-6 pt-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#E4DFD3]">
                  {clientMatter.stages.map((stage, idx) => {
                    const isCompleted = stage.status === 'completed';
                    const isCurrent = stage.status === 'current';
                    return (
                      <div key={idx} className="relative flex items-start space-x-4 pl-2">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 text-xs font-bold ${
                            isCompleted
                              ? 'bg-emerald-600 text-white'
                              : isCurrent
                              ? 'bg-[#B99A5B] text-[#101C2C] ring-4 ring-[#B99A5B]/20'
                              : 'bg-neutral-200 text-neutral-600'
                          }`}
                        >
                          {idx + 1}
                        </div>

                        <div className="flex-1 p-4 rounded-lg bg-[#F7F4ED] border border-[#E4DFD3] space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                            <span className="font-serif text-base font-bold text-[#101C2C]">
                              {stage.title}
                            </span>
                            <span className="font-mono text-[#B99A5B]">{stage.date}</span>
                          </div>
                          <p className="text-xs text-[#5A6474] leading-relaxed pt-1">
                            {stage.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: Documents */}
            {activeTab === 'documents' && (
              <div className="bg-white rounded-lg border border-[#E4DFD3] p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E4DFD3] gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#B99A5B] uppercase block">
                      Secure Repository
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
                      Case Documents & Orders
                    </h2>
                  </div>

                  <button
                    onClick={() => setDocUploadModalOpen(true)}
                    className="px-4 py-2 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded transition flex items-center space-x-1.5 self-start"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Document</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {clientMatter.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-lg bg-[#F7F4ED] border border-[#E4DFD3] flex items-center justify-between hover:border-[#B99A5B] transition group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded bg-white border border-[#E4DFD3] flex items-center justify-center text-[#B99A5B]">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-medium text-xs text-[#101C2C] block">
                            {doc.name}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {doc.category} • {doc.size} • Uploaded {doc.uploadedAt} by {doc.uploadedBy}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`Downloading signed copy: ${doc.name}`)}
                        className="p-2 text-neutral-500 hover:text-[#B99A5B] bg-white rounded border border-[#E4DFD3] transition"
                        title="Download Document"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Messages Thread */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg border border-[#E4DFD3] p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-[#B99A5B] uppercase block">
                    Direct Chambers Channel
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
                    Privileged Client-Advocate Messaging
                  </h2>
                </div>

                {/* Message Log */}
                <div className="space-y-4 max-h-[50vh] overflow-y-auto p-3 bg-[#F7F4ED] rounded-lg border border-[#E4DFD3]">
                  {clientMatter.messages.map((msg) => {
                    const isMe =
                      (currentUser.role === 'admin' && msg.sender === 'advocate') ||
                      (currentUser.role === 'client' && msg.sender === 'client');
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div className="text-[10px] font-mono text-neutral-400 mb-1">
                          {msg.senderName} • {msg.timestamp}
                        </div>
                        <div
                          className={`p-3.5 rounded-lg max-w-md text-xs leading-relaxed ${
                            isMe
                              ? 'bg-[#101C2C] text-[#F7F4ED] rounded-tr-none'
                              : 'bg-white text-[#232B38] border border-[#E4DFD3] rounded-tl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Input form */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type privileged message to your designated counsel..."
                    className="flex-1 text-xs p-3 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded flex items-center space-x-1.5 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      {docUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white max-w-md w-full rounded-lg shadow-2xl p-6 text-[#232B38] font-sans relative space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#101C2C] border-b border-[#E4DFD3] pb-3">
              Upload Case Document
            </h3>

            <form onSubmit={handleDocUpload} className="space-y-4 text-xs">
              <div>
                <label className="font-medium text-[#232B38] block mb-1">Document Title *</label>
                <input
                  type="text"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="e.g. Bank-Statement-Payment-Proof.pdf"
                  className="w-full p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                  required
                />
              </div>

              <div>
                <label className="font-medium text-[#232B38] block mb-1">Category</label>
                <select
                  value={newDocCategory}
                  onChange={(e) => setNewDocCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] focus:outline-none focus:border-[#B99A5B]"
                >
                  <option value="Client Uploads">Client Uploads</option>
                  <option value="Evidence & Annexures">Evidence & Annexures</option>
                  <option value="Pleadings">Pleadings</option>
                </select>
              </div>

              <div className="p-3 bg-[#F7F4ED] rounded border border-dashed border-[#B99A5B] text-center text-neutral-500">
                <Upload className="w-6 h-6 text-[#B99A5B] mx-auto mb-1" />
                <span>Simulated Secure File Dropzone (PDF, DOCX up to 25MB)</span>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDocUploadModalOpen(false)}
                  className="px-4 py-2 bg-neutral-200 rounded text-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold rounded"
                >
                  Save to Matter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
