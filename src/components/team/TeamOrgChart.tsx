import { TeamCard } from "@/components/ui/TeamCard";
import type { TeamStructure } from "@/data/team";

interface TeamOrgChartProps {
  structure: TeamStructure;
  compact?: boolean;
}

export function TeamOrgChart({ structure, compact = false }: TeamOrgChartProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Title node */}
      <div className="flex flex-col items-center mb-8">
        <div className="org-node-lead rounded-full w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center text-center px-4 shadow-lg">
          <p className="text-cream font-bold text-sm sm:text-base leading-snug">
            الهيكل الإداري
            <br />
            للمكتب
          </p>
        </div>
        <div className="org-connector-v h-8 sm:h-10" />
      </div>

      {/* General Manager */}
      <div className="flex flex-col items-center mb-6">
        <div className="org-node-lead rounded-lg px-6 py-3 sm:px-8 sm:py-4 text-center shadow-md">
          <p className="text-gold text-xs sm:text-sm font-medium mb-1">
            المدير العام
          </p>
          <p className="text-cream font-bold text-sm sm:text-base">
            {structure.generalManager.name}
          </p>
        </div>
        <div className="org-connector-v h-8 sm:h-10" />
      </div>

      {/* Office Manager */}
      <div className="flex flex-col items-center mb-10">
        <div className="org-node rounded-lg px-6 py-3 sm:px-8 sm:py-4 text-center shadow-md">
          <p className="text-gold text-xs sm:text-sm font-medium mb-1">
            مدير المكتب
          </p>
          <p className="text-cream font-bold text-sm sm:text-base">
            {structure.officeManager.name}
          </p>
        </div>
        <div className="org-connector-v h-8 sm:h-10" />
        <div className="w-full max-w-4xl org-connector-h" />
        <div className="org-connector-v h-6" />
      </div>

      {/* Departments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 mb-10">
        {structure.departments.map((dept) => (
          <div key={dept.id} className="flex flex-col items-center">
            <div className="org-node-dept rounded-sm px-3 py-3 sm:px-4 sm:py-4 text-center w-full min-h-[72px] flex items-center justify-center">
              <p className="text-cream font-bold text-xs sm:text-sm leading-snug">
                {dept.title}
              </p>
            </div>
            {dept.members.length > 0 && (
              <div className="org-connector-v h-5 w-px" />
            )}
          </div>
        ))}
      </div>

      {/* Member cards grouped by department */}
      {!compact && (
        <div className="space-y-12">
          {structure.departments.map((dept) => (
            <div key={dept.id}>
              {dept.members.length > 0 && (
                <>
                  <h3 className="text-gold text-sm font-medium mb-4 text-center">
                    {dept.title}
                  </h3>
                  <div
                    className={`grid gap-6 ${
                      dept.members.length === 1
                        ? "max-w-md mx-auto"
                        : "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                    }`}
                  >
                    {dept.members.map((member) => (
                      <TeamCard key={member.id} member={member} />
                    ))}
                  </div>
                </>
              )}
              {dept.members.length === 0 && (
                <p className="text-cream/40 text-sm text-center -mt-6 mb-8">
                  {dept.title} — سيتم إضافة الأعضاء قريباً
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Leadership detail cards */}
      {!compact && (
        <div className="mt-16 pt-12 border-t border-gold/15 space-y-12">
          <div>
            <h3 className="text-gold text-sm font-medium mb-6 text-center">
              المدير العام
            </h3>
            <div className="max-w-lg mx-auto">
              <TeamCard
                member={structure.generalManager}
                variant="lead"
              />
            </div>
          </div>
          <div>
            <h3 className="text-gold text-sm font-medium mb-6 text-center">
              مدير المكتب
            </h3>
            <div className="max-w-lg mx-auto">
              <TeamCard member={structure.officeManager} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
