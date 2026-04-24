import { AppIcon } from "@/components/ui/AppIcon";

export function TaskFilters() {
  return (
    <div className="toolbar">
      <label className="search"><AppIcon name="search" /><input type="search" placeholder="Search tasks" /></label>
      <label className="select-control">Status<select><option>All</option><option>To do</option><option>In progress</option><option>Review</option><option>Done</option></select></label>
    </div>
  );
}
