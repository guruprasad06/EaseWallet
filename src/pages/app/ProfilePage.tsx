import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../services/userService";
import toast from "react-hot-toast";
import { UserRound } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
const [profileImage, setProfileImage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setName(data.name || "");
        setEmail(data.email || "");
        setProfileImage(data.profileImage || "");
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async () => {
    try {
    await updateProfile(
  name,
  email,
  profileImage
);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

const handlePasswordChange = async () => {
  if (!currentPassword || !newPassword) {
    toast.error("Please fill in both password fields");
    return;
  }

  try {
    await changePassword(currentPassword, newPassword);

    toast.success("Password changed successfully");

    setCurrentPassword("");
    setNewPassword("");
  } catch (error) {
    toast.error("Failed to change password");
  }
};

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold text-white mb-8">
        👤 My Profile
      </h1>
    <div className="flex flex-col items-center mb-6">

  <img
    src={profileImage || "https://via.placeholder.com/120"}
    alt="Profile"
    className="w-28 h-28 rounded-full object-cover border-2 border-zinc-600 mb-4"
  />



</div>
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

        <button
          onClick={handleProfileUpdate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
        >
          Update Profile
        </button>

        <hr className="border-zinc-700" />

        <h2 className="text-2xl font-bold text-white">
          🔒 Change Password
        </h2>

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
          onClick={handlePasswordChange}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Change Password
        </button>

      </div>
    </div>
  );
}