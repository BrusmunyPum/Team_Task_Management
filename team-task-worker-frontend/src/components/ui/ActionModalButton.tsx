"use client";

import { useState } from "react";
import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";

export type ActionKind =
  | "task"
  | "project"
  | "member"
  | "event"
  | "milestone"
  | "file"
  | "automation"
  | "client"
  | "comment";

type Field = {
  label: string;
  type?: "text" | "email" | "date" | "textarea" | "select";
  defaultValue?: string;
  options?: string[];
};

type ActionConfig = {
  label: string;
  title: string;
  eyebrow: string;
  icon: AppIconName;
  submitLabel: string;
  fields: Field[];
};

const configs: Record<ActionKind, ActionConfig> = {
  task: {
    label: "New Task",
    title: "Create task",
    eyebrow: "Task form",
    icon: "addTask",
    submitLabel: "Save task",
    fields: [
      { label: "Title", defaultValue: "Write API error response contract" },
      { label: "Description", type: "textarea", defaultValue: "Define shared error shapes before frontend integration." },
      { label: "Status", type: "select", defaultValue: "To do", options: ["To do", "In progress", "Review", "Done"] },
      { label: "Priority", type: "select", defaultValue: "Medium", options: ["Low", "Medium", "High", "Urgent"] },
      { label: "Due date", type: "date", defaultValue: "2026-05-06" },
    ],
  },
  project: {
    label: "Create Project",
    title: "Create project",
    eyebrow: "Project form",
    icon: "addBox",
    submitLabel: "Save project",
    fields: [
      { label: "Project name", defaultValue: "Frontend Integration" },
      { label: "Description", type: "textarea", defaultValue: "Connect V1 screens to the Next.js frontend and API modules." },
      { label: "Status", type: "select", defaultValue: "Active", options: ["Planning", "Active", "Review", "Archived"] },
      { label: "Due date", type: "date", defaultValue: "2026-05-14" },
    ],
  },
  member: {
    label: "Add Member",
    title: "Invite member",
    eyebrow: "Team access",
    icon: "groupAdd",
    submitLabel: "Send invite",
    fields: [
      { label: "Email", type: "email", defaultValue: "teammate@teamtask.test" },
      { label: "Role", type: "select", defaultValue: "Member", options: ["Admin", "Member"] },
    ],
  },
  event: {
    label: "Add Event",
    title: "Add calendar event",
    eyebrow: "Schedule",
    icon: "calendar",
    submitLabel: "Save event",
    fields: [
      { label: "Event title", defaultValue: "Frontend integration demo" },
      { label: "Type", type: "select", defaultValue: "Demo", options: ["Deadline", "Milestone", "Review", "Demo"] },
      { label: "Date", type: "date", defaultValue: "2026-05-14" },
    ],
  },
  milestone: {
    label: "Add Milestone",
    title: "Add timeline milestone",
    eyebrow: "Roadmap",
    icon: "calendar",
    submitLabel: "Save milestone",
    fields: [
      { label: "Milestone", defaultValue: "Frontend integration demo" },
      { label: "Status", type: "select", defaultValue: "Active", options: ["Planning", "Active", "Review", "Done"] },
      { label: "Date", type: "date", defaultValue: "2026-05-14" },
    ],
  },
  file: {
    label: "Upload File",
    title: "Upload file",
    eyebrow: "Assets",
    icon: "folder",
    submitLabel: "Add file",
    fields: [
      { label: "Display name", defaultValue: "API response contract" },
      { label: "File name", defaultValue: "api-errors.md" },
      { label: "Owner", defaultValue: "Maya Chen" },
    ],
  },
  automation: {
    label: "New Rule",
    title: "Create automation rule",
    eyebrow: "Automation",
    icon: "rocket",
    submitLabel: "Save rule",
    fields: [
      { label: "Rule name", defaultValue: "High priority due today" },
      { label: "Action", type: "textarea", defaultValue: "Send owner reminder and mark risk." },
      { label: "Status", type: "select", defaultValue: "Active", options: ["Active", "Draft", "Paused"] },
    ],
  },
  client: {
    label: "New Review",
    title: "Create client review",
    eyebrow: "Clients",
    icon: "workspace",
    submitLabel: "Save review",
    fields: [
      { label: "Review title", defaultValue: "Frontend dashboard preview" },
      { label: "Status", type: "select", defaultValue: "Waiting for client", options: ["Internal review", "Waiting for client", "Approved"] },
      { label: "Due date", type: "date", defaultValue: "2026-05-12" },
    ],
  },
  comment: {
    label: "Add Comment",
    title: "Add comment",
    eyebrow: "Activity",
    icon: "playlistAdd",
    submitLabel: "Post comment",
    fields: [
      { label: "Comment", type: "textarea", defaultValue: "This looks ready for the next implementation step." },
    ],
  },
};

type ActionModalButtonProps = {
  action: ActionKind;
  variant?: "primary" | "secondary";
  label?: string;
};

export function ActionModalButton({
  action,
  variant = "primary",
  label,
}: ActionModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = configs[action];

  return (
    <>
      <button className={`${variant}-action`} type="button" onClick={() => setIsOpen(true)}>
        <AppIcon name={config.icon} />
        {label ?? config.label}
      </button>

      <div className="modal-backdrop" hidden={!isOpen} onClick={() => setIsOpen(false)}>
        <section
          className="task-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${action}-modal-title`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">{config.eyebrow}</p>
              <h2 id={`${action}-modal-title`}>{config.title}</h2>
            </div>
            <button className="icon-button" type="button" aria-label="Close" onClick={() => setIsOpen(false)}>
              <AppIcon name="close" />
            </button>
          </div>

          <form className="task-form">
            {config.fields.map((field) => (
              <label key={field.label}>
                {field.label}
                {field.type === "textarea" ? (
                  <textarea defaultValue={field.defaultValue} />
                ) : field.type === "select" ? (
                  <select defaultValue={field.defaultValue}>
                    {field.options?.map((option) => <option key={option}>{option}</option>)}
                  </select>
                ) : (
                  <input type={field.type ?? "text"} defaultValue={field.defaultValue} />
                )}
              </label>
            ))}

            <div className="modal-actions">
              <button className="secondary-action" type="button" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button className="primary-action" type="button" onClick={() => setIsOpen(false)}>
                <AppIcon name="save" />
                {config.submitLabel}
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
