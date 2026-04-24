import { ActionModalButton } from "@/components/ui/ActionModalButton";
import { AppIcon } from "@/components/ui/AppIcon";
import { files } from "@/lib/mock-data";

export default function FilesPage() {
  return (
    <section className="panel">
      <div className="section-heading">
        <div><p className="eyebrow">Assets</p><h2>File asset library</h2></div>
        <ActionModalButton action="file" />
      </div>
      <div className="table-wrap">
        <table className="member-table">
          <thead><tr><th>Name</th><th>File</th><th>Owner</th><th>Updated</th></tr></thead>
          <tbody>{files.map(([name, file, owner, updated]) => <tr key={file}><td><span className="person-cell"><span className="nav-icon"><AppIcon name="folder" /></span>{name}</span></td><td>{file}</td><td>{owner}</td><td>{updated}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
