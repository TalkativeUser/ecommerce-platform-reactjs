// import { useContext } from "react"
// import { ProductsContext } from "../context"
import PriceRangeSlider from './Atoms/PriceRangeSlider'
import useProductsStore from "../store/useProductsStore"
export default function FiltersDrawer(){

    const { filters,setFilters}=useProductsStore((state)=>state)
    const {search,selectedCategory 
        ,sortBy ,sortOrder , productsPerPage ,categories }=filters;

    // const { search, setSearch, selectedCategory, setSelectedCategory 
    //     ,sortBy, setSortBy ,sortOrder, setSortOrder ,  setMaxPrice,
    // setMinPrice , productsPerPage, setProductsPerPage ,categories }=useContext(ProductsContext)

  

 
    return  <div className="bg-white rounded-r-2xl shadow-sm border border-gray-100 px-8 py-8 mb-8 min-h-full ">
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
                value={search}
                onChange={(e) => setFilters({search : e.target.value})}
                className="w-full h-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setFilters({selectedCategory : e.target.value})}
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
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split("-");
                setFilters({sortBy : by})
                setFilters({sortOrder : order})
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
              value={productsPerPage}
              onChange={(e) => setFilters({productsPerPage : e.target.value})}
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
              <PriceRangeSlider/>
            </div>
          </div>
        </div>
}