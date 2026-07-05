export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-zinc-800 rounded-xl p-6 shadow">
          <h2 className="text-zinc-400 text-sm">Total Users</h2>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>

        <div className="bg-zinc-800 rounded-xl p-6 shadow">
          <h2 className="text-zinc-400 text-sm">Admins</h2>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>

        <div className="bg-zinc-800 rounded-xl p-6 shadow">
          <h2 className="text-zinc-400 text-sm">Regular Users</h2>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>

        <div className="bg-zinc-800 rounded-xl p-6 shadow">
          <h2 className="text-zinc-400 text-sm">Total Files</h2>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
      </div>

      <div className="mt-10 bg-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Recent Activity
        </h2>

        <p className="text-zinc-400">
          Activity data will appear here.
        </p>
      </div>
    </div>
  );
}