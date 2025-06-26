"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Home,
  AppWindow,
  MessageCircle,
  Calendar,
  LogOut,
  ChevronDown,
  ScanBarcode,
  BookUser,
  UserRoundMinus,
  UserRoundCheck,
  Database,
  UserRound,
  Book,
} from "lucide-react";
import { handleLogout } from "@/app/lib/auth/logout";

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState("");

  const toggleMenu = (menuId) => {
    setExpandedMenu(expandedMenu === menuId ? "" : menuId);
  };

  const menuItems = [
    {
      label: "Home",
      icon: <Home size={20} />,
      href: "/admin",
    },
    {
      label: "Presensi",
      icon: <ScanBarcode size={20} />,
      href: "/admin/presensi",
    },

    {
      label: "Pengunjung",
      icon: <UserRound size={15} />,
      href: "/admin/pengunjung",
    },
    {
      label: "Rekap Pengunjung",
      icon: <Book size={15} />,
      href: "/admin/rekap",
    },
  ];

  return (
    <aside
      className={`h-screen pt-16 bg-white border-r border-slate-300 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Sidebar Button */}
      <div className="flex justify-between items-center px-4 py-3">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
          <Menu />
        </button>
      </div>

      {/* Menu Rendering */}
      <nav className="mt-4">
        {menuItems.map((item) =>
          item.children ? (
            <SidebarGroup
              key={item.label}
              icon={item.icon}
              label={item.label}
              isOpen={isOpen}
              expanded={expandedMenu === item.id}
              onClick={() => toggleMenu(item.id)}
            >
              {item.children.map((child) => (
                <SidebarLink
                  key={child.label}
                  icon={child.icon}
                  label={child.label}
                  href={child.href}
                  isOpen={isOpen}
                  active={pathname === child.href}
                />
              ))}
            </SidebarGroup>
          ) : (
            <SidebarLink
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isOpen={isOpen}
              active={pathname === item.href}
            />
          )
        )}

        <div className="text-gray-400 text-sm font-medium px-4 mt-6 mb-2 uppercase">
          {isOpen && "Account"}
        </div>

        <button
          onClick={() => handleLogout(router)}
          className="w-full text-left"
        >
          <SidebarLink
            icon={<LogOut size={20} />}
            label="Sign Out"
            href="#"
            isOpen={isOpen}
            active={false}
          />
        </button>
      </nav>
    </aside>
  );
}

function SidebarLink({ href, icon, label, isOpen, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 transition-colors text-gray-700 ${
        active ? "border-l-4 border-green-500 bg-gray-100" : "hover:bg-gray-100"
      }`}
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
