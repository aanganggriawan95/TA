import { Menu, UserRoundCheck } from "lucide-react";
import Image from "next/image";

export default function AdminHeader() {
  return (
    <header className="bg-white border-b fixed top-0 w-full z-[9999] border-slate-300 px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src="/logoSTTC.jpg"
          alt="logo"
          width={100}
          height={100}
          style={{
            height: "50px",
            width: "50px",
          }}
        />

        <h1 className="text-xl relative top-2 font-semibold text-gray-800">
          STTC
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Hi, Admin</span>
        <UserRoundCheck />
      </div>
    </header>
  );
}
