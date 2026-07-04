import Header from "../components/layout-ui/Header";
import AdminSidebar from "../components/layout-ui/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-zinc-950 min-h-screen">
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