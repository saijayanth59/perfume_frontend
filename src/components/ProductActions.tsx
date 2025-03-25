
import { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface ProductActionsProps {
  product: Product;
}

const ProductActions = ({ product }: ProductActionsProps) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]?.size || '');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity);
    toast.success(`Added ${product.name} to your cart`);
  };

  const handleAddToWishlist = () => {
    toast.success(`Added ${product.name} to your wishlist`);
  };

  return (
    <div>
      <div className="mt-8">
        <h3 className="font-medium mb-3">Size</h3>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              key={size.size}
              className={`px-4 py-2 border rounded-lg transition ${
                selectedSize === size.size 
                  ? 'border-black bg-black text-white' 
                  : 'border-gray-300 hover:border-gray-900'
              }`}
              onClick={() => setSelectedSize(size.size)}
            >
              {size.size}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="font-medium mb-3">Quantity</h3>
        <div className="flex items-center">
          <button 
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-900 transition-colors"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="w-10 text-center">{quantity}</span>
          <button 
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-900 transition-colors"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      
      <div className="mt-8 flex flex-wrap gap-4">
        <button 
          className="flex-1 py-3 px-6 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add to Cart
        </button>
        <button 
          className="py-3 px-6 border border-gray-300 rounded-full hover:bg-black hover:text-white hover:border-black transition-colors flex items-center justify-center"
          onClick={handleAddToWishlist}
        >
          <Heart className="w-4 h-4 mr-2" />
          Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
