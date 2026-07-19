import { useEffect, useState } from "react";

import {
  getUsersWithDeletedFiles,
  getDeletedFilesByUser,
  restoreDeletedFile,
  deleteDeletedFile,
} from "../../services/adminService";
import { RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminRecoveryPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsersWithDeletedFiles();
    setUsers(data);
  };

  const loadFiles = async (userId: string) => {
    const data = await getDeletedFilesByUser(userId);
    setFiles(data);
  };

  const restore = async (id: string) => {
    await restoreDeletedFile(id);
    toast.success("File Restored");
    setFiles(files.filter((f) => f._id !== id));
  };
  const deleteForever = async (id: string) => {
  if (!window.confirm("Delete this file permanently?")) {
    return;
  }

  await deleteDeletedFile(id);

  toast.success("File permanently deleted");

  setFiles(files.filter((f) => f._id !== id));
};

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        ♻ Recovery Center
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-zinc-900 rounded-xl p-5">

          <h2 className="font-semibold mb-4">
            Users
          </h2>

          {users.map((u) => (
            <button
              key={u.user._id}
              onClick={() => loadFiles(u.user._id)}
              className="block w-full text-left p-3 rounded hover:bg-zinc-800"
            >
              {u.user.name}

              <span className="float-right">
                {u.deletedFiles}
              </span>
            </button>
          ))}

        </div>

        <div className="bg-zinc-900 rounded-xl p-5">

          <h2 className="font-semibold mb-4">
            Deleted Files
          </h2>

          {files.map((file) => (
            <div
              key={file._id}
              className="flex justify-between items-center border-b border-zinc-800 py-3"
            >
              <div>
                <p>{file.title}</p>
                <small>{file.type}</small>
              </div>

             <div className="flex gap-2">
  <button
    onClick={() => restore(file._id)}
    className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded flex items-center gap-2"
  >
    <RotateCcw size={16} />
    Restore
  </button>

  <button
    onClick={() => deleteForever(file._id)}
    className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
  >
    Delete Forever
  </button>
</div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}