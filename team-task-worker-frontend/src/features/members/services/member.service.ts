import { mockApi } from "@/lib/mock-api";

export const memberService = {
  list: () => mockApi.members.list(),
};
