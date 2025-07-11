import React, { useEffect, useState } from "react";
import CartItemCard from "../components/CartItemCard";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { Link } from "react-router-dom";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { cart, products, updateCart, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    if (!cart || !products) return;

    const updatedCartItems = Object.entries(cart)
      .map(([productId, quantity]) => {
        const product = products.find((p) => p._id === productId);
        if (!product) return null;

        const isOnSale = product.onSale;
        const salePrice = isOnSale
          ? product.price -
            (product.price * (product.salePercentage || 0)) / 100
          : product.price;

        return {
          id: product._id,
          title: product.name,
          description: product.description,
          price: parseFloat(salePrice.toFixed(2)),
          quantity,
          image: product.otherServices
            ? product.image.slice(0, 4)
            : product.image[0],
          otherServices: product.otherServices,
          onSale: isOnSale,
        };
      })
      .filter(Boolean);

    setCartItems(updatedCartItems);
  }, [cart, products]);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      updateCart(id, quantity);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full md:w-3/4 mx-auto p-4 md:p-6 space-y-6 bg-gray-100">
        <div className="flex flex-col md:flex-row w-full gap-4">
          {/* Cart Section */}
          <div className="w-full p-4 md:w-3/4 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                My cart ({cartItems.length})
              </h2>
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove all
              </button>
            </div>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  {...item}
                  onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </div>

            <Link to={"/"}>
              <button className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-sm transition-colors">
                Back to shop
              </button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-1/4 bg-white shadow rounded-lg p-4 h-fit">
            <p className="text-sm font-medium mb-2">Have a coupon?</p>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Add coupon"
                className="border border-gray-300 px-3 py-2 w-full text-sm rounded"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">
                Apply
              </button>
            </div>

            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₨{subtotal.toFixed(2)}</span>
              </div>

              {/* Removed: Discount, Tax, Shipping */}

              <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-2 mt-1">
                <span>Total:</span>
                <span>₨{subtotal.toFixed(2)}</span>
              </div>

              <Link to={"/checkout"}>
                <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-md text-sm font-medium">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
