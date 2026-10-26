import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Scale, Users, GraduationCap, BookOpen, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, practiceAreas, teamMembers, courses, blogs, navigateTo } = useApp();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedPractices = practiceAreas.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.keyIssues.some((k) => k.toLowerCase().includes(q))
    );

    const matchedTeam = teamMembers.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.designation.toLowerCase().includes(q) ||
        t.bio.toLowerCase().includes(q)
    );

    const matchedCourses = courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );

    const matchedBlogs = blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.summary.toLowerCase().includes(q) ||
        b.tags.some((tag) => tag.toLowerCase().includes(q))
    );

    const totalCount =
      matchedPractices.length + matchedTeam.length + matchedCourses.length + matchedBlogs.length;

    return {
      totalCount,
      practices: matchedPractices,
      team: matchedTeam,
      courses: matchedCourses,
      blogs: matchedBlogs,
    };
  }, [query, practiceAreas, teamMembers, courses, blogs]);

  if (!isSearchOpen) return null;

  const handleSelect = (view: string, slug?: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigateTo(view, slug);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div className="bg-[#101C2C] border border-[#B99A5B]/40 max-w-2xl w-full rounded-lg shadow-2xl overflow-hidden font-sans">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#1A2C42] flex items-center space-x-3 bg-[#0A121D]">
          <Search className="w-5 h-5 text-[#B99A5B]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search practice areas, advocates, courses, articles, statutory concepts..."
            className="w-full bg-transparent text-[#F7F4ED] placeholder-neutral-500 text-sm focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs bg-[#1A2C42] hover:bg-[#23354C] text-neutral-300 px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
          {!query.trim() ? (
            <div className="py-8 text-center text-neutral-400 text-xs space-y-2">
              <p>Type keywords to search across the firm’s knowledge base.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['RERA', 'Injunction', 'Section 138', 'Specific Performance', 'Consumer Court', 'Arbitration'].map(
                  (sample) => (
                    <button
                      key={sample}
                      onClick={() => setQuery(sample)}
                      className="px-2.5 py-1 bg-[#1A2C42] hover:bg-[#B99A5B] hover:text-[#101C2C] text-[#EFECE3] rounded text-xs transition"
                    >
                      {sample}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : searchResults?.totalCount === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-sm">
              No matching records found for "{query}".
            </div>
          ) : (
            <>
              {/* Practice Areas */}
              {searchResults && searchResults.practices.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#B99A5B] uppercase tracking-wider mb-2">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Practice Areas ({searchResults.practices.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.practices.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelect('practice-detail', p.slug)}
                        className="w-full text-left p-2.5 rounded bg-[#0A121D] hover:bg-[#1A2C42] border border-[#1A2C42] flex items-center justify-between group transition"
                      >
                        <div>
                          <div className="text-sm font-medium text-[#F7F4ED] group-hover:text-[#B99A5B]">
                            {p.title}
                          </div>
                          <div className="text-xs text-neutral-400 line-clamp-1">{p.shortDesc}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#B99A5B] flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Advocates */}
              {searchResults && searchResults.team.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#B99A5B] uppercase tracking-wider mb-2">
                    <Users className="w-3.5 h-3.5" />
                    <span>Advocates & Counsel ({searchResults.team.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.team.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleSelect('team-detail', t.slug)}
                        className="w-full text-left p-2.5 rounded bg-[#0A121D] hover:bg-[#1A2C42] border border-[#1A2C42] flex items-center justify-between group transition"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={t.imageUrl}
                            alt={t.name}
                            className="w-8 h-8 rounded-full object-cover border border-[#B99A5B]"
                          />
                          <div>
                            <div className="text-sm font-medium text-[#F7F4ED] group-hover:text-[#B99A5B]">
                              {t.name}
                            </div>
                            <div className="text-xs text-neutral-400">{t.designation}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#B99A5B] flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses */}
              {searchResults && searchResults.courses.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#B99A5B] uppercase tracking-wider mb-2">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>LMS Courses ({searchResults.courses.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.courses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleSelect('course-detail', c.slug)}
                        className="w-full text-left p-2.5 rounded bg-[#0A121D] hover:bg-[#1A2C42] border border-[#1A2C42] flex items-center justify-between group transition"
                      >
                        <div>
                          <div className="text-sm font-medium text-[#F7F4ED] group-hover:text-[#B99A5B]">
                            {c.title}
                          </div>
                          <div className="text-xs text-neutral-400">
                            {c.category} • {c.difficulty} • {c.price === 0 ? 'Complimentary' : `₹${c.price.toLocaleString('en-IN')}`}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#B99A5B] flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Articles */}
              {searchResults && searchResults.blogs.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#B99A5B] uppercase tracking-wider mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Legal Commentary ({searchResults.blogs.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.blogs.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => handleSelect('blog-detail', b.slug)}
                        className="w-full text-left p-2.5 rounded bg-[#0A121D] hover:bg-[#1A2C42] border border-[#1A2C42] flex items-center justify-between group transition"
                      >
                        <div>
                          <div className="text-sm font-medium text-[#F7F4ED] group-hover:text-[#B99A5B]">
                            {b.title}
                          </div>
                          <div className="text-xs text-neutral-400 line-clamp-1">{b.summary}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#B99A5B] flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-3 bg-[#0A121D] border-t border-[#1A2C42] text-center text-xs text-neutral-400">
          Press <kbd className="px-1.5 py-0.5 bg-[#101C2C] rounded border border-neutral-700 text-[#B99A5B]">ESC</kbd> to exit search
        </div>
      </div>
    </div>
  );
};
