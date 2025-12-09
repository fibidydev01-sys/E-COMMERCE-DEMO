import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AccountSidebar } from "@/components/layout/account-sidebar";
import { Container } from "@/components/ui/container";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 pb-24 lg:pb-8">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            <AccountSidebar />
            <div className="flex-1">{children}</div>
          </div>
        </Container>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}