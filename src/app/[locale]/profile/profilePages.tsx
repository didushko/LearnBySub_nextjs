import { ReactNode } from "react";

interface IProfileStructure {
  [key: string]: {
    name: string;
    component: () => ReactNode;
    suspense: () => ReactNode;
  };
}

export const profileStructure: IProfileStructure = {
  statistics: {
    name: "Statistics",
    component: async () =>
      new Promise((resolve) => setTimeout(resolve, 5000)).then(() => (
        <div>Statistics page</div>
      )),
    suspense: () => <div>suspense</div>,
  },
  languages: {
    name: "Languages",
    component: () => <div>Languages page</div>,

    suspense: () => <div>suspense</div>,
  },
  contacts: {
    name: "Contacts",
    component: () => <div>Contacts page</div>,

    suspense: () => <div>suspense</div>,
  },
  links: {
    name: "Links",
    component: () => <div>Links page</div>,

    suspense: () => <div>suspense</div>,
  },
};

export function profileTabs() {
  return Object.entries(profileStructure).map((k, v) => ({
    key: k[0],
    name: k[1].name,
  }));
}

export function getProfilePage(key: string) {
  return profileStructure[key]?.component || null;
}
