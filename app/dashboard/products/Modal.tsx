import React from "react";
import { ChangeEvent, FormEvent } from "react";
import { AddProductFormData } from "@/types/product";
import { DollarSign } from "lucide-react";

export default function ProductModal({
  show,
  isEditMode,
  formData,
  onClose,
  onChange,
  onSubmit,
  onImageChange,
  onSizesChange,
}: {
  show: boolean;
  isEditMode: boolean;
  formData: AddProductFormData;
  onClose: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSizesChange: (updatedSizes: { size: string; stock: number }[]) => void;
}) {
  if (!show) return null;

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditMode ? "Edit Product" : "Add New Product"}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter product name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={onChange}
                      required
                      step="0.01"
                      min="0"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sizes & Stock
                  </label>

                  {formData.sizes.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      {/* Size input */}
                      <input
                        type="text"
                        value={item.size}
                        onChange={(e) => {
                          const updated = [...formData.sizes];
                          updated[index].size = e.target.value;
                          onSizesChange(updated);
                        }}
                        placeholder="Size (e.g., S, M, L)"
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                      />

                      {/* Stock input */}
                      <input
                        type="number"
                        value={item.stock}
                        min="0"
                        onChange={(e) => {
                          const updated = [...formData.sizes];
                          updated[index].stock = Number(e.target.value);
                          onSizesChange(updated);
                        }}
                        placeholder="Stock"
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  ))}

                  {/* Add New Size Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [
                        ...formData.sizes,
                        { size: "", stock: 0 },
                      ];
                      onSizesChange(updated);
                    }}
                    className="text-blue-600 text-sm mt-1"
                  >
                    + Add Size
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a category</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Hoodies">Hoodies</option>
                  <option value="Sweatshirts">Sweatshirts</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Pants">Pants</option>
                  <option value="Shorts">Shorts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Skirts">Skirts</option>
                  <option value="Activewear">Activewear</option>
                  <option value="Undergarments">Undergarments</option>
                  <option value="Socks">Socks</option>
                  <option value="Hats">Hats</option>
                  <option value="Bags">Bags</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Outerwear">Outerwear</option>
                  <option value="Limited Edition">Limited Edition</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  multiple
                  accept="image/*"
                  onChange={onImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                  placeholder="Enter product description"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                  {isEditMode ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
