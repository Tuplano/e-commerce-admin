import { Package, DollarSign, Edit, Trash2 } from "lucide-react";
import { Product } from "@/types/product";

export default function ProductList({
  products,
  onUpdate,
  onDelete,
  showForm,
}: {
  products: Product[];
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  showForm: (id: boolean) => void;
}) {
  return (
    <>
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Product Image */}
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
            )}

            {/* Card Content */}
            <div className="p-6">
              {/* Header with Title and Category */}
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

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Price and Stock Section */}
              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-green-100 rounded">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Price
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Stock
                  </p>
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

              {/* Footer with Timestamps */}
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

                  {/* Update & Delete Buttons */}
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
        ))}
      </div>

      {products.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by adding your first product
          </p>
          <button
            onClick={() => showForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add Your First Product
          </button>
        </div>
      )}
    </>
  );
}
