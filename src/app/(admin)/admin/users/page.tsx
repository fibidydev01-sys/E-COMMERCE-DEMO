"use client";

import * as React from "react";
import { Search, MoreHorizontal, UserCheck, UserX, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, getInitials } from "@/lib/utils";

const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "CUSTOMER", status: "active", createdAt: "2024-01-15" },
  { id: "2", name: "Jane Seller", email: "jane@example.com", role: "SELLER", status: "active", createdAt: "2024-01-10" },
  { id: "3", name: "Bob Admin", email: "bob@example.com", role: "ADMIN", status: "active", createdAt: "2024-01-05" },
  { id: "4", name: "Alice User", email: "alice@example.com", role: "CUSTOMER", status: "suspended", createdAt: "2024-01-20" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("all");

  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-white">Manajemen Users</h1>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Cari user..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-slate-800 border-slate-700 text-white" />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[150px] bg-slate-800 border-slate-700 text-white"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Role</SelectItem>
            <SelectItem value="CUSTOMER">Customer</SelectItem>
            <SelectItem value="SELLER">Seller</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700">
              <TableHead className="text-slate-300">User</TableHead>
              <TableHead className="text-slate-300">Role</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
              <TableHead className="text-slate-300">Bergabung</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="border-slate-700">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10"><AvatarFallback>{getInitials(user.name)}</AvatarFallback></Avatar>
                    <div>
                      <p className="font-medium text-white">{user.name}</p>
                      <p className="text-sm text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell><Badge variant={user.role === "ADMIN" ? "destructive" : user.role === "SELLER" ? "secondary" : "outline"}>{user.role}</Badge></TableCell>
                <TableCell><Badge variant={user.status === "active" ? "delivered" : "cancelled"}>{user.status === "active" ? "Aktif" : "Suspended"}</Badge></TableCell>
                <TableCell className="text-slate-400">{formatDate(user.createdAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4 text-slate-400" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><UserCheck className="h-4 w-4 mr-2" />Verifikasi</DropdownMenuItem>
                      <DropdownMenuItem><Shield className="h-4 w-4 mr-2" />Ubah Role</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500"><UserX className="h-4 w-4 mr-2" />Suspend</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}