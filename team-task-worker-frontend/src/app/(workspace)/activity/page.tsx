"use client";

import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { activity, teamMembers } from "@/lib/mock-data";

export default function ActivityPage() {
  const [query, setQuery] = useState("");
  const [memberFilter, setMemberFilter] = useState<string>("All");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredActivity = useMemo(
    () =>
      activity.filter((item) => {
        const matchesSearch =
          !normalizedQuery ||
          `${item.title} ${item.description}`
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesMember =
          memberFilter === "All" || item.memberId === memberFilter;
        return matchesSearch && matchesMember;
      }),
    [normalizedQuery, memberFilter],
  );

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Audit log</p>
          <h2>Comments and activity</h2>
        </div>
      </div>

      <div className="toolbar">
        <label className="search">
          <AppIcon name="search" />
          <input
            type="search"
            placeholder="Search activity"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="select-control">
          Member
          <select
            value={memberFilter}
            onChange={(event) => setMemberFilter(event.target.value)}
          >
            <option value="All">All members</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="activity-list">
        {filteredActivity.map((item) => {
          const member = teamMembers.find(
            (person) => person.id === item.memberId,
          );
          return (
            <article key={item.title}>
              <span className={`avatar ${member?.tone ?? ""}`}>
                {member?.initials}
              </span>
              <div>
                <strong>{item.title}</strong>
                <small>
                  {item.description} - {item.time}
                </small>
              </div>
              <AppIcon name="tasks" />
            </article>
          );
        })}
      </div>

      <p className="empty-state" hidden={filteredActivity.length > 0}>
        <AppIcon name="searchOff" />
        No activity matches that filter.
      </p>
    </section>
  );
}
