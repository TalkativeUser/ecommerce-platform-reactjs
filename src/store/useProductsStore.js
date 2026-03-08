import { create } from 'zustand'

const useProductsStore = create((set) => ({

  filters: {

    categories: [],
    search: "",
    selectedCategory: '',
    sortBy: "title",
    sortOrder: "asc",
    maxPrice: 400,
    minPrice: 0,
    productsPerPage: 8,
  },

  setFilters: (newFilter) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilter
      }
    }))

}))

export default useProductsStore
