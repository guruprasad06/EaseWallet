import useAuth from "../../hooks/useAuth";

export default function ProfilePage() {
  const auth = useAuth();

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">
        Profile
      </h1>
      

      <div className="bg-zinc-900 p-6 rounded-xl max-w-md">
        <p>Name: {auth?.user?.name}</p>
        <p>Email: {auth?.user?.email}</p>
        <p>Role: {auth?.user?.role}</p>
           <p className="mt-2 text-zinc-400">
  Account Status: Active
</p>
      </div>
   
    </div>
  );
}