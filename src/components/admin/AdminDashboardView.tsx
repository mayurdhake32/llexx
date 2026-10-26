import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Calendar,
  Mail,
  Users,
  BookOpen,
  GraduationCap,
  Shield,
  FileText,
  Plus,
  Scale,
  Check,
  X,
  Edit3,
  Trash2,
  Clock,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { BlogPost, TeamMember, Course, Appointment, ContactInquiry } from '../../types';

export const AdminDashboardView: React.FC = () => {
  const {
    currentUser,
    switchUserRole,
    appointments,
    updateAppointmentStatus,
    inquiries,
    updateInquiryStatus,
    teamMembers,
    updateTeamMember,
    addTeamMember,
    blogs,
    saveBlogPost,
    deleteBlogPost,
    courses,
    updateCourse,
    auditLogs,
    practiceAreas,
    navigateTo,
    openAuthModal,
  } = useApp();

  const [activeModule, setActiveModule] = useState<
    'overview' | 'appointments' | 'inquiries' | 'team' | 'blogs' | 'courses' | 'audit'
  >('overview');

  // Blog Editor State
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isNewBlog, setIsNewBlog] = useState(false);

  // Team Editor State
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Metric computations
  const pendingAppointments = appointments.filter((a) => a.status === 'pending').length;
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;
  const publishedArticles = blogs.filter((b) => b.status === 'published').length;

  const handleCreateBlog = () => {
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      slug: `new-legal-commentary-${Date.now()}`,
      title: 'New Legal Commentary & Case Analysis',
      subtitle: 'Critical evaluation of recent statutory amendments and judicial directions.',
      coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
      category: 'Property and Real Estate Law',
      tags: ['Supreme Court', 'Civil Procedure'],
      authorId: teamMembers[0]?.id || 'team-vikramaditya',
      publishedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      readTimeMinutes: 5,
      summary: 'Executive summary of key statutory propositions and practical takeaways for practitioners.',
      content: `## Analysis of Recent Judicial Pronouncements

Detailed examination of legal doctrine and evidentiary standards under Indian law.

### 1. Key Principles
- Clear adherence to statutory limitation
- Evidentiary burden of proof on the claimant
- Preserving appellate grounds`,
      status: 'draft',
      featured: false,
    };
    setEditingBlog(newPost);
    setIsNewBlog(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    saveBlogPost(editingBlog);
    setEditingBlog(null);
    setIsNewBlog(false);
  };

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans min-h-screen">
      {/* Top Header Strip */}
      <section className="bg-[#101C2C] text-[#F7F4ED] py-6 px-4 sm:px-8 border-b border-[#1A2C42]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#B99A5B]">
              <LayoutDashboard className="w-4 h-4" />
              <span>Chamber Administration Portal • High Court of Delhi</span>
            </div>
            <h1 className="font-serif text-2xl font-medium">
              Administrator Master Control Panel
            </h1>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            {currentUser.role !== 'admin' ? (
              <button
                onClick={() => openAuthModal('chamber')}
                className="px-3 py-1.5 bg-[#1A2C42] hover:bg-[#23354C] text-[#B99A5B] border border-[#B99A5B]/40 rounded flex items-center space-x-1"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Chamber Counsel Sign In</span>
              </button>
            ) : (
              <span className="text-neutral-400 font-mono">
                Counsel ID: <strong className="text-[#F7F4ED]">D/458/1998</strong>
              </span>
            )}
            <span className="text-neutral-400 font-mono">
              Signed in: <strong className="text-[#F7F4ED]">{currentUser.name}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-[#E4DFD3] text-xs font-medium">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'appointments', label: `Appointments (${appointments.length})`, icon: Calendar },
            { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: Mail },
            { id: 'blogs', label: `Articles (${blogs.length})`, icon: FileText },
            { id: 'team', label: `Advocates (${teamMembers.length})`, icon: Users },
            { id: 'courses', label: `LMS Courses (${courses.length})`, icon: GraduationCap },
            { id: 'audit', label: `Security Logs (${auditLogs.length})`, icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveModule(tab.id as any);
                  setEditingBlog(null);
                  setEditingMember(null);
                }}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg transition ${
                  activeModule === tab.id
                    ? 'bg-[#101C2C] text-[#F7F4ED]'
                    : 'bg-white text-[#5A6474] hover:bg-[#EFECE3] border border-[#E4DFD3]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#B99A5B]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* MODULE 1: Overview */}
        {activeModule === 'overview' && (
          <div className="space-y-8 pt-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border border-[#E4DFD3] shadow-sm">
                <span className="text-xs text-[#5A6474] font-mono uppercase block">Total Consultations</span>
                <div className="font-serif text-3xl font-bold text-[#101C2C] mt-1">
                  {appointments.length}
                </div>
                <span className="text-[11px] text-[#B99A5B] font-medium block mt-1">
                  {pendingAppointments} Pending Confirmation
                </span>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#E4DFD3] shadow-sm">
                <span className="text-xs text-[#5A6474] font-mono uppercase block">Contact Inquiries</span>
                <div className="font-serif text-3xl font-bold text-[#101C2C] mt-1">
                  {inquiries.length}
                </div>
                <span className="text-[11px] text-emerald-700 font-medium block mt-1">
                  {newInquiries} Requiring Chamber Review
                </span>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#E4DFD3] shadow-sm">
                <span className="text-xs text-[#5A6474] font-mono uppercase block">Published Articles</span>
                <div className="font-serif text-3xl font-bold text-[#101C2C] mt-1">
                  {publishedArticles}
                </div>
                <span className="text-[11px] text-[#5A6474] block mt-1">
                  Knowledge Hub Active
                </span>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#E4DFD3] shadow-sm">
                <span className="text-xs text-[#5A6474] font-mono uppercase block">Active CLE Courses</span>
                <div className="font-serif text-3xl font-bold text-[#101C2C] mt-1">
                  {courses.length}
                </div>
                <span className="text-[11px] text-[#B99A5B] block mt-1">
                  Integrated LMS Curriculum
                </span>
              </div>
            </div>

            {/* Quick Actions & Recent Queue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Consultations */}
              <div className="bg-white p-6 rounded-lg border border-[#E4DFD3] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#E4DFD3] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#101C2C]">
                    Pending Consultation Requests
                  </h3>
                  <button
                    onClick={() => setActiveModule('appointments')}
                    className="text-xs text-[#B99A5B] hover:underline"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-3">
                  {appointments.slice(0, 3).map((appt) => (
                    <div
                      key={appt.id}
                      className="p-3 rounded bg-[#F7F4ED] border border-[#E4DFD3] flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#101C2C] block">{appt.clientName}</span>
                        <span className="text-neutral-500 font-mono">
                          {appt.date} • {appt.timeSlot} • {appt.referenceNumber}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                          appt.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {appt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Inquiries */}
              <div className="bg-white p-6 rounded-lg border border-[#E4DFD3] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#E4DFD3] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#101C2C]">
                    Latest Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveModule('inquiries')}
                    className="text-xs text-[#B99A5B] hover:underline"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-3">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div
                      key={inq.id}
                      className="p-3 rounded bg-[#F7F4ED] border border-[#E4DFD3] flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#101C2C] block">{inq.name}</span>
                        <span className="text-neutral-500 line-clamp-1">{inq.subject}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#B99A5B] uppercase">
                        {inq.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 2: Appointments */}
        {activeModule === 'appointments' && (
          <div className="space-y-6 pt-6">
            <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
              Consultation Bookings Management
            </h2>

            <div className="bg-white rounded-lg border border-[#E4DFD3] overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFECE3] border-b border-[#E4DFD3] font-mono text-neutral-600 uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Reference</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Practice Discipline</th>
                    <th className="p-4">Date & Slot</th>
                    <th className="p-4">Mode</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F4ED]">
                  {appointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-[#F7F4ED]/50 transition">
                      <td className="p-4 font-mono font-bold text-[#B99A5B]">{appt.referenceNumber}</td>
                      <td className="p-4">
                        <span className="font-medium text-[#101C2C] block">{appt.clientName}</span>
                        <span className="text-[11px] text-neutral-400 font-mono">{appt.clientPhone}</span>
                      </td>
                      <td className="p-4">
                        {practiceAreas.find((p) => p.id === appt.practiceAreaId)?.title || 'General'}
                      </td>
                      <td className="p-4 font-mono">
                        {appt.date} <br />
                        <span className="text-neutral-400">{appt.timeSlot}</span>
                      </td>
                      <td className="p-4">{appt.consultationType}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                            appt.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : appt.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-neutral-200 text-neutral-700'
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={appt.status}
                          onChange={(e) => updateAppointmentStatus(appt.id, e.target.value as any)}
                          className="bg-[#F7F4ED] border border-[#E4DFD3] rounded px-2 py-1 text-xs"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE 3: Inquiries */}
        {activeModule === 'inquiries' && (
          <div className="space-y-6 pt-6">
            <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
              Public Inquiries & Contact Submissions
            </h2>

            <div className="bg-white rounded-lg border border-[#E4DFD3] overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFECE3] border-b border-[#E4DFD3] font-mono text-neutral-600 uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Reference</th>
                    <th className="p-4">Sender Details</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F4ED]">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-[#F7F4ED]/50 transition">
                      <td className="p-4 font-mono font-bold text-[#B99A5B]">{inq.referenceNumber}</td>
                      <td className="p-4">
                        <span className="font-medium text-[#101C2C] block">{inq.name}</span>
                        <span className="text-[11px] text-neutral-400 font-mono">{inq.email}</span>
                      </td>
                      <td className="p-4 font-medium max-w-xs">{inq.subject}</td>
                      <td className="p-4 text-neutral-500 max-w-sm line-clamp-2">{inq.message}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#F7F4ED] border border-[#E4DFD3]">
                          {inq.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                          className="bg-[#F7F4ED] border border-[#E4DFD3] rounded px-2 py-1 text-xs"
                        >
                          <option value="new">New</option>
                          <option value="in_review">In Review</option>
                          <option value="responded">Responded</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE 4: Blogs & Editor */}
        {activeModule === 'blogs' && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
                Knowledge Hub & Articles Editor
              </h2>
              <button
                onClick={handleCreateBlog}
                className="px-4 py-2 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] font-semibold text-xs uppercase tracking-wider rounded flex items-center space-x-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Write New Legal Article</span>
              </button>
            </div>

            {/* If Editing/Creating a blog */}
            {editingBlog ? (
              <form onSubmit={handleSaveBlog} className="bg-white p-6 sm:p-8 rounded-lg border border-[#E4DFD3] shadow-sm space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-[#E4DFD3]">
                  <h3 className="font-serif text-xl font-bold text-[#101C2C]">
                    {isNewBlog ? 'Create New Legal Article' : 'Edit Article'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    className="text-xs text-neutral-500 hover:text-black"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-medium text-[#232B38] block mb-1">Article Title *</label>
                    <input
                      type="text"
                      value={editingBlog.title}
                      onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                      className="w-full p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3]"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-medium text-[#232B38] block mb-1">SEO URL Slug *</label>
                    <input
                      type="text"
                      value={editingBlog.slug}
                      onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                      className="w-full p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-medium text-[#232B38] block mb-1">Category</label>
                    <select
                      value={editingBlog.category}
                      onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                      className="w-full p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3]"
                    >
                      <option value="Property and Real Estate Law">Property and Real Estate Law</option>
                      <option value="Criminal Law">Criminal Law</option>
                      <option value="Consumer Protection">Consumer Protection</option>
                      <option value="Business and Corporate Law">Business and Corporate Law</option>
                      <option value="Legal Awareness">Legal Awareness</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-medium text-[#232B38] block mb-1">Status</label>
                    <select
                      value={editingBlog.status}
                      onChange={(e) => setEditingBlog({ ...editingBlog, status: e.target.value as any })}
                      className="w-full p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3]"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-medium text-[#232B38] block mb-1">Read Time (Mins)</label>
                    <input
                      type="number"
                      value={editingBlog.readTimeMinutes}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, readTimeMinutes: parseInt(e.target.value) || 5 })
                      }
                      className="w-full p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="font-medium text-[#232B38] block mb-1">Summary (1-2 sentences)</label>
                  <input
                    type="text"
                    value={editingBlog.summary}
                    onChange={(e) => setEditingBlog({ ...editingBlog, summary: e.target.value })}
                    className="w-full p-2.5 rounded bg-[#F7F4ED] border border-[#E4DFD3]"
                  />
                </div>

                <div className="text-xs">
                  <label className="font-medium text-[#232B38] block mb-1">Full Article Markdown Content</label>
                  <textarea
                    rows={10}
                    value={editingBlog.content}
                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                    className="w-full p-3 rounded bg-[#F7F4ED] border border-[#E4DFD3] font-mono text-xs"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-3 border-t border-[#E4DFD3]">
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    className="px-4 py-2 bg-neutral-200 text-neutral-700 text-xs rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#B99A5B] hover:bg-[#D4BA7E] text-[#101C2C] text-xs font-semibold rounded"
                  >
                    Save & Update Publication
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-lg border border-[#E4DFD3] overflow-x-auto shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EFECE3] border-b border-[#E4DFD3] font-mono text-neutral-600 uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F7F4ED]">
                    {blogs.map((b) => (
                      <tr key={b.id} className="hover:bg-[#F7F4ED]/50 transition">
                        <td className="p-4 font-medium text-[#101C2C] max-w-xs">{b.title}</td>
                        <td className="p-4">{b.category}</td>
                        <td className="p-4 font-mono">{b.publishedDate}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                              b.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 space-x-2">
                          <button
                            onClick={() => {
                              setEditingBlog(b);
                              setIsNewBlog(false);
                            }}
                            className="p-1 text-neutral-600 hover:text-[#B99A5B]"
                            title="Edit Article"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteBlogPost(b.id)}
                            className="p-1 text-neutral-600 hover:text-red-600"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* MODULE 5: Team */}
        {activeModule === 'team' && (
          <div className="space-y-6 pt-6">
            <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
              Chamber Advocates & Staff Roster
            </h2>

            <div className="bg-white rounded-lg border border-[#E4DFD3] overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFECE3] border-b border-[#E4DFD3] font-mono text-neutral-600 uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Advocate</th>
                    <th className="p-4">Designation</th>
                    <th className="p-4">Bar Council Enrollment</th>
                    <th className="p-4">Experience</th>
                    <th className="p-4">Featured</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F4ED]">
                  {teamMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-[#F7F4ED]/50 transition">
                      <td className="p-4 flex items-center space-x-3">
                        <img
                          src={m.imageUrl}
                          alt={m.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#B99A5B]"
                        />
                        <span className="font-medium text-[#101C2C]">{m.name}</span>
                      </td>
                      <td className="p-4">{m.designation}</td>
                      <td className="p-4 font-mono text-[#B99A5B]">{m.barEnrollment}</td>
                      <td className="p-4">{m.experienceYears} Years</td>
                      <td className="p-4">
                        <button
                          onClick={() => updateTeamMember({ ...m, featured: !m.featured })}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                            m.featured ? 'bg-[#B99A5B] text-[#101C2C]' : 'bg-neutral-200 text-neutral-700'
                          }`}
                        >
                          {m.featured ? 'Featured' : 'Standard'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE 6: Courses */}
        {activeModule === 'courses' && (
          <div className="space-y-6 pt-6">
            <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
              Continuing Legal Education Management
            </h2>

            <div className="bg-white rounded-lg border border-[#E4DFD3] overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFECE3] border-b border-[#E4DFD3] font-mono text-neutral-600 uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Course Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Modules</th>
                    <th className="p-4">Tuition Fee</th>
                    <th className="p-4">Published Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F4ED]">
                  {courses.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F7F4ED]/50 transition">
                      <td className="p-4 font-medium text-[#101C2C]">{c.title}</td>
                      <td className="p-4">{c.category}</td>
                      <td className="p-4 font-mono">{c.modules.length} Modules</td>
                      <td className="p-4 font-mono font-bold">
                        {c.price === 0 ? 'Free' : `₹${c.price.toLocaleString('en-IN')}`}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => updateCourse({ ...c, published: !c.published })}
                          className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold ${
                            c.published ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {c.published ? 'Active (Published)' : 'Unpublished'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE 7: Security Audit Logs */}
        {activeModule === 'audit' && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#101C2C]">
                Chamber Security & Audit Trail
              </h2>
              <span className="text-xs font-mono text-neutral-500">
                Immutable chronological security records
              </span>
            </div>

            <div className="bg-white rounded-lg border border-[#E4DFD3] overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFECE3] border-b border-[#E4DFD3] font-mono text-neutral-600 uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">Actor</th>
                    <th className="p-4">Security Action</th>
                    <th className="p-4">Event Details</th>
                    <th className="p-4">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F4ED] font-mono text-[11px]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#F7F4ED]/50 transition">
                      <td className="p-4 text-neutral-400">{log.timestamp}</td>
                      <td className="p-4 font-semibold text-[#101C2C]">{log.actor}</td>
                      <td className="p-4 text-[#B99A5B] font-bold">{log.action}</td>
                      <td className="p-4 text-neutral-600 max-w-sm">{log.details}</td>
                      <td className="p-4 text-neutral-400">{log.ipAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
