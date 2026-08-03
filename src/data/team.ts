export interface TeamMember {
  id: string;
  name: string;
  /** @deprecated use experienceYears */
  hireDate?: string;
  experienceYears?: number;
  qualifications?: string;
  bio?: string;
  specialties?: string[];
  image?: string;
  homepageImage?: string;
}

export interface TeamDepartment {
  id: string;
  title: string;
  members: TeamMember[];
  /** false = مخفي من الموقع */
  visible?: boolean;
}

export interface TeamStructure {
  generalManager: TeamMember;
  officeManager: TeamMember;
  departments: TeamDepartment[];
}

export const teamStructure: TeamStructure = {
  generalManager: {
    id: "saleh-al-amri",
    name: "المحامي/ صالح بن سلمان العمري",
    experienceYears: 20,
    image: "/images/team/saleh-al-amri.png",
    homepageImage: "/images/team/saleh-al-amri-home.png",
    qualifications: "المحامي والمستشار القانوني والموثق",
    bio:
      "مدير إدارة التحكيم والمصلحة، حاصل على ماجستير في القانون. يتمتع بخبرة تمتد لسنوات في ممارسة القانون بشتى مجالاته.\nيقود فريقاً متخصصاً من الخبراء القانونيين والمستشارين لتقديم حزمة شاملة من الخدمات القانونية والاستشارات والتوثيق، مع التزام كامل بالجودة والسرية وتحقيق أفضل النتائج لعملائنا.",
    specialties: [
      "التحكيم والمنازعات",
      "الاستشارات القانونية",
      "إدارة المكتب",
    ],
  },
  officeManager: {
    id: "ameen-othman",
    name: "الأستاذ/ أمين عبد الخالق عتمان",
    experienceYears: 14,
    image: "/images/team/ameen-othman.png",
    specialties: ["إدارة العمليات", "تنسيق القضايا"],
  },
  departments: [
    {
      id: "financial-consultant",
      title: "المستشار المالي والاقتصادي",
      members: [
        {
          id: "mahmoud-nada",
          name: "الأستاذ/ محمود صلاح الدين ندا",
          experienceYears: 12,
          image: "/images/team/mahmoud-nada.png",
          specialties: ["الاستشارات المالية", "التحليل الاقتصادي"],
        },
      ],
    },
    {
      id: "legal-consultants",
      title: "المستشارين القانونيين",
      members: [
        {
          id: "mahmoud-abu-sheta",
          name: "الأستاذ/ محمود إسماعيل أبو شيته",
          experienceYears: 10,
          specialties: ["الاستشارات القانونية", "صياغة العقود"],
        },
        {
          id: "mayad-al-ahmri",
          name: "الأستاذة/ ميعاد حسن الأحمري",
          experienceYears: 8,
          specialties: ["الاستشارات القانونية", "القضايا الحقوقية"],
        },
      ],
    },
    {
      id: "arbitrators",
      title: "المحكمين",
      members: [],
      visible: false,
    },
    {
      id: "notarization",
      title: "التوثيق والإفراغ",
      members: [],
      visible: false,
    },
    {
      id: "conciliation",
      title: "الصلح",
      members: [],
      visible: false,
    },
  ],
};

/** Flat list for backward compatibility */
export function flattenTeam(structure: TeamStructure): TeamMember[] {
  const all: TeamMember[] = [
    structure.generalManager,
    structure.officeManager,
    ...structure.departments.flatMap((d) => d.members),
  ];
  return all;
}

export const teamMembers = flattenTeam(teamStructure);
