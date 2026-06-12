"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { AdminSaveBar, AdminField } from "@/components/admin/AdminSaveBar";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { DragSortItem, useDragReorder } from "@/components/admin/DragSort";
import { IMAGE_SIZE_HINTS } from "@/lib/db/defaults";
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

  const deptDrag = useDragReorder(team?.departments ?? [], (departments) =>
    setTeam((t) => (t ? { ...t, departments } : t))
  );

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
    setMessage(res.ok ? "تم الحفظ — حدّث الموقع للتأكد" : "فشل الحفظ");
  }

  function updateMember(
    path: "generalManager" | "officeManager" | { deptId: string; memberId: string },
    patch: Partial<TeamMember>
  ) {
    if (!team) return;
    const updated = { ...team };

    if (path === "generalManager") {
      updated.generalManager = { ...updated.generalManager, ...patch };
    } else if (path === "officeManager") {
      updated.officeManager = { ...updated.officeManager, ...patch };
    } else {
      updated.departments = updated.departments.map((d) => {
        if (d.id !== path.deptId) return d;
        return {
          ...d,
          members: d.members.map((m) =>
            m.id === path.memberId ? { ...m, ...patch } : m
          ),
        };
      });
    }
    setTeam(updated);
  }

  function setDeptMembers(deptId: string, members: TeamMember[]) {
    setTeam((t) =>
      t
        ? {
            ...t,
            departments: t.departments.map((d) =>
              d.id === deptId ? { ...d, members } : d
            ),
          }
        : t
    );
  }

  function addMember(deptId: string) {
    if (!team) return;
    setDeptMembers(deptId, [
      ...(team.departments.find((d) => d.id === deptId)?.members || []),
      emptyMember(),
    ]);
  }

  function removeMember(deptId: string, memberId: string) {
    if (!team) return;
    const dept = team.departments.find((d) => d.id === deptId);
    if (!dept) return;
    setDeptMembers(
      deptId,
      dept.members.filter((m) => m.id !== memberId)
    );
  }

  function updateDeptTitle(deptId: string, title: string) {
    setTeam((t) =>
      t
        ? {
            ...t,
            departments: t.departments.map((d) =>
              d.id === deptId ? { ...d, title } : d
            ),
          }
        : t
    );
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
      <AdminSaveBar
        title="فريق العمل"
        description="الهيكل، الصور، النبذة — اسحب الأقسام والأعضاء لإعادة الترتيب"
        saving={saving}
        message={message}
        onSave={save}
      />

      <div className="space-y-6 mb-10">
        <MemberEditor
          title="المدير العام"
          member={team.generalManager}
          isLead
          onChange={(patch) => updateMember("generalManager", patch)}
        />
        <MemberEditor
          title="مدير المكتب"
          member={team.officeManager}
          onChange={(patch) => updateMember("officeManager", patch)}
        />
      </div>

      <p className="text-cream/50 text-sm mb-4">الأقسام — اسحب ⋮⋮ لترتيب ظهورها في صفحة الفريق</p>

      <div className="space-y-6">
        {team.departments.map((dept, deptIndex) => (
          <DepartmentBlock
            key={dept.id}
            department={dept}
            deptIndex={deptIndex}
            deptDrag={deptDrag}
            onTitleChange={(title) => updateDeptTitle(dept.id, title)}
            onAddMember={() => addMember(dept.id)}
            onRemoveMember={(id) => removeMember(dept.id, id)}
            onUpdateMember={(memberId, patch) =>
              updateMember({ deptId: dept.id, memberId }, patch)
            }
            onReorderMembers={(members) => setDeptMembers(dept.id, members)}
          />
        ))}
      </div>
    </div>
  );
}

function MemberEditor({
  title,
  member,
  isLead,
  onChange,
}: {
  title: string;
  member: TeamMember;
  isLead?: boolean;
  onChange: (patch: Partial<TeamMember>) => void;
}) {
  return (
    <div className="card-elevated rounded-sm p-6">
      <h2 className="text-gold font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
          <AdminField label="الاسم" value={member.name} onChange={(v) => onChange({ name: v })} />
          <AdminField label="تاريخ التعيين" value={member.hireDate} onChange={(v) => onChange({ hireDate: v })} type="date" dir="ltr" />
          <div className="md:col-span-2">
            <AdminField label="المؤهلات" value={member.qualifications || ""} onChange={(v) => onChange({ qualifications: v })} />
          </div>
          {isLead && (
            <div className="md:col-span-2">
              <AdminField label="نبذة (الرئيسية)" value={member.bio || ""} onChange={(v) => onChange({ bio: v })} multiline hint="تظهر في قسم فريق العمل بالرئيسية" />
            </div>
          )}
          <div className="md:col-span-2">
            <AdminField
              label="التخصصات (افصل بفاصلة)"
              value={(member.specialties || []).join("، ")}
              onChange={(v) => onChange({ specialties: v.split(/[,،]/).map((s) => s.trim()).filter(Boolean) })}
            />
          </div>
        </div>
        <ImageUploadField
          label="صورة العضو"
          value={member.image}
          onChange={(url) => onChange({ image: url })}
          folder="team"
          sizeHint={isLead ? IMAGE_SIZE_HINTS.teamLead : IMAGE_SIZE_HINTS.teamMember}
        />
      </div>
    </div>
  );
}

function DepartmentBlock({
  department,
  deptIndex,
  deptDrag,
  onTitleChange,
  onAddMember,
  onRemoveMember,
  onUpdateMember,
  onReorderMembers,
}: {
  department: TeamDepartment;
  deptIndex: number;
  deptDrag: ReturnType<typeof useDragReorder<TeamDepartment>>;
  onTitleChange: (title: string) => void;
  onAddMember: () => void;
  onRemoveMember: (id: string) => void;
  onUpdateMember: (id: string, patch: Partial<TeamMember>) => void;
  onReorderMembers: (members: TeamMember[]) => void;
}) {
  const memberDrag = useDragReorder(department.members, onReorderMembers);

  return (
    <DragSortItem
      index={deptIndex}
      onDragStart={deptDrag.onDragStart}
      onDragOver={deptDrag.onDragOver}
      onDrop={deptDrag.onDrop}
      isDragging={deptDrag.isDragging(deptIndex)}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <AdminField label="اسم القسم" value={department.title} onChange={onTitleChange} />
        <button onClick={onAddMember} className="flex items-center gap-1 text-sm text-gold mt-5">
          <Plus className="w-4 h-4" /> عضو
        </button>
      </div>

      {department.members.length === 0 ? (
        <p className="text-cream/40 text-sm">لا يوجد أعضاء</p>
      ) : (
        <div className="space-y-3">
          {department.members.map((member, memberIndex) => (
            <DragSortItem
              key={member.id}
              index={memberIndex}
              onDragStart={memberDrag.onDragStart}
              onDragOver={memberDrag.onDragOver}
              onDrop={memberDrag.onDrop}
              isDragging={memberDrag.isDragging(memberIndex)}
            >
              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-3">
                  <AdminField label="الاسم" value={member.name} onChange={(v) => onUpdateMember(member.id, { name: v })} />
                  <AdminField label="تاريخ التعيين" value={member.hireDate} onChange={(v) => onUpdateMember(member.id, { hireDate: v })} type="date" dir="ltr" />
                  <div className="md:col-span-2">
                    <AdminField label="المؤهلات" value={member.qualifications || ""} onChange={(v) => onUpdateMember(member.id, { qualifications: v })} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <ImageUploadField
                    label="الصورة"
                    value={member.image}
                    onChange={(url) => onUpdateMember(member.id, { image: url })}
                    folder="team"
                    sizeHint={IMAGE_SIZE_HINTS.teamMember}
                  />
                  <button onClick={() => onRemoveMember(member.id)} className="flex items-center gap-1 text-xs text-red-400">
                    <Trash2 className="w-3 h-3" /> حذف
                  </button>
                </div>
              </div>
            </DragSortItem>
          ))}
        </div>
      )}
    </DragSortItem>
  );
}
