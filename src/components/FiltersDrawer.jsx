import PriceRangeSlider from "./Atoms/PriceRangeSlider";
import { useFilterActions } from "../hooks/useFilterActions";
import { getCategories } from '../features/products/services/productService'
import { useEffect, useState } from "react";
export default function FiltersDrawer() {
  const [categories , setCategories] = useState([]);
  const { filterParams, updateURL } = useFilterActions();
  const [searchTerm, setSearchTerm] = useState(
    filterParams.get("search") || "",
  );
  
        {/* test persisting zustand store */}
  // const {count , incCount}=useProductsStore()

  // debounce pattern
  useEffect(() => {
    if (searchTerm !== (filterParams.get("search") || "")) {
      const timer = setTimeout(() => {
        updateURL({ search: searchTerm });
      }, 400);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchTerm]);


  useEffect(()=>{

   const fetchCats= async ()=>{

    const cats=await getCategories();
    setCategories(cats)
    }
    fetchCats()
  },[])

  return (
    <div className="bg-white rounded-r-2xl shadow-sm border border-gray-100 px-8 py-8 min-h-full ">
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="flex-1 relative w-full ">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <select
          value={filterParams.get("category") || ""}
          onChange={(e) => updateURL({ category: e.target.value })}
          className="py-2.5  px-8 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={`${filterParams.get("sortBy") || ""}-${filterParams.get("sortOrder") || ""}`}
          onChange={(e) => {
            const [by, order] = e.target.value.split("-");
            updateURL({ sortBy: by, sortOrder: order });
          }}
          className="px-8 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="title-asc">Name: A → Z</option>
          <option value="title-desc">Name: Z → A</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating-desc">Rating: Best First</option>
        </select>

        {/* products per page */}
        <select
          value={filterParams.get("pageLimit") || ""}
          onChange={(e) => updateURL({ pageLimit: e.target.value })}
          className="px-8 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">Limit</option>

          <option value={8}>8 items </option>
          <option value={12}>12 items </option>
          <option value={16}>16 items </option>
          <option value={20}>20 items </option>
        </select>

        <div class="range-wrapper flex flex-col justify-center  ">
          {/* memoized component  */}
          <PriceRangeSlider filterParams={filterParams} updateURL={updateURL} />
        </div>
      </div>

      {/* test persisting zustand store */}
      {/* <button className="bg-green-400" onClick={()=>incCount() } > click me </button>
      <p className="bg-red-400" > count : {count} </p> */}
    </div>
  );
}
