const heroImages = {
  class6:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
  class7:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
  class8:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
  class9:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
  class10:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
  olevel:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  alevel:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
  dakhil:
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
  alim: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1600&q=80",
};

const toSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const attachId = (name, custom) => custom || toSlug(name);

export const categoryCatalog = [
  {
    id: "bangla-medium",
    name: "Bangla Medium",
    tagline: "NCTB Curriculum",
    description:
      "গণিত, বিজ্ঞান ও ভাষার সমন্বয়ে গড়ে ওঠা আমাদের Bangla Medium প্রোগ্রাম আপনার সন্তানের ভর্তি পরীক্ষা ও বোর্ড পরীক্ষার জন্য শক্ত ভিত্তি তৈরি করে।",
    coverImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
    classes: [
      {
        id: attachId("Play"),
        name: "Play",
        shortDescription:
          "Early years playful learning and social skills development.",
        subjects: ["Pre-literacy", "Numbers", "Art", "Rhymes"],
        heroImage: heroImages.class6,
      },
      {
        id: attachId("Nursery"),
        name: "Nursery",
        shortDescription: "Foundational skills, phonics and motor development.",
        subjects: ["Pre-literacy", "Numbers", "Art", "Motor Skills"],
        heroImage: heroImages.class6,
      },
      {
        id: attachId("Class 1", "class-1"),
        name: "Class 1",
        shortDescription:
          "Primary level basics: reading, writing and numeracy.",
        subjects: ["Bangla", "English", "Math", "Environmental Studies"],
        heroImage: heroImages.class6,
      },
      {
        id: attachId("Class 2", "class-2"),
        name: "Class 2",
        shortDescription: "Concept building and confidence for young learners.",
        subjects: ["Bangla", "English", "Math", "EVS"],
        heroImage: heroImages.class6,
      },
      {
        id: attachId("Class 3", "class-3"),
        name: "Class 3",
        shortDescription: "Progressive learning with activity based lessons.",
        subjects: ["Bangla", "English", "Math", "Science"],
        heroImage: heroImages.class6,
      },
      {
        id: attachId("Class 4", "class-4"),
        name: "Class 4",
        shortDescription: "Stronger foundations in literacy and numeracy.",
        subjects: ["Bangla", "English", "Math", "Science"],
        heroImage: heroImages.class7,
      },
      {
        id: attachId("Class 5", "class-5"),
        name: "Class 5",
        shortDescription:
          "Transition to upper primary with assessment practice.",
        subjects: ["Bangla", "English", "Math", "Science"],
        heroImage: heroImages.class7,
      },
      {
        id: attachId("Class 6", "class-6"),
        name: "Class 6",
        shortDescription:
          "Junior secondary তে গতি আনার জন্য কনসেপ্ট-ফোকাসড কোচিং।",
        subjects: ["Bangla", "English", "Math", "Science", "ICT", "Religion"],
        heroImage: heroImages.class6,
      },
      {
        id: attachId("Class 7", "class-7"),
        name: "Class 7",
        shortDescription:
          "Chapter-wise mastery, weekly assessment ও parental feedback রিপোর্ট।",
        subjects: ["Bangla", "English", "General Math", "Science", "ICT"],
        heroImage: heroImages.class7,
      },
      {
        id: attachId("Class 8", "class-8"),
        name: "Class 8",
        shortDescription:
          "JSC সমমানের জন্য analytical problem solving ও concept drills।",
        subjects: ["Bangla", "English", "Math", "Science", "BGS", "ICT"],
        heroImage: heroImages.class8,
      },
      {
        id: attachId("Class 9", "class-9"),
        name: "Class 9",
        shortDescription:
          "SSC প্রস্তুতির জন্য বিষদ science/commerce/humanities mentorship।",
        subjects: [
          "Bangla",
          "English",
          "Physics",
          "Chemistry",
          "Biology",
          "Higher Math",
          "Accounting",
        ],
        heroImage: heroImages.class9,
      },
      {
        id: attachId("Class 10", "class-10"),
        name: "Class 10",
        shortDescription:
          "Board exam centric revision sprint, model test ও performance analytics।",
        subjects: [
          "Bangla",
          "English",
          "Physics",
          "Chemistry",
          "Biology",
          "Math",
        ],
        heroImage: heroImages.class10,
      },
    ],
  },
  {
    id: "higher-studies",
    name: "Higher Studies",
    tagline: "Undergraduate & Postgraduate",
    description:
      "Honours ও Masters পর্যায়ের শিক্ষার্থীদের জন্য বিষয়ভিত্তিক গভীর পড়াশোনা, thesis ও project guidance।",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
    classes: [
      {
        id: attachId("Honours", "honours"),
        name: "Honours",
        shortDescription:
          "Undergraduate level subject specialization ও exam prep।",
        subjects: [
          "Bangla",
          "English",
          "Physics",
          "Chemistry",
          "Economics",
          "History",
        ],
        heroImage: heroImages.class9,
      },
      {
        id: attachId("Masters", "masters"),
        name: "Masters",
        shortDescription:
          "Postgraduate research guidance, assignments ও thesis support।",
        subjects: ["Research Methods", "Advanced Topics", "Thesis Supervision"],
        heroImage: heroImages.class10,
      },
    ],
  },
  {
    id: "english-version",
    name: "English Version",
    tagline: "NCTB in English",
    description:
      "English Version শিক্ষার্থীদের জন্য bilingual approach, smart notes এবং exam oriented live problem solving সেশন।",
    coverImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80",
    classes: [
      {
        id: attachId("Play EV"),
        name: "Play",
        shortDescription: "Early years bilingual play-based learning",
        subjects: ["Pre-literacy", "Numbers", "Art", "Rhymes"],
        heroImage: heroImages.class6,
      },
      {
        id: attachId("Nursery EV"),
        name: "Nursery",
        shortDescription: "Phonics and early numeracy in English medium",
        subjects: ["Pre-literacy", "Numbers", "Art", "Motor Skills"],
        heroImage: heroImages.class6,
      },
      {
        id: attachId("Class 1 EV", "class-1-ev"),
        name: "Class 1",
        shortDescription: "Primary English medium basics",
        subjects: ["English", "Mathematics", "Science"],
        heroImage: heroImages.class6,
      },
      {
        id: attachId("Class 2 EV", "class-2-ev"),
        name: "Class 2",
        shortDescription: "Confidence building with bilingual support",
        subjects: ["English", "Mathematics", "Science"],
        heroImage: heroImages.class7,
      },
      {
        id: attachId("Class 3 EV", "class-3-ev"),
        name: "Class 3",
        shortDescription: "Structured learning and assessments",
        subjects: ["English", "Mathematics", "Science"],
        heroImage: heroImages.class7,
      },
      {
        id: attachId("Class 4 EV", "class-4-ev"),
        name: "Class 4",
        shortDescription: "Skills and concept reinforcement",
        subjects: ["English", "Mathematics", "Science"],
        heroImage: heroImages.class8,
      },
      {
        id: attachId("Class 5 EV", "class-5-ev"),
        name: "Class 5",
        shortDescription: "Upper primary readiness and confidence",
        subjects: ["English", "Mathematics", "Science"],
        heroImage: heroImages.class8,
      },
      {
        id: attachId("Class 6 EV", "class-6-ev"),
        name: "Class 6",
        shortDescription: "Cambridge style explanation সহ NCTB content।",
        subjects: ["Bangla", "English", "Mathematics", "Science", "ICT"],
        heroImage: heroImages.class6,
      },
      {
        id: attachId("Class 7 EV", "class-7-ev"),
        name: "Class 7",
        shortDescription: "Inquiry based worksheets ও bilingual flashcards।",
        subjects: ["Bangla", "English", "Mathematics", "Science", "BGS"],
        heroImage: heroImages.class7,
      },
      {
        id: attachId("Class 8 EV", "class-8-ev"),
        name: "Class 8",
        shortDescription:
          "Weekly lab report, viva prep এবং structured study plan।",
        subjects: ["Bangla", "English", "Science", "Mathematics", "ICT"],
        heroImage: heroImages.class8,
      },
      {
        id: attachId("Class 9 EV", "class-9-ev"),
        name: "Class 9",
        shortDescription:
          "Science/Business Studies/Humanities সব গ্রুপেই mentor pool।",
        subjects: [
          "Bangla",
          "English",
          "Physics",
          "Chemistry",
          "Biology",
          "Economics",
        ],
        heroImage: heroImages.class9,
      },
      {
        id: attachId("Class 10 EV", "class-10-ev"),
        name: "Class 10",
        shortDescription:
          "Board question breakdown, timer-based mocks ও skill report।",
        subjects: [
          "Bangla",
          "English",
          "Physics",
          "Chemistry",
          "Biology",
          "Accounting",
        ],
        heroImage: heroImages.class10,
      },
    ],
  },
  {
    id: "english-medium",
    name: "English Medium",
    tagline: "Cambridge / Pearson",
    description:
      "Checkpoint, O/A-Level ও Edexcel syllabus অনুযায়ী topic mastery, lab coaching ও examiners’ report analysis।",
    coverImage:
      "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1400&q=80",
    classes: [
      {
        id: attachId("Primary Checkpoint"),
        name: "Primary Checkpoint",
        shortDescription:
          "Lower secondary checkpoint prep with skills rubrics।",
        subjects: ["English", "Mathematics", "Science", "Global Perspective"],
        heroImage: heroImages.class7,
      },
      {
        id: attachId("O Level"),
        name: "O Level",
        shortDescription:
          "Core, Extended ও Additional syllabuses সহ grade boost plan।",
        subjects: ["Physics", "Chemistry", "Biology", "Math B", "Economics"],
        heroImage: heroImages.olevel,
      },
      {
        id: attachId("A Level"),
        name: "A Level",
        shortDescription: "Paper wise examiner feedback driven tuition।",
        subjects: [
          "Physics",
          "Chemistry",
          "Biology",
          "Math",
          "Business Studies",
        ],
        heroImage: heroImages.alevel,
      },
    ],
  },
  {
    id: "madrasha",
    name: "Madrasah",
    tagline: "Dakhil & Alim",
    description:
      "দাখিল ও আলিম শিক্ষার্থীদের জন্য হিফজ, আরবি, ফিকহ সহ সাধারণ বিষয়েও সমান গুরুত্ব।",
    coverImage:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1400&q=80",
    classes: [
      {
        id: attachId("Dakhil", "dakhil"),
        name: "Dakhil",
        shortDescription:
          "Hadith ও Tafsir ক্লাসের পাশাপাশি Science ও Commerce বিষয়ের গাইডেন্স।",
        subjects: ["Quran", "Hadith", "Arabic", "Math", "Science"],
        heroImage: heroImages.dakhil,
      },
      {
        id: attachId("Alim", "alim"),
        name: "Alim",
        shortDescription:
          "ফিকহ, আরবি সাহিত্য, দর্শন ও আধুনিক বিষয়ে সমন্বিত কোচিং।",
        subjects: ["Quran", "Hadith", "Fiqh", "Economics", "ICT"],
        heroImage: heroImages.alim,
      },
    ],
  },
];

const detailBuilder = (name, image) => ({
  heroImage: image || heroImages.class9,
  highlightTitle: `${name} – Tuition Terminal থেকে যা পাবেন`,
  learningList: [
    "ক্লাস ও বিষয় অনুযায়ী verified tutor ব্রাউজ করার সুবিধা",
    "টিউটরের প্রোফাইলে preferred class, লোকেশন ও status দেখা যায়",
    "Suggested Tutors সেকশন থেকে দ্রুত shortlist করা যায়",
    "See/Hire বোতাম ব্যবহার করে পূর্ণ প্রোফাইল ও যোগাযোগের নির্দেশনা পাওয়া যায়",
  ],
  aboutBlocks: [
    {
      title: "About This Category",
      description: `${name} পর্যায়ের শিক্ষার্থী ও অভিভাবকরা এখানে ক্লাস তথ্য, বিষয় ও টিউটর কার্ড একসাথে দেখে সিদ্ধান্ত নিতে পারেন।`,
      footer:
        "Filters, class details ও টিউটর প্রোফাইল একই প্ল্যাটফর্মে পাওয়া যায়।",
    },
    {
      title: "আমাদের প্রয়াস",
      checklist: [
        "Verified badge সহ টিউটর প্রোফাইল",
        "City/Class/Medium ভিত্তিক ফিল্টার",
        "Suggested Tutors স্লাইডার থেকে দ্রুত বাছাই",
        "See ও Hire বোতামের মাধ্যমে টিউটর প্রোফাইলে প্রবেশ",
      ],
    },
  ],
  supportSummary: [
    "Filters ব্যবহার করে জেলা, ক্লাস, মাধ্যম বা টিউশন টাইপ নির্ধারণ করা যায়।",
    "Class details পেজে প্রাসঙ্গিক টিউটরদের কার্ড ও লিস্ট পৃষ্ঠা লিঙ্ক থাকে।",
  ],
  opportunityList: [
    "Verified টিউটর প্রোফাইল থেকে তথ্য যাচাই করা যায়",
    "Suggested Tutors স্লাইডার ও See বোতামে ক্লিক করে বিস্তারিত দেখা যায়",
    "Hire বোতাম থেকে টিউটর লিস্টিং-এ গিয়ে আরও বিকল্প পাওয়া যায়",
  ],
});

export const classDetails = {
  "class-6": detailBuilder("Class 6", heroImages.class6),
  "class-7": detailBuilder("Class 7", heroImages.class7),
  "class-8": detailBuilder("Class 8", heroImages.class8),
  "class-9": detailBuilder("Class 9", heroImages.class9),
  "class-10": detailBuilder("Class 10", heroImages.class10),
  play: detailBuilder("Play", heroImages.class6),
  nursery: detailBuilder("Nursery", heroImages.class6),
  "class-1": detailBuilder("Class 1", heroImages.class6),
  "class-2": detailBuilder("Class 2", heroImages.class6),
  "class-3": detailBuilder("Class 3", heroImages.class6),
  "class-4": detailBuilder("Class 4", heroImages.class7),
  "class-5": detailBuilder("Class 5", heroImages.class7),
  "class-6-ev": detailBuilder("Class 6 (English Version)", heroImages.class6),
  "class-7-ev": detailBuilder("Class 7 (English Version)", heroImages.class7),
  "class-8-ev": detailBuilder("Class 8 (English Version)", heroImages.class8),
  "class-9-ev": detailBuilder("Class 9 (English Version)", heroImages.class9),
  "class-10-ev": detailBuilder(
    "Class 10 (English Version)",
    heroImages.class10
  ),
  "class-1-ev": detailBuilder("Class 1 (English Version)", heroImages.class6),
  "class-2-ev": detailBuilder("Class 2 (English Version)", heroImages.class6),
  "class-3-ev": detailBuilder("Class 3 (English Version)", heroImages.class7),
  "class-4-ev": detailBuilder("Class 4 (English Version)", heroImages.class8),
  "class-5-ev": detailBuilder("Class 5 (English Version)", heroImages.class8),
  "primary-checkpoint": detailBuilder("Primary Checkpoint", heroImages.class7),
  "o-level": detailBuilder("O Level", heroImages.olevel),
  "a-level": detailBuilder("A Level", heroImages.alevel),
  honours: detailBuilder("Honours", heroImages.class9),
  masters: detailBuilder("Masters", heroImages.class10),
  dakhil: detailBuilder("Dakhil", heroImages.dakhil),
  alim: detailBuilder("Alim", heroImages.alim),
};

export const getClassDetail = (classId, fallbackMeta = {}) =>
  classDetails[classId] ||
  detailBuilder(
    fallbackMeta.name || classId.replace(/-/g, " "),
    fallbackMeta.heroImage
  );

export const getCategoryById = (id) =>
  categoryCatalog.find((category) => category.id === id);

export const getClassById = (category, classId) =>
  category?.classes?.find((cls) => cls.id === classId);
