import { AdminStats } from "@/components/admin/admin-stats";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const recentUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "CUSTOMER", createdAt: "2024-01-25" },
  { id: "2", name: "Jane Seller", email: "jane@example.com", role: "SELLER", createdAt: "2024-01-24" },
  { id: "3", name: "Bob Smith", email: "bob@example.com", role: "CUSTOMER", createdAt: "2024-01-23" },
];

const pendingStores = [
  { id: "1", name: "TechStore Pro", owner: "John Doe", products: 45, createdAt: "2024-01-25" },
  { id: "2", name: "Fashion Hub", owner: "Jane Smith", products: 120, createdAt: "2024-01-24" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">Dashboard Admin</h1>
        <p className="text-slate-400">Overview sistem ShopVerse</p>
      </div>

      <AdminStats />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Pengguna Terbaru</h3>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-sm text-slate-400">{user.email}</p>
                </div>
                <Badge variant={user.role === "SELLER" ? "secondary" : "outline"}>{user.role}</Badge>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-slate-300">Lihat Semua Users</Button>
        </div>

        {/* Pending Stores */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Toko Menunggu Verifikasi</h3>
          <div className="space-y-3">
            {pendingStores.map((store) => (
              <div key={store.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">{store.name}</p>
                  <p className="text-sm text-slate-400">{store.owner} • {store.products} produk</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Tolak</Button>
                  <Button size="sm">Setujui</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}