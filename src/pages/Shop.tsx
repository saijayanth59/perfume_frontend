
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Filter } from 'lucide-react';
import { fetchProducts } from '../services/api';
import { Product } from '../types/product';
import { Skeleton } from '@/components/ui/skeleton';

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'unisex', label: 'Unisex' },
];

const collectionOptions = [
  { value: 'all', label: 'All Collections' },
  { value: 'signature', label: 'Signature Collection' },
  { value: 'seasonal', label: 'Seasonal Editions' },
  { value: 'luxury', label: 'Luxury Line' },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'new', label: 'New Arrivals' },
];

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const collectionParam = queryParams.get('collection');
  
  const [category, setCategory] = useState('all');
  const [collection, setCollection] = useState(collectionParam || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update collection state when URL param changes
  useEffect(() => {
    if (collectionParam) {
      setCollection(collectionParam);
    }
  }, [collectionParam]);

  // Fetch products from API
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

  // Helper function to determine if a product is in a collection
  const isInCollection = (product: Product, collectionName: string) => {
    if (collectionName === 'all') return true;
    
    switch(collectionName) {
      case 'signature':
      case 'luxury':
        return product.featured;
      case 'seasonal':
        return product.new;
      default:
        return true;
    }
  };

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    // Apply category filter
    if (category !== 'all' && product.category !== category) {
      return false;
    }
    
    // Apply collection filter
    if (collection !== 'all' && !isInCollection(product, collection)) {
      return false;
    }
    
    // Apply search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'new':
        return a.new ? -1 : 1;
      default:
        return a.featured ? -1 : 1;
    }
  });

  return (
    <div className="min-h-screen">
      <NavBar />
      
      <main className="pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">Our Collection</h1>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Explore our carefully curated selection of premium fragrances designed to evoke emotion and capture memories.
            </p>
          </div>
          
          {/* Filters */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={loading}
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center">
              <Filter className="mr-2 text-gray-400 w-4 h-4" />
              <select
                className="w-full py-2 pl-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black appearance-none bg-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={loading}
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Collection Filter */}
            <div className="flex items-center">
              <Filter className="mr-2 text-gray-400 w-4 h-4" />
              <select
                className="w-full py-2 pl-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black appearance-none bg-white"
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                disabled={loading}
              >
                {collectionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Sort */}
            <div className="flex items-center">
              <span className="mr-2 text-gray-500 text-sm">Sort by:</span>
              <select
                className="w-full py-2 pl-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black appearance-none bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                disabled={loading}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Error state */}
          {error && (
            <div className="text-center py-16">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          )}
          
          {/* Loading state */}
          {loading && (
            <>
              {/* Results count skeleton */}
              <Skeleton className="h-5 w-36 mb-6" />
              
              {/* Products grid skeleton */}
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
            </>
          )}
          
          {/* Results count - only show when not loading and no error */}
          {!loading && !error && (
            <p className="text-gray-500 mb-6">
              Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
            </p>
          )}
          
          {/* Products Grid - only show when not loading and no error */}
          {!loading && !error && (
            <>
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {sortedProducts.map((product, index) => (
                    <ProductCard key={product._id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500">No products found matching your criteria.</p>
                  <button
                    className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      setCategory('all');
                      setCollection('all');
                      setSortBy('featured');
                      setSearchQuery('');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          )}
          
          {/* Pagination - only show when not loading and we have products */}
          {!loading && !error && sortedProducts.length > 0 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
