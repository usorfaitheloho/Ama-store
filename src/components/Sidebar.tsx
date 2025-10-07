import { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";

interface Product {
  category: string;
}

interface fetchResponse {
  products: Product[];
}

const Sidebar = () => {

  const { searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword, } = useFilter()
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);
  //fetch data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: fetchResponse = await response.json();

        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
        console.log(uniqueCategories);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };
    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent <HTMLInputElement>)=>{
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined)
  }

  const handleMaxPriceChange = (e: React.ChangeEvent <HTMLInputElement> ) =>{
    const value = e.target.value;
    setMaxPrice(value? parseFloat(value) : undefined);
  }

  const handleRadioChangeCategories = (category: string) =>{
    setSelectedCategory(category)
  }

  const handleKeywordClick = (keyword:string) => {
    setKeyword(keyword);
  }; 

  return (
    <div className="w-64 h-screen p-5">
      <h1 className="mt-4 mb-10 text-2xl font-bold">React Store</h1>


      <section>
        <input
          type="text"
          className="px-2 border-2 rounded sm:mb-0"
          placeholder="Search product"
          value ={searchQuery}
          onChange={e=>setSearchQuery(e.target.value)}
        />

        <div className="flex items-center justify-center">
          <input
            type="text"
            className="w-full px-5 py-3 mb-3 mr-2 border-2"
            placeholder="Min"
            value ={minPrice ?? ''}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="w-full px-5 py-3 mb-3 mr-2 border-2"
            placeholder="Max"
            value = {maxPrice ?? ''}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* Categories Section */}
        <div className="mb-5">
          <h2 className="mb-3 font-semibold text xl">Categories</h2>
        </div>

        
        <section>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={() => handleRadioChangeCategories(category)}
                className="mr-2 w-[16px] h-[16px]"
                checked ={selectedCategory === category}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>


        {/* keywords section*/}
        <div className="mt-4 mb-5">
          <h2 className="mb-3 text-xl font-semibold"> Keywords </h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword) }
                className="block w-full px-4 py-2 mb-2 text-left border rounded hover:bg-gray-200"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5 hover:bg-gray-800">
          Reset filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
