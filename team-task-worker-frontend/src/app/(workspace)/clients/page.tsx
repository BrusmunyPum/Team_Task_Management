"use client";

import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { clientReviews } from "@/lib/mock-data";

const reviewStatuses = [
  "All",
  "Internal review",
  "Waiting for client",
  "Approved",
] as const;

export default function ClientsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredReviews = useMemo(
    () =>
      clientReviews.filter(([name, status]) => {
        const matchesSearch =
          !normalizedQuery || name.toLowerCase().includes(normalizedQuery);
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
          <p className="eyebrow">Clients</p>
          <h2>Client review portal</h2>
        </div>
      </div>

      <div className="toolbar">
        <label className="search">
          <AppIcon name="search" />
          <input
            type="search"
            placeholder="Search reviews"
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
            {reviewStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="project-grid">
        {filteredReviews.map(([name, status, due]) => (
          <article className="project-card" key={name}>
            <span
              className={`pill ${status === "Approved" ? "done" : status === "Internal review" ? "progress" : "warning"}`}
            >
              {status}
            </span>
            <h3>{name}</h3>
            <p>
              Review due {due}. Collect comments, approval status, and decision
              history.
            </p>
          </article>
        ))}
      </div>

      <p className="empty-state" hidden={filteredReviews.length > 0}>
        <AppIcon name="searchOff" />
        No reviews match that filter.
      </p>
    </section>
  );
}
