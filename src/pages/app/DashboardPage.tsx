export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2>Total Notes</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2>Total Images</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2>Total Documents</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </>
  );
}