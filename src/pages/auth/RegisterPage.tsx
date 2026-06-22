export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="bg-zinc-900 p-8 rounded-xl w-96">
        <h1 className="text-3xl font-bold text-white mb-6">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

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

        <button className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg">
          Register
        </button>
      </div>
    </div>
  );
}