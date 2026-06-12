export interface TeamMember {
  id: string;
  name: string;
  hireDate: string;
  qualifications?: string;
  bio?: string;
  specialties?: string[];
  image?: string;
}

export interface TeamDepartment {
  id: string;
  title: string;
  members: TeamMember[];
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
    hireDate: "2004-08-15",
    image: "/images/team/saleh-al-amri.png",
    qualifications:
      "مستشار قانوني بوزارة العدل (ثاني) · مدير إدارة التحكيم والمصلحة · ماجستير قانون",
    bio:
      "المحامي صالح بن سلمان العمري مستشار قانوني بوزارة العدل (ثاني)، ومدير إدارة التحكيم والمصلحة، حاصل على ماجستير في القانون. يتمتع بخبرة تمتد لسنوات في ممارسة القانون بشتى مجالاته.\nيقود فريقاً متخصصاً من الخبراء القانونيين والمستشارين لتقديم حزمة شاملة من الخدمات القانونية والاستشارات والتوثيق، مع التزام كامل بالجودة والسرية وتحقيق أفضل النتائج لعملائنا.",
    specialties: [
      "التحكيم والمنازعات",
      "الاستشارات القانونية",
      "إدارة المكتب",
    ],
  },
  officeManager: {
    id: "ameen-othman",
    name: "الأستاذ/ أمين عبد الخالق عتمان",
    hireDate: "2011-03-20",
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
          hireDate: "2013-11-05",
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
          hireDate: "2015-06-12",
          specialties: ["الاستشارات القانونية", "صياغة العقود"],
        },
        {
          id: "mayad-al-ahmri",
          name: "الأستاذة/ ميعاد حسن الأحمري",
          hireDate: "2017-09-01",
          specialties: ["الاستشارات القانونية", "القضايا الحقوقية"],
        },
      ],
    },
    {
      id: "arbitrators",
      title: "المحكمين",
      members: [],
    },
    {
      id: "notarization",
      title: "التوثيق والإفراغ",
      members: [],
    },
    {
      id: "conciliation",
      title: "الصلح",
      members: [],
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
