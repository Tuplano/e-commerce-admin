"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { Plus, Package } from "lucide-react";
import { toast } from "sonner";
import ProductList from "@/app/dashboard/products/ProductList";
import { Product } from "@/types/product";
import { AddProductFormData } from "@/types/product";
import ProductFormModal from "@/app/dashboard/products/Modal";
export default function AdminProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page: number = 1, limit: number = 12) => {
    try {
      const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(data.page);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  //FOR ADDING PRODUCTS
  const [formData, setFormData] = useState<AddProductFormData>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    category: "",
    image: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedImageUrls: string[] = [];

    try {
      if (selectedImageFile.length > 0) {
        for (const file of selectedImageFile) {
          const imageFormData = new FormData();
          imageFormData.append("file", file);
          imageFormData.append("upload_preset", "ecommerce_preset");

          const imageRes = await fetch(
            "https://api.cloudinary.com/v1_1/dhxctvrj5/image/upload",
            {
              method: "POST",
              body: imageFormData,
            }
          );

          if (!imageRes.ok) {
            throw new Error("Image upload failed");
          }

          const imageData = await imageRes.json();
          uploadedImageUrls.push(imageData.secure_url);
        }
      } else {
        uploadedImageUrls = formData.image;
      }

      const endpoint = isEditMode
        ? `/api/products/${editProductId}`
        : "/api/products";

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          price: formData.price,
          stock: formData.stock,
          description: formData.description,
          category: formData.category,
          image: uploadedImageUrls,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const errorMessage = data.message || "Failed to save product";
        toast.error(errorMessage);
        return;
      }

      if (res.status !== 204) {
        const data = await res.json();
        console.log("Product saved:", data);
      }

      toast.success(
        isEditMode
          ? "Product updated successfully"
          : "Product added successfully"
      );

      fetchProducts();

      // Reset
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        description: "",
        category: "",
        image: [],
      });
      setSelectedImageFile([]);
      setShowForm(false);
      setIsEditMode(false);
      setEditProductId(null);
    } catch (err: any) {
      toast.error(err.message || "An error occurred while saving the product");
      console.error("Error submitting product:", err);
    }
  };

  //FOR UPDATING PRODUCTS
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);

  const handleUpdate = (id: string) => {
    const productToUpdate = products.find((product) => product._id === id);
    if (!productToUpdate) {
      toast.error("Product not found");
      return;
    }

    setFormData({
      name: productToUpdate.name,
      price: productToUpdate.price,
      stock: productToUpdate.stock,
      description: productToUpdate.description,
      category: productToUpdate.category,
      image: productToUpdate.image || [],
    });

    setEditProductId(productToUpdate._id);
    setIsEditMode(true);
    setShowForm(true);
  };

  //FOR DELETING PRODUCTS
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        const errorMessage = data.message || "Failed to delete product";
        toast.error(errorMessage);
        return;
      }
      toast.success("Deleted Succesfully");
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const [showForm, setShowForm] = useState(false);

  const handleAddProductClick = () => {
    setFormData({
      name: "",
      price: 0,
      stock: 0,
      description: "",
      category: "",
      image: [],
    });
    setShowForm(true);
  };

  //image Upload
  const [selectedImageFile, setSelectedImageFile] = useState<File[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImageFile(files);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Product Management
                </h1>
                <p className="text-gray-600">Manage your product inventory</p>
              </div>
            </div>
            <button
              onClick={handleAddProductClick}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        <ProductFormModal
          show={showForm}
          formData={formData}
          isEditMode={isEditMode}
          onClose={() => {
            setShowForm(false);
            setIsEditMode(false);
            setEditProductId(null);
          }}
          onChange={handleInputChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
        />

        <ProductList
          products={products}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          showForm={setShowForm}
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
