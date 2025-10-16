import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error(`Error fetching product data : ${error}`);
        });
    }
  }, [id]);

  if (!product) {
    return <h1> Loading ...</h1>;
  }

  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mb-5 text-white bg-black rounded"
      >
        Back
      </button>

      <img
        src={product.images[0]}
        alt={product.title}
        className="w-[50%] h-auto mb-5"
      />

      <h1 className="mb-4 text-2xl font-bold">{product.title}</h1>
      <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>
      <div className="flex">
        <p> price: ${product.price}</p>
        <p className="ml-10"> Rating: {product.rating}</p>
      </div>
    </div>
  );
};

export default ProductPage;
