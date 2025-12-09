"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { registerSchema, RegisterInput } from "@/lib/validations";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      agreeTerms: false,
    },
  });

  const agreeTerms = useWatch({ control, name: "agreeTerms" });

  const onSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Registrasi berhasil! Silakan login.");
    router.push("/login");
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-heading font-bold">Buat Akun Baru</h1>
        <p className="text-muted-foreground">
          Daftar untuk mulai berbelanja di ShopVerse
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input
            id="name"
            placeholder="Masukkan nama lengkap"
            leftIcon={<User className="h-4 w-4" />}
            error={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="nama@email.com"
            leftIcon={<Mail className="h-4 w-4" />}
            error={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Nomor Telepon (Opsional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="08xxxxxxxxxx"
            leftIcon={<Phone className="h-4 w-4" />}
            {...register("phone")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Minimal 8 karakter"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            error={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Ulangi password"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            error={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeTerms"
            checked={agreeTerms}
            onCheckedChange={(checked) =>
              setValue("agreeTerms", checked as boolean)
            }
          />
          <Label htmlFor="agreeTerms" className="text-sm font-normal leading-tight">
            Saya menyetujui{" "}
            <a href="/terms" className="text-primary hover:underline">
              Syarat & Ketentuan
            </a>{" "}
            dan{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Kebijakan Privasi
            </a>
          </Label>
        </div>
        {errors.agreeTerms && (
          <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Daftar
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Atau daftar dengan
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button">
          Google
        </Button>
        <Button variant="outline" type="button">
          Facebook
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  );
}