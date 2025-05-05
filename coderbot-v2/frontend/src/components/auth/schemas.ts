// schemas.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Mín. 6 caracteres" }),
});

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "Mín. 6 caracteres" }),
    passwordConfirm: z.string().min(6, { message: "Confirmação obrigatória" }),
    name: z.string().min(2, { message: "Nome completo obrigatório" }),
    role: z.enum(["student", "teacher", "admin"]),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Senhas não coincidem",
    path: ["passwordConfirm"],
  });
