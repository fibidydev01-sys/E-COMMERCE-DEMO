import { Logo } from "@/components/shared/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-700 p-12 flex-col justify-between">
        <Logo size="lg" className="text-white" />
        <div className="text-white">
          <h1 className="text-4xl font-heading font-bold mb-4">Selamat Datang di ShopVerse</h1>
          <p className="text-lg text-white/80">
            Temukan jutaan produk berkualitas dengan harga terbaik. Belanja mudah, aman, dan nyaman.
          </p>
        </div>
        <p className="text-sm text-white/60">© {new Date().getFullYear()} ShopVerse. All rights reserved.</p>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo size="lg" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}