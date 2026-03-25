import { create } from "zustand";
const useProductsStore = create()( (set) => ({
      categories: [],
      setCategories: (newCategories) => set({ categories: newCategories }),

    }),


);

export default useProductsStore;
