"use client";
import { Organization, organizations } from "@/models/organization.model";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface OrgContextType {
  selectedOrg: Organization | null;
  setSelectedOrg: (org: Organization) => void;
}


const OrganizationContext = createContext<OrgContextType | undefined>(undefined);

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

    // Set default org on first mount
    useEffect(() => {
        if (!selectedOrg) {
          setSelectedOrg(organizations[0]); // Default to first org
        }
      }, [selectedOrg]);

  return (
    <OrganizationContext.Provider value={{ selectedOrg, setSelectedOrg }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error("useOrganization must be used within an OrganizationProvider");
  }
  return context;
};
