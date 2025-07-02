"use client";

import React, { useState } from "react";
import {
  Package,
  DollarSign,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {  FetchProductProps } from "@/types/product";

export default function ProductCard({
  product,
  onUpdate,
  onDelete,
}: FetchProductProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const hasImages = Array.isArray(product.image) && product.image.length > 0;

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % product.image.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prev) =>
      prev - 1 < 0 ? product.image.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Carousel */}
      <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
        {hasImages ? (
          <>
            <img
              src={product.image[imageIndex]}
              alt={product.name}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            {product.image.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </>
        ) : (
          <Package className="h-12 w-12 text-gray-400" />
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
              {product.name}
            </h3>
          </div>

          {product.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {product.category}
            </span>
          )}
        </div>

        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-green-100 rounded">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
              <p className="text-lg font-bold text-green-600">
                ₱{product.price.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Stock</p>
            <p
              className={`text-lg font-bold ${
                product.stock < 10
                  ? "text-red-600"
                  : product.stock < 25
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {product.stock}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <div>
              <span className="font-medium">Created:</span>
              <br />
              {new Date(product.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onUpdate(product._id)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Update Product"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Delete Product"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
