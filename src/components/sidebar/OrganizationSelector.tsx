// src/components/OrganizationSelector.tsx
"use client";
import Zin from "../../assets/icons/trash.svg";
import { Select, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useOrganization } from "@/context/OrganizationContext";
import { organizations } from "@/models/organization.model";
import Image from "next/image";

import ZinLogo from "../../assets/icons/zin-logo.png";
import GraniteLogo from "../../assets/icons/granite.jpg";
import PurpleAirLogo from "../../assets/icons/purpleAir.webp";

const OrganizationSelector = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { selectedOrg, setSelectedOrg } = useOrganization();

  const handleChange = (event: any) => {
    const org = organizations.find((o) => o.org_key === event.target.value);
    if (org) setSelectedOrg(org);
  };

  return (
    <div className="mb-4 px-2">
      {!isCollapsed && (
        <label className="text-sm font-medium text-gray-700 block">
          ORGANIZATION
        </label>
      )}

      <Select
        value={selectedOrg?.org_key || ""}
        onChange={handleChange}
        displayEmpty
        fullWidth
        size="small"
        MenuProps={{
          // getContentAnchorEl: null, // Required for anchorOrigin to take effect
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          PaperProps: {
            style: {
              marginLeft: "-8px", // effectively shifts it left
            },
          },
        }}
        IconComponent={isCollapsed ? () => null : undefined} // 🔥 Hide dropdown arrow when collapsed
        renderValue={() =>
          selectedOrg ? (
            <div className="flex items-center gap-2">
              {selectedOrg.org_key === "ZIN" && (
                <Image src={ZinLogo} alt="Zin" width={30} />
              )}
              {selectedOrg.org_key === "GRANITE" && (
                <Image src={GraniteLogo} alt="Granite" width={30} />
              )}
              {selectedOrg.org_key === "PURPLEAIR" && (
                <Image src={PurpleAirLogo} alt="PurpleAir" width={30} />
              )}
              {!isCollapsed && (
                <div className="flex flex-col font-sora">
                  <span className="text-base font-medium">
                    {selectedOrg.label}
                  </span>
                  <span className="text-sm text-gray-500">
                    {selectedOrg.website}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <span className="text-gray-400">Select an organization</span>
          )
        }
        sx={{
          backgroundColor: "transparent",
          mt: 1.5,
          "& .css-si86to-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-si86to-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-si86to-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
            //display: !isCollapsed ? "none" : "block", // Optional redundant hiding
            pr: 0
          },
          // "& .MuiInputBase-input": {
          //   py: 0.5,
          //   px: 0.5,
          // },
          // "& .MuiSelect-icon": {
          //   right: 8,
          // },
        }}
      >
        {organizations.map((org) => (
          <MenuItem key={org.org_key} value={org.org_key}>
            <ListItemIcon>
              {org.org_key === "ZIN" && (
                <Image src={ZinLogo} alt="Granite" width={35} />
              )}
              {org.org_key === "GRANITE" && (
                <Image src={GraniteLogo} alt="Granite" width={35} />
              )}
              {org.org_key === "PURPLEAIR" && (
                <Image src={PurpleAirLogo} alt="PurpleAir" width={35} />
              )}
            </ListItemIcon>
            {!isCollapsed && (
              <ListItemText
                primary={org.label}
                classes={{ primary: "text-sm font-sora font-medium" }}
                className="py-3 ml-3"
              />
            )}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default OrganizationSelector;
