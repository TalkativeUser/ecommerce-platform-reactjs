import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// used this store in : 
// 1 productCard page
// 2 productDetalis page
// 3 wishlist page 
// 4 cart page 

const useCompareStore = create( persist( (set, get) => ({
  items: []  ,
  toggleCompareItem:(newItem)=>{ 

        const items = get().items;
        const exists = items.find((item) => item.id === newItem.id);
if(exists) {

 get().removeFromCompare(newItem.id)

} else {
 
    if(items.length==2 ) {

      set({ items: [...items.slice(1), newItem] });

    } else {

      set({items:[...items,newItem]})

    }


}


    

   },

      removeFromCompare: (productId) => { 
      
        const newItems = get().items.filter((item) => item.id !== productId);
        set({ items: newItems });
    },

     isInCompare: (productId) => {
    return get().items.some((item) => item.id === productId);
  },



}) , 
{

       name:"shopHup-compareItems",
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
}

) );

export default useCompareStore;


