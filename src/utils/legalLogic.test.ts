import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateReferenceNumber,
  isValidIndianPhoneNumber,
  validateAppointmentSlot,
  evaluateQuiz,
  filterAndSortCourses,
  checkPermission,
} from './legalLogic';
import { Appointment, Course, QuizQuestion } from '../types';

test('generateReferenceNumber produces formatted ID with given prefix', () => {
  const ref = generateReferenceNumber('LEX');
  assert.match(ref, /^LEX-\d{4}-\d{4}$/);

  const inq = generateReferenceNumber('INQ');
  assert.match(inq, /^INQ-\d{4}-\d{4}$/);
});

test('isValidIndianPhoneNumber properly validates standard 10-digit Indian numbers', () => {
  assert.equal(isValidIndianPhoneNumber('9876543210'), true);
  assert.equal(isValidIndianPhoneNumber('+91 9876543210'), true);
  assert.equal(isValidIndianPhoneNumber('+91-98765-43210'), true);
  assert.equal(isValidIndianPhoneNumber('09876543210'), true);
  assert.equal(isValidIndianPhoneNumber('8123456789'), true);

  // Invalid numbers
  assert.equal(isValidIndianPhoneNumber('1234567890'), false); // invalid starting digit
  assert.equal(isValidIndianPhoneNumber('98765'), false); // too short
  assert.equal(isValidIndianPhoneNumber(''), false);
  assert.equal(isValidIndianPhoneNumber('abcdefghij'), false);
});

test('validateAppointmentSlot detects double-booking and validates calendar rules', () => {
  const existing: Appointment[] = [
    {
      id: 'appt-1',
      referenceNumber: 'LEX-2026-1001',
      clientName: 'Rahul Verma',
      clientEmail: 'rahul@example.com',
      clientPhone: '9876543210',
      practiceAreaId: 'property-disputes',
      date: '2026-11-10',
      timeSlot: '11:00 AM - 11:45 AM',
      consultationType: 'In-Person (Office)',
      caseSummary: 'Property dispute issue',
      status: 'confirmed',
      createdAt: '2026-10-20',
    },
  ];

  // Conflict on existing confirmed slot
  const conflictResult = validateAppointmentSlot('2026-11-10', '11:00 AM - 11:45 AM', existing);
  assert.equal(conflictResult.isValid, false);
  assert.match(conflictResult.error || '', /already reserved/);

  // Valid on another slot
  const availableResult = validateAppointmentSlot('2026-11-10', '02:00 PM - 02:45 PM', existing);
  assert.equal(availableResult.isValid, true);

  // Sunday check (2026-11-08 is a Sunday: 2026-11-08)
  const sundayResult = validateAppointmentSlot('2026-11-08', '11:00 AM - 11:45 AM', existing);
  assert.equal(sundayResult.isValid, false);
  assert.match(sundayResult.error || '', /Sunday/);

  // Past date check
  const pastResult = validateAppointmentSlot('2020-01-01', '11:00 AM - 11:45 AM', existing);
  assert.equal(pastResult.isValid, false);
  assert.match(pastResult.error || '', /cannot be in the past/);
});

test('evaluateQuiz computes percentage, passing status, and certificate ID', () => {
  const mockQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      question: 'What is the limitation period for filing a suit for specific performance in India?',
      options: ['1 year', '3 years', '5 years', '12 years'],
      correctOptionIndex: 1, // 3 years
      explanation: 'Under Article 54 of the Limitation Act 1963, limitation is 3 years from the date fixed for performance.',
    },
    {
      id: 'q2',
      question: 'Under RERA 2016, what percentage of amounts realized from allottees must be deposited in a separate escrow account?',
      options: ['30%', '50%', '70%', '100%'],
      correctOptionIndex: 2, // 70%
      explanation: 'Section 4(2)(l)(D) of RERA requires 70% of collections to be deposited in a scheduled bank escrow account.',
    },
  ];

  // 100% score (2/2)
  const fullScore = evaluateQuiz(mockQuestions, { 0: 1, 1: 2 }, 70);
  assert.equal(fullScore.hasPassed, true);
  assert.equal(fullScore.scorePercentage, 100);
  assert.match(fullScore.certificateId || '', /^CERT-\d{4}-\d{4}$/);

  // 50% score (1/2) -> failed
  const halfScore = evaluateQuiz(mockQuestions, { 0: 1, 1: 0 }, 70);
  assert.equal(halfScore.hasPassed, false);
  assert.equal(halfScore.scorePercentage, 50);
  assert.equal(halfScore.certificateId, undefined);
});

test('checkPermission handles RBAC correctly', () => {
  assert.equal(checkPermission('admin', 'manage_system'), true);
  assert.equal(checkPermission('client', 'manage_system'), false);
  assert.equal(checkPermission('student', 'manage_system'), false);

  assert.equal(checkPermission('client', 'access_client_matter', { isAssignedClient: true }), true);
  assert.equal(checkPermission('client', 'access_client_matter', { isAssignedClient: false }), false);
  assert.equal(checkPermission('admin', 'access_client_matter', { isAssignedClient: false }), true);

  assert.equal(checkPermission('student', 'view_paid_lesson', { isEnrolled: true }), true);
  assert.equal(checkPermission('student', 'view_paid_lesson', { isEnrolled: false }), false);
});
