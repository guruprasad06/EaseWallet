
import { useEffect, useState } from "react";
import { getProfile, updateProfile,changePassword } from "../../services/userService";
import toast from "react-hot-toast";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  useEffect(() => {
  const fetchProfile = async () => {
    try {
     const data = await getProfile();

setName(data.name || "");
setEmail(data.email || "");
    } catch (error) {
      console.error(error);
    }
  };

  fetchProfile();
}, []);

 const handleSave = async () => {
  try {
    await updateProfile(name, email);

    if (currentPassword && newPassword) {
      await changePassword(
        currentPassword,
        newPassword
      );
    }

    toast.success("Settings updated successfully");

    setCurrentPassword("");
    setNewPassword("");
  } catch (error) {
    toast.error("Failed to update settings");
  }
};
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">
        ⚙️ Admin Settings
      </h1>

      <div className="bg-zinc-900 rounded-xl p-8 space-y-6">

        <div>
          <label className="text-zinc-400">Name</label>
          <input
            className="w-full mt-2 p-3 rounded bg-zinc-800 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-zinc-400">Email</label>
          <input
            className="w-full mt-2 p-3 rounded bg-zinc-800 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <hr className="border-zinc-700" />

        <div>
          <label className="text-zinc-400">
            Current Password
          </label>

          <input
            type="password"
            className="w-full mt-2 p-3 rounded bg-zinc-800 text-white"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
          />
        </div>

        <div>
          <label className="text-zinc-400">
            New Password
          </label>

          <input
            type="password"
            className="w-full mt-2 p-3 rounded bg-zinc-800 text-white"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}