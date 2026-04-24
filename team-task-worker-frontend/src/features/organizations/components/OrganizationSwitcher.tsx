import { mockOrganizations } from "@/features/organizations/mock/organizations.mock";

export function OrganizationSwitcher() {
  return (
    <label className="select-control">
      Workspace
      <select defaultValue={mockOrganizations[0].id}>
        {mockOrganizations.map((organization) => <option key={organization.id} value={organization.id}>{organization.name}</option>)}
      </select>
    </label>
  );
}
