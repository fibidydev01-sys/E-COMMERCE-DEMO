"use client";

import * as React from "react";
import { Mail, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Terima kasih! Kamu akan menerima info promo terbaru.");
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="bg-primary rounded-2xl p-8 md:p-12 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
          <Mail className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">Dapatkan Promo Eksklusif</h2>
        <p className="text-white/80 mb-6">Berlangganan newsletter kami untuk info diskon dan produk terbaru</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Masukkan email kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white"
            required
          />
          <Button type="submit" variant="secondary" className="bg-white text-primary hover:bg-white/90" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-4 w-4 mr-2" />Subscribe</>}
          </Button>
        </form>
      </div>
    </section>
  );
}