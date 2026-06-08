export interface TeamMember {
  id: string;
  name: string;
  role: string;
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
    specialties: ["إدارة العمليات", "تنسيق القضايا"],
    // image: "/images/team/ameen-othman.jpg",
  },
  {
    id: "mahmoud-nada",
    name: "الأستاذ/ محمود صلاح الدين ندا",
    role: "المستشار المالي والاقتصادي",
    specialties: ["الاستشارات المالية", "التحليل الاقتصادي"],
    // image: "/images/team/mahmoud-nada.jpg",
  },
  {
    id: "mahmoud-abu-sheta",
    name: "الأستاذ/ محمود إسماعيل أبو شيته",
    role: "مستشار قانوني",
    specialties: ["الاستشارات القانونية", "صياغة العقود"],
    // image: "/images/team/mahmoud-abu-sheta.jpg",
  },
  {
    id: "mayad-al-ahmri",
    name: "الأستاذة/ ميعاد حسن الأحمري",
    role: "مستشارة قانونية",
    specialties: ["الاستشارات القانونية", "القضايا الحقوقية"],
    // image: "/images/team/mayad-al-ahmri.jpg",
  },
];
