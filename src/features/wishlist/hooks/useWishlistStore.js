import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useWishlistStore = create( persist( (set, get) => ({
  items: [],

  toggleWishlist: (product) => {
    const items = get().items;
    const exists = items.find((item) => item.id === product.id);
    if (exists) {
     
      get().removeFromWishlist(product.id )
     

    } else {
      set({ items: [...items, product] });
        toast.success('Added item to wishlist page')
    }
  },

   // Partial implementation — students should complete this
    removeFromWishlist: (productId) => { // eslint-disable-line no-unused-vars
        // TODO: Implement removal logic
        const newItems = get().items.filter((item) => item.id !== productId);
        set({ items: newItems });
          toast.success('Removed item from wishlist page')
    },

  isInWishlist: (productId) => {
    return get().items.some((item) => item.id === productId);
  },
}) , 
{

       name:"shopHup-wishList",
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
}

) );

export default useWishlistStore;


