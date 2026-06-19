export default function MyVaultPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Vault
      </h1>

      <div className="flex gap-6">

        {/* Folder Sidebar */}
        <div className="w-64 bg-zinc-900 rounded-xl p-4">
          <h2 className="font-semibold mb-4">
            Folders
          </h2>

          <ul className="space-y-2">
            <li>📁 Personal</li>
            <li>📁 Work</li>
            <li>📁 Finance</li>
            <li>📁 Health</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1">

          <div className="flex justify-between mb-6">

            <input
              placeholder="Search files..."
              className="bg-zinc-900 p-3 rounded-lg w-96"
            />

            <button className="bg-indigo-600 px-4 py-2 rounded-lg">
              Upload
            </button>

          </div>

          <div className="flex gap-2 mb-6">

            <button className="bg-zinc-800 px-3 py-2 rounded-lg">
              Personal
            </button>

            <button className="bg-zinc-800 px-3 py-2 rounded-lg">
              Work
            </button>

            <button className="bg-zinc-800 px-3 py-2 rounded-lg">
              Finance
            </button>

          </div>

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-zinc-900 p-4 rounded-xl">
              Passport.pdf
            </div>

            <div className="bg-zinc-900 p-4 rounded-xl">
              Resume.docx
            </div>

            <div className="bg-zinc-900 p-4 rounded-xl">
              Notes.txt
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}