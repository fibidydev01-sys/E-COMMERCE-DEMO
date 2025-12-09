"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/lib/validations";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmittedEmail(data.email);
    setIsSubmitted(true);
    toast.success("Email reset password telah dikirim!");
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-heading font-bold">Cek Email Kamu</h1>
          <p className="text-muted-foreground">
            Kami telah mengirim link reset password ke <span className="font-medium text-foreground">{submittedEmail}</span>
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Tidak menerima email? <button onClick={() => setIsSubmitted(false)} className="text-primary hover:underline">kirim ulang</button>
          </p>
          <Link href="/login">
            <Button variant="outline" className="w-full"><ArrowLeft className="mr-2 h-4 w-4" />Kembali ke Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />Kembali ke Login
      </Link>

      <div className="space-y-2">
        <h1 className="text-2xl font-heading font-bold">Lupa Password?</h1>
        <p className="text-muted-foreground">Masukkan email yang terdaftar dan kami akan mengirimkan link untuk reset password</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nama@email.com" leftIcon={<Mail className="h-4 w-4" />} error={!!errors.email} {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Kirim Link Reset
        </Button>
      </form>
    </div>
  );
}