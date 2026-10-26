import {
  PracticeArea,
  TeamMember,
  Course,
  BlogPost,
  Appointment,
  ContactInquiry,
  ClientMatter,
  User,
  AuditLog,
} from '../types';

export const FIRM_DETAILS = {
  name: 'Lex Global Advocacy',
  tagline: 'Advocates & International Legal Consultants',
  establishedYear: 1998,
  founder: 'Vikramaditya Kashyap, Senior Advocate',
  headOffice: {
    addressLine1: 'Chamber 402, Lawyers Chambers Block',
    addressLine2: 'Delhi High Court Complex, Sher Shah Road',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110503',
    phone: '+91 11 2338 4920',
    mobile: '+91 98101 23456',
    email: 'chambers@lexglobal.in',
  },
  branchOffice: {
    addressLine1: 'Suite 804, Express Towers, Nariman Point',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400021',
    phone: '+91 22 2282 1900',
  },
  workingHours: 'Monday – Saturday: 10:00 AM – 7:00 PM (Closed Sundays for Court Preparation)',
  bciDisclaimer:
    'As per the Bar Council of India Rules (Rule 36, Section IV, Chapter II, Part VI of the Bar Council of India Rules), advocates are prohibited from soliciting work or advertising in any manner. By clicking "Enter Chamber" or browsing this site, the user acknowledges that they are accessing information about Lex Global Advocacy of their own volition for educational and informational purposes only. No information on this website constitutes legal advice, nor does it create an advocate-client relationship.',
};

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Vikramaditya Kashyap',
    email: 'chambers@lexglobal.in',
    role: 'admin',
    phone: '+91 98101 23456',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'user-client-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    role: 'client',
    phone: '+91 98200 45678',
    clientMatterId: 'matter-delhi-01',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'user-student-1',
    name: 'Pooja Iyer',
    email: 'pooja.iyer@lawschool.ac.in',
    role: 'student',
    phone: '+91 99300 78912',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-vikramaditya',
    slug: 'vikramaditya-kashyap',
    name: 'Vikramaditya Kashyap',
    designation: 'Managing Partner & Senior Advocate',
    barEnrollment: 'D/458/1998 (Bar Council of Delhi)',
    education: ['B.A. LL.B. (Hons.) – NLSIU, Bengaluru', 'LL.M. in Commercial Law – University of Cambridge (UK)'],
    experienceYears: 28,
    bio: 'Vikramaditya has appeared in over 1,400 contentious hearings before the Supreme Court of India, Delhi High Court, and arbitral tribunals across India and Singapore. He specializes in heavy commercial disputes, infrastructure arbitrations, property title challenges, and constitutional writs. A respected voice on litigation strategy and legal ethics, he routinely mentors junior litigators.',
    practiceAreaIds: ['civil-litigation', 'property-disputes', 'contract-commercial', 'corporate-support'],
    languages: ['English', 'Hindi'],
    publications: [
      'Commentary on Section 9 Interim Relief under Indian Arbitration Act (ILR 2021)',
      'Specific Performance and Judicial Discretion: Analysis of 2018 Amendments (SCC Online 2023)',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600',
    featured: true,
    order: 1,
    email: 'v.kashyap@lexglobal.in',
    jurisdiction: 'Supreme Court of India, Delhi High Court, NCLAT',
  },
  {
    id: 'team-ananya',
    slug: 'ananya-deshmukh',
    name: 'Ananya Deshmukh',
    designation: 'Partner – Dispute Resolution & Arbitration',
    barEnrollment: 'MAH/1294/2007 (Bar Council of Maharashtra & Goa)',
    education: ['B.S.L. LL.B. – ILS Law College, Pune', 'BCL – University of Oxford (Chevening Scholar)'],
    experienceYears: 19,
    bio: 'Ananya heads our Mumbai practice and commercial dispute resolution wing. Her focus covers domestic and international commercial arbitrations, shareholders disputes at NCLT, and complex property contracts. She brings exceptional tactical command to injunction hearings and appellate courts.',
    practiceAreaIds: ['contract-commercial', 'property-disputes', 'corporate-support'],
    languages: ['English', 'Hindi', 'Marathi'],
    publications: ['Cross-Border Enforcement of Arbitral Awards in Indian Courts (Indian Bar Review 2022)'],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    featured: true,
    order: 2,
    email: 'a.deshmukh@lexglobal.in',
    jurisdiction: 'Bombay High Court, Delhi High Court, NCLT Mumbai',
  },
  {
    id: 'team-rohan',
    slug: 'rohan-sengupta',
    name: 'Rohan Sengupta',
    designation: 'Senior Associate – Criminal Law & Investigations',
    barEnrollment: 'D/892/2014 (Bar Council of Delhi)',
    education: ['B.A. LL.B. (Hons.) – WBNUJS, Kolkata'],
    experienceYears: 12,
    bio: 'Rohan is an astute criminal defense advocate with extensive trial experience in white-collar offenses, Section 138 NI Act prosecutions, PMLA investigations, and anticipatory bail petitions before trial and appellate courts.',
    practiceAreaIds: ['criminal-law', 'legal-notices'],
    languages: ['English', 'Hindi', 'Bengali'],
    publications: ['Electronic Evidence Admissibility under Section 65B of Indian Evidence Act & BNSS (2024)'],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    featured: true,
    order: 3,
    email: 'r.sengupta@lexglobal.in',
    jurisdiction: 'District Courts Delhi, Delhi High Court, Special CBI/ED Courts',
  },
  {
    id: 'team-meera',
    slug: 'meera-nambiar',
    name: 'Meera Nambiar',
    designation: 'Senior Associate – Consumer & Family Law',
    barEnrollment: 'D/1102/2016 (Bar Council of Delhi)',
    education: ['B.A. LL.B. (Hons.) – NALSAR, Hyderabad', 'LL.M. – Columbia Law School, New York'],
    experienceYears: 10,
    bio: 'Meera advises clients on high-stakes consumer litigations before NCDRC and State Commissions, matrimonial settlements, mutual consent divorces, and child custody arrangements with deep empathy and tactical precision.',
    practiceAreaIds: ['consumer-protection', 'family-matrimonial'],
    languages: ['English', 'Hindi', 'Malayalam'],
    publications: ['Product Liability and Class Action Mechanics under CPA 2019 (NUJS Law Review 2021)'],
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    featured: true,
    order: 4,
    email: 'm.nambiar@lexglobal.in',
    jurisdiction: 'National Consumer Commission (NCDRC), Delhi Family Courts, High Court',
  },
  {
    id: 'team-priyanshu',
    slug: 'priyanshu-saxena',
    name: 'Priyanshu Saxena',
    designation: 'Associate – Real Estate & Tenancy Disputes',
    barEnrollment: 'D/2311/2019 (Bar Council of Delhi)',
    education: ['LL.B. – Faculty of Law, University of Delhi', 'B.Com (Hons.) – SRCC, Delhi'],
    experienceYears: 7,
    bio: 'Priyanshu handles property title due diligence, RERA consumer complaints against delayed developer projects, commercial lease drafting, eviction suits, and statutory legal notices.',
    practiceAreaIds: ['property-disputes', 'rent-tenancy', 'legal-notices'],
    languages: ['English', 'Hindi'],
    publications: ['Jurisdictional Harmonization: RERA vs Insolvency Code for Homebuyers (2023)'],
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    featured: false,
    order: 5,
    email: 'p.saxena@lexglobal.in',
    jurisdiction: 'Delhi Real Estate Regulatory Authority (RERA), Rent Controllers, District Courts',
  },
  {
    id: 'team-tanya',
    slug: 'tanya-agarwal',
    name: 'Tanya Agarwal',
    designation: 'Head of Legal Research & Educational Programs',
    barEnrollment: 'GUJ/1582/2021 (Bar Council of Gujarat)',
    education: ['B.A. LL.B. (Hons.) – Gujarat National Law University (GNLU)', 'M.Phil. in Law – NLSIU'],
    experienceYears: 5,
    bio: 'Tanya curates the firm’s continuing legal education programs, public legal awareness guides, and coordinates jurisprudential research for landmark appellate submissions.',
    practiceAreaIds: ['civil-litigation', 'corporate-support'],
    languages: ['English', 'Hindi', 'Gujarati'],
    publications: ['Judicial Trends in Restitution and Unjust Enrichment in Indian Courts (2024)'],
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    featured: false,
    order: 6,
    email: 't.agarwal@lexglobal.in',
    jurisdiction: 'Research Division, Supreme Court & High Court Registries',
  },
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'civil-litigation',
    slug: 'civil-litigation',
    title: 'Civil Litigation & Appellate Practice',
    iconName: 'Scale',
    shortDesc: 'Comprehensive representation in civil recovery suits, injunctions, writ petitions, and appellate matters before High Courts and the Supreme Court.',
    longDesc: 'Our civil litigation chamber provides strategic, procedural, and evidentiary counsel for complex civil disputes. We represent individuals, trusts, and commercial entities across all stages of civil adjudication, from pre-litigation notice and drafting of plaints/written statements, to rigorous cross-examination, temporary injunction hearings under Order 39 of CPC, and final appellate arguments.',
    statutoryFramework: [
      'Code of Civil Procedure, 1908 (CPC)',
      'Specific Relief Act, 1963',
      'The Limitation Act, 1963',
      'Indian Evidence Act, 1872 / Bharatiya Sakshya Adhiniyam',
      'Articles 226 & 32 of the Constitution of India (Writ Jurisdiction)',
    ],
    keyIssues: [
      'Suits for recovery of money and damages',
      'Permanent and mandatory injunctions against dispossession or encroachment',
      'Declaration of title and cancellation of fraudulent documents',
      'First Appeals, Second Appeals, and Special Leave Petitions (SLPs)',
      'Execution of decrees and foreign judgment enforcement',
    ],
    processSteps: [
      { title: 'Case Analysis & Document Audit', desc: 'Detailed examination of title deeds, correspondence, and limitation period.' },
      { title: 'Pre-Litigation Notice & Reply', desc: 'Issuance of precise statutory demand notice setting forth cause of action.' },
      { title: 'Pleading Drafting & Interim Protection', desc: 'Filing plaint accompanied by urgent interim applications under Order 39 Rules 1 & 2.' },
      { title: 'Evidence & Trial Management', desc: 'Affidavit of evidence, formal production of original records, and cross-examination.' },
      { title: 'Final Hearing & Execution', desc: 'Oral submissions on law and precedent, followed by prompt execution proceedings.' },
    ],
    faqs: [
      {
        question: 'What is the limitation period for filing a civil money recovery suit?',
        answer: 'Under Article 19-22 of the Limitation Act, 1963, the limitation period for recovering a commercial debt or loan is generally three years from the date the cause of action accrued (e.g. date of invoice, dishonor, or written acknowledgment of debt under Section 18).',
      },
      {
        question: 'Can the court grant an urgent interim stay before hearing the opposite party?',
        answer: 'Yes. Under Order 39 Rule 3 of the CPC, the court may grant ex-parte ad-interim injunction in exceptional cases where giving prior notice would defeat the very purpose of the injunction. Reasons must be recorded by the court and notice served within 24-48 hours.',
      },
    ],
    relatedCourses: ['course-civil-procedure', 'course-contract-drafting'],
    relatedBlogs: ['blog-sc-specific-performance', 'blog-statutory-notice-guide'],
    leadAdvocateId: 'team-vikramaditya',
  },
  {
    id: 'property-disputes',
    slug: 'property-and-real-estate-disputes',
    title: 'Property & Real Estate Disputes',
    iconName: 'Building',
    shortDesc: 'Strategic advocacy for title verification, partition suits, builder delay compensation under RERA, and land acquisition challenges.',
    longDesc: 'Real estate litigation demands deep familiarity with revenue records, municipal zoning laws, transfer documentation, and specialized tribunals. Our team guides clients through high-value ancestral partition suits, builder-buyer disputes, unlawful dispossession, boundary disputes, and challenges to fraudulent sale deeds.',
    statutoryFramework: [
      'Transfer of Property Act, 1882',
      'Real Estate (Regulation and Development) Act, 2016 (RERA)',
      'Registration Act, 1908 & Indian Stamp Act, 1899',
      'Specific Relief Act, 1963 (Section 5 & 6)',
      'State Revenue & Land Records Enactments',
    ],
    keyIssues: [
      'Delay in possession and refund claims against real estate developers under RERA',
      'Ancestral property partition and coparcenary share demarcation',
      'Suits for Specific Performance of Agreement to Sell',
      'Cancellation of fraudulent Power of Attorney (GPA/SPA) and Sale Deeds',
      'Mutation disputes and revenue entry rectifications',
    ],
    processSteps: [
      { title: 'Title Search & 30-Year Chain Audit', desc: 'Verifying encumbrance certificate, registry records, and approved layout sanctions.' },
      { title: 'Forum Selection (Civil Court vs RERA/NCLT)', desc: 'Strategic election of forum depending on whether the builder is solvent or undergoing insolvency.' },
      { title: 'Status Quo / Injunction Filing', desc: 'Restraining third-party creation of rights or unauthorized construction on the subject property.' },
      { title: 'Demarcation & Local Commissioner Appointment', desc: 'Court-monitored physical inspection to record existing boundaries and possession.' },
    ],
    faqs: [
      {
        question: 'Can a homebuyer approach both RERA and NCDRC (Consumer Court) against a builder?',
        answer: 'The Supreme Court of India in Imperia Structures Ltd. v. Anil Patni (2020) affirmed that remedies under RERA and the Consumer Protection Act are concurrent and alternative. A homebuyer is not barred from approaching consumer forums merely because RERA exists.',
      },
      {
        question: 'Is an unregistered Agreement to Sell enforceable in a court of law?',
        answer: 'While an unregistered agreement cannot transfer title under Section 54 of the Transfer of Property Act, the proviso to Section 49 of the Registration Act explicitly permits receiving an unregistered Agreement to Sell as evidence in a suit for Specific Performance under the Specific Relief Act.',
      },
    ],
    relatedCourses: ['course-rera-property', 'course-civil-procedure'],
    relatedBlogs: ['blog-rera-nclt-remedies', 'blog-sc-specific-performance'],
    leadAdvocateId: 'team-priyanshu',
  },
  {
    id: 'contract-commercial',
    slug: 'contract-and-commercial-disputes',
    title: 'Contract & Commercial Disputes',
    iconName: 'FileText',
    shortDesc: 'Handling breach of contract, liquidated damages, commercial arbitrations, vendor non-payment, and shareholder agreements.',
    longDesc: 'Commercial disputes require swift legal intervention to protect cash flows, operational stability, and intellectual property. We represent corporations, partnerships, and high-net-worth individuals in commercial courts established under the Commercial Courts Act, 2015, as well as institutional and ad-hoc arbitrations.',
    statutoryFramework: [
      'Indian Contract Act, 1872',
      'Commercial Courts Act, 2015',
      'Arbitration and Conciliation Act, 1996 (Amended 2015/2019/2021)',
      'Insolvency and Bankruptcy Code, 2016 (IBC)',
      'Sale of Goods Act, 1930',
    ],
    keyIssues: [
      'Pre-Institution Mediation & Settlement under Section 12A Commercial Courts Act',
      'Urgent Section 9 Interim Measures before Arbitral Tribunals',
      'Section 11 Applications for Appointment of Arbitrators',
      'Section 34 Applications challenging arbitral awards on grounds of public policy',
      'Enforcement of non-compete, confidentiality, and indemnification clauses',
    ],
    processSteps: [
      { title: 'Contractual Audit & Clause Trigger', desc: 'Analyzing dispute resolution clause, governing law, seat vs venue, and notice period.' },
      { title: 'Mandatory Pre-Institution Mediation', desc: 'Compliance with Section 12A unless urgent interim relief is justified.' },
      { title: 'Section 9 Interim Protection', desc: 'Securing disputed amounts in bank deposit or restraining encashment of bank guarantees.' },
      { title: 'Arbitration Reference & Award Adjudication', desc: 'Pleading statement of claim, witness cross-examination, and award execution.' },
    ],
    faqs: [
      {
        question: 'Is pre-institution mediation mandatory before filing a commercial suit in India?',
        answer: 'Yes. In Patil Automation Pvt Ltd (2022), the Supreme Court ruled that Section 12A of the Commercial Courts Act is mandatory. A suit filed without exhausting pre-institution mediation will be rejected under Order 7 Rule 11 of CPC, unless urgent interim relief is contemplated and sought.',
      },
      {
        question: 'When can a court interfere with an arbitral award under Section 34?',
        answer: 'The scope of interference under Section 34 is very narrow. Courts cannot re-evaluate evidence or act as an appellate court. An award can only be set aside if it violates public policy, is patently illegal on the face of the record, or breaches natural justice.',
      },
    ],
    relatedCourses: ['course-contract-drafting', 'course-civil-procedure'],
    relatedBlogs: ['blog-liquidated-damages-contracts', 'blog-statutory-notice-guide'],
    leadAdvocateId: 'team-ananya',
  },
  {
    id: 'criminal-law',
    slug: 'criminal-law-and-investigations',
    title: 'Criminal Law & White-Collar Defense',
    iconName: 'Shield',
    shortDesc: 'Vigorous legal defense in financial crimes, Section 138 cheque bounce cases, quashing of FIRs under Section 482, and bail proceedings.',
    longDesc: 'Our criminal defense practice provides strategic advice from the moment summons or FIRs are registered. We protect fundamental rights during investigative questioning, advocate for regular and anticipatory bails, challenge unlawful arrest, and defend clients against complex economic offenses and corporate fraud allegations.',
    statutoryFramework: [
      'Bharatiya Nyaya Sanhita, 2023 / Indian Penal Code, 1860',
      'Bharatiya Nagarik Suraksha Sanhita, 2023 / Code of Criminal Procedure, 1973',
      'Bharatiya Sakshya Adhiniyam, 2023 / Indian Evidence Act, 1872',
      'Negotiable Instruments Act, 1881 (Section 138-142)',
      'Prevention of Money Laundering Act, 2002 (PMLA)',
    ],
    keyIssues: [
      'Anticipatory bail applications under Section 438 CrPC / Section 482 BNSS',
      'Petitions for quashing malicious or frivolous FIRs under Section 482 CrPC',
      'Section 138 NI Act complaints and defense for dishonour of cheques',
      'Defense in economic offense directorate summons and corporate investigations',
      'Trial defense, bail hearings, and criminal appeals before High Courts',
    ],
    processSteps: [
      { title: 'Immediate Protective Petitions', desc: 'Seeking transit anticipatory bail or pre-arrest protection upon notice/summons.' },
      { title: 'Quashing Strategy & Legal Grounds', desc: 'Assessing if allegations disclose a purely civil dispute cloaked with criminal flavor.' },
      { title: 'Remand & Bail Advocacy', desc: 'Rigorous presentation before Magistrate / Sessions Court highlighting non-custodial merits.' },
      { title: 'Charge Framing & Defense Trial', desc: 'Challenging prima-facie charge framing, cross-examining prosecution witnesses.' },
    ],
    faqs: [
      {
        question: 'What are the essential ingredients to initiate a Section 138 cheque bounce case?',
        answer: '1) Presentation of cheque within validity (3 months); 2) Receipt of bank return memo with insufficiency of funds or similar reason; 3) Service of statutory legal demand notice within 30 days of memo; 4) Failure of drawer to pay within 15 days of notice receipt; 5) Filing criminal complaint within 30 days thereafter.',
      },
    ],
    relatedCourses: ['course-civil-procedure'],
    relatedBlogs: ['blog-bns-criminal-law-transition', 'blog-statutory-notice-guide'],
    leadAdvocateId: 'team-rohan',
  },
  {
    id: 'consumer-protection',
    slug: 'consumer-protection-and-e-commerce',
    title: 'Consumer Protection & Product Liability',
    iconName: 'Award',
    shortDesc: 'Advocacy before District, State, and National Consumer Disputes Redressal Commissions (NCDRC) for deficiency of service and unfair trade practices.',
    longDesc: 'With the enactment of the Consumer Protection Act 2019, consumer jurisprudence in India underwent a major expansion, introducing statutory product liability, mediation cells, class actions, and strict liability for misleading advertisements. We represent discerning consumers, homebuyer associations, medical negligence claimants, and commercial businesses.',
    statutoryFramework: [
      'Consumer Protection Act, 2019',
      'Consumer Protection (E-Commerce) Rules, 2020',
      'Real Estate (Regulation and Development) Act, 2016',
      'Insurance Regulatory and Development Authority (IRDAI) Regulations',
    ],
    keyIssues: [
      'Repudiation of insurance claims by health, life, and motor insurers',
      'Delayed delivery of residential units and arbitrary builder charges',
      'Medical negligence and deficiency of institutional healthcare services',
      'E-commerce dark patterns, fake product delivery, and refund non-processing',
      'Product liability actions against manufacturers and sellers',
    ],
    processSteps: [
      { title: 'Statutory Grievance Notice', desc: 'Issuing formal demand detailing deficiency and damages sought within 15-day window.' },
      { title: 'Forum Determination by Pecuniary Value', desc: 'Filing before District (< 50 Lakhs), State (50 Lakhs to 2 Crores), or National Commission (> 2 Crores).' },
      { title: 'Mediation Reference or Pleadings', desc: 'Exploring court-attached mediation or filing formal evidence on affidavit.' },
    ],
    faqs: [
      {
        question: 'What is the limitation period for filing a complaint before the Consumer Commission?',
        answer: 'Under Section 69 of the Consumer Protection Act, 2019, a complaint must be filed within two years from the date on which the cause of action arose. Delay can be condoned if sufficient cause is shown.',
      },
    ],
    relatedCourses: ['course-consumer-rights'],
    relatedBlogs: ['blog-consumer-protection-pecuniary-limits', 'blog-rera-nclt-remedies'],
    leadAdvocateId: 'team-meera',
  },
  {
    id: 'family-matrimonial',
    slug: 'family-and-matrimonial-matters',
    title: 'Family & Matrimonial Matters',
    iconName: 'HeartHandshake',
    shortDesc: 'Compassionate, confidential counsel for mutual consent divorce, maintenance, child custody, domestic violence, and succession.',
    longDesc: 'Matrimonial disputes demand emotional maturity, extreme discretion, and technical legal rigor. We assist clients in achieving dignified resolutions through mediation wherever possible, while mounting unwavering advocacy when litigation becomes inevitable.',
    statutoryFramework: [
      'Hindu Marriage Act, 1955 & Special Marriage Act, 1954',
      'Protection of Women from Domestic Violence Act, 2005 (PWDVA)',
      'Family Courts Act, 1984',
      'Guardians and Wards Act, 1890',
      'Section 125 of CrPC / Bharatiya Nagarik Suraksha Sanhita (Maintenance)',
    ],
    keyIssues: [
      'Mutual Consent Divorce under Section 13B (waiver of cooling-off period)',
      'Contested divorce on grounds of cruelty, desertion, or adultery',
      'Child custody arrangements, visitation schedules, and international travel permissions',
      'Interim and permanent alimony and maintenance determination',
      'Proceedings under Domestic Violence Act and Section 498A defense/representation',
    ],
    processSteps: [
      { title: 'Confidential Consultation & Assessment', desc: 'Evaluation of matrimonial assets, welfare of minors, and reconciliation feasibility.' },
      { title: 'Mediation & Settlement Terms Drafting', desc: 'Formulating comprehensive Settlement Agreement covering all financial and custody aspects.' },
      { title: 'First & Second Motion Pleadings', desc: 'Joint recording of statements before Family Court judge.' },
    ],
    faqs: [
      {
        question: 'Can the mandatory six-month cooling-off period in mutual divorce be waived?',
        answer: 'Yes. The Supreme Court in Amardeep Singh v. Harveen Kaur (2017) held that the 6-month statutory waiting period under Section 13B(2) is directory and not mandatory. The Family Court can waive it if parties have genuinely settled and cohabitation is impossible.',
      },
    ],
    relatedCourses: ['course-civil-procedure'],
    relatedBlogs: ['blog-statutory-notice-guide'],
    leadAdvocateId: 'team-meera',
  },
  {
    id: 'rent-tenancy',
    slug: 'rent-agreements-and-tenancy',
    title: 'Rent Agreements & Tenancy Disputes',
    iconName: 'Home',
    shortDesc: 'Drafting commercial leases, leave and license agreements, eviction suits on bona fide need, and tenant deposit disputes.',
    longDesc: 'From high-value commercial leases to residential tenancy management, we ensure contracts are legally watertight and enforceable under state rent control statutes and the Model Tenancy Act principles.',
    statutoryFramework: [
      'State Rent Control Enactments (e.g. Delhi Rent Control Act, Maharashtra Rent Control Act)',
      'Transfer of Property Act, 1882 (Sections 105–117)',
      'Registration Act, 1908 (Mandatory 11-month+ lease registration)',
      'Model Tenancy Act provisions',
    ],
    keyIssues: [
      'Bona fide requirement eviction petitions by landlords',
      'Recovery of unpaid rent, maintenance arrears, and mesne profits',
      'Return of security deposit disputes and unlawful withholding',
      'Drafting commercial triple-net (NNN) leases and escalation covenants',
    ],
    processSteps: [
      { title: 'Lease Vetting & Stamp Duty Calculation', desc: 'Ensuring correct stamp duty according to lease duration and annual consideration.' },
      { title: 'Statutory Notice to Vacate / Termination', desc: 'Valid 15-day or 30-day notice under Section 106 of Transfer of Property Act.' },
      { title: 'Eviction Petition & Mesne Profits Application', desc: 'Seeking market rent payment during the pendency of eviction proceedings.' },
    ],
    faqs: [
      {
        question: 'Why are residential leases typically executed for 11 months in India?',
        answer: 'Under Section 17 of the Registration Act, leases exceeding 11 months (1 year or more) require mandatory registration and higher stamp duty. An 11-month Leave & License agreement avoids mandatory registration in certain states, though several states now mandate registration regardless of term.',
      },
    ],
    relatedCourses: ['course-rera-property', 'course-contract-drafting'],
    relatedBlogs: ['blog-statutory-notice-guide'],
    leadAdvocateId: 'team-priyanshu',
  },
  {
    id: 'legal-notices',
    slug: 'legal-notices-and-documentation',
    title: 'Legal Notices & Statutory Documentation',
    iconName: 'Send',
    shortDesc: 'Articulated statutory notices, replies to adversarial demands, caveats under Section 148A, and settlement deeds.',
    longDesc: 'A legal notice is the foundational document of any litigation. A poorly drafted notice or an unconsidered reply can irrevocably damage your legal rights before the court. We specialize in drafting factually bulletproof, legally grounded notices that establish clear liability and often produce negotiated settlements without costly court battles.',
    statutoryFramework: [
      'Section 80 of the Code of Civil Procedure (Notice to Government)',
      'Section 138 of the Negotiable Instruments Act',
      'Section 148A of CPC (Right to Lodge a Caveat)',
      'Consumer Protection & Arbitration Notice Requirements',
    ],
    keyIssues: [
      'Drafting and replying to Section 138 Cheque Bounce notices',
      'Defamation notices and cease-and-desist warnings',
      'Employment termination and severance dispute notices',
      'Caveat applications to prevent ex-parte adverse orders',
    ],
    processSteps: [
      { title: 'Chronological Evidence Assembling', desc: 'Collating invoices, email records, bank memos, and written communications.' },
      { title: 'Statutory Timeline Compliance', desc: 'Ensuring the demand period strictly adheres to relevant statutes (e.g. 15 or 30 days).' },
      { title: 'Registered Post & Email Dispatch', desc: 'Dispatch with speed post tracking receipt and email acknowledgment for evidentiary record.' },
    ],
    faqs: [
      {
        question: 'Is it mandatory to reply to a legal notice received in India?',
        answer: 'While not criminally punishable, failing to reply to a legal notice allows the sender to claim in court that you had no defense or that the facts were admitted. An effective reply clarifies facts, rejects baseless claims, and protects your trial position.',
      },
    ],
    relatedCourses: ['course-civil-procedure', 'course-contract-drafting'],
    relatedBlogs: ['blog-statutory-notice-guide'],
    leadAdvocateId: 'team-rohan',
  },
  {
    id: 'corporate-support',
    slug: 'corporate-and-business-legal-support',
    title: 'Corporate & Business Legal Support',
    iconName: 'Briefcase',
    shortDesc: 'General counsel advisory for founders, corporate governance, employment contracts, board compliance, and commercial transactions.',
    longDesc: 'We act as trusted outside general counsel for growing enterprises, family businesses, and established private corporations. We design compliance frameworks, handle company law matters before the Registrar of Companies and NCLT, and ensure your business operations remain legally insulated.',
    statutoryFramework: [
      'Companies Act, 2013 & Rules',
      'Limited Liability Partnership Act, 2008',
      'Insolvency and Bankruptcy Code, 2016',
      'Digital Personal Data Protection Act, 2023 (DPDP)',
      'Foreign Exchange Management Act, 1999 (FEMA)',
    ],
    keyIssues: [
      'Founder agreements, shareholding vesting, and ESOP schemes',
      'NCLT representation in Section 241/242 oppression and mismanagement actions',
      'Employment contracts, non-solicitation, and IP assignment deeds',
      'Digital privacy audits and DPDP Act compliance reviews',
    ],
    processSteps: [
      { title: 'Governance & Contractual Audit', desc: 'Reviewing MoA, AoA, SHA, and statutory registers.' },
      { title: 'Risk Insulation & Document Templating', desc: 'Customizing master service agreements and supplier contracts.' },
      { title: 'Regulatory Reporting & Filings', desc: 'Advising on compliance with RoC, MCA, and sectoral regulators.' },
    ],
    faqs: [
      {
        question: 'What are the core compliance obligations under the DPDP Act 2023 for Indian companies?',
        answer: 'Enterprises acting as Data Fiduciaries must obtain unambiguous consent, issue clear multilingual notices, implement security safeguards to prevent data breaches, appoint a Data Protection Officer / grievance mechanism, and cease retaining data once the purpose is fulfilled.',
      },
    ],
    relatedCourses: ['course-corporate-governance', 'course-contract-drafting'],
    relatedBlogs: ['blog-liquidated-damages-contracts'],
    leadAdvocateId: 'team-ananya',
  },
];

export const COURSES: Course[] = [
  {
    id: 'course-contract-drafting',
    slug: 'drafting-commercial-contracts-and-arbitration-clauses',
    title: 'Drafting Commercial Contracts & Strategic Arbitration Clauses',
    shortDescription: 'Master the craft of drafting high-stakes commercial agreements, indemnity covenants, limitation of liability, and dispute resolution clauses governed by Indian law.',
    fullDescription: 'Designed for junior advocates, corporate legal counsels, and law students, this comprehensive masterclass dissects the anatomy of real-world Indian commercial contracts. Led by Partner Ananya Deshmukh, you will learn how to identify hidden liability traps, craft enforceable liquidated damages clauses, and construct multi-tiered arbitration agreements that survive judicial scrutiny under the Arbitration and Conciliation Act, 1996.',
    category: 'Corporate & Commercial',
    difficulty: 'Intermediate',
    durationHours: 6,
    price: 3499,
    instructorId: 'team-ananya',
    thumbnailUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    learningOutcomes: [
      'Draft ironclad indemnities and limitation of liability clauses under Indian Contract Act',
      'Formulate valid seat vs venue distinctions in arbitration clauses to prevent jurisdictional gridlocks',
      'Structure conditions precedent and termination for cause mechanisms with clear cure periods',
      'Incorporate Boilerplate clauses that protect against unforeseen regulatory shifts and force majeure',
    ],
    prerequisites: ['Basic understanding of the Indian Contract Act, 1872', 'Foundational legal research skills'],
    featured: true,
    published: true,
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Foundations of Contractual Risk & Anatomy of an Agreement',
        lessons: [
          {
            id: 'les-1-1',
            title: '1.1 Anatomy of a Commercial Agreement & Recitals Craft',
            durationMinutes: 28,
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: `### Welcome to Contract Drafting Mastery

Commercial drafting in India is not merely filling templates; it is the strategic allocation of risk between parties under the framework of the Indian Contract Act, 1872.

#### 1. The Function of Recitals
Recitals (the "Whereas" clauses) explain the factual background, intention, and contextual premise of the transaction.
- **Rule of Construction:** When the operative body of the contract is ambiguous, courts look to the recitals to ascertain mutual legislative intent.
- Ensure recitals do not contain active contractual covenants or warranties.

#### 2. Definitive Concepts & Interpretation Rules
- Always define key commercial terms: "Material Adverse Effect", "Permitted Encumbrances", "Confidential Information".
- Include standard statutory rules: singular includes plural, references to statutes include future re-enactments.`,
            downloadableResource: {
              name: 'Checklist-Commercial-Contract-Anatomy.pdf',
              size: '1.2 MB',
              format: 'PDF',
            },
          },
          {
            id: 'les-1-2',
            title: '1.2 Representations, Warranties, and Covenants',
            durationMinutes: 35,
            isPreview: false,
            content: `### Distinguishing Reps & Warranties from Covenants

Understanding the conceptual distinction between representations, warranties, and covenants is vital for calculating damages under Section 73 and Section 74 of the Indian Contract Act.

- **Representation:** A statement of existing or past fact made by one party to induce another to contract. If false, remedies include rescission or tortious damages.
- **Warranty:** A promise that a statement of fact is true, backed by an agreement to pay damages if breached.
- **Covenant:** An ongoing affirmative or negative obligation during the tenure of the contract.`,
          },
        ],
      },
      {
        id: 'mod-2',
        title: 'Module 2: Dispute Resolution & Arbitration Clause Mechanics',
        lessons: [
          {
            id: 'les-2-1',
            title: '2.1 Seat vs. Venue: The Supreme Court Jurisprudence',
            durationMinutes: 42,
            isPreview: true,
            content: `### Navigating the Seat vs. Venue Conundrum in Indian Arbitrations

Under Indian arbitration jurisprudence, distinguishing between the 'Seat' and 'Venue' of arbitration determines which High Court exercises supervisory jurisdiction over the arbitral process (including Section 9 interim measures, Section 11 appointments, and Section 34 challenges).

#### Key Precedents:
1. **Bharat Aluminium Co. (BALCO) v. Kaiser Aluminium (2012):** Seat represents the legal home of the arbitration.
2. **BGS SGS Soma JV v. NHPC Ltd. (2020):** If a place is designated as the 'venue' of arbitration and no contrary indicia exist, that place is generally considered the 'seat'.
3. **Mankastu Impex v. Airvisual (2020):** Mere mention of venue does not automatically make it the seat if supervisory jurisdiction is explicitly reserved elsewhere.`,
            downloadableResource: {
              name: 'Model-Arbitration-Clause-Indian-Law.docx',
              size: '450 KB',
              format: 'DOCX',
            },
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'quiz-1',
        question: 'Under Indian law, when a venue is designated for arbitration without contrary intent, what is the presumption established in BGS SGS Soma (2020)?',
        options: [
          'The venue has no legal significance',
          'The designated venue is presumed to be the juridical seat of arbitration',
          'The seat must always be New Delhi regardless of clause',
          'Courts at the respondents registered office will supervise',
        ],
        correctOptionIndex: 1,
        explanation: 'In BGS SGS Soma, the Supreme Court held that the designated venue is considered the seat unless there are clear contrary indicia.',
      },
      {
        id: 'quiz-2',
        question: 'What is the effect of Section 74 of the Indian Contract Act on liquidated damages clauses?',
        options: [
          'The court automatically awards the entire stipulated penalty amount without proof',
          'The stipulated amount is treated as a maximum ceiling; the party must still establish reasonable compensation',
          'Liquidated damages clauses are null and void under Indian law',
          'Only punitive damages can be awarded',
        ],
        correctOptionIndex: 1,
        explanation: 'Under Section 74, as clarified in Fateh Chand and Kailash Nath Associates, liquidated damages represent an upper ceiling; the court awards reasonable compensation not exceeding that penalty.',
      },
    ],
  },
  {
    id: 'course-rera-property',
    slug: 'navigating-rera-and-property-litigation',
    title: 'Navigating RERA & Property Litigation in India',
    shortDescription: 'A practical guide to filing complaints before RERA Authorities, understanding homebuyer remedies, title investigation, and execution of recovery warrants.',
    fullDescription: 'The Real Estate (Regulation and Development) Act, 2016 revolutionized property litigation in India. This course equips advocates, real estate consultants, and property buyers with the actionable knowledge required to audit title deeds, initiate proceedings against defaulting promoters, claim statutory delayed-possession interest, and enforce RERA orders through district collectors.',
    category: 'Real Estate & Property',
    difficulty: 'Intermediate',
    durationHours: 5,
    price: 2999,
    instructorId: 'team-priyanshu',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    learningOutcomes: [
      'Master the procedure of drafting Form M (RERA Authority) and Form N (Adjudicating Officer)',
      'Calculate statutory interest under Rule 15 of RERA from promised date of possession',
      'Understand the intersection of RERA, Consumer Protection Act, and Insolvency & Bankruptcy Code',
      'Execute recovery certificates through Section 40 via the District Collector revenue recovery process',
    ],
    prerequisites: ['Basic knowledge of property laws in India'],
    featured: true,
    published: true,
    modules: [
      {
        id: 'mod-rera-1',
        title: 'Module 1: The Regulatory Architecture of RERA',
        lessons: [
          {
            id: 'les-rera-1-1',
            title: '1.1 Section 18 Rights: Delayed Possession & Refund with Interest',
            durationMinutes: 30,
            isPreview: true,
            content: `### Understanding Homebuyer Rights under Section 18 of RERA 2016

Section 18 is the cornerstone of consumer protection in the real estate sector.

#### Key Statutory Mandates:
1. **Unconditional Right to Refund:** If the promoter fails to give possession in accordance with the terms of the agreement to sell, the allottee has the right to demand return of the full amount paid with interest.
2. **Right to Monthly Delay Compensation:** If the allottee does not intend to withdraw from the project, they are entitled to receive interest for every month of delay until handover of possession.
3. **Prescribed Interest Rate:** Typically MCLR (Marginal Cost of Funds Based Lending Rate) of SBI plus 2%.`,
            downloadableResource: {
              name: 'Draft-Form-M-RERA-Complaint.docx',
              size: '620 KB',
              format: 'DOCX',
            },
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'quiz-rera-1',
        question: 'Under Section 4(2)(l)(D) of RERA 2016, what percentage of amounts realized from allottees must be deposited into a dedicated escrow account?',
        options: ['40%', '50%', '70%', '100%'],
        correctOptionIndex: 2,
        explanation: 'Section 4(2)(l)(D) mandates that 70% of collections must be maintained in a scheduled bank escrow account solely for land cost and construction.',
      },
      {
        id: 'quiz-rera-2',
        question: 'Can an allottee approach both RERA and the Consumer Commission for delayed possession according to the Supreme Court?',
        options: [
          'No, RERA has exclusive jurisdiction',
          'Yes, the remedies are concurrent as confirmed in Imperia Structures (2020)',
          'Only if the project was started prior to 2016',
          'Only if RERA dismisses the complaint',
        ],
        correctOptionIndex: 1,
        explanation: 'The Supreme Court ruled in Imperia Structures v. Anil Patni that remedies under RERA and the Consumer Protection Act are concurrent and alternative.',
      },
    ],
  },
  {
    id: 'course-civil-procedure',
    slug: 'essentials-of-civil-procedure-and-injunctions',
    title: 'Essentials of Civil Procedure & Urgent Injunction Applications',
    shortDescription: 'Comprehensive procedural walkthrough of drafting plaints, interlocutory applications under Order 39, affidavit evidence, and civil appeals.',
    fullDescription: 'Procedural mastery is what separates ordinary litigators from eminent advocates. Led by Senior Advocate Vikramaditya Kashyap, this flagship course demystifies the Code of Civil Procedure, 1908. Learn how to craft pleadings that withstand demurrers under Order 7 Rule 11, argue urgent ex-parte ad-interim injunctions, and structure First Appeals under Section 96 of CPC.',
    category: 'Litigation & Procedure',
    difficulty: 'Advanced',
    durationHours: 8,
    price: 4999,
    instructorId: 'team-vikramaditya',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    learningOutcomes: [
      'Draft legally sound plaints and written statements complying with Order 6, 7 & 8 of CPC',
      'Formulate three-fold test for interim injunctions: Prima facie case, Balance of convenience, Irreparable injury',
      'Defend or attack plaints under Order 7 Rule 11 (Rejection of Plaint) on limitation and cause of action',
      'Navigate discovery, inspection of documents, interrogatories, and local commission appointments under Order 26',
    ],
    prerequisites: ['LL.B. degree or enrolled law student in final year'],
    featured: true,
    published: true,
    modules: [
      {
        id: 'mod-cpc-1',
        title: 'Module 1: The Three Pillars of Interim Injunctions',
        lessons: [
          {
            id: 'les-cpc-1-1',
            title: '1.1 Order 39 Rules 1 & 2: Crafting the Injunction Application',
            durationMinutes: 45,
            isPreview: true,
            content: `### The Three-Pronged Doctrine of Temporary Injunctions in India

To obtain an interim injunction restraining the defendant from alienating property, breaching an agreement, or disturbing possession, the plaintiff must convince the court on three concurrent standards:

1. **Prima Facie Case:** A substantial question to be investigated at trial. The plaintiff does not need to prove their case conclusively at this stage, but must show a bona fide contention with reasonable prospect of success.
2. **Balance of Convenience:** The court must weigh the substantial mischief or detriment that would occur to the applicant if injunction is withheld against that which would be suffered by the opposite party if granted.
3. **Irreparable Injury:** Monetary damages must not be an adequate substitute for the harm that would result if the interim relief is denied.`,
            downloadableResource: {
              name: 'Template-Order-39-Injunction-Application.docx',
              size: '510 KB',
              format: 'DOCX',
            },
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'quiz-cpc-1',
        question: 'Under Order 7 Rule 11 of the CPC, what materials can the court examine to decide an application for rejection of plaint?',
        options: [
          'Both the plaint and the written statement of the defendant',
          'Only the averments made in the plaint itself, assumed to be true',
          'Oral witness depositions',
          'Police investigation reports',
        ],
        correctOptionIndex: 1,
        explanation: 'It is a settled principle that for deciding an application under Order 7 Rule 11, only the averments in the plaint are to be looked into.',
      },
    ],
  },
  {
    id: 'course-consumer-rights',
    slug: 'consumer-rights-and-national-commission-practice',
    title: 'Consumer Rights & National Commission Practice (CPA 2019)',
    shortDescription: 'Free public legal literacy course covering consumer protections, online purchase disputes, medical negligence claims, and e-commerce rules.',
    fullDescription: 'Knowledge of consumer rights is essential for every citizen and litigator. This complimentary educational initiative by Lex Global Advocacy provides a clear, accessible guide to filing grievances, calculating compensation, and navigating the e-Daakhil consumer filing portal under the Consumer Protection Act, 2019.',
    category: 'Consumer & Citizen Rights',
    difficulty: 'Beginner',
    durationHours: 3,
    price: 0, // Free course
    instructorId: 'team-meera',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    learningOutcomes: [
      'Understand statutory definitions of "consumer", "deficiency of service", and "defect in goods"',
      'Identify pecuniary jurisdictions across District, State, and National Consumer Commissions',
      'Step-by-step procedure to file complaints online via the e-Daakhil system without an advocate',
      'Remedies against e-commerce platforms for deceptive delivery, cancellation fees, and hidden charges',
    ],
    prerequisites: ['None. Open to all citizens, students, and practitioners.'],
    featured: false,
    published: true,
    modules: [
      {
        id: 'mod-con-1',
        title: 'Module 1: Introduction to Consumer Rights under CPA 2019',
        lessons: [
          {
            id: 'les-con-1-1',
            title: '1.1 Who is a Consumer? Exclusions and Commercial Purpose',
            durationMinutes: 22,
            isPreview: true,
            content: `### Demystifying the Definition of 'Consumer'

Under Section 2(7) of the Consumer Protection Act 2019:
A consumer is any person who buys any goods or hires/avails any services for a consideration which has been paid or promised.

#### Key Exception: 'Commercial Purpose'
- Does not include a person who obtains goods for resale or for any commercial purpose.
- **Critical Proviso:** Commercial purpose does NOT include use by a person of goods bought and used by him exclusively for the purposes of earning his livelihood by means of self-employment (e.g. a taxi driver purchasing a car for livelihood is a consumer).`,
            downloadableResource: {
              name: 'Citizen-Guide-eDaakhil-Filing.pdf',
              size: '950 KB',
              format: 'PDF',
            },
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'quiz-con-1',
        question: 'What is the limitation period for filing a complaint before a Consumer Disputes Redressal Commission?',
        options: ['6 months', '1 year', '2 years from the date cause of action arose', '3 years'],
        correctOptionIndex: 2,
        explanation: 'Section 69 of the Consumer Protection Act, 2019 stipulates a 2-year limitation period from the date on which the cause of action arose.',
      },
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-sc-specific-performance',
    slug: 'supreme-court-specific-performance-2018-amendment-analysis',
    title: 'Supreme Court’s Jurisprudential Evolution on Specific Performance & Property Agreements',
    subtitle: 'An analysis of judicial discretion post the 2018 Specific Relief Act amendments and the requirement of readiness and willingness.',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    category: 'Property and Real Estate Law',
    tags: ['Specific Relief Act', 'Property Litigation', 'Supreme Court', 'Contract Enforcement'],
    authorId: 'team-vikramaditya',
    publishedDate: '2026-09-15',
    lastUpdated: '2026-10-10',
    readTimeMinutes: 7,
    summary: 'The 2018 Amendment fundamentally shifted Section 10 of the Specific Relief Act from discretionary equitable relief to a mandatory statutory right. This article examines recent Supreme Court pronouncements interpreting this transformation.',
    content: `## The Paradigm Shift in Indian Specific Performance Jurisprudence

Prior to the 2018 Amendment to the Specific Relief Act, 1963, specific performance of an agreement to sell immovable property was viewed as a purely equitable and discretionary remedy. Courts routinely declined to grant specific performance if monetary damages were perceived as adequate compensation under the erstwhile Section 10.

### 1. Mandatory Nature of Section 10
The Substitution of Section 10 in 2018 removed the words *"the specific performance of a contract may, in the discretion of the court, be enforced"* and replaced them with mandatory statutory language:
> *"The specific performance of a contract shall be enforced by the court subject to the provisions contained in sub-section (2) of section 11, section 14 and section 16."*

Consequently, once the valid execution of an agreement to sell is proven, the court is duty-bound to decree specific performance unless the plaintiff fails on the statutory bars outlined in Section 16.

### 2. The Unwavering Rigor of Section 16(c): Readiness & Willingness
While Section 10 is now mandatory, the Supreme Court has consistently held (most recently in *Shenbagam v. KK Rathinavel, 2022*) that the requirement under Section 16(c) for the plaintiff to plead and prove that they have continuously been **ready and willing** to perform their essential obligations remains strict and non-negotiable.

- **Readiness:** Financial capacity to pay the agreed sale consideration on the due date.
- **Willingness:** Mental intent and affirmative conduct to execute the deed without undue delay.

### 3. Practical Litigant Checklist
When filing or defending a suit for specific performance:
1. Ensure the plaint contains clear statutory averments of readiness from the date of contract until trial.
2. Produce contemporaneous bank account statements or sanction letters to substantiate financial capacity.
3. Establish prompt dispatch of legal notices requesting execution of the sale deed.`,
    status: 'published',
    featured: true,
    relatedPracticeAreaId: 'property-disputes',
    relatedCourseId: 'course-civil-procedure',
  },
  {
    id: 'blog-rera-nclt-remedies',
    slug: 'demystifying-rera-vs-nclt-remedies-for-homebuyers',
    title: 'Demystifying RERA vs. NCLT Remedies for Homebuyers in India',
    subtitle: 'Strategic considerations when deciding between insolvency proceedings under IBC and consumer remedies under RERA.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    category: 'Real Estate & Property',
    tags: ['RERA', 'IBC', 'NCLT', 'Homebuyer Rights'],
    authorId: 'team-priyanshu',
    publishedDate: '2026-08-28',
    lastUpdated: '2026-09-02',
    readTimeMinutes: 6,
    summary: 'A critical comparative analysis for allottees evaluating whether to initiate corporate insolvency resolution against a defaulting builder under Section 7 of IBC or seek refund and delay interest under RERA.',
    content: `## Choosing the Correct Legal Forum Against Defaulting Real Estate Developers

Homebuyers confronted with prolonged construction delays frequently struggle to choose between two powerful statutory forums: the Real Estate Regulatory Authority (RERA) and the National Company Law Tribunal (NCLT) under the Insolvency and Bankruptcy Code, 2016 (IBC).

### 1. The Threshold Requirement under IBC Section 7
Following the 2020 Amendment to the IBC, an individual allottee can no longer single-handedly drag a developer into insolvency. Under the second proviso to Section 7(1):
- A joint application must be filed by **not less than 100 allottees** or **not less than 10% of the total number of allottees** in the same real estate project.
- This threshold makes initiating NCLT proceedings impractical for individual buyers unless mobilized through an organized Homebuyers Association.

### 2. The Advantages of RERA under Section 18
By contrast, an individual allottee can invoke RERA single-handedly:
- Form M complaint before the Real Estate Regulatory Authority.
- Direct statutory interest calculation at SBI MCLR + 2%.
- No requirement to muster quorum or coordinate with dozens of co-buyers.

### 3. Conclusion & Strategic Advice
If the developer is solvent and possesses unencumbered assets, RERA remains the swifter, individually accessible remedy. If the developer has completely abandoned the project or engaged in systemic diversion of funds, a collective IBC application or winding up petition may become necessary.`,
    status: 'published',
    featured: false,
    relatedPracticeAreaId: 'property-disputes',
    relatedCourseId: 'course-rera-property',
  },
  {
    id: 'blog-bns-criminal-law-transition',
    slug: 'key-amendments-to-criminal-laws-bns-bnss-transition',
    title: 'Key Amendments to Indian Criminal Laws: Transitioning to BNS & BNSS',
    subtitle: 'Practical procedural implications of the Bharatiya Nyaya Sanhita and Bharatiya Nagarik Suraksha Sanhita for trial practice.',
    coverImage: 'https://images.unsplash.com/photo-1453738773917-9c3eff1db985?auto=format&fit=crop&q=80&w=800',
    category: 'Criminal Law',
    tags: ['BNS', 'BNSS', 'Criminal Procedure', 'Trial Practice'],
    authorId: 'team-rohan',
    publishedDate: '2026-07-20',
    lastUpdated: '2026-08-14',
    readTimeMinutes: 8,
    summary: 'A practical roadmap for litigators and citizens understanding FIR registration, electronic evidence collection, and preliminary inquiry timelines under the new criminal codes.',
    content: `## The Modernization of Indian Criminal Jurisprudence

The enforcement of the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA) represents the most significant overhaul of India’s penal architecture since 1860.

### 1. Zero FIR & Electronic Summons
Under Section 173 of the BNSS, a Zero FIR can be lodged at any police station irrespective of territorial jurisdiction. If an offense occurs in Delhi, an informant traveling in Mumbai can report it immediately.

### 2. Mandatory Audio-Video Recording of Search and Seizure
Section 105 of BNSS introduces a strict statutory requirement that searches and seizures must be recorded through electronic devices (smartphones, cameras), and the recording forwarded to the Magistrate within 48 hours without tampering.

### 3. Electronic Evidence Under BSA
Section 61 to 63 of the Bharatiya Sakshya Adhiniyam modernize the former Section 65B Certificate framework, formalizing forensic validation standards for server logs, WhatsApp communications, and encrypted cloud storage.`,
    status: 'published',
    featured: false,
    relatedPracticeAreaId: 'criminal-law',
    relatedCourseId: 'course-civil-procedure',
  },
  {
    id: 'blog-liquidated-damages-contracts',
    slug: 'enforcing-commercial-contracts-liquidated-damages-clause',
    title: 'Enforcing Commercial Contracts: When Does a Liquidated Damages Clause Apply?',
    subtitle: 'Analyzing the landmark jurisprudence of Section 74 of the Indian Contract Act and the standard of proof for actual loss.',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    category: 'Business and Corporate Law',
    tags: ['Contract Act', 'Commercial Law', 'Liquidated Damages', 'Arbitration'],
    authorId: 'team-ananya',
    publishedDate: '2026-06-12',
    lastUpdated: '2026-07-01',
    readTimeMinutes: 5,
    summary: 'Does naming a liquidated damages sum relieve the claimant from proving actual financial loss? We analyze the rulings in Kailash Nath Associates and ONGC v. Saw Pipes.',
    content: `## Dispelling the Myth of Automatic Forfeiture in Indian Contract Law

Corporate founders and commercial executives frequently insert clauses stating: *"In the event of breach, the party shall pay INR 50,00,000 as liquidated damages."* Many assume this amount is payable automatically upon proving breach. Under Section 74 of the Indian Contract Act, 1872, this assumption is legally flawed.

### 1. The Ceiling Doctrine in Kailash Nath Associates (2015)
The Supreme Court in *Kailash Nath Associates v. DDA* authoritatively settled that Section 74 does not confer an absolute right to recover the full stipulated sum without establishing proof of loss.
- Where loss can be assessed and proved through evidence, it **must** be proved.
- The contractual figure acts solely as an upper ceiling; the court awards reasonable compensation within that bound.

### 2. Exception: Genuine Pre-Estimate When Loss Cannot Be Calculated
Only in rare cases where the nature of the transaction makes calculating actual loss impossible (such as public infrastructure delays in *ONGC v. Saw Pipes*) may the court award the entire liquidated amount as a genuine pre-estimate of loss.`,
    status: 'published',
    featured: false,
    relatedPracticeAreaId: 'contract-commercial',
    relatedCourseId: 'course-contract-drafting',
  },
  {
    id: 'blog-consumer-protection-pecuniary-limits',
    slug: 'consumer-protection-act-2019-pecuniary-jurisdiction-e-commerce',
    title: 'Consumer Protection Act 2019: Pecuniary Jurisdiction and E-Commerce Redressal',
    subtitle: 'Clarification of jurisdiction thresholds based on consideration paid and rules governing digital consumer rights.',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    category: 'Consumer Protection',
    tags: ['Consumer Protection', 'E-Commerce', 'NCDRC', 'Pecuniary Jurisdiction'],
    authorId: 'team-meera',
    publishedDate: '2026-05-18',
    lastUpdated: '2026-06-05',
    readTimeMinutes: 5,
    summary: 'A definitive overview of pecuniary changes introduced by CPA 2019 where jurisdiction is determined solely by the consideration paid rather than exaggerated compensation claims.',
    content: `## A Critical Change: Consideration Paid vs. Claimed Value

Under the erstwhile 1986 Act, complainants would inflate their compensation claims to artificially enter the State or National Commission. The 2019 Act decisively ended this practice by linking forum jurisdiction strictly to the **actual consideration paid** for the goods or services.

### Current Pecuniary Thresholds (Post-2021 Notification)
1. **District Commission:** Consideration paid does not exceed **INR 50 Lakhs**.
2. **State Commission:** Consideration paid exceeds **INR 50 Lakhs but does not exceed INR 2 Crores**.
3. **National Commission (NCDRC):** Consideration paid exceeds **INR 2 Crores**.`,
    status: 'published',
    featured: false,
    relatedPracticeAreaId: 'consumer-protection',
    relatedCourseId: 'course-consumer-rights',
  },
  {
    id: 'blog-statutory-notice-guide',
    slug: 'step-by-step-guide-to-responding-to-a-statutory-legal-notice',
    title: 'Step-by-Step Guide to Responding to a Statutory Legal Notice',
    subtitle: 'Why ignoring a legal notice compromises your court defense, and how to formulate an evidentiary rebuttal.',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    category: 'Legal Awareness',
    tags: ['Legal Notice', 'Civil Procedure', 'Section 138', 'Litigation Strategy'],
    authorId: 'team-rohan',
    publishedDate: '2026-04-10',
    lastUpdated: '2026-04-20',
    readTimeMinutes: 6,
    summary: 'Essential procedural steps upon receiving an adversarial demand notice. Learn how to draft a reply that reserves defenses without making inadvertent admissions.',
    content: `## What Happens When You Receive a Legal Notice?

Receiving a registered post envelope containing a legal notice from an advocate can cause anxiety. However, a legal notice is also an opportunity: it reveals the adversary’s legal theory and evidentiary documentation before any court proceedings are initiated.

### Step 1: Record the Date of Receipt
Statutory limitation windows (e.g., 15 days under Section 138 of the Negotiable Instruments Act, or 60 days under Section 80 of CPC) begin running from the exact date of receipt, not the date typed on the notice. Retain the postal envelope with tracking bar code intact.

### Step 2: Avoid Self-Authored Replies
Never send a direct, emotionally charged email or WhatsApp reply. Any factual assertion made by you can be exhibited in subsequent trial proceedings as an admission under the Indian Evidence Act / BSA.

### Step 3: Seek Professional Legal Review
Have an advocate analyze whether:
- The claims are barred by the Law of Limitation.
- The contract mandates pre-institution mediation or arbitration.
- There are counter-claims that can be asserted against the sender.`,
    status: 'published',
    featured: false,
    relatedPracticeAreaId: 'legal-notices',
    relatedCourseId: 'course-contract-drafting',
  },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-1001',
    referenceNumber: 'LEX-2026-8941',
    clientName: 'Aarav Sharma',
    clientEmail: 'aarav.sharma@example.com',
    clientPhone: '+91 98200 45678',
    practiceAreaId: 'property-disputes',
    advocateId: 'team-priyanshu',
    date: '2026-11-04',
    timeSlot: '11:00 AM - 11:45 AM',
    consultationType: 'In-Person (Office)',
    caseSummary: 'Seeking injunction against unauthorized commercial construction on ancestral co-owned parcel in South Delhi.',
    status: 'confirmed',
    createdAt: '2026-10-24T10:15:00Z',
    internalNotes: 'Documents verified. Title deed chain from 1984 reviewed by Priyanshu.',
  },
  {
    id: 'appt-1002',
    referenceNumber: 'LEX-2026-9214',
    clientName: 'Nandini Patel',
    clientEmail: 'nandini.patel@horizonlogistics.in',
    clientPhone: '+91 98912 33445',
    practiceAreaId: 'contract-commercial',
    advocateId: 'team-ananya',
    date: '2026-11-05',
    timeSlot: '02:30 PM - 03:15 PM',
    consultationType: 'Secure Video Call',
    caseSummary: 'Reviewing cross-border warehousing contract breach and Section 9 interim measures against bank guarantee encashment.',
    status: 'pending',
    createdAt: '2026-10-25T14:40:00Z',
  },
];

export const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-3001',
    referenceNumber: 'INQ-2026-1102',
    name: 'Suresh Menon',
    email: 'suresh.menon@techventures.co',
    phone: '+91 97110 55432',
    subject: 'Consultation on shareholder agreement dispute and minority protection',
    message: 'We are seeking legal advisory regarding arbitrary dilution of voting rights by majority founders in our Series-A startup.',
    practiceAreaId: 'corporate-support',
    status: 'in_review',
    createdAt: '2026-10-25T09:12:00Z',
  },
  {
    id: 'inq-3002',
    referenceNumber: 'INQ-2026-1188',
    name: 'Dr. Kavita Singhal',
    email: 'kavita.singhal@apollohealth.org',
    phone: '+91 98118 77665',
    subject: 'Defense in State Consumer Commission complaint regarding alleged service deficiency',
    message: 'Our diagnostic chain received a summons from Delhi State Consumer Commission regarding delayed pathology reporting.',
    practiceAreaId: 'consumer-protection',
    status: 'new',
    createdAt: '2026-10-26T06:30:00Z',
  },
];

export const CLIENT_MATTERS: ClientMatter[] = [
  {
    id: 'matter-delhi-01',
    matterNumber: 'CS (COMM) 184/2025',
    clientId: 'user-client-1',
    title: 'Sharma vs. Skyline Developers & Infra Ltd.',
    courtForum: 'Delhi High Court (Original Civil Jurisdiction)',
    caseType: 'Commercial Suit for Specific Performance & Recovery of Liquidated Damages',
    status: 'Active Hearing',
    nextHearingDate: '2026-11-18',
    assignedAdvocateId: 'team-vikramaditya',
    filingDate: '2025-04-12',
    summary: 'Suit instituted for specific performance of Registered Agreement to Sell dated 14.11.2021 regarding commercial retail unit at Connaught Place, New Delhi with alternative relief for refund of INR 2.85 Crores with 18% interest.',
    stages: [
      {
        title: 'Institution of Plaint & Urgent Injunction',
        date: '15.04.2025',
        status: 'completed',
        description: 'Ex-parte ad-interim status quo order granted under Order 39 Rules 1 & 2 restraining creation of third-party rights.',
      },
      {
        title: 'Written Statement & Rebuttal Documents',
        date: '20.07.2025',
        status: 'completed',
        description: 'Defendant filed written statement; replication filed on behalf of plaintiff denying fabricated extension claims.',
      },
      {
        title: 'Admission / Denial & Framing of Issues',
        date: '22.09.2025',
        status: 'completed',
        description: 'Joint schedule of admitted documents finalized; 5 substantive issues framed by Hon’ble Single Judge.',
      },
      {
        title: 'Plaintiff Evidence on Affidavit',
        date: '18.11.2026',
        status: 'current',
        description: 'Tendering of PW-1 evidence affidavit and original banking receipts scheduled before the Joint Registrar.',
      },
      {
        title: 'Final Arguments on Law',
        date: 'Upcoming',
        status: 'upcoming',
        description: 'Submissions on Section 10 Specific Relief Act and Section 74 Indian Contract Act.',
      },
    ],
    documents: [
      {
        id: 'doc-01',
        name: 'Plaint-and-Statement-of-Truth-CS-184-2025.pdf',
        category: 'Pleadings',
        uploadedAt: '15.04.2025',
        size: '3.8 MB',
        fileType: 'PDF',
        uploadedBy: 'Adv. Vikramaditya Kashyap',
      },
      {
        id: 'doc-02',
        name: 'Order-Interim-Injunction-Dated-18-04-2025.pdf',
        category: 'Orders & Judgments',
        uploadedAt: '18.04.2025',
        size: '1.1 MB',
        fileType: 'PDF',
        uploadedBy: 'Delhi High Court Registry',
      },
      {
        id: 'doc-03',
        name: 'Joint-Document-Inspection-Schedule.pdf',
        category: 'Evidence & Annexures',
        uploadedAt: '22.09.2025',
        size: '2.4 MB',
        fileType: 'PDF',
        uploadedBy: 'Adv. Priyanshu Saxena',
      },
    ],
    messages: [
      {
        id: 'msg-1',
        sender: 'advocate',
        senderName: 'Adv. Vikramaditya Kashyap',
        timestamp: '2026-10-22 11:30 AM',
        text: 'Dear Mr. Sharma, the PW-1 draft evidence affidavit has been prepared and vetted against the framed issues. Please review Section 4 regarding payment proofs.',
      },
      {
        id: 'msg-2',
        sender: 'client',
        senderName: 'Aarav Sharma',
        timestamp: '2026-10-22 04:15 PM',
        text: 'Thank you Sir. I have checked the annexures. The banker certificate for the RTGS transfer of INR 85 Lakhs on 12.01.2022 is attached.',
      },
    ],
  },
];

export const AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-26 07:15:10',
    actor: 'system',
    action: 'SECURITY_INTEGRITY_CHECK',
    details: 'Daily automated verification of court calendar synchronization and database indices.',
    ipAddress: '10.0.1.24',
  },
  {
    id: 'log-2',
    timestamp: '2026-10-25 14:40:12',
    actor: 'public_portal',
    action: 'APPOINTMENT_SUBMISSION',
    details: 'New consultation slot reserved: LEX-2026-9214 by Nandini Patel (Commercial Contracts).',
    ipAddress: '103.21.144.18',
  },
  {
    id: 'log-3',
    timestamp: '2026-10-24 10:15:30',
    actor: 'chambers@lexglobal.in',
    action: 'APPOINTMENT_CONFIRMED',
    details: 'Consultation LEX-2026-8941 status updated to Confirmed by Adv. Vikramaditya Kashyap.',
    ipAddress: '182.74.88.19',
  },
];

export const DOCUMENT_CHECKLISTS = [
  {
    id: 'chk-property-purchase',
    title: 'Purchasing Immovable Property in India: Due Diligence Checklist',
    category: 'Real Estate & Property',
    description: 'A comprehensive checklist of 12 statutory and title documents that every purchaser should inspect before signing an Agreement to Sell or paying earnest money.',
    items: [
      { id: 'p1', label: 'Registered Title Deed chain for the preceding 30 years (Sale Deed, Gift Deed, Partition Deed, Succession Certificate)' },
      { id: 'p2', label: 'Encumbrance Certificate (Form 15/16) from Sub-Registrar confirming absence of registered mortgages or attachments' },
      { id: 'p3', label: 'Mutation Register Extract (Jamabandi / Fard / Patta) establishing current revenue ownership' },
      { id: 'p4', label: 'Sanctioned Building Plan & Layout approval issued by competent municipal authority (DDA, BMC, BBMP)' },
      { id: 'p5', label: 'Occupancy Certificate (OC) or Completion Certificate (CC) for ready-to-move apartment units' },
      { id: 'p6', label: 'RERA Registration certificate and verified disclosure sheet from State RERA web portal' },
      { id: 'p7', label: 'No-Objection Certificate (NOC) from Co-operative Housing Society or Residents Welfare Association (RWA)' },
      { id: 'p8', label: 'Latest Property Tax payment receipt and electricity/water utility clearance certificates' },
      { id: 'p9', label: 'Non-Agricultural (NA) Land conversion order if the land was originally rural agricultural land' },
      { id: 'p10', label: 'Court search report confirming no pending partition, insolvency, or lis pendens suits involving the seller' },
    ],
  },
  {
    id: 'chk-consumer-complaint',
    title: 'Filing a Consumer Complaint under CPA 2019: Checklist',
    category: 'Consumer Protection',
    description: 'Essential evidentiary records and statutory requirements for instituting a complaint before the Consumer Disputes Redressal Commission.',
    items: [
      { id: 'c1', label: 'Proof of transaction: Tax invoice, payment receipt, bank transfer slip, or booking confirmation' },
      { id: 'c2', label: 'Warranty card, service level agreement, or terms of sale accepted at time of purchase' },
      { id: 'c3', label: 'Written notice or email grievance addressed to manufacturer/service provider specifying defect/deficiency' },
      { id: 'c4', label: 'Official reply received from opposite party, or proof of dispatch if no reply was tendered' },
      { id: 'c5', label: 'Calculation sheet showing exact consideration paid to determine appropriate pecuniary commission' },
      { id: 'c6', label: 'Chronological events timeline explaining cause of action and date of deficiency' },
      { id: 'c7', label: 'Affidavit in support of complaint verified before Oath Commissioner or Notary Public' },
    ],
  },
  {
    id: 'chk-commercial-contract',
    title: 'Drafting Commercial Agreements: Risk Insulation Checklist',
    category: 'Commercial Law',
    description: 'Key contractual safeguards and clauses required under Indian contract and arbitration statutes.',
    items: [
      { id: 'k1', label: 'Unambiguous definitions of key commercial performance obligations and deliverables' },
      { id: 'k2', label: 'Specific limitation of liability clause capped at agreed percentage of total fees' },
      { id: 'k3', label: 'Indemnity clause with clear trigger mechanism, notice of claim, and defense conduct rights' },
      { id: 'k4', label: 'Clear distinction between juridical seat and geographic venue in arbitration clause' },
      { id: 'k5', label: 'Pre-institution dispute escalation hierarchy (Senior management meeting -> Mediation -> Arbitration)' },
      { id: 'k6', label: 'Force majeure clause encompassing pandemic, regulatory changes, and government lockdown directives' },
      { id: 'k7', label: 'Stamp duty evaluation according to state stamp legislation where contract is executed' },
    ],
  },
];

export const SMART_CONSULTATION_TREE = [
  {
    id: 'q-mat-type',
    question: 'What is the primary nature of the legal matter you are seeking guidance on?',
    options: [
      { label: 'Property, Land, or Builder Dispute', next: 'q-prop-stage', practiceAreaId: 'property-disputes' },
      { label: 'Commercial Contract or Business Dispute', next: 'q-comm-stage', practiceAreaId: 'contract-commercial' },
      { label: 'Criminal Notice, Summons, or Bail Matter', next: 'q-crim-stage', practiceAreaId: 'criminal-law' },
      { label: 'Consumer Rights or Delayed Delivery', next: 'q-cons-stage', practiceAreaId: 'consumer-protection' },
      { label: 'Matrimonial or Family Matter', next: 'q-fam-stage', practiceAreaId: 'family-matrimonial' },
    ],
  },
  {
    id: 'q-prop-stage',
    question: 'What is the current stage of the property dispute?',
    options: [
      {
        label: 'Builder delayed possession beyond agreement date',
        guidance: 'Remedies are available under Section 18 of RERA (for refund with statutory interest or monthly delay compensation) and parallel proceedings before the Consumer Commission. Have your Agreement to Sell and payment receipts ready.',
        practiceAreaId: 'property-disputes',
        recommendedCourse: 'course-rera-property',
      },
      {
        label: 'Threat of dispossession, trespass, or boundary encroachment',
        guidance: 'Urgent civil injunctive relief under Order 39 of the Code of Civil Procedure is typically required to maintain status quo. A certified revenue extract or registered title deed chain is crucial.',
        practiceAreaId: 'property-disputes',
        recommendedCourse: 'course-civil-procedure',
      },
      {
        label: 'Ancestral property partition or disputed inheritance',
        guidance: 'A preliminary title search and family pedigree tree should be documented. Partition can be negotiated via registered family settlement or adjudicated through a civil partition suit.',
        practiceAreaId: 'property-disputes',
      },
    ],
  },
  {
    id: 'q-comm-stage',
    question: 'What is the primary concern in your commercial dispute?',
    options: [
      {
        label: 'Vendor or client default on payment invoices',
        guidance: 'Statutory demand notice under Section 138 (if cheque was dishonored) or recovery suit under Order 37 Summary Suit / Commercial Courts Act. Review the contract for mandatory pre-institution mediation under Section 12A.',
        practiceAreaId: 'contract-commercial',
        recommendedCourse: 'course-contract-drafting',
      },
      {
        label: 'Dispute over breach of confidentiality or non-compete covenant',
        guidance: 'Examine whether the non-compete is restrained under Section 27 of the Indian Contract Act. Section 9 interim measures before an arbitral tribunal may be required.',
        practiceAreaId: 'contract-commercial',
        recommendedCourse: 'course-contract-drafting',
      },
    ],
  },
  {
    id: 'q-crim-stage',
    question: 'Has a formal police report (FIR) or summons been issued?',
    options: [
      {
        label: 'Summons / Notice received under Section 41A / Section 35 BNSS',
        guidance: 'Ensure strict compliance with summons accompanied by counsel. Immediate consideration of Anticipatory Bail or Section 482 quashing petition before the High Court.',
        practiceAreaId: 'criminal-law',
      },
      {
        label: 'Cheque return memo received from bank (Bouncing)',
        guidance: 'A statutory legal notice under Section 138 of Negotiable Instruments Act must be dispatched within 30 days of receiving the memo. Strict limitation applies.',
        practiceAreaId: 'criminal-law',
      },
    ],
  },
  {
    id: 'q-cons-stage',
    question: 'What is the quantum of consideration paid for the defective good/service?',
    options: [
      {
        label: 'Under INR 50 Lakhs (District Commission)',
        guidance: 'File directly before the District Consumer Commission via e-Daakhil portal or through chamber representation. Issue a statutory 15-day grievance notice first.',
        practiceAreaId: 'consumer-protection',
        recommendedCourse: 'course-consumer-rights',
      },
      {
        label: 'Exceeding INR 50 Lakhs up to 2 Crores (State Commission)',
        guidance: 'Falls under the pecuniary jurisdiction of the State Consumer Disputes Redressal Commission.',
        practiceAreaId: 'consumer-protection',
      },
    ],
  },
  {
    id: 'q-fam-stage',
    question: 'Are both spouses open to mutual settlement and amicable dissolution?',
    options: [
      {
        label: 'Yes, mutual consent terms are agreeable',
        guidance: 'A Mutual Consent Divorce under Section 13B of the Hindu Marriage Act requires drafting a comprehensive Memorandum of Understanding (MOU) on alimony, custody, and return of streedhan.',
        practiceAreaId: 'family-matrimonial',
      },
      {
        label: 'No, contested issues regarding maintenance or custody',
        guidance: 'Immediate focus on interim maintenance petition under Section 125 / Family Courts Act and visitation applications for minors.',
        practiceAreaId: 'family-matrimonial',
      },
    ],
  },
];
