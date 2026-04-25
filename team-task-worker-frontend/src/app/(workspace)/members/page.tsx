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
                  <td data-label="Name">
                    <span className="person-cell">
                      <span className={`avatar ${member.tone}`}>{member.initials}</span>
                      {member.name}
                    </span>
                  </td>
                  <td data-label="Email">{member.email}</td>
                  <td data-label="Role">
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
                  <td data-label="Joined">{member.joined}</td>
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
                <td data-label="Action">Manage organization</td>
                <td data-label="Owner">Yes</td>
                <td data-label="Admin">No</td>
                <td data-label="Member">No</td>
              </tr>
              <tr>
                <td data-label="Action">Manage members</td>
                <td data-label="Owner">Yes</td>
                <td data-label="Admin">Yes</td>
                <td data-label="Member">No</td>
              </tr>
              <tr>
                <td data-label="Action">Create projects</td>
                <td data-label="Owner">Yes</td>
                <td data-label="Admin">Yes</td>
                <td data-label="Member">No</td>
              </tr>
              <tr>
                <td data-label="Action">Update assigned tasks</td>
                <td data-label="Owner">Yes</td>
                <td data-label="Admin">Yes</td>
                <td data-label="Member">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
