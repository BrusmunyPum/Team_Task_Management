import { MockSubmitButton } from "@/components/ui/MockSubmitButton";

export default function ProfilePage() {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Profile</p>
          <h2>User settings</h2>
        </div>
      </div>
      <form className="form-stack">
        <label className="form-label">
          Name
          <input className="form-input" type="text" defaultValue="Maya Chen" />
        </label>
        <label className="form-label">
          Email
          <input
            className="form-input"
            type="email"
            defaultValue="maya@teamtask.test"
          />
        </label>
        <MockSubmitButton label="Save profile" completeLabel="Profile saved" />
      </form>
    </section>
  );
}
