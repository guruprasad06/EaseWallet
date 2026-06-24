import { useEffect, useState } from "react";
import { vaultService } from "../../services/vaultService";

export default function MyVaultPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    vaultService.getItems().then(setItems);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
    
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    My Vault
  </h1>

  <button className="bg-indigo-600 px-4 py-2 rounded-lg">
    Upload File
  </button>
</div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {items.map((item) => (
          <div
  key={item.id}
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
</div>
        ))}
      </div>
    </div>
  );
}