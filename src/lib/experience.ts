/** تحويل تقريبي لسنة هجرية إلى ميلادية للعرض */
export function hijriYearToGregorian(hijriYear: number): number {
  return Math.round(hijriYear * 0.970224 + 621.5643);
}

export function formatFoundedYearDisplay(foundedYear: string): string {
  const match = foundedYear.match(/(\d{4})/);
  if (!match) return foundedYear;
  const hijri = parseInt(match[1], 10);
  const gregorian = hijriYearToGregorian(hijri);
  return `${hijri} هـ / ${gregorian.toLocaleString("en-US")} م`;
}

export function getOfficeExperienceYears(foundedHijriYear = 1436): number {
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

export function formatExperienceYears(hireDate: string): string {
  const years = getExperienceYears(hireDate);
  const n = years.toLocaleString("en-US");
  if (years === 1) return `${n} سنة خبرة`;
  if (years === 2) return `${n} سنتان خبرة`;
  if (years >= 3 && years <= 10) return `${n} سنوات خبرة`;
  return `${n} سنة خبرة`;
}
