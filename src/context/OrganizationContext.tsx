"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Organization {
  label: string;
  icon: string;
  org_key: string;
}

interface OrgContextType {
  selectedOrg: Organization | null;
  setSelectedOrg: (org: Organization) => void;
}

const OrganizationContext = createContext<OrgContextType | undefined>(undefined);

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

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
