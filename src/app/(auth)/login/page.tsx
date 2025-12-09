"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { loginSchema, LoginInput } from "@/lib/validations";
import { useAuthStore } from "@/stores/auth-store";
import { mockUsers } from "@/data/mock-users";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const user = mockUsers.find((u) => u.email === data.email);
    if (user && data.password === "password123") {
      login(user, "mock-jwt-token");
      toast.success("Login berhasil!");
      router.push("/");
    } else {
      toast.error("Email atau password salah");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-heading font-bold">Masuk ke Akun</h1>
        <p className="text-muted-foreground">Masukkan email dan password untuk melanjutkan</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nama@email.com" leftIcon={<Mail className="h-4 w-4" />} error={!!errors.email} {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">Lupa password?</Link>
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-foreground transition-colors">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            error={!!errors.password}
            {...register("password")}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm font-normal">Ingat saya</Label>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Masuk
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><Separator className="w-full" /></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Atau masuk dengan</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button">Google</Button>
        <Button variant="outline" type="button">Facebook</Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Belum punya akun? <Link href="/register" className="text-primary font-medium hover:underline">Daftar sekarang</Link>
      </p>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm">
        <p className="font-medium mb-2">Demo Accounts:</p>
        <p className="text-muted-foreground">Customer: customer@example.com</p>
        <p className="text-muted-foreground">Seller: seller@example.com</p>
        <p className="text-muted-foreground">Admin: admin@example.com</p>
        <p className="text-muted-foreground mt-1">Password: password123</p>
      </div>
    </div>
  );
}