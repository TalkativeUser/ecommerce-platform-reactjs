import { Link } from "react-router-dom";
import useCartStore from "../../cart/hooks/useCartStore";
import useWishlistStore from "../../wishlist/hooks/useWishlistStore";
import useCompareStore from "../../compare/hooks/useCompareStore";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const { toggleCompareItem } = useCompareStore((s) => s);
  const isInCompare  = useCompareStore((s) => s.isInCompare(product.id));
  

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating - full >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-amber-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>,
        );
      } else if (i === full && hasHalf) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${product.id}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-${product.id})`}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>,
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-gray-300 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>,
        );
      }
    }
    return stars;
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary-100 transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link
        to={`/products/${product.id}`}
        className="relative overflow-hidden aspect-square bg-gray-50"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.stock <= 10 && product.stock > 0 && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Out of Stock
          </span>
        )}
        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-200 ${
            isInWishlist
              ? "bg-accent-500 text-white"
              : "bg-white/90 text-gray-400 hover:text-accent-500"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
        {/* compare button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleCompareItem(product);
          }}
          className={`absolute top-3 left-3 p-2 rounded-full shadow-md transition-all duration-200 ${
            isInCompare
              ? "bg-blue-500 text-white"
              : "bg-white/90 text-gray-400 hover:text-blue-500"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
            />
          </svg>
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-medium text-primary-600 uppercase tracking-wide mb-1">
          {product.category}
        </span>
        <Link
          to={`/products/${product.id}`}
          className="text-sm font-semibold text-gray-800 hover:text-primary-600 transition-colors line-clamp-2 mb-2"
        >
          {product.title}
        </Link>

        <div className="flex items-center gap-1 mb-3">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="px-3 py-1.5 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

