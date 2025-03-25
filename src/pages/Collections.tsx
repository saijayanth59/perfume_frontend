
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GalleryHorizontal, Layers3 } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { products } from '../data/products';

// Define collection categories
const collections = [
  {
    id: 'signature',
    name: 'Signature Collection',
    description: 'Our iconic fragrances that define the essence of our brand.',
    image: 'https://images.unsplash.com/photo-1615104100916-d079c1e3cd31?q=80&w=1000',
    filters: ['featured'],
  },
  {
    id: 'seasonal',
    name: 'Seasonal Editions',
    description: 'Limited releases inspired by the changing seasons.',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=1000',
    filters: ['new'],
  },
  {
    id: 'men',
    name: 'Men\'s Collection',
    description: 'Sophisticated scents tailored for the modern gentleman.',
    image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?q=80&w=1000',
    filters: ['category:men'],
  },
  {
    id: 'women',
    name: 'Women\'s Collection',
    description: 'Elegant fragrances crafted to capture feminine essence.',
    image: 'https://images.unsplash.com/photo-1541108564883-bde8e501a115?q=80&w=1000',
    filters: ['category:women'],
  },
  {
    id: 'unisex',
    name: 'Unisex Fragrances',
    description: 'Gender-neutral scents for everyone to enjoy.',
    image: 'https://images.unsplash.com/photo-1557828000-edf6ef1fbca6?q=80&w=1000',
    filters: ['category:unisex'],
  },
  {
    id: 'luxury',
    name: 'Luxury Line',
    description: 'Premium fragrances featuring rare and exotic ingredients.',
    image: 'https://images.unsplash.com/photo-1605651531144-51381895e23d?q=80&w=1000',
    filters: ['featured'],
  },
];

const Collections = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Get a sample product for each collection
  const getCollectionSample = (collectionId: string) => {
    const collection = collections.find(c => c.id === collectionId);
    if (!collection) return [];
    
    return products.filter(product => {
      return collection.filters.some(filter => {
        if (filter.startsWith('category:')) {
          const category = filter.split(':')[1];
          return product.category === category;
        } else if (filter === 'featured') {
          return product.featured;
        } else if (filter === 'new') {
          return product.new;
        }
        return false;
      });
    }).slice(0, 2); // Get up to 2 products per collection
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      
      <main className="pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">Our Collections</h1>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Explore our curated collections of premium fragrances, each telling its own unique story.
            </p>
            
            {/* View mode toggle */}
            <div className="flex justify-center mt-6">
              <div className="inline-flex border border-gray-200 rounded-full p-1">
                <button
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <GalleryHorizontal className="w-4 h-4" />
                </button>
                <button
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === 'list' ? 'bg-black text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <Layers3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Collections */}
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-12'
          }`}>
            {collections.map((collection) => (
              <div 
                key={collection.id} 
                className={`group ${
                  viewMode === 'list' 
                    ? 'flex flex-col md:flex-row gap-8 items-center' 
                    : ''
                }`}
              >
                {/* Collection Image */}
                <div className={`relative overflow-hidden rounded-lg ${
                  viewMode === 'list' ? 'md:w-1/3' : 'aspect-[3/2] mb-4'
                }`}>
                  <img 
                    src={collection.image} 
                    alt={collection.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                      to={`/shop?collection=${collection.id}`} 
                      className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-black hover:text-white transition-colors"
                    >
                      View Collection
                    </Link>
                  </div>
                </div>
                
                {/* Collection Details */}
                <div className={viewMode === 'list' ? 'md:w-2/3' : ''}>
                  <h2 className="text-xl font-bold">{collection.name}</h2>
                  <p className="mt-2 text-gray-500">{collection.description}</p>
                  
                  {viewMode === 'list' && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {getCollectionSample(collection.id).map((product) => (
                        <div key={product.id} className="flex items-center">
                          <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                      <Link
                        to={`/shop?collection=${collection.id}`}
                        className="text-sm font-medium flex items-center mt-2 hover:underline"
                      >
                        View all products
                      </Link>
                    </div>
                  )}
                  
                  {viewMode === 'grid' && (
                    <Link
                      to={`/shop?collection=${collection.id}`}
                      className="inline-block mt-3 text-sm font-medium hover:underline"
                    >
                      Explore Collection →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Collections;
