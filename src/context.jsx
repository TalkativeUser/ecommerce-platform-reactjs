// src/context/ProductsContext.jsx
import { createContext, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [maxPrice, setMaxPrice] = useState(400);
  const [minPrice, setMinPrice] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(8);

  return (
    <ProductsContext.Provider
      value={{
        search,
        setSearch,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        maxPrice,
        setMaxPrice,
        minPrice,
        setMinPrice,
        productsPerPage,
        setProductsPerPage,
        categories,
        setCategories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
