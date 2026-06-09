export interface TeamMember {
  id: string;
  name: string;
  role: string;
  hireDate: string;
  qualifications?: string;
  specialties?: string[];
  isLead?: boolean;
  image?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "saleh-al-amri",
    name: "المحامي/ صالح بن سلمان العمري",
    role: "المدير العام",
    hireDate: "2004-08-15",
    qualifications:
      "مستشار قانوني بوزارة العدل (ثاني) · مدير إدارة التحكيم والمصلحة · ماجستير قانون",
    specialties: [
      "التحكيم والمنازعات",
      "الاستشارات القانونية",
      "إدارة المكتب",
    ],
    isLead: true,
    // image: "/images/team/saleh-al-amri.jpg",
  },
  {
    id: "ameen-othman",
    name: "الأستاذ/ أمين عبد الخالق عتمان",
    role: "مدير المكتب",
    hireDate: "2011-03-20",
    specialties: ["إدارة العمليات", "تنسيق القضايا"],
    // image: "/images/team/ameen-othman.jpg",
  },
  {
    id: "mahmoud-nada",
    name: "الأستاذ/ محمود صلاح الدين ندا",
    role: "المستشار المالي والاقتصادي",
    hireDate: "2013-11-05",
    specialties: ["الاستشارات المالية", "التحليل الاقتصادي"],
    // image: "/images/team/mahmoud-nada.jpg",
  },
  {
    id: "mahmoud-abu-sheta",
    name: "الأستاذ/ محمود إسماعيل أبو شيته",
    role: "مستشار قانوني",
    hireDate: "2015-06-12",
    specialties: ["الاستشارات القانونية", "صياغة العقود"],
    // image: "/images/team/mahmoud-abu-sheta.jpg",
  },
  {
    id: "mayad-al-ahmri",
    name: "الأستاذة/ ميعاد حسن الأحمري",
    role: "مستشارة قانونية",
    hireDate: "2017-09-01",
    specialties: ["الاستشارات القانونية", "القضايا الحقوقية"],
    // image: "/images/team/mayad-al-ahmri.jpg",
  },
];
