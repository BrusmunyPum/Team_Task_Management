import { OrganizationForm } from "@/features/organizations/components/OrganizationForm";
import { OrganizationSwitcher } from "@/features/organizations/components/OrganizationSwitcher";

export default function WorkspaceSettingsPage() {
  return (
    <div className="page-stack">
      <section className="panel">
        <div className="section-heading">
          <div><p className="eyebrow">Organization</p><h2>Workspace settings</h2></div>
          <OrganizationSwitcher />
        </div>
        <OrganizationForm />
      </section>

      <section className="panel">
        <div className="section-heading"><div><p className="eyebrow">Access</p><h2>Workspace rules</h2></div></div>
        <div className="feature-grid">
          <article><h3>Owner controls</h3><p>Only owners can rename or archive the organization.</p></article>
          <article><h3>Admin controls</h3><p>Admins can manage members and create projects.</p></article>
          <article><h3>Member controls</h3><p>Members can update tasks assigned to them.</p></article>
        </div>
      </section>
    </div>
  );
}
