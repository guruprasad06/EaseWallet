import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../services/authService";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 const handleRegister = async () => {
  if (!name || !email || !password) {
    toast.error("Please fill in all fields");
    return;
  }

  try {
    await registerUser(name, email, password);

    toast.success("Account created successfully!");

    navigate("/login");
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message || "Registration failed"
    );
  }
};

// <-- return comes immediately after this

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="bg-zinc-900 p-8 rounded-xl w-96">
        <h1 className="text-3xl font-bold text-white mb-6">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <button  onClick={handleRegister} className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg">
          Register
        </button>
        <p className="mt-6 text-center text-zinc-400">
  Already have an account?{" "}
  <Link
    to="/login"
    className="text-indigo-400 hover:text-indigo-300 font-semibold"
  >
    Login
  </Link>
</p>
      </div>
    </div>
  );
  
}
