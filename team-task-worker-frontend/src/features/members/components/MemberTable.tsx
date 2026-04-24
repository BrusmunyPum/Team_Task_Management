import { teamMembers } from "@/lib/mock-data";
import { MemberRoleBadge } from "@/features/members/components/MemberRoleBadge";

export function MemberTable() {
  return (
    <div className="table-wrap">
      <table className="member-table">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
        <tbody>{teamMembers.map((member) => <tr key={member.id}><td><span className="person-cell"><span className={`avatar ${member.tone}`}>{member.initials}</span>{member.name}</span></td><td>{member.email}</td><td><MemberRoleBadge role={member.role} /></td><td>{member.joined}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
