export function TaskForm() {
  return (
    <form className="task-form">
      <label>Title<input defaultValue="Write API error response contract" /></label>
      <label>Description<textarea defaultValue="Define shared error shapes before frontend integration." /></label>
      <div className="form-grid"><label>Status<select defaultValue="To do"><option>To do</option><option>In progress</option><option>Review</option><option>Done</option></select></label><label>Priority<select defaultValue="Medium"><option>Low</option><option>Medium</option><option>High</option></select></label></div>
    </form>
  );
}
