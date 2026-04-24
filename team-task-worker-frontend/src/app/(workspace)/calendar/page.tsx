"use client";

import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { calendarEvents, teamMembers } from "@/lib/mock-data";

const eventTypes = ["All", "Deadline", "Milestone", "Review", "Demo"] as const;

export default function CalendarPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredEvents = useMemo(
    () =>
      calendarEvents.filter((event) => {
        const matchesSearch =
          !normalizedQuery ||
          `${event.title} ${event.type} ${event.date}`
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesType =
          typeFilter === "All" || event.type === typeFilter;
        return matchesSearch && matchesType;
      }),
    [normalizedQuery, typeFilter],
  );

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Schedule</p>
            <h2>Team schedule calendar</h2>
          </div>
        </div>

        <div className="toolbar">
          <label className="search">
            <AppIcon name="search" />
            <input
              type="search"
              placeholder="Search events"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label className="select-control">
            Type
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
            >
              {eventTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="timeline-list">
          {filteredEvents.map((event) => {
            const owner = teamMembers.find(
              (member) => member.id === event.ownerId,
            );
            return (
              <article className="timeline-item" key={event.title}>
                <span className="timeline-date">{event.date}</span>
                <div>
                  <strong>{event.title}</strong>
                  <small className="form-help">
                    {event.type} owned by {owner?.name}
                  </small>
                </div>
                <span className="pill neutral">{event.type}</span>
              </article>
            );
          })}
        </div>

        <p className="empty-state" hidden={filteredEvents.length > 0}>
          <AppIcon name="searchOff" />
          No events match that filter.
        </p>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Team</p>
            <h2>Event owners</h2>
          </div>
        </div>
        <section className="insight-grid two">
          {teamMembers.map((member) => (
            <article className="project-card" key={member.id}>
              <span className={`avatar ${member.tone}`}>
                {member.initials}
              </span>
              <h3>{member.name}</h3>
              <p>{member.focus}</p>
            </article>
          ))}
        </section>
      </section>
    </div>
  );
}
