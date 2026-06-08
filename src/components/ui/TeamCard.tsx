import Image from "next/image";
import { User } from "lucide-react";
import type { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div
      className={`bg-black-light border rounded-sm overflow-hidden transition-all duration-300 hover:gold-glow ${
        member.isLead
          ? "border-gold/40 md:col-span-2"
          : "border-gold/10 hover:border-gold/30"
      }`}
    >
      <div
        className={`relative bg-black-muted flex items-center justify-center ${
          member.isLead ? "h-72" : "h-64"
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
        {member.isLead && (
          <div className="absolute top-4 right-4 bg-gold text-black text-xs font-bold px-3 py-1 rounded-sm">
            المدير العام
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-cream mb-1">{member.name}</h3>
        <p className="text-gold text-sm font-medium mb-3">{member.role}</p>
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
