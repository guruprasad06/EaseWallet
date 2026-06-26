import { useEffect, useState } from "react";
import { vaultService } from "../../services/vaultService";

export default function MyVaultPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState("");
  const [type, setType] = useState("note");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchVaultItems = async () => {
      try {
        const data = await vaultService.getItems();
        setItems(data);
      } catch (error) {
        console.error("Failed to load vault items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVaultItems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        Loading Vault...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          My Vault
        </h1>

        <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg">
          Upload File
        </button>
      </div>

      {/* Add Note Form */}
      <div className="bg-zinc-900 p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Add New Note
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        >
          <option value="note">Note</option>
          <option value="document">Document</option>
          <option value="image">Image</option>
        </select>

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <button
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
        >
          Save Note
        </button>
      </div>

      {/* Vault Items */}
      {items.length === 0 ? (
        <div className="text-center text-zinc-400 mt-20">
          No items found in your vault.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {items.map((item: any) => (
            <div
              key={item._id}
              className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-indigo-500 hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4">
                {item.type === "document" && "📄"}
                {item.type === "note" && "📝"}
                {item.type === "image" && "🖼️"}
              </div>

              <h2 className="text-xl font-bold">
                {item.title}
              </h2>

              <p className="text-zinc-400 mt-2 capitalize">
                {item.type}
              </p>

              {item.content && (
                <p className="mt-4 text-sm text-zinc-300">
                  {item.content}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}