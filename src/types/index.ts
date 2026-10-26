export type Role = 'visitor' | 'client' | 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
  clientMatterId?: string;
}

export interface PracticeArea {
  id: string;
  slug: string;
  title: string;
  iconName: string;
  shortDesc: string;
  longDesc: string;
  statutoryFramework: string[];
  keyIssues: string[];
  processSteps: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  relatedCourses: string[]; // course IDs
  relatedBlogs: string[]; // blog IDs
  leadAdvocateId: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  designation: string;
  barEnrollment: string;
  education: string[];
  experienceYears: number;
  bio: string;
  practiceAreaIds: string[];
  languages: string[];
  publications: string[];
  imageUrl: string;
  featured: boolean;
  order: number;
  email: string;
  jurisdiction: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  isPreview: boolean;
  videoUrl?: string; // YouTube or educational embed
  content: string; // Detailed educational notes
  downloadableResource?: {
    name: string;
    size: string;
    format: string;
  };
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Corporate & Commercial' | 'Real Estate & Property' | 'Litigation & Procedure' | 'Consumer & Citizen Rights';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  price: number; // in INR (0 = Free)
  instructorId: string;
  thumbnailUrl: string;
  learningOutcomes: string[];
  prerequisites: string[];
  modules: CourseModule[];
  quiz: QuizQuestion[];
  featured: boolean;
  published: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  category: string;
  tags: string[];
  authorId: string;
  publishedDate: string;
  lastUpdated: string;
  readTimeMinutes: number;
  summary: string;
  content: string; // rich markdown / html formatted text
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  relatedPracticeAreaId?: string;
  relatedCourseId?: string;
}

export interface Appointment {
  id: string;
  referenceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  practiceAreaId: string;
  advocateId?: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM - 10:45 AM"
  consultationType: 'In-Person (Office)' | 'Secure Video Call' | 'Telephonic';
  caseSummary: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  internalNotes?: string;
}

export interface ContactInquiry {
  id: string;
  referenceNumber: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  practiceAreaId?: string;
  status: 'new' | 'in_review' | 'responded' | 'closed';
  createdAt: string;
}

export interface ClientMatter {
  id: string;
  matterNumber: string;
  clientId: string;
  title: string;
  courtForum: string;
  caseType: string;
  status: 'Active Hearing' | 'Pleadings Complete' | 'Arguments Scheduled' | 'Order Reserved' | 'Disposed';
  nextHearingDate?: string;
  assignedAdvocateId: string;
  filingDate: string;
  summary: string;
  stages: {
    title: string;
    date: string;
    status: 'completed' | 'current' | 'upcoming';
    description: string;
  }[];
  documents: ClientDocument[];
  messages: {
    id: string;
    sender: 'advocate' | 'client';
    senderName: string;
    timestamp: string;
    text: string;
  }[];
}

export interface ClientDocument {
  id: string;
  name: string;
  category: 'Pleadings' | 'Orders & Judgments' | 'Evidence & Annexures' | 'Legal Notices' | 'Client Uploads';
  uploadedAt: string;
  size: string;
  fileType: string;
  uploadedBy: string;
  downloadUrl?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  ipAddress: string;
}
