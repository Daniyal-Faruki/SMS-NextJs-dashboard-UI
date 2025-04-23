// src/components/OrganizationSelector.tsx
"use client";
import Zin from "../../assets/icons/trash.svg"
import {
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useOrganization } from "@/context/OrganizationContext";
import { organizations } from "@/models/organization.model";
import Image from "next/image";

const OrganizationSelector = () => {
  const { selectedOrg, setSelectedOrg } = useOrganization();

  const handleChange = (event: any) => {
    const org = organizations.find((o) => o.org_key === event.target.value);
    if (org) setSelectedOrg(org);
  };

  return (
    <div className="mb-4 px-2">
      <label className="text-sm font-medium text-gray-700 block">
        ORGANIZATION
      </label>

      <Select
        value={selectedOrg?.org_key || ""}
        onChange={handleChange}
        displayEmpty
        fullWidth
        size="small"
        renderValue={() =>
          selectedOrg ? (
            <div className="flex items-center gap-2">
              {/* <img
                src={selectedOrg.icon}
                alt={`${selectedOrg.label} Logo`}
                width={30}
                height={30}
                className="mr-2"
              /> */}
              <Zin className="w-5" />
              {/* <Image
                src={Zin}
                alt={`${selectedOrg.label} Logo`}
                width={30}
                height={30}
              /> */}
              <div className="flex flex-col font-sora">
                <span className="text-base font-medium">
                  {selectedOrg.label}
                </span>
                <span className="text-sm text-gray-500">
                  {selectedOrg.website}
                </span>
              </div>
            </div>
          ) : (
            <span className="text-gray-400">Select an organization</span>
          )
        }
        sx={{
          backgroundColor: "transparent",
          mt: 1.5,
          "& .MuiInputBase-input": {
            py: 1.5,
            px: 2,
          },
          "& .MuiSelect-icon": {
            right: 8,
          },
        }}
      >
        {organizations.map((org) => (
          <MenuItem key={org.org_key} value={org.org_key}>
            <ListItemIcon>
              <img
                src={selectedOrg?.icon}
                alt={`${org.label} Logo`}
                width={20}
                height={20}
              />
            </ListItemIcon>
            <ListItemText
              primary={org.label}
              classes={{ primary: "text-sm font-sora font-medium" }}
            />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default OrganizationSelector;
