import { useState, useEffect } from "react";
import {
  filterProducts,
  getProducts,
} from "../features/products/services/productService";
import ProductCard from "../features/products/components/ProductCard";
import ProductsLayout from "../components/ProductsLayout";
import { useFilterActions } from "../hooks/useFilterActions";

//   very important
// 1-  react don't create new useEffect before remove cleanUp functon in old useEffect
// 2-  when we have any state contains any value and update this state with 
// tha same value 😂 in this case react don't reRender because there is not any differents

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
const [allRawProducts, setAllRawProducts] = useState([]);
const { updateURL, currentPage , filterParams } = useFilterActions();


// initial Load only
useEffect(() => {
  async function loadInitialData() {
    setLoading(true);
    
    const rawProducts = await getProducts();
    setAllRawProducts(rawProducts); 
  
  }
  
  loadInitialData();
}, []); 

// to filters only , based first useEffect
useEffect(() => {

  if (allRawProducts.length === 0) return;

  const currentFilters = Object.fromEntries([...filterParams]);
  
  async function applyCurrentFilters() {
    const { data, totalPages } = await filterProducts(currentFilters);
    console.log('Filtration Applied ✅');
    setProducts(data);
        setLoading(false) 

    setTotalPages(totalPages);
  }

  applyCurrentFilters();
}, [filterParams, allRawProducts]); 


  return (
    <ProductsLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-500">
            Browse our collection of {products.length} premium products
          </p>
        </div>



        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 text-sm">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State , not found products */}
            { products.length === 0 && (
              <div className="text-center py-16">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            )}

       {totalPages > 1 && (
  <div className="flex items-center justify-center gap-2 mt-8">
    <button
      onClick={() => updateURL({pageNum:Math.max(1, currentPage - 1)})}
      disabled={currentPage === 1}
      className="px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-40"
    >
      Previous
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
      <button
        key={pageNum}
        onClick={() => updateURL({pageNum})}
        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
          currentPage === pageNum
            ? "bg-primary-600 text-white"
            : "text-gray-600 hover:bg-gray-50 cursor-pointer "
        }`}
      >
        {pageNum}
      </button>
    ))}

    <button
      onClick={() => updateURL({pageNum:Math.min(totalPages, currentPage + 1)})}
      disabled={currentPage === totalPages}
      className="px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-40"
    >
      Next
    </button>
  </div>
)}
          </>
        )}
      </div>
    </ProductsLayout>
  );
}
