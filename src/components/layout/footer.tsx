import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  tentang: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Karir", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Hubungi Kami", href: "/contact" },
  ],
  bantuan: [
    { label: "Pusat Bantuan", href: "/help" },
    { label: "Cara Belanja", href: "/how-to-buy" },
    { label: "Pengiriman", href: "/shipping" },
    { label: "Pengembalian", href: "/returns" },
    { label: "FAQ", href: "/faq" },
  ],
  kebijakan: [
    { label: "Syarat & Ketentuan", href: "/terms" },
    { label: "Kebijakan Privasi", href: "/privacy" },
    { label: "Kebijakan Cookie", href: "/cookies" },
  ],
  seller: [
    { label: "Mulai Berjualan", href: "/seller/register" },
    { label: "Seller Center", href: "/seller/dashboard" },
    { label: "Panduan Seller", href: "/seller/guide" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
];

const paymentMethods = ["BCA", "Mandiri", "BNI", "BRI", "Visa", "Mastercard", "GoPay", "OVO", "DANA"];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <Container>
          <div className="py-12 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">
                Berlangganan Newsletter
              </h3>
              <p className="text-slate-400">
                Dapatkan info promo dan produk terbaru langsung ke email kamu
              </p>
            </div>
            <form className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                placeholder="Masukkan email kamu"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
              <Button type="submit" className="whitespace-nowrap">
                Berlangganan
              </Button>
            </form>
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <Container>
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Logo size="md" className="mb-4" />
            <p className="text-slate-400 mb-6 max-w-xs">
              ShopVerse adalah marketplace terpercaya untuk menemukan produk
              berkualitas dengan harga terbaik.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@shopverse.id</span>
              </div>
            </div>
          </div>

          {/* Tentang */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Tentang</h4>
            <ul className="space-y-2">
              {footerLinks.tentang.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Bantuan</h4>
            <ul className="space-y-2">
              {footerLinks.bantuan.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kebijakan & Seller */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Kebijakan</h4>
            <ul className="space-y-2">
              {footerLinks.kebijakan.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-heading font-semibold text-white mb-4 mt-6">Seller</h4>
            <ul className="space-y-2">
              {footerLinks.seller.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment & Social */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Payment Methods */}
            <div>
              <p className="text-sm text-slate-400 mb-3">Metode Pembayaran</p>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <div key={method} className="px-3 py-1.5 bg-slate-800 rounded text-xs font-medium text-slate-300">
                    {method}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-slate-400 mb-3">Ikuti Kami</p>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-800 rounded-lg hover:bg-primary hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} ShopVerse. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}