import { useEffect, useState } from "react";
import { vaultService } from "../../services/vaultService";


export default function MyVaultPage() {
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("note");
  const [content, setContent] = useState("");

  // Fetch Vault Items
  const fetchVaultItems = async () => {
    try {
      const data = await vaultService.getItems();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchVaultItems();
      setLoading(false);
    };

    loadData();
  }, []);

  // Create Note
const handleCreateNote = async () => {
  if (!title || !content) {
    alert("Please fill all fields");
    return;
  }

  try {
    if (editingId) {
      await vaultService.updateItem(editingId, {
        title,
        type,
        content,
      });

      alert("Note Updated Successfully!");
    } else {
      await vaultService.createItem({
        title,
        type,
        content,
      });

      alert("Note Added Successfully!");
    }

    // Reset Form
    setEditingId(null);
    setTitle("");
    setType("note");
    setContent("");

    // Refresh Vault
    await fetchVaultItems();
  } catch (error) {
    console.error(error);
    alert("Operation Failed");
  }
};

  // Delete Note
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      await vaultService.deleteItem(id);

      await fetchVaultItems();

      alert("Item deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete item");
    }
  };
// Edit Note
const handleEdit = (item: any) => {
  setEditingId(item._id);

  setTitle(item.title);
  setType(item.type);
  setContent(item.content);
};
const handleFileUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    await vaultService.uploadFile(file);

    await fetchVaultItems();

    alert("File uploaded successfully!");
  } catch (error) {
    console.error(error);
    alert("Upload failed");
  }
};
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        Loading Vault...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          My Vault
        </h1>

    <>
  <input
    id="uploadFile"
    type="file"
    hidden
    onChange={handleFileUpload}
  />

  <button
    onClick={() =>
      document.getElementById("uploadFile")?.click()
    }
    className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg"
  >
    Upload File
  </button>
</>
      </div>

      {/* Add Note */}
      <div className="bg-zinc-900 p-6 rounded-xl mb-8">
       <h2 className="text-2xl font-bold mb-4">
  {editingId ? "Edit Note" : "Add New Note"}
</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 mb-4"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 mb-4"
        >
          <option value="note">Note</option>
          <option value="document">Document</option>
          <option value="image">Image</option>
        </select>

        <textarea
          rows={5}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 mb-4"
        />

      <button
  onClick={handleCreateNote}
  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
>
  {editingId ? "Update Note" : "Save Note"}
</button>
      </div>

      {/* Vault Items */}

      {items.length === 0 ? (
        <div className="text-center text-zinc-400">
          No items in your vault.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">

          {items.map((item: any) => (
            <div
              key={item._id}
              className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-indigo-500 transition"
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

              <p className="mt-4 text-sm">
                {item.content}
              </p>

          <div className="flex gap-2 mt-6">
<button
  onClick={() => handleEdit(item)}
  className="flex-1 bg-yellow-500 hover:bg-yellow-600 py-2 rounded-lg font-semibold"
>
  ✏ Edit
</button>

  <button
    onClick={() => handleDelete(item._id)}
    className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold"
  >
    🗑 Delete
  </button>
</div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}