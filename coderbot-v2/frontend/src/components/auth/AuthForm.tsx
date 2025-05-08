// src/components/auth/AuthForm.tsx
import React, { useState, useEffect } from 'react';
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
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);

  // Login form
  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { 
      email: '', 
      password: '' 
    },
  });

  // Register form
  const registerForm = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { 
      email: '', 
      password: '', 
      passwordConfirm: '', 
      name: '',
      role: 'student'
    },
  });

  // Use the correct form based on active tab
  const form = activeTab === "login" ? loginForm : registerForm;

  // Reset the error when changing tabs
  useEffect(() => {
    setError(null);
  }, [activeTab]);

  const onSubmit: SubmitHandler<LoginData | RegisterData> = async (data) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (activeTab === "register") {
        // Type assertion to access RegisterData properties
        const registerData = data as RegisterData;
        
        // Cadastro no PocketBase
        await pb.collection('users').create({
          email: registerData.email,
          password: registerData.password,
          passwordConfirm: registerData.passwordConfirm,
          nome: registerData.name,
          role: role,
        });
        
        toast.success('Conta criada com sucesso! Verifique seu e‑mail para confirmação.');
        registerForm.reset();
        setActiveTab("login");
      } else {
        // Login no PocketBase (LoginData has email and password)
        const loginData = data as LoginData;
        await pb.collection('users').authWithPassword(loginData.email, loginData.password);
        toast.success('Login realizado com sucesso!');
        navigate('/chat');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message || 'Erro na autenticação');
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
            {activeTab === "login" ? "Login" : "Criar Conta"}
          </CardTitle>
          <CardDescription>
            {activeTab === "login" 
              ? "Entre para continuar seus estudos."
              : "Cadastre‑se para explorar a plataforma."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Registro</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-4">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={loginForm.control}
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
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mt-4">
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
                  
                  <Button type="submit" className="w-full gap-2 mt-6" disabled={isLoading}>
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Entrar
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="register" className="mt-4">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={registerForm.control}
                    name="name"
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
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mt-4">
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
                    control={registerForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Tipo de conta</FormLabel>
                        <Select 
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setRole(value as 'student' | 'teacher' | 'admin');
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um tipo de conta" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Aluno</SelectItem>
                            <SelectItem value="teacher">Professor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mt-4">
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
                  
                  <FormField
                    control={registerForm.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem className="mt-4">
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
                  
                  <Button type="submit" className="w-full gap-2 mt-6" disabled={isLoading}>
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Criar conta
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button type="button" variant="link" className="text-sm" onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}>
            {activeTab === "register" ? 'Já possui conta? Faça login' : 'Não possui conta? Cadastre‑se'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
