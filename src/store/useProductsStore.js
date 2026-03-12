import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const useProductsStore = create()(
  persist(
    (set, get) => ({
      categories: [],
      setCategories: (newCategories) => set({ categories: newCategories }),
      // for test persisting zustand store
      // count: 0,
      // incCount: () => set({ count: get().count + 1 }),
    }),
    {
      name: "shopHup-store",
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useProductsStore;
