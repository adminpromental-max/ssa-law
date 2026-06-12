export interface Client {
  name: string;
  shortName: string;
  description: string;
  initials: string;
  logo?: string;
}

export const clients: Client[] = [
  {
    name: "المركز السعودي لاعتماد التخصصات الطبية",
    shortName: "سباهي",
    description: "جهة رسمية معتمدة",
    initials: "SCFHS",
    logo: "/images/clients/spahi.svg",
  },
  {
    name: "شركة البلاد المالية",
    shortName: "البلاد المالية",
    description: "شركة وطنية رائدة",
    initials: "BLAD",
    logo: "/images/clients/albilad.svg",
  },
  {
    name: "الشركة الإقليمية لمشتقات البترول",
    shortName: "مشتقات البترول",
    description: "شركة وطنية رائدة",
    initials: "RPDC",
    logo: "/images/clients/rpdc.svg",
  },
  {
    name: "شركة الاتصالات السعودية",
    shortName: "STC",
    description: "placeholder — للعرض مؤقتاً",
    initials: "STC",
    logo: "/images/clients/stc.svg",
  },
  {
    name: "أرامكو السعودية",
    shortName: "أرامكو",
    description: "placeholder — للعرض مؤقتاً",
    initials: "ARAMCO",
    logo: "/images/clients/aramco.svg",
  },
  {
    name: "سابك",
    shortName: "SABIC",
    description: "placeholder — للعرض مؤقتاً",
    initials: "SABIC",
    logo: "/images/clients/sabic.svg",
  },
];

export const communityWork = [
  {
    title: "جامعة الملك سعود",
    description: "تدريب الطلاب والطالبات في المجال القانوني",
  },
  {
    title: "جامعة الأميرة نورة",
    description: "تدريب الطالبات وتنمية الكوادر الوطنية",
  },
];
