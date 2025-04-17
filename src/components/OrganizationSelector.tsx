"use client";
import Image from "next/image";
import { useOrganization } from "@/context/OrganizationContext";

interface Organization {
	org_key: string;
	label: string;
	icon: string;
	website: string;
}

const organizationss = [
  {
    label: "Zin Institute",
    icon: "/icons/org1.png",
    org_key: "zin_institute",
  },
  {
    label: "Alpha School",
    icon: "/icons/org2.png",
    org_key: "alpha_school",
  },
  {
    label: "Bright Future Academy",
    icon: "/icons/org3.png",
    org_key: "bright_future_academy",
  },
];

const organizations: Organization[] = [
	{
		org_key: 'ZIN',
		label: 'ZinTech',
		icon: 'assets/icons/together.svg',
		website: 'www.zintechnologies.com'
	},
	{
		org_key: 'GRANITE',
		label: 'Granite',
		icon: 'assets/icons/granite.jpg',
		website: 'www.granite.com'
	},
	{
		org_key: 'PURPLEAIR',
		label: 'PurpleAir',
		icon: 'assets/icons/purpleAir.webp',
		website: 'www.purpleAir.com'
	}
];

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
