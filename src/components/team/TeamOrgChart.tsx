import { TeamCard } from "@/components/ui/TeamCard";
import type { TeamDepartment, TeamStructure } from "@/data/team";

interface TeamOrgChartProps {
  structure: TeamStructure;
  compact?: boolean;
}

const FINANCIAL_DEPT_ID = "financial-consultant";
const LEGAL_DEPT_ID = "legal-consultants";

function isDeptVisible(dept: TeamDepartment): boolean {
  return dept.visible !== false;
}

function DepartmentSection({
  dept,
  showEmptyPlaceholder = true,
}: {
  dept: TeamDepartment;
  showEmptyPlaceholder?: boolean;
}) {
  if (!isDeptVisible(dept)) return null;

  const hasMembers = dept.members.length > 0;

  if (!hasMembers && !showEmptyPlaceholder) return null;

  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-gold/20" />
        <h3 className="text-gold font-bold text-base sm:text-lg text-center px-2 shrink-0">
          {dept.title}
        </h3>
        <div className="flex-1 h-px bg-gold/20" />
      </div>

      {hasMembers ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dept.members.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <p className="text-center text-cream/40 text-sm py-4">
          سيتم إضافة الأعضاء قريباً
        </p>
      )}
    </section>
  );
}

export function TeamOrgChart({ structure, compact = false }: TeamOrgChartProps) {
  if (compact) {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="org-node-lead rounded-full w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center text-center px-4 shadow-lg mx-auto">
          <p className="text-cream font-bold text-sm sm:text-base leading-snug">
            الهيكل الإداري
            <br />
            للمكتب
          </p>
        </div>
        <p className="text-cream font-bold">{structure.generalManager.name}</p>
      </div>
    );
  }

  const financialDept = structure.departments.find(
    (d) => d.id === FINANCIAL_DEPT_ID
  );
  const legalDept = structure.departments.find((d) => d.id === LEGAL_DEPT_ID);
  const secondaryDepts = structure.departments.filter(
    (d) => d.id !== FINANCIAL_DEPT_ID && d.id !== LEGAL_DEPT_ID
  );

  const showFinancialInRow =
    financialDept &&
    isDeptVisible(financialDept) &&
    financialDept.members.length > 0;

  return (
    <div className="space-y-16 sm:space-y-20">
      <div className="max-w-md mx-auto w-full">
        <TeamCard member={structure.generalManager} variant="lead" />
      </div>

      <div
        className={`grid gap-8 lg:gap-10 max-w-4xl mx-auto items-start ${
          showFinancialInRow ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-md"
        }`}
      >
        <div>
          <p className="text-gold text-sm font-medium mb-4 text-center">
            مدير المكتب
          </p>
          <TeamCard member={structure.officeManager} />
        </div>

        {showFinancialInRow && financialDept && (
          <div>
            <p className="text-gold text-sm font-medium mb-4 text-center">
              {financialDept.title}
            </p>
            <div className="space-y-6">
              {financialDept.members.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
      </div>

      {legalDept && isDeptVisible(legalDept) && (
        <DepartmentSection dept={legalDept} showEmptyPlaceholder={false} />
      )}

      {secondaryDepts.map((dept) => (
        <DepartmentSection key={dept.id} dept={dept} />
      ))}
    </div>
  );
}
