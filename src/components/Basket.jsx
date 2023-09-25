import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../redux/basketSlice";

const Basket = () => {
  const basketItems = useSelector((state) => state.basket.items);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity({ id: item.id }));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity({ id: item.id }));
  };

  const calculateItemPrice = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  const calculateSavings = (item) => {
    const offers = {
      Cheese: { buy: 1, get: 1 },
      Soup: {},
      Bread: { discount: 0.5, limit: 1 }, // Half price for one Bread when Soup is in the basket
      Butter: { discount: 0.665 }, // 33% off
    };

    let savings = 0;

    if (offers[item.name]) {
      const offer = offers[item.name];
      const itemCount = item.quantity;

      if (offer.buy && offer.get) {
        const eligibleItems = offer.buy + offer.get;
        const pairs = Math.floor(itemCount / eligibleItems);
        savings += pairs * offer.get * item.price;
      } else if (offer.discount) {
        if (offer.limit) {
          const limit = offer.limit;
          const soupInBasket = basketItems.find(
            (basketItem) => basketItem.name === "Soup"
          );
          const discountedCount = soupInBasket ? Math.min(itemCount, limit) : 0;
          savings += discountedCount * item.price * (1 - offer.discount);
        } else {
          savings += item.price * item.quantity * (1 - offer.discount);
        }
      }
    }

    return savings.toFixed(2);
  };

  const calculateTotalSavings = () => {
    let totalSavings = 0;
    basketItems.forEach((item) => {
      totalSavings += parseFloat(calculateSavings(item));
    });
    return totalSavings.toFixed(2);
  };

  const calculateSubTotal = () => {
    const subtotal = basketItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return subtotal.toFixed(2);
  };

  const calculateTotalAmount = () => {
    const subTotal = parseFloat(calculateSubTotal());
    const totalSavings = parseFloat(calculateTotalSavings());
    const totalAmount = (subTotal - totalSavings).toFixed(2);
    return totalAmount;
  };

  return (
    <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 mx-2 border border-white bg-white p-4">
      <h1 className="text-4xl">Basket</h1>
      <div className="border-b mt-1"></div>
      <div>
        {basketItems.map((item, index) => (
          <>
            <div key={index} className="flex flex-col border-b">
              <div className="flex justify-between items-center">
                <div>
                  <p>{item.name}</p>
                </div>
                <p>${item.price.toFixed(2)}</p>
                <div className="flex items-center justify-between p-2 gap-4">
                  <button
                    onClick={() => handleIncreaseQuantity(item)}
                    className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-2 rounded"
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    className="bg-transparent text-black hover:bg-blue-200 font-bold py-2 px-2 rounded border border-blue-500"
                  >
                    -
                  </button>
                </div>
              </div>
              <p className="text-right text-gray-500">
                Item price ${item.price.toFixed(2)} * {item.quantity} = $
                {calculateItemPrice(item)}
              </p>
            </div>
            {calculateSavings(item) > 0 && (
              <div className="flex justify-end border-b text-red-500 mt-4">
                <p>Savings ${calculateSavings(item)}</p>
              </div>
            )}
            <div className="flex justify-end border-b py-3">
              <p>
                Item cost $
                {(calculateItemPrice(item) - calculateSavings(item)).toFixed(2)}
              </p>
            </div>
          </>
        ))}

        <div className="flex text-lg font-semibold justify-between py-3">
          <p>Sub Total:</p>
          <p>$ {calculateSubTotal()}</p>
        </div>
        <div className="flex text-lg font-semibold justify-between py-3">
          <p>Savings:</p>
          <p>$ {calculateTotalSavings()}</p>
        </div>
        <div className="flex text-lg font-semibold justify-between py-3">
          <p>Total Amount:</p>
          <p>$ {calculateTotalAmount()}</p>
        </div>
      </div>
    </div>
  );
};

export default Basket;
