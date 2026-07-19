import { useEffect, useState } from "react";
import { RotateCcw, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { vaultService } from "../../services/vaultService";

export default function RecycleBinPage() {
  const [items, setItems] = useState<any[]>([]);

  const fetchItems = async () => {
    try {
      const data = await vaultService.getRecycleBin();
      setItems(data);
    } catch {
      toast.error("Failed to load recycle bin");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleRestore = async (id: string) => {
    await vaultService.restoreItem(id);
    toast.success("File restored");
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete permanently?")) return;

    await vaultService.permanentDelete(id);
    toast.success("File deleted permanently");
    fetchItems();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        ♻️ Recycle Bin
      </h1>

      {items.length === 0 ? (
        <div className="bg-zinc-900 rounded-xl p-8 text-center text-zinc-400">
          No deleted files
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-zinc-900 rounded-xl p-5 border border-zinc-800"
            >
              <h2 className="text-lg font-semibold text-white">
                {item.title}
              </h2>

              <p className="text-zinc-400 mt-2">
                {item.type}
              </p>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => handleRestore(item._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 py-2 rounded-lg"
                >
                  <RotateCcw size={18} />
                  Restore
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded-lg"
                >
                  <Trash size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}