
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    isCartOpen, 
    setIsCartOpen,
    totalItems,
    totalPrice
  } = useCart();

  return (
    <>
      {/* Cart Icon with Item Count */}
      <button 
        className="relative p-2 rounded-full hover:bg-black/5 transition-colors"
        onClick={() => setIsCartOpen(true)}
        aria-label="Open cart"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
        isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div 
          className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 transform ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col`}
        >
          {/* Cart Header */}
          <div className="px-4 py-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-500 mt-1">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 mx-auto text-gray-300" />
                <p className="mt-4 text-gray-500">Your cart is empty</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 text-sm font-medium text-black underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                const sizePrice = item.product.sizes.find(s => s.size === item.size)?.price || item.product.price;
                
                return (
                  <div key={`${item.product.id}-${item.size}`} className="flex border-b pb-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-md overflow-hidden">
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
                          <h3 className="text-sm font-medium">{item.product.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{item.product.brand}</p>
                          <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                        </div>
                        <p className="text-sm font-medium">${sizePrice.toFixed(2)}</p>
                      </div>
                      
                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-xs text-gray-500 hover:text-black transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-medium">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-4 w-full py-3 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-3 w-full py-3 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
