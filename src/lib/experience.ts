const FOUNDED_HIJRI_YEAR = 1436;

/** سنوات خبرة المكتب منذ تأسيسه عام 1436 هـ */
export function getOfficeExperienceYears(
  foundedHijriYear = FOUNDED_HIJRI_YEAR
): number {
  const now = new Date();
  const currentHijriYear = parseInt(
    new Intl.DateTimeFormat("en-u-ca-islamic", { year: "numeric" }).format(now),
    10
  );
  return Math.max(currentHijriYear - foundedHijriYear, 1);
}

export function getExperienceYears(hireDate: string): number {
  const start = new Date(hireDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    years--;
  }

  return Math.max(years, 0);
}

export function formatHireDate(hireDate: string): string {
  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(hireDate));
}
