import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ShoppingBag, Plus, Minus, ArrowLeft } from "lucide-react";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
          <ShoppingBag className="w-16 h-16 text-gray-300 mb-6" />
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 text-center max-w-md">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto px-4 py-16 flex-1">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const sizePrice =
                item.product.sizes.find((s) => s.size === item.size)?.price ||
                item.product.price;

              return (
                <div
                  key={`${item.product._id}-${item.size}`}
                  className="flex border rounded-lg p-4 shadow-sm"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-md overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 ml-4">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          to={`/product/${item.product._id}`}
                          className="text-lg font-medium hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.product.brand}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Size: {item.size}
                        </p>
                      </div>
                      <p className="text-lg font-medium">
                        ${sizePrice.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(
                              parseInt(item.product._id),
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="p-2 hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              parseInt(item.product._id),
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="p-2 hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(parseInt(item.product._id), item.size)
                        }
                        className="text-sm text-gray-500 hover:text-black transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between py-2 border-t border-dashed mt-2 pt-2">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full py-3 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors mb-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/"
                className="w-full py-3 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
