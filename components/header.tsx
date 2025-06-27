"use client";

import { useRouter } from "next/navigation";
import { Menu, Search, Bell, LogOut, User } from "lucide-react";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      router.push("/auth/login");
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <>
      <header
        className="bg-gray-50 dark:bg-gray-800
        backdrop-blur-xl border-r border-white/10 shadow-2xl
        transition-all duration-300 ease-in-out px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden text-white hover:text-gray-300">
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-300 hover:text-white">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="relative p-2 text-gray-300 hover:text-white">
              <User className="w-6 h-6 text-gray-300" />
            </button>
            <button
              onClick={handleLogout}
              className="logout-button text-gray-300 hover:text-white"
            >
              <LogOut className="w-6 h-6" />
            </button>{" "}
          </div>
        </div>
      </header>
    </>
  );
}
