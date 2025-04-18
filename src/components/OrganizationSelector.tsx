// src/components/OrganizationSelector.tsx
"use client";
import { useOrganization } from "@/context/OrganizationContext";
import { organizations } from "@/models/organization.model";


const OrganizationSelector = () => {
  const { selectedOrg, setSelectedOrg } = useOrganization();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const org = organizations.find((o) => o.org_key === e.target.value);
    if (org) setSelectedOrg(org);
  };

  return (
    <div className="mb-4 px-2">
      <select
        className="w-full text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        onChange={handleChange}
        value={selectedOrg?.org_key || ""}
      >
        {organizations.map((org) => (
          <option key={org.org_key} value={org.org_key}>
            {org.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrganizationSelector;
