import { useMutation } from "@tanstack/react-query";
import { authService } from "@/src/services/auth/auth-service";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      authService.login(payload),
  });
}
