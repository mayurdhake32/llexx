import { Appointment, Course, QuizQuestion, Role } from '../types';

/**
 * Generates an audit-ready reference code with prefix and random alphanumeric string
 */
export function generateReferenceNumber(prefix: 'LEX' | 'INQ' | 'CERT' = 'LEX'): string {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomPart}`;
}

/**
 * Validates Indian 10-digit mobile number, allowing optional +91 or leading 0
 */
export function isValidIndianPhoneNumber(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  const indianPhoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
  return indianPhoneRegex.test(cleaned);
}

/**
 * Validates consultation slot availability and working hours
 */
export interface SlotValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateAppointmentSlot(
  dateStr: string,
  timeSlot: string,
  existingAppointments: Appointment[]
): SlotValidationResult {
  if (!dateStr || !timeSlot) {
    return { isValid: false, error: 'Date and time slot are required.' };
  }

  const selectedDate = new Date(`${dateStr}T00:00:00`);
  if (isNaN(selectedDate.getTime())) {
    return { isValid: false, error: 'Invalid date format provided.' };
  }

  // Check if selected date is in the past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    return { isValid: false, error: 'Consultation date cannot be in the past.' };
  }

  // Check Sunday (firm is closed on Sundays for judicial prep)
  const dayOfWeek = selectedDate.getDay();
  if (dayOfWeek === 0) {
    return { isValid: false, error: 'The chamber is closed for consultations on Sundays.' };
  }

  // Check double-booking
  const hasConflict = existingAppointments.some(
    (appt) =>
      appt.date === dateStr &&
      appt.timeSlot === timeSlot &&
      appt.status !== 'cancelled'
  );

  if (hasConflict) {
    return {
      isValid: false,
      error: `The time slot '${timeSlot}' on ${dateStr} is already reserved. Please select another slot.`,
    };
  }

  return { isValid: true };
}

/**
 * Evaluates student quiz answers, score percentage, and certificate eligibility
 */
export interface QuizResult {
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  hasPassed: boolean;
  certificateId?: string;
  feedback: {
    questionIndex: number;
    isCorrect: boolean;
    userAnswer: number;
    correctAnswer: number;
    explanation: string;
  }[];
}

export function evaluateQuiz(
  questions: QuizQuestion[],
  userAnswers: Record<number, number>,
  passingPercentage: number = 70
): QuizResult {
  if (!questions || questions.length === 0) {
    return {
      totalQuestions: 0,
      correctCount: 0,
      scorePercentage: 0,
      hasPassed: false,
      feedback: [],
    };
  }

  let correctCount = 0;
  const feedback = questions.map((q, idx) => {
    const userAnswer = userAnswers[idx];
    const isCorrect = userAnswer === q.correctOptionIndex;
    if (isCorrect) correctCount++;
    return {
      questionIndex: idx,
      isCorrect,
      userAnswer,
      correctAnswer: q.correctOptionIndex,
      explanation: q.explanation,
    };
  });

  const scorePercentage = Math.round((correctCount / questions.length) * 100);
  const hasPassed = scorePercentage >= passingPercentage;
  const certificateId = hasPassed ? generateReferenceNumber('CERT') : undefined;

  return {
    totalQuestions: questions.length,
    correctCount,
    scorePercentage,
    hasPassed,
    certificateId,
    feedback,
  };
}

/**
 * Filters and sorts course catalogue
 */
export interface CourseFilterOptions {
  category?: string;
  difficulty?: string;
  priceType?: 'all' | 'free' | 'paid';
  searchQuery?: string;
  sortBy?: 'newest' | 'price_low' | 'price_high' | 'duration';
}

export function filterAndSortCourses(
  courses: Course[],
  options: CourseFilterOptions
): Course[] {
  return courses
    .filter((course) => {
      if (!course.published) return false;

      if (options.category && options.category !== 'All' && course.category !== options.category) {
        return false;
      }

      if (options.difficulty && options.difficulty !== 'All' && course.difficulty !== options.difficulty) {
        return false;
      }

      if (options.priceType === 'free' && course.price > 0) {
        return false;
      }
      if (options.priceType === 'paid' && course.price === 0) {
        return false;
      }

      if (options.searchQuery && options.searchQuery.trim() !== '') {
        const query = options.searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = course.shortDescription.toLowerCase().includes(query);
        const matchesCategory = course.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (options.sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'duration':
          return b.durationHours - a.durationHours;
        case 'newest':
        default:
          return b.featured ? 1 : -1;
      }
    });
}

/**
 * Checks authorization role permissions
 */
export function checkPermission(
  userRole: Role,
  action: 'manage_system' | 'access_client_matter' | 'view_paid_lesson' | 'book_consultation',
  context?: { isEnrolled?: boolean; isAssignedClient?: boolean }
): boolean {
  if (action === 'manage_system') {
    return userRole === 'admin';
  }

  if (action === 'access_client_matter') {
    return userRole === 'admin' || (userRole === 'client' && !!context?.isAssignedClient);
  }

  if (action === 'view_paid_lesson') {
    return userRole === 'admin' || !!context?.isEnrolled;
  }

  if (action === 'book_consultation') {
    return true; // Any visitor, client, or student can book
  }

  return false;
}
