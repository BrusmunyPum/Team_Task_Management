"use client";

import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { files } from "@/lib/mock-data";

export default function FilesPage() {
  const [query, setQuery] = useState("");
  const [ownerFilter, setOwnerFilter] = useState<string>("All");

  const normalizedQuery = query.trim().toLowerCase();

  const owners = useMemo(
    () => [...new Set(files.map(([, , owner]) => owner))],
    [],
  );

  const filteredFiles = useMemo(
    () =>
      files.filter(([name, file, owner]) => {
        const matchesSearch =
          !normalizedQuery ||
          `${name} ${file} ${owner}`.toLowerCase().includes(normalizedQuery);
        const matchesOwner =
          ownerFilter === "All" || owner === ownerFilter;
        return matchesSearch && matchesOwner;
      }),
    [normalizedQuery, ownerFilter],
  );

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Assets</p>
          <h2>File asset library</h2>
        </div>
      </div>

      <div className="toolbar">
        <label className="search">
          <AppIcon name="search" />
          <input
            type="search"
            placeholder="Search files"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="select-control">
          Owner
          <select
            value={ownerFilter}
            onChange={(event) => setOwnerFilter(event.target.value)}
          >
            <option value="All">All owners</option>
            {owners.map((owner) => (
              <option key={owner}>{owner}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="table-wrap">
        <table className="member-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>File</th>
              <th>Owner</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map(([name, file, owner, updated]) => (
              <tr key={file}>
                <td>
                  <span className="person-cell">
                    <span className="nav-icon">
                      <AppIcon name="folder" />
                    </span>
                    {name}
                  </span>
                </td>
                <td>{file}</td>
                <td>{owner}</td>
                <td>{updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="empty-state" hidden={filteredFiles.length > 0}>
        <AppIcon name="searchOff" />
        No files match that search.
      </p>
    </section>
  );
}
