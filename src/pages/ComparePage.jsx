import useCompareStore from "../features/compare/hooks/useCompareStore";
import { Link } from "react-router-dom";

export default function ComparePage() {
  const compareItems = useCompareStore((s) => s.items);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);

  function whichIsBetter() {
    if (compareItems.length < 2) return;

    const productA = compareItems[0];
    const productB = compareItems[1];
    return [
      {
        price: productA.price <= productB.price,
        rating: productA.rating >= productB.rating,
        stock: productA.stock >= productB.stock,
      },

      {
        price: productB.price <= productA.price,
        rating: productB.rating >= productA.rating,
        stock: productB.stock >= productA.stock,
      },
    ];
  }
  const coparisonFlags = whichIsBetter();



  const comparisonFields = [
    {
      label: "Price",
      key: "price",
      format: (v) => (
        <span className="font-bold text-green-700">${v?.toFixed(2)}</span>
      ),
    },
    { label: "Category", key: "category" },
    { label: "Rating", key: "rating", format: (v) => `⭐ ${v}` },
    {
      label: "Stock",
      key: "stock",
      format: (v) => (v > 0 ? `In Stock : ${v}` : `Out`),
    },
    { label: "Brand", key: "brand" },
  ];

  if (compareItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gray-50 rounded-2xl p-10 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            No products to compare
          </h2>
          <Link
            to="/products"
            className="text-primary-600 font-semibold mt-4 inline-block hover:underline"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Product Comparison
      </h1>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-12">
          {/* --- Sidebar Labels --- */}
          <div className="hidden sm:block sm:col-span-3 md:col-span-2 bg-gray-50 border-r border-gray-200">
            <div className="h-40 border-b border-gray-200 flex text-blue-500 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className=" size-14 md:size-20 lg:size-28 m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
                />
              </svg>
            </div>
            {comparisonFields.map((field) => (
              <div
                key={field.key}
                className="h-14 flex items-center px-4 text-xs font-bold text-gray-500 uppercase border-b border-gray-200"
              >
                {field.label}
              </div>
            ))}
            <div className="h-24 flex items-start p-4 text-xs font-bold text-gray-500 uppercase">
              Description
            </div>
          </div>

          {/* --- Products Grid --- */}
          <div className="col-span-full sm:col-span-9 md:col-span-10 grid grid-cols-2 divide-x divide-gray-200">
            {[0, 1].map((index) => {
              const item = compareItems[index];
              return (
                <div key={index} className="relative flex flex-col">
                  {item ? (
                    <>
                      {/* Product Header */}
                      <div className="p-4 h-40 flex flex-col items-center justify-center border-b border-gray-200 relative">
                        <button
                          onClick={() => removeFromCompare(item.id)}
                          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-20 h-20 object-contain mb-2 rounded-md "
                        />
                        <h3 className="font-bold text-gray-800 text-xs text-center line-clamp-1 px-2">
                          {item.title}
                        </h3>
                        <Link
                          to={`/products/${item.id}`}
                          className="text-[10px] text-primary-600 mt-1 uppercase font-bold tracking-tighter hover:underline"
                        >
                          Details
                        </Link>
                      </div>

                      {/* Data Rows */}
                      {comparisonFields.map((field) => (
                        <div
                          key={field.key}
                          className={`h-14 flex items-center justify-center px-4 border-b border-gray-200 text-sm text-gray-700 
                           ${
                             (field.key == "price" ||
                               field.key == "rating" ||
                               field.key == "stock") &&
                             compareItems.length == 2
                               ? coparisonFlags[index][field.key]
                                 ? "bg-green-100"
                                 : "bg-red-100"
                               : ""
                           }
                            
                            `}
                        >
                          {field.format
                            ? field.format(item[field.key])
                            : item[field.key] || "—"}
                        </div>
                      ))}

                      {/* Description Row */}
                     <div className="p-4 text-xs text-gray-500 leading-normal line-clamp-2 overflow-hidden">
  {item.description}
</div>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center bg-gray-50/20 text-gray-300 text-xs italic">
                      Slot Empty
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-center text-gray-400 text-xs mt-4 italic">
        Tip: Adding a 3rd product will replace the oldest one.
      </p>
    </div>
  );
}
