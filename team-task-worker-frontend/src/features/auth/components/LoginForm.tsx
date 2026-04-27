"use client";

import Link from "next/link";
import { useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { routes } from "@/lib/routes";

type LoginErrors = {
  email?: string;
  password?: string;
};

export function LoginForm() {
  const [email, setEmail] = useState("maya@teamtask.test");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  function validate() {
    const nextErrors: LoginErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!email.includes("@")) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
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
      window.location.href = routes.dashboard;
    }, 450);
  }

  return (
    <form className="form-stack auth-form" onSubmit={handleSubmit} noValidate>
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
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="button" onClick={() => setShowPassword((current) => !current)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </span>
        {errors.password && <small className="form-help form-help--error">{errors.password}</small>}
      </label>

      <div className="auth-row">
        <label className="checkbox-row">
          <input type="checkbox" defaultChecked />
          Remember me
        </label>
        <Link className="auth-link" href={routes.login}>
          Forgot password?
        </Link>
      </div>

      <button className="primary-action" type="submit" disabled={isSubmitting}>
        <AppIcon name="login" />
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <p className="form-help">
        Do not have an account?{" "}
        <Link className="auth-link" href={routes.register}>
          Register
        </Link>
      </p>
    </form>
  );
}
