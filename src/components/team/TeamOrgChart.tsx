import { TeamCard } from "@/components/ui/TeamCard";
import type { TeamStructure } from "@/data/team";

interface TeamOrgChartProps {
  structure: TeamStructure;
  compact?: boolean;
}

export function TeamOrgChart({ structure, compact = false }: TeamOrgChartProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Title node — homepage preview only */}
      {compact && (
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
      )}

      {/* General Manager */}
      <div className="flex flex-col items-center mb-6">
        {compact ? (
          <div className="org-node-lead rounded-lg px-6 py-3 sm:px-8 sm:py-4 text-center shadow-md">
            <p className="text-gold text-xs sm:text-sm font-medium mb-1">
              المدير العام
            </p>
            <p className="text-cream font-bold text-sm sm:text-base">
              {structure.generalManager.name}
            </p>
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <TeamCard member={structure.generalManager} variant="lead" />
          </div>
        )}
        <div className="org-connector-v h-8 sm:h-10" />
      </div>

      {/* Office Manager */}
      <div className="flex flex-col items-center mb-10">
        {compact ? (
          <div className="org-node rounded-lg px-6 py-3 sm:px-8 sm:py-4 text-center shadow-md">
            <p className="text-gold text-xs sm:text-sm font-medium mb-1">
              مدير المكتب
            </p>
            <p className="text-cream font-bold text-sm sm:text-base">
              {structure.officeManager.name}
            </p>
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <p className="text-gold text-xs sm:text-sm font-medium mb-3 text-center">
              مدير المكتب
            </p>
            <TeamCard member={structure.officeManager} />
          </div>
        )}
        <div className="org-connector-v h-8 sm:h-10" />
        <div className="w-full max-w-4xl org-connector-h" />
        <div className="org-connector-v h-6" />
      </div>

      {/* Departments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-5">
        {structure.departments.map((dept) => (
          <div key={dept.id} className="flex flex-col items-center w-full">
            <div className="org-node-dept rounded-sm px-3 py-3 sm:px-4 sm:py-4 text-center w-full min-h-[72px] flex items-center justify-center">
              <p className="text-cream font-bold text-xs sm:text-sm leading-snug">
                {dept.title}
              </p>
            </div>

            {!compact && (
              <>
                {dept.members.length > 0 ? (
                  <div className="w-full space-y-4 mt-4">
                    {dept.members.map((member) => (
                      <div key={member.id} className="flex flex-col items-center w-full">
                        <div className="org-connector-v h-4 w-px" />
                        <TeamCard member={member} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center w-full">
                    <div className="org-connector-v h-4 w-px" />
                    <p className="text-cream/40 text-sm text-center py-6 px-2">
                      سيتم إضافة الأعضاء قريباً
                    </p>
                  </div>
                )}
              </>
            )}

            {compact && dept.members.length > 0 && (
              <div className="org-connector-v h-5 w-px" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
