
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Heart, ShoppingBag, ArrowLeft, Star } from 'lucide-react';
import { getProductById, Product } from '../data/products';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { toast } from 'sonner';
import { ProductReviews } from '../components/ProductReviews';
import { useCart } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      try {
        if (id) {
          const foundProduct = getProductById(Number(id));
          if (foundProduct) {
            setProduct(foundProduct);
            setCurrentImage(foundProduct.images[0]);
            setSelectedSize(foundProduct.sizes[0].size);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, selectedSize, quantity);
      toast.success(`Added ${product.name} to your cart`);
    }
  };

  const handleAddToWishlist = () => {
    toast.success(`Added ${product?.name} to your wishlist`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been moved.</p>
        <Link 
          to="/shop" 
          className="inline-flex items-center py-2 px-4 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <main className="pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm mb-8">
            <Link to="/" className="text-gray-500 hover:text-black transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/shop" className="text-gray-500 hover:text-black transition-colors">
              Shop
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
                <img 
                  src={currentImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center opacity-0 animate-fade-in"
                />
              </div>
              
              {/* Thumbnails */}
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden transition ${
                      currentImage === image ? 'ring-2 ring-black' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setCurrentImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Information */}
            <div className="opacity-0 animate-fade-in">
              {product.new && (
                <span className="inline-block py-1 px-3 mb-4 bg-black/5 rounded-full text-xs uppercase tracking-wider font-medium">
                  New Arrival
                </span>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
              
              <div className="mt-2 text-lg text-gray-500">{product.brand}</div>
              
              {/* Rating */}
              <div className="mt-4 flex items-center">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < product.rating ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">({product.rating} / 5)</span>
              </div>
              
              {/* Price */}
              <div className="mt-6 text-2xl font-bold">
                ${product.price.toFixed(2)}
              </div>
              
              {/* Description */}
              <p className="mt-6 text-gray-600 leading-relaxed">
                {product.description}
              </p>
              
              {/* Size selection */}
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
              
              {/* Quantity */}
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
              
              {/* Actions */}
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
              
              {/* Share */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-3">Share</h3>
                <div className="flex space-x-3">
                  <a 
                    href="#" 
                    className="p-2 rounded-full hover:bg-black hover:text-white transition-colors border border-gray-200"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a 
                    href="#" 
                    className="p-2 rounded-full hover:bg-black hover:text-white transition-colors border border-gray-200"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a 
                    href="#" 
                    className="p-2 rounded-full hover:bg-black hover:text-white transition-colors border border-gray-200"
                    aria-label="Share on Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="mt-16 border-t border-gray-200 pt-16">
            <ProductReviews productId={Number(id)} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
