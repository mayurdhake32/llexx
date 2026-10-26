import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar, Footer } from './components/layout/Navbar';
import { BciDisclaimerModal } from './components/common/BciDisclaimerModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { AuthModal } from './components/common/AuthModal';
import { HomeView } from './components/home/HomeView';
import { AboutView } from './components/about/AboutView';
import { PracticeAreasView } from './components/practice/PracticeAreasView';
import { PracticeAreaDetailView } from './components/practice/PracticeAreaDetailView';
import { TeamView, TeamMemberDetailView } from './components/team/TeamView';
import { CoursesView, CourseDetailView } from './components/courses/CoursesView';
import { StudentLearningDashboard } from './components/courses/StudentLearningDashboard';
import { BlogsView, BlogDetailView } from './components/blogs/BlogsView';
import { BookingView } from './components/booking/BookingView';
import { ContactView } from './components/contact/ContactView';
import { ClientPortalView } from './components/portal/ClientPortalView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { PrivacyPolicyView, TermsOfUseView, LegalDisclaimerView } from './components/legal/LegalPages';

const MainContent: React.FC = () => {
  const { currentView, currentSlug } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'about':
        return <AboutView />;
      case 'practice-areas':
        return <PracticeAreasView />;
      case 'practice-detail':
        return <PracticeAreaDetailView slug={currentSlug || undefined} />;
      case 'team':
        return <TeamView />;
      case 'team-detail':
        return <TeamMemberDetailView slug={currentSlug || undefined} />;
      case 'courses':
        return <CoursesView />;
      case 'course-detail':
        return <CourseDetailView slug={currentSlug || undefined} />;
      case 'learn':
        return <StudentLearningDashboard />;
      case 'blogs':
        return <BlogsView />;
      case 'blog-detail':
        return <BlogDetailView slug={currentSlug || undefined} />;
      case 'book-consultation':
        return <BookingView />;
      case 'contact':
        return <ContactView />;
      case 'client-portal':
        return <ClientPortalView />;
      case 'admin-dashboard':
        return <AdminDashboardView />;
      case 'privacy':
        return <PrivacyPolicyView />;
      case 'terms':
        return <TermsOfUseView />;
      case 'disclaimer':
        return <LegalDisclaimerView />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4ED] selection:bg-[#B99A5B]/30 selection:text-[#101C2C]">
      <BciDisclaimerModal />
      <GlobalSearchModal />
      <AuthModal />
      <Navbar />
      <main className="flex-1">{renderView()}</main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
