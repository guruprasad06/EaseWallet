import { useEffect, useState } from "react";
import { vaultService } from "../../services/vaultService";
import type { VaultItem } from "../../types/vault.types";


export default function MyVaultPage() {
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [type, setType] = useState<VaultItem["type"]>("note");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
      setSelectedIds((currentIds) =>
        currentIds.filter((selectedId) => selectedId !== id)
      );

      alert("Item deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete item");
    }
  };
  const handlePin = async (id: string) => {
  try {
    await vaultService.pinItem(id);
    await fetchVaultItems();
  } catch (error) {
    console.error(error);
  }
};
// Edit Note
const handleEdit = (item: any) => {
  setEditingId(item._id);

  setTitle(item.title);
  setType(item.type);
  setContent(item.content);
};
const handleCancelEdit = () => {
  setEditingId(null);
  setTitle("");
  setType("note");
  setContent("");
};
const uploadVaultFile = async (file: File) => {
  try {
    await vaultService.uploadFile(file);

    await fetchVaultItems();

    alert("File uploaded successfully!");
  } catch (error) {
    console.error(error);
    alert("Upload failed");
  }
};
const handleFileUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  await uploadVaultFile(file);
};
const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  setIsDragging(false);

  const file = e.dataTransfer.files?.[0];

  if (!file) return;

  await uploadVaultFile(file);
};
const handleSelectItem = (id: string) => {
  setSelectedIds((currentIds) =>
    currentIds.includes(id)
      ? currentIds.filter((selectedId) => selectedId !== id)
      : [...currentIds, id]
  );
};
const handleDeleteSelected = async () => {
  if (selectedIds.length === 0) return;

  const confirmDelete = window.confirm(
    `Are you sure you want to delete ${selectedIds.length} selected item(s)?`
  );

  if (!confirmDelete) return;

  try {
    await Promise.all(selectedIds.map((id) => vaultService.deleteItem(id)));
    await fetchVaultItems();
    setSelectedIds([]);
    alert("Selected items deleted successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to delete selected items");
  }
};
const filteredItems = items.filter((item: any) => {
  const matchesSearch =
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    (item.content ?? "").toLowerCase().includes(search.toLowerCase()) ||
    item.type.toLowerCase().includes(search.toLowerCase());

  const matchesFilter =
    filter === "all" || item.type === filter;

  return matchesSearch && matchesFilter;
});

const totalItems = items.length;
const totalNotes = items.filter((item: any) => item.type === "note").length;
const totalDocuments = items.filter((item: any) => item.type === "document").length;
const totalImages = items.filter((item: any) => item.type === "image").length;

const sortedItems = [...filteredItems].sort((a: any, b: any) => {
  const pinnedSort = Number(b.isPinned) - Number(a.isPinned);

  if (pinnedSort !== 0) return pinnedSort;

  if (sortOrder === "oldest") {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  }

  if (sortOrder === "az") {
    return a.title.localeCompare(b.title);
  }

  if (sortOrder === "za") {
    return b.title.localeCompare(a.title);
  }

  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
});

const isNewItem = (createdAt?: string) => {
  const createdTime = new Date(createdAt ?? "").getTime();
  const age = Date.now() - createdTime;

  return !Number.isNaN(createdTime) && age >= 0 && age <= 24 * 60 * 60 * 1000;
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
        <div>
  <h1 className="text-3xl font-bold">
    My Vault
  </h1>

  <p className="text-zinc-400 mt-1">
    Total Items: {items.length}
  </p>
</div>

    <div className="flex flex-col items-end gap-3">
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

  <div
    onDragEnter={(e) => {
      e.preventDefault();
      setIsDragging(true);
    }}
    onDragOver={(e) => {
      e.preventDefault();
      setIsDragging(true);
    }}
    onDragLeave={() => setIsDragging(false)}
    onDrop={handleFileDrop}
    className={`w-64 rounded-lg border-2 border-dashed bg-zinc-900 px-4 py-3 text-center text-sm text-zinc-400 transition ${
      isDragging ? "border-indigo-500" : "border-zinc-700"
    }`}
  >
    Drag & Drop files here or click Upload File
  </div>
</div>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mb-8">
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-sm">Total Items</p>
          <p className="text-3xl font-bold mt-2">{totalItems}</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-sm">Notes</p>
          <p className="text-3xl font-bold mt-2">{totalNotes}</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-sm">Documents</p>
          <p className="text-3xl font-bold mt-2">{totalDocuments}</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-sm">Images</p>
          <p className="text-3xl font-bold mt-2">{totalImages}</p>
        </div>
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
          onChange={(e) => setType(e.target.value as VaultItem["type"])}
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

    <div className="flex gap-3">
  <button
    onClick={handleCreateNote}
    className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
  >
    {editingId ? "Update Note" : "Save Note"}
  </button>

  {editingId && (
    <button
      onClick={handleCancelEdit}
      className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg"
    >
      Cancel
    </button>
  )}
</div>
      </div>

<input
  type="text"
  placeholder="🔍 Search Vault..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-3 rounded-lg bg-zinc-800 mb-6 text-white"
/>
<div className="flex flex-wrap gap-3 mb-6">
  <button
    onClick={() => setFilter("all")}
    className={`px-4 py-2 rounded ${
      filter === "all"
        ? "bg-indigo-600"
        : "bg-zinc-800 hover:bg-zinc-700"
    }`}
  >
    All
  </button>

  <button
    onClick={() => setFilter("note")}
    className={`px-4 py-2 rounded ${
      filter === "note"
        ? "bg-indigo-600"
        : "bg-zinc-800 hover:bg-zinc-700"
    }`}
  >
    Notes
  </button>

  <button
    onClick={() => setFilter("document")}
    className={`px-4 py-2 rounded ${
      filter === "document"
        ? "bg-indigo-600"
        : "bg-zinc-800 hover:bg-zinc-700"
    }`}
  >
    Documents
  </button>

  <button
    onClick={() => setFilter("image")}
    className={`px-4 py-2 rounded ${
      filter === "image"
        ? "bg-indigo-600"
        : "bg-zinc-800 hover:bg-zinc-700"
    }`}
  >
    Images
  </button>

  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-white"
  >
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
    <option value="az">A-Z</option>
    <option value="za">Z-A</option>
  </select>

  {selectedIds.length > 0 && (
    <button
      onClick={handleDeleteSelected}
      className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
    >
      Delete Selected ({selectedIds.length})
    </button>
  )}
</div>
      {/* Vault Items */}
      

      {filteredItems.length === 0 ? (
        <div className="text-center text-zinc-400">
         {search
  ? "No matching items found."
  : "No items in your vault."}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">

          {sortedItems.map((item: any) => (
            <div
              key={item._id}
              className="relative bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-indigo-500 transition"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(item._id)}
                onChange={() => handleSelectItem(item._id)}
                className="absolute top-2 left-2 h-4 w-4 accent-indigo-600"
              />

              {isNewItem(item.createdAt) && (
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </span>
              )}

              <div className="flex justify-between items-start mb-4">

  <button
    onClick={() => handlePin(item._id)}
    className="text-2xl hover:scale-110 transition"
  >
    {item.isPinned ? "📌" : "📍"}
  </button>



  <button
    onClick={() => {
      navigator.clipboard.writeText(item.content || "");
      alert("Copied!");
    }}
    className="text-xl hover:scale-110 transition"
  >
    📋
  </button>

</div>

              <h2 className="text-xl font-bold">
                {item.title}
              </h2>

              <p className="text-zinc-400 mt-2 capitalize">
                {item.type}
              </p>
              <p className="text-xs text-zinc-500 mt-1">
  {new Date(item.createdAt).toLocaleString()}
</p>

              {item.type === "document" ? (
<div className="mt-4 flex gap-3">

  <a
    href={`http://localhost:5000${item.content}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 underline"
  >
    📂 Open
  </a>

  <a
    href={`http://localhost:5000${item.content}`}
    download
    className="text-green-400 underline"
  >
    ⬇ Download
  </a>

</div>
) : (
  <p className="mt-4 text-sm">
    {item.content}
  </p>
)}

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
