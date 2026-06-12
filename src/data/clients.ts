export interface Client {
  name: string;
  shortName: string;
  description: string;
  initials: string;
}

export const clients: Client[] = [
  {
    name: "المركز السعودي لاعتماد التخصصات الطبية",
    shortName: "سباهي",
    description: "جهة رسمية معتمدة",
    initials: "SCFHS",
  },
  {
    name: "شركة البلاد المالية",
    shortName: "البلاد المالية",
    description: "شركة وطنية رائدة",
    initials: "BLAD",
  },
  {
    name: "الشركة الإقليمية لمشتقات البترول",
    shortName: "مشتقات البترول",
    description: "شركة وطنية رائدة",
    initials: "RPDC",
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
