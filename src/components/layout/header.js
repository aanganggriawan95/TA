import { Menu, UserRoundCheck } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="bg-white border-b fixed top-0 w-full z-[9999] border-slate-300 px-4 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Hi, Admin</span>
        <UserRoundCheck />
      </div>
    </header>
  );
}
