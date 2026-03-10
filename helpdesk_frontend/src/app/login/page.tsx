"use client";

import { LoginFormData, loginSchema } from "@/src/validation/auth/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLogin } from "@/src/hooks/queries/auth/useLogin";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const {
    formState: { errors },
    ...form
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormData) {
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: () => router.push("/"),
        onError: () => {
          form.setError("root", {
            message: "Email ou senha inválidos. Tente novamente.",
          });
        },
      },
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>Login</h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        action=""
        className="flex flex-col gap-10 border-2 border-amber-50 p-10 rounded-sm"
      >
        <label htmlFor="email">
          <p>Email</p>
          <input
            type="email"
            className="p-1 border-2 border-amber-50 rounded-sm"
            {...form.register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        <label htmlFor="password">
          <p>Senha</p>
          <input
            type="password"
            className="p-1 border-2 border-amber-50 rounded-sm"
            {...form.register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer p-1 border-2 border-amber-50 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
