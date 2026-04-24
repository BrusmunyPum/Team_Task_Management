export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = LoginInput & {
  name: string;
  confirmPassword: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};
