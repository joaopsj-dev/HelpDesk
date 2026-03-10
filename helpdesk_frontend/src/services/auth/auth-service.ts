import { api } from "@/src/lib/api-client";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
};

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<LoginResponse>("/auth/login", payload),
};
