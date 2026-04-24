"use client";

import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { timelineMilestones } from "@/lib/mock-data";

const milestoneStatuses = [
  "All",
  "Planning",
  "Active",
  "In progress",
  "Review",
  "Done",
] as const;

export default function TimelinePage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredMilestones = useMemo(
    () =>
      timelineMilestones.filter(([date, title, status]) => {
        const matchesSearch =
          !normalizedQuery ||
          `${title} ${date}`.toLowerCase().includes(normalizedQuery);
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
          <p className="eyebrow">Roadmap</p>
          <h2>Project timeline Gantt</h2>
        </div>
      </div>

      <div className="toolbar">
        <label className="search">
          <AppIcon name="search" />
          <input
            type="search"
            placeholder="Search milestones"
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
            {milestoneStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="timeline-list">
        {filteredMilestones.map(([date, title, status, progress]) => (
          <article className="timeline-item" key={title}>
            <span className="timeline-date">{date}</span>
            <div>
              <strong>{title}</strong>
              <small className="form-help">{progress}% complete</small>
              <progress value={progress} max="100" />
            </div>
            <span
              className={`pill ${status === "Done" ? "done" : status === "Planning" ? "calm" : "progress"}`}
            >
              {status}
            </span>
          </article>
        ))}
      </div>

      <p className="empty-state" hidden={filteredMilestones.length > 0}>
        <AppIcon name="searchOff" />
        No milestones match that filter.
      </p>
    </section>
  );
}
