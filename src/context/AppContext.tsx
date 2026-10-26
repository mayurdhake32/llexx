import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  Role,
  PracticeArea,
  TeamMember,
  Course,
  BlogPost,
  Appointment,
  ContactInquiry,
  ClientMatter,
  AuditLog,
} from '../types';
import {
  FIRM_DETAILS,
  INITIAL_USERS,
  TEAM_MEMBERS,
  PRACTICE_AREAS,
  COURSES,
  BLOG_POSTS,
  INITIAL_APPOINTMENTS,
  INITIAL_INQUIRIES,
  CLIENT_MATTERS,
  AUDIT_LOGS,
} from '../data/mockData';
import {
  generateReferenceNumber,
  validateAppointmentSlot,
  evaluateQuiz,
  QuizResult,
} from '../utils/legalLogic';

interface CertificateRecord {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  issueDate: string;
  verificationCode: string;
}

interface AppContextType {
  currentUser: User;
  switchUserRole: (role: Role) => void;
  users: User[];
  
  // Navigation & Hash Routing
  currentView: string;
  currentSlug: string | null;
  navigateTo: (view: string, slug?: string) => void;
  
  // Disclaimer
  bciAccepted: boolean;
  acceptBciDisclaimer: () => void;
  
  // Search & Auth Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  authModalTab: 'client' | 'student' | 'chamber';
  openAuthModal: (tab?: 'client' | 'student' | 'chamber') => void;
  closeAuthModal: () => void;
  signOut: () => void;
  
  // Firm data
  firmDetails: typeof FIRM_DETAILS;
  practiceAreas: PracticeArea[];
  teamMembers: TeamMember[];
  updateTeamMember: (member: TeamMember) => void;
  addTeamMember: (member: TeamMember) => void;
  
  // Appointments
  appointments: Appointment[];
  bookAppointment: (data: Omit<Appointment, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => { success: boolean; reference?: string; error?: string };
  updateAppointmentStatus: (id: string, status: Appointment['status'], notes?: string) => void;
  
  // Inquiries
  inquiries: ContactInquiry[];
  submitInquiry: (data: Omit<ContactInquiry, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => { success: boolean; reference: string };
  updateInquiryStatus: (id: string, status: ContactInquiry['status']) => void;
  
  // Courses & Learning
  courses: Course[];
  enrolledCourseIds: string[];
  enrollInCourse: (courseId: string) => boolean;
  completedLessonIds: string[];
  markLessonComplete: (lessonId: string) => void;
  certificates: CertificateRecord[];
  submitCourseQuiz: (courseId: string, answers: Record<number, number>) => QuizResult;
  updateCourse: (course: Course) => void;
  addCourse: (course: Course) => void;
  
  // Blogs
  blogs: BlogPost[];
  bookmarks: string[];
  toggleBookmark: (blogId: string) => void;
  saveBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  
  // Client Portal
  clientMatters: ClientMatter[];
  uploadClientDocument: (matterId: string, documentName: string, category: any) => void;
  sendMatterMessage: (matterId: string, text: string) => void;
  
  // Audit Logs
  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('lex_current_user');
    return saved ? JSON.parse(saved) : { id: 'visitor', name: 'Guest Visitor', email: 'guest@example.com', role: 'visitor' };
  });

  const [users] = useState<User[]>(INITIAL_USERS);
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  
  const [bciAccepted, setBciAccepted] = useState<boolean>(() => {
    return localStorage.getItem('lex_bci_disclaimer_accepted') === 'true';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'client' | 'student' | 'chamber'>('client');

  // Core entities
  const [practiceAreas] = useState<PracticeArea[]>(PRACTICE_AREAS);
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('lex_team');
    return saved ? JSON.parse(saved) : TEAM_MEMBERS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('lex_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem('lex_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('lex_courses');
    return saved ? JSON.parse(saved) : COURSES;
  });

  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('lex_enrolled_courses');
    return saved ? JSON.parse(saved) : ['course-consumer-rights'];
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('lex_completed_lessons');
    return saved ? JSON.parse(saved) : ['les-con-1-1'];
  });

  const [certificates, setCertificates] = useState<CertificateRecord[]>(() => {
    const saved = localStorage.getItem('lex_certificates');
    return saved ? JSON.parse(saved) : [];
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('lex_blogs');
    return saved ? JSON.parse(saved) : BLOG_POSTS;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('lex_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [clientMatters, setClientMatters] = useState<ClientMatter[]>(() => {
    const saved = localStorage.getItem('lex_client_matters');
    return saved ? JSON.parse(saved) : CLIENT_MATTERS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('lex_audit_logs');
    return saved ? JSON.parse(saved) : AUDIT_LOGS;
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('lex_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('lex_team', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('lex_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('lex_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('lex_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('lex_enrolled_courses', JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  useEffect(() => {
    localStorage.setItem('lex_completed_lessons', JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);

  useEffect(() => {
    localStorage.setItem('lex_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('lex_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('lex_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('lex_client_matters', JSON.stringify(clientMatters));
  }, [clientMatters]);

  useEffect(() => {
    localStorage.setItem('lex_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: currentUser.name || 'Anonymous',
      action,
      details,
      ipAddress: '127.0.0.1 (Authorized Session)',
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 99)]);
  };

  const openAuthModal = (tab: 'client' | 'student' | 'chamber' = 'client') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signOut = () => {
    const guest: User = { id: 'visitor', name: 'Guest Visitor', email: 'guest@example.com', role: 'visitor' };
    setCurrentUser(guest);
    localStorage.setItem('lex_current_user', JSON.stringify(guest));
    addAuditLog('USER_LOGOUT', 'User signed out from secure session.');
    navigateTo('home');
  };

  // Sync URL hash with current view
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (!hash || hash === '') {
        setCurrentView('home');
        setCurrentSlug(null);
        return;
      }
      const parts = hash.split('/');
      const view = parts[0];
      const slug = parts[1] || null;

      if (view === 'practice-areas' && slug) {
        setCurrentView('practice-detail');
        setCurrentSlug(slug);
      } else if (view === 'team' && slug) {
        setCurrentView('team-detail');
        setCurrentSlug(slug);
      } else if (view === 'courses' && slug) {
        setCurrentView('course-detail');
        setCurrentSlug(slug);
      } else if (view === 'blogs' && slug) {
        setCurrentView('blog-detail');
        setCurrentSlug(slug);
      } else {
        setCurrentView(view || 'home');
        setCurrentSlug(slug);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const navigateTo = (view: string, slug?: string) => {
    setCurrentView(view);
    setCurrentSlug(slug || null);

    let targetHash = '#/';
    if (view === 'home') targetHash = '#/';
    else if (view === 'practice-detail' && slug) targetHash = `#/practice-areas/${slug}`;
    else if (view === 'team-detail' && slug) targetHash = `#/team/${slug}`;
    else if (view === 'course-detail' && slug) targetHash = `#/courses/${slug}`;
    else if (view === 'blog-detail' && slug) targetHash = `#/blogs/${slug}`;
    else if (slug) targetHash = `#/${view}/${slug}`;
    else targetHash = `#/${view}`;

    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const acceptBciDisclaimer = () => {
    localStorage.setItem('lex_bci_disclaimer_accepted', 'true');
    setBciAccepted(true);
    addAuditLog('BCI_DISCLAIMER_ACCEPTED', 'User confirmed voluntary inspection under BCI Rule 36.');
  };

  const switchUserRole = (role: Role) => {
    if (role === 'admin') {
      const admin = INITIAL_USERS.find((u) => u.role === 'admin')!;
      setCurrentUser(admin);
      addAuditLog('ROLE_SWITCH', `Authenticated as Administrator (${admin.name}).`);
    } else if (role === 'client') {
      const client = INITIAL_USERS.find((u) => u.role === 'client')!;
      setCurrentUser(client);
      addAuditLog('ROLE_SWITCH', `Authenticated as Client (${client.name}).`);
    } else if (role === 'student') {
      const student = INITIAL_USERS.find((u) => u.role === 'student')!;
      setCurrentUser(student);
      addAuditLog('ROLE_SWITCH', `Authenticated as Student (${student.name}).`);
    } else {
      setCurrentUser({ id: 'visitor', name: 'Guest Visitor', email: 'guest@example.com', role: 'visitor' });
      addAuditLog('ROLE_SWITCH', 'Switched session to Public Visitor.');
    }
  };

  const bookAppointment = (data: Omit<Appointment, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => {
    const validation = validateAppointmentSlot(data.date, data.timeSlot, appointments);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    const refNumber = generateReferenceNumber('LEX');
    const newAppointment: Appointment = {
      ...data,
      id: `appt-${Date.now()}`,
      referenceNumber: refNumber,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    addAuditLog('APPOINTMENT_REQUESTED', `New consultation requested: ${refNumber} by ${data.clientName} for ${data.date}.`);
    return { success: true, reference: refNumber };
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status'], notes?: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, internalNotes: notes ?? a.internalNotes } : a))
    );
    addAuditLog('APPOINTMENT_STATUS_UPDATED', `Appointment ${id} changed to ${status}.`);
  };

  const submitInquiry = (data: Omit<ContactInquiry, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => {
    const ref = generateReferenceNumber('INQ');
    const newInquiry: ContactInquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      referenceNumber: ref,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    addAuditLog('INQUIRY_RECEIVED', `Inquiry ${ref} received from ${data.name}: ${data.subject}.`);
    return { success: true, reference: ref };
  };

  const updateInquiryStatus = (id: string, status: ContactInquiry['status']) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
    addAuditLog('INQUIRY_STATUS_UPDATED', `Inquiry ${id} updated to ${status}.`);
  };

  const enrollInCourse = (courseId: string) => {
    if (enrolledCourseIds.includes(courseId)) return true;
    setEnrolledCourseIds((prev) => [...prev, courseId]);
    addAuditLog('COURSE_ENROLLMENT', `User ${currentUser.name} enrolled in course ${courseId}.`);
    return true;
  };

  const markLessonComplete = (lessonId: string) => {
    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
      addAuditLog('LESSON_COMPLETED', `Lesson ${lessonId} marked complete by ${currentUser.name}.`);
    }
  };

  const submitCourseQuiz = (courseId: string, answers: Record<number, number>): QuizResult => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return { totalQuestions: 0, correctCount: 0, scorePercentage: 0, hasPassed: false, feedback: [] };
    }

    const result = evaluateQuiz(course.quiz, answers);
    if (result.hasPassed && result.certificateId) {
      const newCert: CertificateRecord = {
        id: `cert-${Date.now()}`,
        courseId: course.id,
        courseTitle: course.title,
        studentName: currentUser.name || 'Verified Advocate / Student',
        issueDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        verificationCode: result.certificateId,
      };
      setCertificates((prev) => [...prev.filter((c) => c.courseId !== courseId), newCert]);
      addAuditLog('CERTIFICATE_ISSUED', `Certificate ${result.certificateId} awarded to ${newCert.studentName} for ${course.title}.`);
    }

    return result;
  };

  const updateCourse = (updated: Course) => {
    setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    addAuditLog('COURSE_UPDATED', `Course ${updated.title} updated in administration.`);
  };

  const addCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
    addAuditLog('COURSE_CREATED', `New course ${newCourse.title} added to curriculum.`);
  };

  const updateTeamMember = (updated: TeamMember) => {
    setTeamMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    addAuditLog('TEAM_MEMBER_UPDATED', `Profile for ${updated.name} updated.`);
  };

  const addTeamMember = (member: TeamMember) => {
    setTeamMembers((prev) => [...prev, member]);
    addAuditLog('TEAM_MEMBER_ADDED', `New team profile added: ${member.name}.`);
  };

  const toggleBookmark = (blogId: string) => {
    setBookmarks((prev) =>
      prev.includes(blogId) ? prev.filter((id) => id !== blogId) : [...prev, blogId]
    );
  };

  const saveBlogPost = (post: BlogPost) => {
    setBlogs((prev) => {
      const exists = prev.some((b) => b.id === post.id);
      if (exists) {
        return prev.map((b) => (b.id === post.id ? post : b));
      } else {
        return [post, ...prev];
      }
    });
    addAuditLog('BLOG_SAVED', `Article '${post.title}' saved with status ${post.status}.`);
  };

  const deleteBlogPost = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    addAuditLog('BLOG_DELETED', `Article ${id} deleted.`);
  };

  const uploadClientDocument = (matterId: string, documentName: string, category: any) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: documentName,
      category,
      uploadedAt: new Date().toLocaleDateString('en-GB'),
      size: '1.4 MB',
      fileType: 'PDF',
      uploadedBy: currentUser.name,
    };

    setClientMatters((prev) =>
      prev.map((m) =>
        m.id === matterId ? { ...m, documents: [newDoc, ...m.documents] } : m
      )
    );
    addAuditLog('DOCUMENT_UPLOADED', `Document '${documentName}' uploaded to matter ${matterId}.`);
  };

  const sendMatterMessage = (matterId: string, text: string) => {
    const isAdv = currentUser.role === 'admin';
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: isAdv ? ('advocate' as const) : ('client' as const),
      senderName: currentUser.name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };

    setClientMatters((prev) =>
      prev.map((m) =>
        m.id === matterId ? { ...m, messages: [...m.messages, newMsg] } : m
      )
    );
    addAuditLog('MATTER_COMMUNICATION', `Message sent in matter ${matterId} by ${currentUser.name}.`);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchUserRole,
        users,
        currentView,
        currentSlug,
        navigateTo,
        bciAccepted,
        acceptBciDisclaimer,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        signOut,
        firmDetails: FIRM_DETAILS,
        practiceAreas,
        teamMembers,
        updateTeamMember,
        addTeamMember,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        courses,
        enrolledCourseIds,
        enrollInCourse,
        completedLessonIds,
        markLessonComplete,
        certificates,
        submitCourseQuiz,
        updateCourse,
        addCourse,
        blogs,
        bookmarks,
        toggleBookmark,
        saveBlogPost,
        deleteBlogPost,
        clientMatters,
        uploadClientDocument,
        sendMatterMessage,
        auditLogs,
        addAuditLog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
