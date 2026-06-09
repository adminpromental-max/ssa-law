import Image from "next/image";
import { User, Briefcase } from "lucide-react";
import type { TeamMember } from "@/data/team";
import {
  formatHireDate,
  getExperienceYears,
} from "@/lib/experience";

interface TeamCardProps {
  member: TeamMember;
  variant?: "default" | "lead";
}

export function TeamCard({ member, variant = "default" }: TeamCardProps) {
  const experienceYears = getExperienceYears(member.hireDate);
  const isLead = variant === "lead";

  return (
    <div
      className={`card-surface card-elevated rounded-sm overflow-hidden transition-[border-color,box-shadow] duration-300 md:hover:gold-glow ${
        isLead ? "border-gold/40" : "md:hover:border-gold/30"
      }`}
    >
      <div
        className={`relative bg-warm-900 flex items-center justify-center ${
          isLead ? "h-72" : "h-64"
        }`}
      >
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-cream/30">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-gold/30 flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
            <span className="text-sm">الصورة قريباً</span>
          </div>
        )}
        {isLead && (
          <div className="absolute top-4 right-4 bg-gold text-black text-xs font-bold px-3 py-1 rounded-sm">
            المدير العام
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-cream mb-1 leading-snug">
          {member.name}
        </h3>
        <div className="flex items-start gap-2 text-cream/60 text-sm mb-3">
          <Briefcase className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          <div>
            <p>تاريخ التعيين: {formatHireDate(member.hireDate)}</p>
            <p className="text-gold/80 mt-1">
              خبرة {experienceYears} {experienceYears === 1 ? "سنة" : "سنوات"}
            </p>
          </div>
        </div>
        {member.qualifications && (
          <p className="text-cream/60 text-sm leading-relaxed mb-4">
            {member.qualifications}
          </p>
        )}
        {member.specialties && (
          <div className="flex flex-wrap gap-2">
            {member.specialties.map((s) => (
              <span
                key={s}
                className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-sm"
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
