import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Clock, ArrowRight, Bookmark, Share2, Printer, Check, ShieldAlert, ArrowLeft } from 'lucide-react';
import { BlogPost } from '../../types';

export const BlogsView: React.FC = () => {
  const { blogs, bookmarks, toggleBookmark, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Property and Real Estate Law',
    'Criminal Law',
    'Consumer Protection',
    'Business and Corporate Law',
    'Legal Awareness',
  ];

  const publishedBlogs = blogs.filter((b) => b.status === 'published');
  const featuredBlog = publishedBlogs.find((b) => b.featured) || publishedBlogs[0];

  const filteredBlogs = publishedBlogs.filter((blog) => {
    if (selectedCategory !== 'All' && blog.category !== selectedCategory) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchesTitle = blog.title.toLowerCase().includes(q);
      const matchesSummary = blog.summary.toLowerCase().includes(q);
      const matchesTag = blog.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchesTitle && !matchesSummary && !matchesTag) return false;
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
              Chambers Knowledge Hub
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F7F4ED] font-medium leading-tight">
              Legal Updates, Precedents & Jurisprudential Insights
            </h1>
            <p className="text-sm sm:text-base text-[#D5D0C5] leading-relaxed">
              In-depth legal commentaries authored by advocates at Lex Global Advocacy dissecting Supreme Court rulings, high-stakes statutory amendments, and procedural best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article Banner */}
      {featuredBlog && selectedCategory === 'All' && !searchTerm && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div
            onClick={() => navigateTo('blog-detail', featuredBlog.slug)}
            className="bg-white rounded-lg border border-[#E4DFD3] hover:border-[#B99A5B] overflow-hidden shadow-lg cursor-pointer group transition duration-300 grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-6 h-64 lg:h-auto overflow-hidden bg-[#0A121D]">
              <img
                src={featuredBlog.coverImage}
                alt={featuredBlog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
            <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#B99A5B] mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#F7F4ED] border border-[#E4DFD3] font-bold uppercase text-[10px]">
                    Featured Landmark Analysis
                  </span>
                  <span>•</span>
                  <span>{featuredBlog.readTimeMinutes} min read</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#101C2C] font-semibold group-hover:text-[#B99A5B] transition leading-snug">
                  {featuredBlog.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5A6474] mt-3 leading-relaxed line-clamp-3">
                  {featuredBlog.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F7F4ED] flex items-center justify-between text-xs">
                <span className="text-[#5A6474] font-mono">{featuredBlog.publishedDate}</span>
                <span className="text-[#B99A5B] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-[#E4DFD3] flex flex-col md:flex-row md:items-center justify-between gap-4">
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

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles by title or tag..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F4ED] border border-[#E4DFD3] rounded focus:outline-none focus:border-[#B99A5B]"
            />
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => {
            const isBookmarked = bookmarks.includes(blog.id);
            return (
              <div
                key={blog.id}
                className="bg-white rounded-lg border border-[#E4DFD3] hover:border-[#B99A5B] overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between group"
              >
                <div onClick={() => navigateTo('blog-detail', blog.slug)} className="cursor-pointer">
                  <div className="h-48 overflow-hidden relative bg-[#0A121D]">
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

                <div className="px-6 pb-5 pt-2 border-t border-[#F7F4ED] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-[#5A6474] bg-[#F7F4ED] px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => toggleBookmark(blog.id)}
                    className="p-1.5 text-neutral-400 hover:text-[#B99A5B] transition"
                    title={isBookmarked ? 'Remove bookmark' : 'Save article'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-[#B99A5B]' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export const BlogDetailView: React.FC<{ slug?: string }> = ({ slug }) => {
  const { blogs, teamMembers, courses, practiceAreas, navigateTo } = useApp();
  const [copied, setCopied] = useState(false);

  const blog = blogs.find((b) => b.slug === slug) || blogs[0];
  const author = teamMembers.find((m) => m.id === blog.authorId);
  const relatedPractice = practiceAreas.find((p) => p.id === blog.relatedPracticeAreaId);
  const relatedCourse = courses.find((c) => c.id === blog.relatedCourseId);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#F7F4ED] text-[#232B38] font-sans">
      {/* Top Banner */}
      <section className="bg-[#101C2C] text-[#F7F4ED] py-16 sm:py-24 border-b border-[#1A2C42]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigateTo('blogs')}
            className="text-xs text-[#B99A5B] hover:text-[#D4BA7E] inline-flex items-center space-x-1.5 mb-6 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Legal Knowledge Hub</span>
          </button>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-xs font-mono text-[#B99A5B]">
              <span className="uppercase font-semibold tracking-wider">{blog.category}</span>
              <span>•</span>
              <span>{blog.publishedDate}</span>
              <span>•</span>
              <span>{blog.readTimeMinutes} min read</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight">
              {blog.title}
            </h1>

            <p className="text-sm sm:text-base text-[#D5D0C5] leading-relaxed italic">
              {blog.subtitle}
            </p>

            {author && (
              <div className="pt-4 flex items-center space-x-3 text-xs border-t border-[#1A2C42]">
                <img
                  src={author.imageUrl}
                  alt={author.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#B99A5B]"
                />
                <div>
                  <span className="text-neutral-400 block">Authored by:</span>
                  <span className="text-[#F7F4ED] font-semibold">{author.name}</span>
                  <span className="text-[#B99A5B] ml-2">({author.designation})</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reader Body */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-[#E4DFD3] p-6 sm:p-12 shadow-sm space-y-8">
          {/* Action Bar (Share, Print, Copy) */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E4DFD3] text-xs text-[#5A6474]">
            <div className="flex items-center space-x-2">
              <span className="font-mono">Tags:</span>
              {blog.tags.map((t, idx) => (
                <span key={idx} className="bg-[#F7F4ED] px-2 py-0.5 rounded text-[11px] font-mono">
                  #{t}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleCopyLink}
                className="flex items-center space-x-1 text-xs hover:text-[#B99A5B] transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Link' : 'Share'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-1 text-xs hover:text-[#B99A5B] transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Cover image */}
          <div className="rounded-lg overflow-hidden h-72 sm:h-96">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Formatted Content */}
          <div className="prose prose-sm sm:prose-base max-w-none text-[#232B38] space-y-5 leading-relaxed">
            <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed">
              {blog.content}
            </div>
          </div>

          {/* Statutory Disclaimer */}
          <div className="p-4 rounded-lg bg-[#EFECE3] border border-[#E4DFD3] text-xs text-[#5A6474] flex items-start space-x-2.5">
            <ShieldAlert className="w-4 h-4 text-[#B99A5B] flex-shrink-0 mt-0.5" />
            <span>
              <strong>Editorial Legal Disclaimer:</strong> The articles published in this knowledge hub represent jurisprudential analysis based on legislation and precedent as of the date of publication. They are intended for educational and academic purposes only and must not be treated as formal legal advice.
            </span>
          </div>

          {/* Related Links */}
          <div className="pt-6 border-t border-[#E4DFD3] flex flex-col sm:flex-row items-center justify-between gap-4">
            {relatedPractice && (
              <button
                onClick={() => navigateTo('practice-detail', relatedPractice.slug)}
                className="text-xs text-[#101C2C] hover:text-[#B99A5B] font-semibold"
              >
                ← Related Practice: {relatedPractice.title}
              </button>
            )}
            {relatedCourse && (
              <button
                onClick={() => navigateTo('course-detail', relatedCourse.slug)}
                className="text-xs text-[#B99A5B] hover:text-[#967A3D] font-semibold"
              >
                View Related Masterclass: {relatedCourse.title} →
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
