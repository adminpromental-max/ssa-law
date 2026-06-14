import Image from "next/image";
import { User, Briefcase } from "lucide-react";
import type { TeamMember } from "@/data/team";
import { formatExperienceYears } from "@/lib/experience";

interface TeamCardProps {
  member: TeamMember;
  variant?: "default" | "lead";
}

export function TeamCard({ member, variant = "default" }: TeamCardProps) {
  const isLead = variant === "lead";
  const avatarSize = isLead
    ? "w-28 h-28 sm:w-32 sm:h-32"
    : "w-24 h-24 sm:w-28 sm:h-28";

  return (
    <div
      className={`card-surface card-elevated rounded-sm overflow-hidden transition-[border-color,box-shadow] duration-300 md:hover:gold-glow ${
        isLead ? "border-gold/40" : "md:hover:border-gold/30"
      }`}
    >
      <div className="pt-8 pb-2 px-6 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div
            className={`relative ${avatarSize} rounded-full overflow-hidden border-2 border-gold/35 shadow-[0_8px_24px_rgba(201,169,98,0.15)] bg-cream/5`}
          >
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-[center_18%] scale-110"
                sizes="128px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-cream/30">
                <User className="w-10 h-10" />
              </div>
            )}
          </div>
          {isLead && (
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gold text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              المدير العام
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-cream mb-1 leading-snug mt-1">
          {member.name}
        </h3>
        <div className="flex items-center justify-center gap-2 text-cream/60 text-sm mb-3">
          <Briefcase className="w-4 h-4 text-gold shrink-0" />
          <p className="text-gold/80">{formatExperienceYears(member.hireDate)}</p>
        </div>
      </div>

      <div className="px-6 pb-6 text-center">
        {member.qualifications && (
          <p className="text-cream/60 text-sm leading-relaxed mb-4">
            {member.qualifications}
          </p>
        )}
        {member.specialties && (
          <div className="flex flex-wrap justify-center gap-2">
            {member.specialties.map((s) => (
              <span
                key={s}
                className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
