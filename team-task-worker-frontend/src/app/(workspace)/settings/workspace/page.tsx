"use client";

import { SettingsTabs } from "@/components/layout/SettingsTabs";
import { OrganizationForm } from "@/features/organizations/components/OrganizationForm";
import { OrganizationSwitcher } from "@/features/organizations/components/OrganizationSwitcher";
import { AppIcon } from "@/components/ui/AppIcon";
import { teamMembers } from "@/lib/mock-data";

export default function WorkspaceSettingsPage() {
  return (
    <div className="page-stack">
      <SettingsTabs />

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Organization</p>
            <h2>Workspace settings</h2>
          </div>
          <OrganizationSwitcher />
        </div>
        <OrganizationForm />
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Team</p>
            <h2>Member summary</h2>
          </div>
        </div>
        <section className="metric-grid">
          <article className="metric-card">
            <span className="metric-icon">
              <AppIcon name="groups" />
            </span>
            <div>
              <strong>{teamMembers.length}</strong>
              <small>Total members</small>
            </div>
          </article>
          <article className="metric-card">
            <span className="metric-icon">
              <AppIcon name="dashboard" />
            </span>
            <div>
              <strong>
                {teamMembers.filter((member) => member.role === "Owner").length}
              </strong>
              <small>Owners</small>
            </div>
          </article>
          <article className="metric-card">
            <span className="metric-icon">
              <AppIcon name="tasks" />
            </span>
            <div>
              <strong>
                {teamMembers.filter((member) => member.role === "Admin").length}
              </strong>
              <small>Admins</small>
            </div>
          </article>
          <article className="metric-card">
            <span className="metric-icon">
              <AppIcon name="folder" />
            </span>
            <div>
              <strong>
                {
                  teamMembers.filter((member) => member.role === "Member")
                    .length
                }
              </strong>
              <small>Members</small>
            </div>
          </article>
        </section>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Access</p>
            <h2>Workspace rules</h2>
          </div>
        </div>
        <div className="feature-grid">
          <article>
            <h3>Owner controls</h3>
            <p>Only owners can rename or archive the organization.</p>
          </article>
          <article>
            <h3>Admin controls</h3>
            <p>Admins can manage members and create projects.</p>
          </article>
          <article>
            <h3>Member controls</h3>
            <p>Members can update tasks assigned to them.</p>
          </article>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Billing</p>
            <h2>Plan & usage</h2>
          </div>
        </div>
        <div className="plan-card">
          <span className="plan-icon">
            <AppIcon name="rocket" />
          </span>
          <div>
            <strong>Free plan</strong>
            <small>
              Unlimited projects · Up to 10 members · Community support
            </small>
          </div>
        </div>
      </section>

      <section className="danger-zone">
        <h3>
          <AppIcon name="close" /> Danger zone
        </h3>
        <p>
          Archiving this workspace will make it read-only for all members.
          Deleting it is permanent and cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="danger-action" type="button">
            <AppIcon name="folder" />
            Archive workspace
          </button>
          <button className="danger-action" type="button">
            <AppIcon name="close" />
            Delete workspace
          </button>
        </div>
      </section>
    </div>
  );
}
