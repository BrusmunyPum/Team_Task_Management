"use client";

import Link from "next/link";
import { useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { routes } from "@/lib/routes";

type RegisterErrors = {
  confirmPassword?: string;
  email?: string;
  name?: string;
  password?: string;
};

export function RegisterForm() {
  const [name, setName] = useState("Maya Chen");
  const [email, setEmail] = useState("maya@teamtask.test");
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});

  function validate() {
    const nextErrors: RegisterErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!email.trim() || !email.includes("@")) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords must match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      window.location.href = routes.onboarding;
    }, 450);
  }

  return (
    <form className="form-stack auth-form" onSubmit={handleSubmit} noValidate>
      <label className="form-label">
        Full name
        <input
          className={`form-input ${errors.name ? "form-input--error" : ""}`}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {errors.name && <small className="form-help form-help--error">{errors.name}</small>}
      </label>

      <label className="form-label">
        Email
        <input
          className={`form-input ${errors.email ? "form-input--error" : ""}`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.email && <small className="form-help form-help--error">{errors.email}</small>}
      </label>

      <label className="form-label">
        Password
        <span className="password-field">
          <input
            className={`form-input ${errors.password ? "form-input--error" : ""}`}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="button" onClick={() => setShowPassword((current) => !current)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </span>
        {errors.password && <small className="form-help form-help--error">{errors.password}</small>}
      </label>

      <label className="form-label">
        Confirm password
        <input
          className={`form-input ${errors.confirmPassword ? "form-input--error" : ""}`}
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        {errors.confirmPassword && (
          <small className="form-help form-help--error">{errors.confirmPassword}</small>
        )}
      </label>

      <p className="form-help">Use at least 8 characters. This prototype keeps the flow frontend-only.</p>

      <button className="primary-action" type="submit" disabled={isSubmitting}>
        <AppIcon name="personAdd" />
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      <p className="form-help">
        Already registered?{" "}
        <Link className="auth-link" href={routes.login}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
