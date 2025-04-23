// src/data/organizations.ts
export interface Organization {
    org_key: string;
    label: string;
    icon: string;
    website: string;
  }
  
  export const organizations: Organization[] = [
    {
      org_key: 'ZIN',
      label: 'ZinTech',
      icon: '../assets/icons/together.svg',
      website: 'www.zintechnologies.com',
    },
    {
      org_key: 'GRANITE',
      label: 'Granite',
      icon: '../assets/icons/granite.jpg',
      website: 'www.granite.com',
    },
    {
      org_key: 'PURPLEAIR',
      label: 'PurpleAir',
      icon: '../assets/icons/purpleAir.webp',
      website: 'www.purpleAir.com',
    },
  ];
  