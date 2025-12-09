"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profileSchema, ProfileInput } from "@/lib/validations";
import { useAuthStore } from "@/stores/auth-store";
import { getInitials } from "@/lib/utils";

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || "", phone: user?.phone || "" },
  });

  const onSubmit = async (data: ProfileInput) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    updateUser(data);
    toast.success("Profil berhasil diperbarui");
    setIsLoading(false);
  };

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-heading font-bold mb-6">Profil Saya</h1>

      <div className="bg-card rounded-xl border p-6 max-w-2xl">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.avatar || undefined} />
              <AvatarFallback className="text-2xl">{getInitials(user?.name || "User")}</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary/90">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-lg">{user?.name}</p>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nama Lengkap</Label>
              <Input {...register("name")} error={!!errors.name} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email} disabled className="bg-muted" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Nomor Telepon</Label>
            <Input {...register("phone")} placeholder="08xxxxxxxxxx" />
          </div>
          <Button type="submit" isLoading={isLoading}>Simpan Perubahan</Button>
        </form>
      </div>
    </div>
  );
}