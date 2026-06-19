import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    auth?.setUser({
      name: "Demo User",
      role: "user",
    });

    navigate("/app/dashboard");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          EaseWallet
        </h1>

        <p className="text-zinc-400 mb-6">
          Sign in to your vault
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 text-white border border-zinc-700"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg bg-zinc-800 text-white border border-zinc-700"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}