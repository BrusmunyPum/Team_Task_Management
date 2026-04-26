"use client";

import { SettingsTabs } from "@/components/layout/SettingsTabs";
import { AppIcon } from "@/components/ui/AppIcon";
import { MockSubmitButton } from "@/components/ui/MockSubmitButton";

export default function ProfilePage() {
  return (
    <div className="page-stack">
      <SettingsTabs />

      <section className="profile-hero panel">
        <div className="profile-hero-main">
          <span className="avatar-large">MC</span>
          <div>
            <p className="eyebrow">Owner account</p>
            <h2>Maya Chen</h2>
            <p className="form-help">
              Product owner and full-stack lead for Acme Workspace.
            </p>
          </div>
        </div>
        <div className="profile-hero-actions">
          <span className="pill progress">Owner</span>
          <span className="pill calm">Cambodia</span>
          <span className="pill neutral">Active today</span>
        </div>
      </section>

      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-identity-card">
            <div className="profile-card-heading">
              <h3>Account health</h3>
              <span className="pill progress">Good</span>
            </div>
            <div className="profile-progress">
              <span style={{ width: "82%" }} />
            </div>
            <p className="form-help">
              Profile details, password, and notifications are ready for
              workspace collaboration.
            </p>
          </div>

          <div className="profile-quick-stats">
            <div className="profile-stat">
              <strong>2</strong>
              <small>Tasks</small>
            </div>
            <div className="profile-stat">
              <strong>4</strong>
              <small>Projects</small>
            </div>
            <div className="profile-stat">
              <strong>72%</strong>
              <small>Workload</small>
            </div>
          </div>

          <div className="profile-detail-list">
            <div className="profile-detail-item">
              <AppIcon name="calendar" />
              <div>
                <small>Joined</small>
                <span>Apr 12, 2026</span>
              </div>
            </div>
            <div className="profile-detail-item">
              <AppIcon name="workspace" />
              <div>
                <small>Workspace</small>
                <span>Acme Workspace</span>
              </div>
            </div>
            <div className="profile-detail-item">
              <AppIcon name="tasks" />
              <div>
                <small>Last active</small>
                <span>Today</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="profile-main">
          <section className="panel profile-card-wide">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Profile</p>
                <h2>Personal information</h2>
              </div>
            </div>

            <form className="form-stack">
              <div className="form-row">
                <label className="form-label">
                  Full name
                  <input className="form-input" type="text" defaultValue="Maya Chen" />
                </label>
                <label className="form-label">
                  Display name
                  <input
                    className="form-input"
                    type="text"
                    defaultValue="Maya"
                    placeholder="How others see your name"
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="form-label">
                  Email
                  <input
                    className="form-input"
                    type="email"
                    defaultValue="maya@teamtask.test"
                  />
                </label>
                <label className="form-label">
                  Phone
                  <input
                    className="form-input"
                    type="tel"
                    placeholder="+66 xx xxx xxxx"
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="form-label">
                  Role
                  <input
                    className="form-input"
                    type="text"
                    defaultValue="Owner"
                    readOnly
                  />
                </label>
                <label className="form-label">
                  Timezone
                  <select className="form-input" defaultValue="Asia/Bangkok">
                    <option>UTC</option>
                    <option>America/New_York</option>
                    <option>America/Los_Angeles</option>
                    <option>Europe/London</option>
                    <option>Asia/Bangkok</option>
                    <option>Asia/Tokyo</option>
                  </select>
                </label>
              </div>

              <label className="form-label">
                Bio
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Tell your team a little about yourself"
                  defaultValue="Product owner and full-stack lead. Focused on clean architecture, calm delivery, and sharp UX."
                />
              </label>

              <div className="profile-actions-row">
                <MockSubmitButton label="Save profile" completeLabel="Profile saved" />
              </div>
            </form>
          </section>

          <div className="profile-secondary-grid">
            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Security</p>
                  <h2>Change password</h2>
                </div>
              </div>
              <form className="form-stack">
                <label className="form-label">
                  Current password
                  <input className="form-input" type="password" defaultValue="password" />
                </label>
                <label className="form-label">
                  New password
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Enter new password"
                  />
                </label>
                <label className="form-label">
                  Confirm password
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Re-enter new password"
                  />
                </label>
                <p className="form-help">
                  Use at least 8 characters with a number and a letter.
                </p>
                <MockSubmitButton
                  label="Update password"
                  completeLabel="Password updated"
                />
              </form>
            </section>

            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Preferences</p>
                  <h2>Notifications</h2>
                </div>
              </div>
              <div className="form-stack">
                <div className="toggle-row">
                  <div>
                    <span>Email notifications</span>
                    <small>Task assignments and deadline updates</small>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-track" />
                  </label>
                </div>
                <div className="toggle-row">
                  <div>
                    <span>In-app notifications</span>
                    <small>Badge count and live feed activity</small>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-track" />
                  </label>
                </div>
                <div className="toggle-row">
                  <div>
                    <span>Weekly digest</span>
                    <small>Summary of project activity every Monday</small>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-track" />
                  </label>
                </div>
                <div className="toggle-row">
                  <div>
                    <span>Desktop push</span>
                    <small>Mentions and urgent items in browser</small>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-track" />
                  </label>
                </div>
              </div>
            </section>
          </div>

          <section className="danger-zone">
            <h3>
              <AppIcon name="close" /> Danger zone
            </h3>
            <p>
              Deactivating your account will remove your access to all
              workspaces. This action cannot be undone.
            </p>
            <button className="danger-action" type="button">
              <AppIcon name="close" />
              Deactivate account
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
