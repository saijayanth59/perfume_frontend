
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(cardRef.current!);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to the first size option or use the default price
    const defaultSize = product.sizes[0]?.size || '50ml';
    addItem(product, defaultSize, 1);  // Added the quantity parameter (1 as default)
  };

  return (
    <div 
      ref={cardRef}
      className={`group relative overflow-hidden transition-all duration-700 opacity-0 translate-y-4 ${
        isVisible ? 'opacity-100 translate-y-0' : ''
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="overflow-hidden rounded-lg aspect-[3/4] mb-4">
        <Link to={`/product/${product._id}`}>
          <div className="relative w-full h-full">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} />
          </div>
        </Link>
        
        {/* New badge */}
        {product.new && (
          <div className="absolute top-3 left-3 py-1 px-3 bg-white/90 backdrop-blur-sm text-black text-xs font-medium rounded-full">
            New
          </div>
        )}
        
        {/* Action buttons */}
        <div className={`absolute right-3 bottom-3 flex flex-col space-y-2 transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <button 
            className="p-2.5 rounded-full bg-white shadow-md hover:bg-black hover:text-white transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button 
            className="p-2.5 rounded-full bg-white shadow-md hover:bg-black hover:text-white transition-colors"
            aria-label="Add to cart"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400">
            {product.brand}
          </h3>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={`w-3 h-3 ${i < Math.round(product.avgRating) ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
        
        <Link to={`/product/${product._id}`}>
          <h2 className="mt-1 text-lg font-medium transition-colors hover:text-gray-600">
            {product.name}
          </h2>
        </Link>
        
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.shortDescription}
        </p>
        
        <p className="mt-2 font-medium">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
