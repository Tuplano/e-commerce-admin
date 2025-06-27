"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart,
} from "lucide-react";
export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const labelClasses = isCollapsed ? "hidden" : "block";

  const pathname = usePathname();

  return (
    <div className="relative">
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } h-full overflow-y-auto bg-gray-50 dark:bg-gray-800 border-r border-white/10 shadow-2xl
        transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="h-23 p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray rounded-xl flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                  <p className="text-xs text-gray-300">E-commerce Dashboard</p>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="w-10 h-10 bg-gradient-to-r rounded-xl flex items-center justify-center shadow-lg mx-auto">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        </div>

        <nav className="flex flex-col gap-2 p-4 text-white">
          <Link
            href="/dashboard/main"
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
              pathname === "/dashboard/main"
                ? "bg-purple-600 text-white font-semibold shadow-md"
                : "text-gray-300 hover:bg-slate-400"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className={labelClasses}>Dashboard</span>{" "}
          </Link>
          <Link
            href="/dashboard/orders"
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
              pathname === "/dashboard/orders"
                ? "bg-purple-600 text-white font-semibold shadow-md"
                : "text-gray-300 hover:bg-slate-400"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className={labelClasses}>Orders</span>
          </Link>
          <Link
            href="/dashboard/products"
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
              pathname === "/dashboard/products"
                ? "bg-purple-600 text-white font-semibold shadow-md"
                : "text-gray-300 hover:bg-slate-400"
            }`}
          >
            <Package className="w-5 h-5" />
            <span className={labelClasses}>Products</span>
          </Link>
          <Link
            href="/dashboard/analytics"
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
              pathname === "/dashboard/analytics"
                ? "bg-purple-600 text-white font-semibold shadow-md"
                : "text-gray-300 hover:bg-slate-400"
            }`}
          >
            <BarChart className="w-5 h-5" />
            <span className={labelClasses}>Analytics</span>
          </Link>
        </nav>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className=" bg-gray-50 dark:bg-gray-800 absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3 text-white" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-white" />
          )}
        </button>
      </aside>
    </div>
  );
}
