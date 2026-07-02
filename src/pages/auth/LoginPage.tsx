import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { loginUser } from "../../services/authService";

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser(
        email,
        password
      );

      localStorage.setItem(
        "token",
        data.token
      );

      auth?.setUser(data.user);

      navigate("/app/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="bg-zinc-900 p-8 rounded-xl w-96">
        <h1 className="text-3xl font-bold text-white mb-6">
          EaseWallet Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
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
