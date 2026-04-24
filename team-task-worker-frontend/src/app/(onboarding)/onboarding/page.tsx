import Link from "next/link";
import { AppIcon } from "@/components/ui/AppIcon";
import { routes } from "@/lib/routes";

export default function OnboardingPage() {
  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-intro">
          <Link className="brand" href={routes.dashboard}>
            <span className="brand-mark" aria-hidden="true">
              <AppIcon name="hub" />
            </span>
            <span>
              <strong>TeamTask Pro</strong>
              <small>Project Management</small>
            </span>
          </Link>
          <div>
            <p className="eyebrow">Workspace setup</p>
            <h1>Set up Acme Workspace</h1>
          </div>
          <div className="wizard-steps">
            <span className="wizard-step active">1. Organization</span>
            <span className="wizard-step">2. Members</span>
            <span className="wizard-step">3. First project</span>
          </div>
        </div>

        <div className="auth-form-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Step 1 of 3</p>
              <h2>Create organization</h2>
            </div>
          </div>
          <form className="form-stack">
            <label className="form-label">
              Organization name
              <input className="form-input" type="text" defaultValue="Acme Workspace" />
            </label>
            <label className="form-label">
              Workspace slug
              <input className="form-input" type="text" defaultValue="acme" />
            </label>
            <label className="form-label">
              Invite members
              <textarea
                className="form-input"
                placeholder="niran@teamtask.test, lena@teamtask.test"
              />
            </label>
            <label className="form-label">
              First project
              <input
                className="form-input"
                type="text"
                defaultValue="Frontend Integration"
              />
            </label>
            <Link className="primary-action" href={routes.dashboard}>
              <AppIcon name="rocket" />
              Finish setup
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}
