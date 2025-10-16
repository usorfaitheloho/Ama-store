import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
}


const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps{
  children: ReactNode;
}

export function FilterProvider ({ children}: FilterProviderProps) 
 { 
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [keyword, setKeyword] = useState<string>("");

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
