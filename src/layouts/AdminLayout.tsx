import type { ReactNode } from "react";
import Header from "../components/layout-ui/Header";
import AdminSidebar from "../components/layout-ui/AdminSidebar";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex bg-zinc-950">
      <AdminSidebar />

      <div className="flex-1">
        <Header />

        <main className="p-8 text-white">
          {children}
        </main>
      </div>
    </div>
  );
}