import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="bg-zinc-900 p-8 rounded-xl w-96">
        <h1 className="text-3xl font-bold text-white mb-6">
          EaseWallet Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg"
          onClick={() => {
            auth?.setUser({
              id: "1",
              name: "Demo User",
              email: "demo@easewallet.com",
              role: "user",
            });

            navigate("/app/dashboard");
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}