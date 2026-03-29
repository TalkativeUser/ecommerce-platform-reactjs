import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCartStore = create(
  persist((set, get) => ({
    items: [],

    addToCart: (product) => {
      const items = get().items;
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        // Prevent exceeding stock
        if (existingItem.quantity >= product.stock) {
          toast.error(
            "The item quantity more than item stock , can not increase ",
          );
          return;
        }
        set({
          items: items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        });
        toast.success("item exist , just only increase quantity");
      } else {
        set({
          items: [...items, { ...product, quantity: 1 }],
        });

        toast.success("Added to cart");
      }
    },

    removeFromCart: (productId) => {
      set({
        items: get().items.filter((item) => item.id !== productId),
      });
      toast.success("Removed item");
    },

    // BUG: This function does NOT prevent quantity from going to 0 or negative.
    // Students must fix this by adding a minimum quantity check (quantity >= 1).
    updateQuantity: (productId, newQuantity) => {
      const items = get().items;
      const item = items.find((i) => i.id === productId);

      if (!item) return;

      // Prevent exceeding stock
      if (newQuantity > item.stock) {
        toast.error("The item quantity more than item stock , can not increase ");
        return;
      }

      // Prevent set new quantity if equal 0 or more less , just add this line
      if (newQuantity < 1) return;

      // BUG: No check for newQuantity <= 0
      // fix this bug
    //    fixed ✅
      set({
        items: items.map((i) =>
          i.id === productId ? { ...i, quantity: newQuantity } : i,
        ),
      });
    },

    clearCart: () => set({ items: [] }),



    getTotalItems: () => {
      return get().items.reduce((sum, item) => sum + item.quantity, 0);
    },

    getTotalPrice: () => {
      return get().items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },
  }) ,
 {
    name: "shopHup-cartItems",
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
  }

)
 
);

export default useCartStore;
