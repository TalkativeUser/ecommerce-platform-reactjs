import { Link } from "react-router-dom";
import useWishlistStore from "../features/wishlist/hooks/useWishlistStore";
import useCartStore from "../features/cart/hooks/useCartStore";
import useCompareStore from "../features/compare/hooks/useCompareStore";

export default function WishlistPage() {
    const items = useWishlistStore((s) => s.items);


    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <svg
                    className="w-24 h-24 text-gray-200 mx-auto mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Your wishlist is empty
                </h2>
                <p className="text-gray-500 mb-6">
                    Save items you love by clicking the heart icon on any product.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
                <p className="text-gray-500 mt-1">
                    {items.length} item{items.length !== 1 ? "s" : ""} saved
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item) => <WishProductCard key={item.id} item={item} />
              )}
            </div>
        </div>
    );
}




const WishProductCard=({item})=>{



    const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);
    const addToCart = useCartStore((s) => s.addToCart);
      const { toggleCompareItem } = useCompareStore((s) => s);

       const isInCompare  = useCompareStore((s) => s.isInCompare(item.id));

                  return (<div
                        key={item.id}
                        className="group bg-white relative rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                        <Link
                            to={`/products/${item.id}`}
                            className="block aspect-square overflow-hidden bg-gray-50"
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </Link>
                        <div className="p-4">
                            <Link
                                to={`/products/${item.id}`}
                                className="font-semibold text-gray-800 hover:text-primary-600 transition-colors line-clamp-2 text-sm mb-2 block"
                            >
                                {item.title}
                            </Link>
                            <div className="text-lg font-bold text-gray-900 mb-3">
                                ${item.price.toFixed(2)}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        addToCart(item);
                                        // Note: Now removeFromWishlist is fully implemented
                                        removeFromWishlist(item.id);
                                    }}
                                    className="flex-1 py-2 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-700 transition-colors"
                                >
                                    Move to Cart
                                </button>
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-200 transition-all"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    {/* compare button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleCompareItem(item);
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

                    </div>
                )
}