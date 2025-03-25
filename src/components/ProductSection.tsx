
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { fetchProducts } from '../services/api';
import { Product } from '../types/product';
import { Skeleton } from './ui/skeleton';

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  // Filter products based on active tab
  const getFeaturedProducts = () => products.filter(product => product.featured);
  const getNewProducts = () => products.filter(product => product.new);
  
  // Determine which products to display based on the active tab
  const displayProducts = activeTab === 'featured' 
    ? getFeaturedProducts() 
    : activeTab === 'new' 
      ? getNewProducts() 
      : getFeaturedProducts(); // Default to featured
  
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              >
                Bestsellers
              </button>
            </div>
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-[300px] w-full rounded-lg" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            ))}
          </div>
        )}
        
        {/* Products grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {displayProducts.length > 0 ? (
              displayProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No products found in this category.</p>
              </div>
            )}
          </div>
        )}
        
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
