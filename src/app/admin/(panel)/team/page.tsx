"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import type { TeamStructure, TeamMember, TeamDepartment } from "@/data/team";

function emptyMember(): TeamMember {
  return {
    id: `member-${Date.now()}`,
    name: "",
    hireDate: new Date().toISOString().split("T")[0],
    specialties: [],
  };
}

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/team")
      .then((r) => r.json())
      .then(setTeam)
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    if (!team) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/team", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(team),
    });
    setSaving(false);
    if (res.ok) {
      setMessage("تم الحفظ بنجاح — حدّث الموقع للتأكد");
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage(data.error || "فشل الحفظ");
    }
  }

  function updateMember(
    path: "generalManager" | "officeManager" | { deptId: string; memberId: string },
    field: keyof TeamMember,
    value: string
  ) {
    if (!team) return;
    const updated = { ...team };

    if (path === "generalManager") {
      updated.generalManager = { ...updated.generalManager, [field]: value };
    } else if (path === "officeManager") {
      updated.officeManager = { ...updated.officeManager, [field]: value };
    } else {
      updated.departments = updated.departments.map((d) => {
        if (d.id !== path.deptId) return d;
        return {
          ...d,
          members: d.members.map((m) =>
            m.id === path.memberId ? { ...m, [field]: value } : m
          ),
        };
      });
    }
    setTeam(updated);
  }

  function addMember(deptId: string) {
    if (!team) return;
    setTeam({
      ...team,
      departments: team.departments.map((d) =>
        d.id === deptId ? { ...d, members: [...d.members, emptyMember()] } : d
      ),
    });
  }

  function removeMember(deptId: string, memberId: string) {
    if (!team) return;
    setTeam({
      ...team,
      departments: team.departments.map((d) =>
        d.id === deptId
          ? { ...d, members: d.members.filter((m) => m.id !== memberId) }
          : d
      ),
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!team) return null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-cream">إدارة فريق العمل</h1>
          <p className="text-cream/50 text-sm mt-1">
            عدّل الهيكل الإداري والأعضاء
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-gold text-black font-bold px-6 py-2.5 rounded-sm hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          حفظ التغييرات
        </button>
      </div>

      {message && (
        <p className="text-gold text-sm mb-6 bg-gold/10 px-4 py-2 rounded-sm">
          {message}
        </p>
      )}

      {/* Leadership */}
      <div className="space-y-6 mb-10">
        <MemberEditor
          title="المدير العام"
          member={team.generalManager}
          onChange={(field, value) =>
            updateMember("generalManager", field, value)
          }
        />
        <MemberEditor
          title="مدير المكتب"
          member={team.officeManager}
          onChange={(field, value) =>
            updateMember("officeManager", field, value)
          }
        />
      </div>

      {/* Departments */}
      {team.departments.map((dept) => (
        <DepartmentEditor
          key={dept.id}
          department={dept}
          onAddMember={() => addMember(dept.id)}
          onRemoveMember={(memberId) => removeMember(dept.id, memberId)}
          onUpdateMember={(memberId, field, value) =>
            updateMember({ deptId: dept.id, memberId }, field, value)
          }
        />
      ))}
    </div>
  );
}

function MemberEditor({
  title,
  member,
  onChange,
}: {
  title: string;
  member: TeamMember;
  onChange: (field: keyof TeamMember, value: string) => void;
}) {
  return (
    <div className="card-elevated rounded-sm p-6">
      <h2 className="text-gold font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="الاسم" value={member.name} onChange={(v) => onChange("name", v)} />
        <Field
          label="تاريخ التعيين"
          value={member.hireDate}
          onChange={(v) => onChange("hireDate", v)}
          type="date"
          dir="ltr"
        />
        <div className="md:col-span-2">
          <Field
            label="المؤهلات"
            value={member.qualifications || ""}
            onChange={(v) => onChange("qualifications", v)}
          />
        </div>
      </div>
    </div>
  );
}

function DepartmentEditor({
  department,
  onAddMember,
  onRemoveMember,
  onUpdateMember,
}: {
  department: TeamDepartment;
  onAddMember: () => void;
  onRemoveMember: (id: string) => void;
  onUpdateMember: (id: string, field: keyof TeamMember, value: string) => void;
}) {
  return (
    <div className="card-elevated rounded-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gold font-bold">{department.title}</h2>
        <button
          onClick={onAddMember}
          className="flex items-center gap-1 text-sm text-gold hover:text-gold-light transition-colors"
        >
          <Plus className="w-4 h-4" />
          إضافة عضو
        </button>
      </div>

      {department.members.length === 0 ? (
        <p className="text-cream/40 text-sm">لا يوجد أعضاء — اضغط إضافة عضو</p>
      ) : (
        <div className="space-y-4">
          {department.members.map((member) => (
            <div
              key={member.id}
              className="border border-gold/15 rounded-sm p-4 relative"
            >
              <button
                onClick={() => onRemoveMember(member.id)}
                className="absolute top-3 left-3 text-cream/40 hover:text-red-400 transition-colors"
                title="حذف"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                <Field
                  label="الاسم"
                  value={member.name}
                  onChange={(v) => onUpdateMember(member.id, "name", v)}
                />
                <Field
                  label="تاريخ التعيين"
                  value={member.hireDate}
                  onChange={(v) => onUpdateMember(member.id, "hireDate", v)}
                  type="date"
                  dir="ltr"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  dir?: string;
}) {
  return (
    <div>
      <label className="block text-cream/60 text-xs mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-sm text-sm"
        dir={dir}
      />
    </div>
  );
}
