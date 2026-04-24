import { mockOrganizations } from "@/features/organizations/mock/organizations.mock";

export const organizationService = {
  list: async () => mockOrganizations,
  current: async () => mockOrganizations[0],
};
