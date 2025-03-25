
import { Star } from 'lucide-react';
import { Product } from '../types/product';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="opacity-0 animate-fade-in">
      {product.new && (
        <span className="inline-block py-1 px-3 mb-4 bg-black/5 rounded-full text-xs uppercase tracking-wider font-medium">
          New Arrival
        </span>
      )}
      
      <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
      
      <div className="mt-2 text-lg text-gray-500">{product.brand}</div>
      
      <div className="mt-4 flex items-center">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < Math.round(product.avgRating) ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-500">({product.avgRating.toFixed(1)} / 5)</span>
      </div>
      
      <div className="mt-6 text-2xl font-bold">
        ${product.price.toFixed(2)}
      </div>
      
      <p className="mt-6 text-gray-600 leading-relaxed">
        {product.description}
      </p>
    </div>
  );
};

export default ProductInfo;
