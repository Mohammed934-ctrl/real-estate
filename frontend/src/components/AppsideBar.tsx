"use client";

import {
  Building,
  FileText,
  Heart,
  Home,
  Menu,
  Settings,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SIDEBAR_WIDTH_EXPANDED = 256; // 16rem
const SIDEBAR_WIDTH_COLLAPSED = 56; // 3.5rem

const AppSidebar = ({ userType }: AppSidebarProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const navLinks =
    userType === "manager"
      ? [
          { icon: Building, label: "Properties", href: "/managers/properties" },
          { icon: FileText, label: "Applications", href: "/managers/applications" },
          { icon: Settings, label: "Settings", href: "/managers/settings" },
        ]
      : [
          { icon: Heart, label: "Favorites", href: "/tenants/favorites" },
          { icon: FileText, label: "Applications", href: "/tenants/applications" },
          { icon: Home, label: "Residences", href: "/tenants/residences" },
          { icon: Settings, label: "Settings", href: "/tenants/settings" },
        ];

  const sidebarWidth = open ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED;

  return (
    <>
      {/* Fixed sidebar */}
      <div
        className="fixed left-0 z-20 bg-white shadow-lg flex flex-col overflow-hidden transition-[width] duration-200"
        style={{
          top: `${NAVBAR_HEIGHT}px`,
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          width: `${sidebarWidth}px`,
        }}
      >
        {/* Header */}
        <div
          className={cn(
            "flex min-h-[56px] w-full items-center pt-3 mb-3",
            open ? "justify-between px-6" : "justify-center"
          )}
        >
          {open ? (
            <>
              <h1 className="text-xl font-bold text-gray-800">
                {userType === "manager" ? "Manager View" : "Renter View"}
              </h1>
              <button
                className="hover:bg-gray-100 p-2 rounded-md"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </>
          ) : (
            <button
              className="hover:bg-gray-100 p-2 rounded-md"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex flex-col">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                scroll={false}
                className={cn(
                  "flex items-center gap-3 px-4 py-4 transition-colors",
                  open ? "px-7" : "justify-center px-0",
                  isActive
                    ? "bg-gray-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <link.icon
                  className={cn("h-5 w-5 shrink-0", isActive ? "text-blue-600" : "text-gray-600")}
                />
                {open && (
                  <span className={cn("font-medium", isActive ? "text-blue-600" : "text-gray-600")}>
                    {link.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Spacer that pushes content to the right */}
      <div
        className="shrink-0 transition-[width] duration-200"
        style={{ width: `${sidebarWidth}px` }}
      />
    </>
  );
};

export default AppSidebar;
