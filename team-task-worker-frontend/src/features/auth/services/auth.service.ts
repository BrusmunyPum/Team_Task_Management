import { mockApi } from "@/lib/mock-api";
import type { LoginInput, RegisterInput } from "@/features/auth/types/auth.types";

export const authService = {
  login: (input: LoginInput) => {
    void input;
    return mockApi.auth.login();
  },
  register: (input: RegisterInput) => {
    void input;
    return mockApi.auth.register();
  },
};
