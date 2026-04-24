"use client";

import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { teamMembers, tasks } from "@/lib/mock-data";

type SortKey = "name" | "workload";

export default function WorkloadPage() {
  const [sortBy, setSortBy] = useState<SortKey>("workload");

  const overloaded = teamMembers.filter(
    (member) => member.workload >= 75,
  ).length;
  const averageLoad = Math.round(
    teamMembers.reduce((sum, member) => sum + member.workload, 0) /
      teamMembers.length,
  );

  const sortedMembers = useMemo(() => {
    const members = [...teamMembers];
    if (sortBy === "workload") {
      members.sort((a, b) => b.workload - a.workload);
    } else {
      members.sort((a, b) => a.name.localeCompare(b.name));
    }
    return members;
  }, [sortBy]);

  return (
    <div className="page-stack">
      <section className="metric-grid">
        <article className="metric-card">
          <span className="metric-icon">
            <AppIcon name="groups" />
          </span>
          <div>
            <strong>{teamMembers.length}</strong>
            <small>Total members</small>
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-icon">
            <AppIcon name="dashboard" />
          </span>
          <div>
            <strong>{averageLoad}%</strong>
            <small>Average load</small>
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-icon">
            <AppIcon name="calendar" />
          </span>
          <div>
            <strong>{overloaded}</strong>
            <small>High load (&ge;75%)</small>
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-icon">
            <AppIcon name="tasks" />
          </span>
          <div>
            <strong>{tasks.length}</strong>
            <small>Total tasks</small>
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Capacity</p>
            <h2>Team workload management</h2>
          </div>
          <label className="select-control">
            Sort
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortKey)
              }
            >
              <option value="workload">By load</option>
              <option value="name">By name</option>
            </select>
          </label>
        </div>

        <div className="workload-list">
          {sortedMembers.map((member) => {
            const ownedTasks = tasks.filter(
              (task) => task.assigneeId === member.id,
            );
            const level =
              member.workload >= 75
                ? "capacity-high"
                : member.workload >= 50
                  ? "capacity-medium"
                  : "capacity-low";
            return (
              <label key={member.id} className={level}>
                <span>{member.name}</span>
                <progress value={member.workload} max="100" />
                <strong>{member.workload}%</strong>
                <small className="form-help">
                  {ownedTasks.length} active tasks
                </small>
              </label>
            );
          })}
        </div>
      </section>
    </div>
  );
}
