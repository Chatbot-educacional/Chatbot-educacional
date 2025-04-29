// src/components/auth/AuthForm.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pb } from '@/integrations/pocketbase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { motion } from 'framer-motion';
import { AtSign, Lock, User2, Eye, EyeOff, Loader2 } from 'lucide-react';
import TrueFocus from './TrueFocus';
import logo from '/public/coderbot2.png';
import { loginSchema, registerSchema } from './schemas';
import type { z } from 'zod';

// Typing form data properly
type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

interface AuthFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function AuthForm({ isLoading, setIsLoading }: AuthFormProps) {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  // Use the correct type based on form mode
  const form = useForm<LoginData | RegisterData>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
    defaultValues: isRegister
      ? { email: '', password: '', passwordConfirm: '', fullName: '' }
      : { email: '', password: '' },
  });

  const [showPwd, setShowPwd] = useState(false);

  const onSubmit: SubmitHandler<LoginData | RegisterData> = async (data) => {
    setIsLoading(true);
    try {
      if (isRegister) {
        // Type assertion to access RegisterData properties
        const registerData = data as RegisterData;
        
        // Cadastro no PocketBase
        await pb.collection('users').create({
          email: registerData.email,
          password: registerData.password,
          passwordConfirm: registerData.passwordConfirm,
          nome: registerData.fullName,
        });
        toast.success('Conta criada com sucesso! Verifique seu e‑mail para confirmação.');
        form.reset();
        setIsRegister(false);
      } else {
        // Login no PocketBase (LoginData has email and password)
        await pb.collection('users').authWithPassword(data.email, data.password);
        toast.success('Login realizado com sucesso!');
        navigate('/chat');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      toast.error(err.message || 'Erro na autenticação');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 12 }}
    >
      <Card className="w-full max-w-md border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
        <CardHeader className="space-y-0 -pb-32">
          <div className="flex justify-center">
            <motion.img
              src={logo}
              alt="CoderBot Logo"
              className="h-40 w-40 mb-4 select-none"
              initial={{ opacity: 0, scale: 0.8, y: -6 }}
              animate={{ opacity: 1, scale: [1, 1.05, 1], y: [-6, 6, -6] }}
              transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
              draggable={false}
            />
          </div>
          <TrueFocus
            sentence="Learning… CoderBot"
            blurAmount={5}
            borderColor="emerald-400"
            animationDuration={2.5}
            pauseBetweenAnimations={1}
          />
          <CardTitle className="text-xl font-semibold">
            {isRegister ? 'Criar Conta' : 'Fazer Login'}
          </CardTitle>
          <CardDescription>
            {isRegister
              ? 'Cadastre‑se para explorar a plataforma.'
              : 'Entre para continuar seus estudos.'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {isRegister && (
                <>
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-70" />
                            <Input className="pl-9" placeholder="Seu nome" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-70" />
                            <Input type="password" className="pl-9" placeholder="Confirme sua senha" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-70" />
                        <Input type="email" className="pl-9" placeholder="you@email.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-70" />
                        <Input
                          type={showPwd ? 'text' : 'password'}
                          className="pl-9 pr-10"
                          placeholder="********"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPwd(!showPwd)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          aria-label={showPwd ? 'Ocultar senha' : 'Mostrar senha'}
                        >
                          {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isRegister ? 'Criar conta' : 'Entrar'}
              </Button>

              <Button type="button" variant="link" className="w-full text-sm" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Já possui conta? Faça login' : 'Não possui conta? Cadastre‑se'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
