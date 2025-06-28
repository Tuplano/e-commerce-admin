"use client";
import React, { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import CustomersList from "@/app/dashboard/customers/CustomersList";
import { Users } from "@/types/users";

export default function Customers() {
  const [users, setUser] = useState<Users[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page: number = 1, limit: number = 12) => {
    try {
      const response = await fetch(
        `/api/customers?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch User");
      }

      const data = await response.json();
      setUser(data.users);
      setTotalPages(data.totalPages);
      setCurrentPage(data.page);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Customer Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and view all registered customers
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <UserPlus className="w-5 h-5 mr-2" />
                Add Customer
              </button>
            </div>
          </div>
        </div>

        <CustomersList users={users} />
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-4 py-1 font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
