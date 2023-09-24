import React from "react";
import Basket from "./components/Basket";
import Products from "./components/Products";

const App = () => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row mx-4 gap-3">
        <Products className="md:w-1/2" /> 
        <Basket className="md:w-1/2" />
      </div>
    </div>
  );
};

export default App;
