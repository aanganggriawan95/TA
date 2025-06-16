"use client";

import { useState } from "react";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

export default function AdminLayoutWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className=" bg-gray-50"
      style={{
        height: "100vh",
        overflow: "auto",
        scrollbarWidth: "none", // Untuk Firefox
        msOverflowStyle: "none", // Untuk IE & Edge
      }}
    >
      <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <main className="flex pt-4">
        <AdminSidebar />
        <div
          className=" w-full p-4 overflow-auto pt-20"
          style={{ height: "100vh", overflow: "auto", scrollbarWidth: "none" }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
