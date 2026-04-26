"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { EmptyState } from "@/components/ui/EmptyState";
import { projects, teamMembers } from "@/lib/mock-data";

const statusOptions = ["All", "Planning", "Active", "Review", "Archived"] as const;

function statusTone(status: string) {
  if (status === "Planning") {
    return "calm";
  }

  if (status === "Review") {
    return "review";
  }

  if (status === "Archived") {
    return "neutral";
  }

  return "progress";
}

export function ProjectsClient() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const members = project.members
        .map((memberId) => teamMembers.find((member) => member.id === memberId)?.name ?? "")
        .join(" ");
      const searchable = `${project.title} ${project.description} ${project.status} ${project.due} ${members}`;
      const matchesQuery = !normalizedQuery || searchable.toLowerCase().includes(normalizedQuery);
      const matchesStatus = status === "All" || project.status === status;

      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <>
      <div className="toolbar">
        <label className="search">
          <AppIcon name="search" />
          <input
            type="search"
            placeholder="Search projects, members, status"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="select-control">
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {statusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <article className="project-card project-card--rich" key={project.id}>
              <div className="project-card__header">
                <span className={`pill ${statusTone(project.status)}`}>{project.status}</span>
                <span className="project-card__due">{project.due}</span>
              </div>
              <h3>
                <Link href={`/projects/${project.id}`}>{project.title}</Link>
              </h3>
              <p>{project.description}</p>
              <div className="project-progress" aria-label={`${project.progress}% complete`}>
                <span style={{ width: `${project.progress}%` }} />
              </div>
              <div className="project-card__stats">
                <span>
                  <strong>{project.tasks}</strong>
                  Tasks
                </span>
                <span>
                  <strong>{project.progress}%</strong>
                  Progress
                </span>
                <span>
                  <strong>{project.members.length}</strong>
                  Members
                </span>
              </div>
              <div className="project-card__footer">
                <div className="avatar-stack">
                  {project.members.map((memberId) => {
                    const member = teamMembers.find((item) => item.id === memberId);

                    return (
                      <span className={`avatar ${member?.tone ?? ""}`} key={memberId}>
                        {member?.initials}
                      </span>
                    );
                  })}
                </div>
                <Link className="auth-link" href={`/projects/${project.id}`}>
                  Open project
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="No projects match your filters">
          Try another keyword or choose a different status.
        </EmptyState>
      )}
    </>
  );
}
