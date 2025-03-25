
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getFeaturedProducts, Product } from '../data/products';

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const featuredProducts = getFeaturedProducts();
  
  return (
    <section className="py-24 px-4 md:px-6">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Our Collection</h2>
            <p className="mt-3 max-w-2xl text-gray-500">
              Discover our curated selection of premium fragrances designed to evoke emotion and capture memories.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <div className="inline-flex border border-gray-200 rounded-full">
              <button
                className={`py-2 px-5 text-sm rounded-full transition-colors ${
                  activeTab === 'featured'
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('featured')}
              >
                Featured
              </button>
              <button
                className={`py-2 px-5 text-sm rounded-full transition-colors ${
                  activeTab === 'new'
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('new')}
              >
                New Arrivals
              </button>
              <button
                className={`py-2 px-5 text-sm rounded-full transition-colors ${
                  activeTab === 'bestsellers'
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('bestsellers')}
              >
                Bestsellers
              </button>
            </div>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        {/* View all link */}
        <div className="mt-16 text-center">
          <Link 
            to="/shop" 
            className="group inline-flex items-center py-3 px-6 border border-gray-300 rounded-full hover:bg-black hover:text-white hover:border-black transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
