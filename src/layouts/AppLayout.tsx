import Sidebar from "../components/layout-ui/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />

      <main className="flex-1 p-8 text-white">
        {children}
      </main>
    </div>
  );
}