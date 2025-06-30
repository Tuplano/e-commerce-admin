"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { UserPlus } from "lucide-react";
import CustomersList from "@/app/dashboard/customers/CustomersList";
import CustomerModal from "@/app/dashboard/customers/Modal";
import { Users } from "@/types/users";
import { toast } from "sonner";

export default function Customers() {
  const [users, setUser] = useState<Users[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState<Users>({
    username: "",
    email: "",
    contact: "",
    address: "",
    updatedAt: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  //for updating user
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);

  const handleUpdate = (id: string) => {
    const userToUpdate = users.find((user) => user._id === id);
    if (!userToUpdate) {
      toast.error("Product not found");
      return;
    }
    setFormData({
      username: userToUpdate.username,
      email: userToUpdate.email,
      contact: userToUpdate.contact,
      address: userToUpdate.address,
      updatedAt: userToUpdate.updatedAt,
    });

    setEditUserId(userToUpdate._id);
    setIsEditMode(true);
    setShowForm(true);
  };
  //for deleting user
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/customers/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        const errorMessage = data.message || "Failed to delete account";
        toast.error(errorMessage);
        return;
      }
      toast.success("Deleted Succesfully");
      setUser(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  //submitting
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint = isEditMode
        ? `/api/customers/${editUserId}`
        : "/api/customers";

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          contact: formData.contact,
          address: formData.address,
          updatedAt: formData.updatedAt,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const errorMessage = data.message || "Failed to save User";
        toast.error(errorMessage);
        return;
      }

      if (res.status !== 204) {
        const data = await res.json();
        console.log("User saved:", data);
      }

      toast.success(
        isEditMode
          ? "User updated successfully"
          : "User added successfully"
      );

      fetchUsers();

      // Reset
      setFormData({
          username: "",
          email: "",
          contact: "",
          address: "",
          updatedAt: null,
      });
      setShowForm(false);
      setIsEditMode(false);
      setEditUserId(null);
    } catch (err: any) {
      toast.error(err.message || "An error occurred while saving the user");
      console.error("Error submitting user:", err);
    }
  };

  
  const handleAddUser = () => {
      setFormData({
          username: "",
          email: "",
          contact: "",
          address: "",
          updatedAt: null,
      });
    setShowForm(true);
  };
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
              <button 
              onClick={handleAddUser}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <UserPlus className="w-5 h-5 mr-2" />
                Add Customer
              </button>
            </div>
          </div>
        </div>

        <CustomersList
          users={users}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          showForm={setShowForm}
        />
        <CustomerModal
          showForm={showForm}
          formData={formData}
          isEditMode={isEditMode}
          onClose={() => {
            setShowForm(false);
            setIsEditMode(false);
            setEditUserId(null);
          }}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
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
