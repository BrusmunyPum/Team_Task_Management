import Link from "next/link";
import { AppIcon } from "@/components/ui/AppIcon";
import { routes } from "@/lib/routes";

export function RegisterForm() {
  return (
    <form className="form-stack">
      <label className="form-label">Full name<input className="form-input" type="text" defaultValue="Maya Chen" /></label>
      <label className="form-label">Email<input className="form-input" type="email" defaultValue="maya@teamtask.test" /></label>
      <label className="form-label">Password<input className="form-input" type="password" defaultValue="password" /></label>
      <label className="form-label">Confirm password<input className="form-input" type="password" defaultValue="password" /></label>
      <Link className="primary-action" href={routes.onboarding}><AppIcon name="personAdd" />Create account</Link>
    </form>
  );
}
