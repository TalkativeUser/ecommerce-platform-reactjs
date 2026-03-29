import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ComparePage from "./pages/ComparePage";
import CheckoutPage from "./pages/CheckoutPage";
import { Toaster } from "react-hot-toast";

//  I forgot and use Context insted of zustand 😂 but edit it again.

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<ProductDetailsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* used Toaster inside these files 
          1-useCartStore.js 📁 Add to & Remove from wishList , toast.success('Added to Wishlist!') , toast.success('Removed from Wishlist!')
          2-useWishlistStore.js 📁 Add to & Remove from Cart , toast.success('Added to Cart!') , toast.success('Removed from Cart!')
          3-useCompareStore.js 📁  Add to & Remove from Compare , toast.success('Added to Comare!') , toast.success('Removed from Comare!')
          4- 📁 Place order , toast.success('Successfull place order !')
          
      
      
      */}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
