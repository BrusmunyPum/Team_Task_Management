"use client";

import { SettingsTabs } from "@/components/layout/SettingsTabs";
import { MockSubmitButton } from "@/components/ui/MockSubmitButton";
import { AppIcon } from "@/components/ui/AppIcon";

export default function ProfilePage() {
  return (
    <div className="page-stack">
      <SettingsTabs />

      <div className="profile-layout">
        {/* ── Left column: identity card ── */}
        <aside className="profile-sidebar">
          <div className="profile-identity-card">
            <span className="avatar-large">MC</span>
            <h3>Maya Chen</h3>
            <p className="form-help">maya@teamtask.test</p>
            <span className="pill progress">Owner</span>
          </div>

          <div className="profile-quick-stats">
            <div className="profile-stat">
              <strong>2</strong>
              <small>Tasks assigned</small>
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
                <span>March 15, 2026</span>
              </div>
            </div>
            <div className="profile-detail-item">
              <AppIcon name="globe" />
              <div>
                <small>Timezone</small>
                <span>Asia/Bangkok (GMT+7)</span>
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

        {/* ── Right column: settings forms ── */}
        <div className="profile-main">
          <section className="panel">
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
                  <input
                    className="form-input"
                    type="text"
                    defaultValue="Maya Chen"
                  />
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
                    style={{ opacity: 0.6 }}
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
                  defaultValue="Product owner & full-stack lead. Passionate about clean architecture and great UX."
                />
              </label>
              <MockSubmitButton
                label="Save profile"
                completeLabel="Profile saved"
              />
            </form>
          </section>

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
                <input
                  className="form-input"
                  type="password"
                  defaultValue="password"
                />
              </label>
              <div className="form-row">
                <label className="form-label">
                  New password
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Enter new password"
                  />
                </label>
                <label className="form-label">
                  Confirm new password
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Re-enter new password"
                  />
                </label>
              </div>
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
                <h2>Notification settings</h2>
              </div>
            </div>
            <div className="form-stack">
              <div className="toggle-row">
                <div>
                  <span>Email notifications</span>
                  <small>
                    Receive updates about task assignments and deadlines
                  </small>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-track" />
                </label>
              </div>
              <div className="toggle-row">
                <div>
                  <span>In-app notifications</span>
                  <small>
                    Show badge count and live feed in the sidebar
                  </small>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-track" />
                </label>
              </div>
              <div className="toggle-row">
                <div>
                  <span>Weekly digest</span>
                  <small>
                    Get a summary of project activity every Monday
                  </small>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="toggle-track" />
                </label>
              </div>
              <div className="toggle-row">
                <div>
                  <span>Desktop push</span>
                  <small>
                    Browser notifications for mentions and urgent items
                  </small>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="toggle-track" />
                </label>
              </div>
            </div>
          </section>

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
