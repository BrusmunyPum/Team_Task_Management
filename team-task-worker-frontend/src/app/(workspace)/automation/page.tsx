"use client";

import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { automations } from "@/lib/mock-data";

const ruleStatuses = ["All", "Active", "Draft", "Paused"] as const;

export default function AutomationPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredRules = useMemo(
    () =>
      automations.filter(([name, description, status]) => {
        const matchesSearch =
          !normalizedQuery ||
          `${name} ${description}`
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesStatus =
          statusFilter === "All" || status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [normalizedQuery, statusFilter],
  );

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Automation</p>
          <h2>Workflow rules</h2>
        </div>
      </div>

      <div className="toolbar">
        <label className="search">
          <AppIcon name="search" />
          <input
            type="search"
            placeholder="Search rules"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="select-control">
          Status
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            {ruleStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="project-grid">
        {filteredRules.map(([name, description, status]) => (
          <article className="project-card" key={name}>
            <span
              className={`pill ${status === "Active" ? "progress" : status === "Paused" ? "warning" : "neutral"}`}
            >
              {status}
            </span>
            <h3>{name}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <p className="empty-state" hidden={filteredRules.length > 0}>
        <AppIcon name="searchOff" />
        No rules match that filter.
      </p>
    </section>
  );
}
