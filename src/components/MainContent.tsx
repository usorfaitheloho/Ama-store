import React, { useEffect, useState, useTransition } from 'react'
import { useFilter } from '../context/FilterContext'
import { Tally3 } from 'lucide-react';
import axios from 'axios';

const MainContent = () => {
  const {searchQuery, selectedCategory, minPrice, maxPrice, keyword} = useFilter();
  const [products,setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1)
  const [dropdownOpen, setDropdownOpen] = useState(true)
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;
    
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

   axios.get(url) .then(response=>{
    setProducts(response.data.products)
    console.log(response.data.products)
   }).catch (error => {
    console.error('Error fetching data', error)
   })

    
  },[currentPage,keyword])

  
  const getFilteredProducts = () => {
    let filteredProducts = products

    if(selectedCategory){
     filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
    console.log(filteredProducts)
    }

    if (minPrice !== undefined ){
      filteredProducts = filteredProducts.filter( product => product.price >= minPrice)
    }

    if (maxPrice !== undefined ){
      filteredProducts = filteredProducts.filter( product => product.price <= maxPrice)
    }
    
    if (searchQuery){
      filteredProducts = filteredProducts.filter(product=> product.title.toLowerCase().includes(searchQuery.toLowerCase()) )
    }

    switch (filter) {
      case "expensive" :
        return filteredProducts.sort((a,b) =>  b.price - a.price)
      case "cheap" :
        return filteredProducts.sort((a,b) =>  a.price -b.price)
      case "popular" :
        return filteredProducts.sort((a,b) =>  b.rating - a.rating)
      default:
        return filteredProducts;
        
    }
    
  };

  const filteredProducts = getFilteredProducts();

  console.log(filteredProducts);

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
    <div className="mb-5">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="relative mt-5 mb-5">
          <button className="flex items-center px-4 py-2 border rounded-full">
            <Tally3 className="mr-2" />
            
            {
              filter ==="all" ? "Filter" : filter.charAt(0).toLowerCase + filter.slice(1)
            }
          </button>

            {
              dropdownOpen && (
                <div className="absolute w-full mt-2 bg-white border-gray-300 rounded sm:w-40">
                  <button onClick={() =>setFilter("cheap")} className="block w-full px-4 py-2 text-left hover:bg-gray-200 " >
                    Cheap
                  </button>
                  <button onClick={() =>setFilter("expensive")} className="block w-full px-4 py-2 text-left hover:bg-gray-200 " >
                    Expensive
                  </button>
                  <button onClick={() =>setFilter("popular")} className="block w-full px-4 py-2 text-left hover:bg-gray-200 " >
                  Popular
                  </button>
                </div>
              )
            }
          
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 sm:grid-cols-3 md:grid-cols-4">
        {/* BookCard */}
      </div>
    </div>
    </section>
  )
}

export default MainContent
