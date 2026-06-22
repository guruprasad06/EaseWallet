import Sidebar from "../components/layout-ui/Sidebar";
import Header from "../components/layout-ui/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-zinc-950 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-8 text-white">
          {children}
        </main>
      </div>
    </div>
  );
}