import { TeamCard } from "@/components/ui/TeamCard";
import type { TeamStructure } from "@/data/team";

interface TeamOrgChartProps {
  structure: TeamStructure;
  compact?: boolean;
}

export function TeamOrgChart({ structure, compact = false }: TeamOrgChartProps) {
  const visibleDepartments = structure.departments.filter(
    (dept) => dept.visible !== false
  );

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

  return (
    <div className="space-y-16 sm:space-y-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto items-start">
        <TeamCard member={structure.generalManager} variant="lead" />
        <div>
          <p className="text-gold text-sm font-medium mb-4 text-center">
            مدير المكتب
          </p>
          <TeamCard member={structure.officeManager} />
        </div>
      </div>

      {visibleDepartments.map((dept) => {
        if (dept.members.length === 0) return null;

        return (
          <section key={dept.id} className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gold/20" />
              <h3 className="text-gold font-bold text-base sm:text-lg text-center px-2 shrink-0">
                {dept.title}
              </h3>
              <div className="flex-1 h-px bg-gold/20" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dept.members.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
