import { useState } from "react";
import FiltersDrawer from "./FiltersDrawer";

export default function ProductsLayout({ children }) {
  const [drawerMenu, setDrawerMenu] = useState(false);
 

  return (
    <div className="flex min-h-screen ">

      {/* sidebar static show in md screen more than */}
      <div className="shrink-0 hidden md:block min-h-full  ">
          <FiltersDrawer />
        </div>

      <div className="flex-1 ">
        {/* drawer menu button */}

        <button
          className="border border-gray-300 rounded-md px-2 py-1 md:hidden m-4 mb-0 cursor-pointer "
          onClick={()=> setDrawerMenu( prev=>!prev ) }
        >
          {drawerMenu ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          )}
        </button>

   {/*  mybe children are ProductsPage.jsx */}
        <div>{children}</div>
      </div>

            {/* sidebar daynamic or drawer show in sm screen more less */}
      { drawerMenu ? 
       <div className={`bg-black/55 fixed inset-0 z-10 parent md:hidden `} onClick={()=>{ setDrawerMenu( prev=>!prev ) }}  >
        <div className="w-80 mt-16 bg-red-500 h-full child " onClick={(e) => e.stopPropagation()} >

          <FiltersDrawer />
        </div>
      </div> :''
      
    
    }

     

    </div>
  );
}
