import { AppIcon } from "@/components/ui/AppIcon";
import { teamMembers } from "@/lib/mock-data";

export default function MembersPage() {
  return (
    <div className="page-stack">
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Organization members</p>
            <h2>Roles and access</h2>
          </div>
        </div>

        <div className="table-wrap">
          <table className="member-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.email}>
                  <td>
                    <span className="person-cell">
                      <span className={`avatar ${member.tone}`}>{member.initials}</span>
                      {member.name}
                    </span>
                  </td>
                  <td>{member.email}</td>
                  <td>
                    <span
                      className={`pill ${
                        member.role === "Owner"
                          ? "danger"
                          : member.role === "Admin"
                            ? "progress"
                            : "calm"
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td>{member.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="empty-state" hidden>
          <AppIcon name="groups" />
          No members yet. Invite your first teammate.
        </p>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Permission matrix</p>
            <h2>Owner, admin, member</h2>
          </div>
        </div>
        <div className="matrix-wrap">
          <table className="permission-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Owner</th>
                <th>Admin</th>
                <th>Member</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Manage organization</td>
                <td>Yes</td>
                <td>No</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Manage members</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Create projects</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Update assigned tasks</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
