import React from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../redux/basketSlice";

const Products = () => {
  const dispatch = useDispatch();
  const products = [
    { id: "1", name: "Bread", price: 1.1 },
    { id: "2", name: "Milk", price: 0.5 },
    { id: "3", name: "Cheese", price: 0.9 },
    { id: "4", name: "Soup", price: 0.6 },
    { id: "5", name: "Butter", price: 1.2 },
  ];

  const handleAddToBasket = (product) => {
    dispatch(addToBasket(product));
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-2 border border-white bg-white p-4">
      <h1 className="text-4xl">Products</h1>
      <div className="border-b mt-1"></div>
      <div>
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-center border-b"
          >
            <div className="md:w-2/3">
              <p>{product.name}</p>
            </div>
            <div className="md:w-1/3 flex items-center justify-between p-2">
              <p className="mr-2">${product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToBasket(product)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
