import useAuth from "../../hooks/useAuth";

export default function Header() {
  const auth = useAuth();

  return (
    <div className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 text-white">
      <h1 className="text-xl font-bold">
        EaseWallet
      </h1>

      <div>
        Welcome, {auth?.user?.name}
      </div>
    </div>
  );
}