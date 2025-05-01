"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Home,
  AppWindow,
  MessageCircle,
  Calendar,
  Settings,
  LogIn,
  LogOut,
  Users,
  FileText,
  ChevronDown,
} from "lucide-react";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState("");

  const toggleMenu = (menuId) => {
    setExpandedMenu(expandedMenu === menuId ? "" : menuId);
  };

  return (
    <aside
      className={`h-screen pt-16 bg-white border-r border-slate-300 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Sidebar Button */}
      <div className="flex justify-between items-center px-4 py-3">
        {/* <h1 className={`text-lg font-bold ${!isOpen && "hidden"}`}>Admin</h1> */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
          <Menu />
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4">
        <SidebarLink
          icon={<Home size={20} />}
          label="Home"
          href="/admin"
          isOpen={isOpen}
        />
        <SidebarGroup
          icon={<AppWindow size={20} />}
          label="Kunjungan"
          isOpen={isOpen}
          expanded={expandedMenu === "apps"}
          onClick={() => toggleMenu("apps")}
        >
          <SidebarLink
            icon={<MessageCircle size={20} />}
            label="Input Penerimaan"
            href="/admin/penerimaan"
            isOpen={isOpen}
          />
          <SidebarLink
            icon={<Calendar size={20} />}
            label="List Penerimaan"
            href="#"
            isOpen={isOpen}
          />
        </SidebarGroup>
        {/* <SidebarLink
          icon={<Settings size={20} />}
          label="Riwayat Penerimaan"
          href="#"
          isOpen={isOpen}
        /> */}
        {/* <SidebarLink
          icon={<Settings size={20} />}
          label="Settings"
          href="#"
          isOpen={isOpen}
        /> */}

        <div className="text-gray-400 text-sm font-medium px-4 mt-6 mb-2 uppercase">
          {isOpen && "Account"}
        </div>

        <SidebarLink
          icon={<LogOut size={20} />}
          label="Sign Out"
          href="#"
          isOpen={isOpen}
        />

        {/* <div className="text-gray-400 text-sm font-medium px-4 mt-6 mb-2 uppercase">
          {isOpen && "Miscellaneous"}
        </div>
        <SidebarLink
          icon={<Users size={20} />}
          label="Support"
          href="#"
          isOpen={isOpen}
        />
        <SidebarLink
          icon={<FileText size={20} />}
          label="Documentation"
          href="#"
          isOpen={isOpen}
        /> */}
      </nav>
    </aside>
  );
}

function SidebarLink({ href, icon, label, isOpen }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700"
    >
      {icon}
      {isOpen && <span className="whitespace-nowrap">{label}</span>}
    </Link>
  );
}

function SidebarGroup({ icon, label, children, isOpen, expanded, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700"
      >
        <div className="flex items-center gap-3">
          {icon}
          {isOpen && <span>{label}</span>}
        </div>
        {isOpen && (
          <ChevronDown
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            size={16}
          />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all ${
          expanded ? "max-h-96" : "max-h-0"
        } pl-8`}
      >
        {children}
      </div>
    </div>
  );
}
