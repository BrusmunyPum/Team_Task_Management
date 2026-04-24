import Link from "next/link";
import { AppIcon } from "@/components/ui/AppIcon";
import { routes } from "@/lib/routes";

export function LoginForm() {
  return (
    <form className="form-stack">
      <label className="form-label">Email<input className="form-input" type="email" defaultValue="maya@teamtask.test" /></label>
      <label className="form-label">Password<input className="form-input" type="password" defaultValue="password" /></label>
      <Link className="primary-action" href={routes.dashboard}><AppIcon name="login" />Sign in</Link>
    </form>
  );
}
