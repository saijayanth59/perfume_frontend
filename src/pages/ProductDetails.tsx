
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { fetchProductById } from '../services/api';
import { Product } from '../types/product';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { ProductReviews } from '../components/ProductReviews';
import ProductImageGallery from '../components/ProductImageGallery';
import ProductInfo from '../components/ProductInfo';
import ProductActions from '../components/ProductActions';
import ProductSocial from '../components/ProductSocial';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const productData = await fetchProductById(id);
        if (productData) {
          setProduct(productData);
          setError(null);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <>
        <NavBar />
        <main className="pt-24 pb-16 px-4 md:px-6">
          <div className="container mx-auto">
            <Skeleton className="h-6 w-64 mb-8" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <Skeleton className="aspect-square w-full rounded-lg mb-4" />
                <div className="flex space-x-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="w-20 h-20 rounded-md" />
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="pt-6 space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-6">{error || 'The product you\'re looking for doesn\'t exist or has been moved.'}</p>
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
          <BreadcrumbNav productName={product.name} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ProductImageGallery images={product.images} name={product.name} />
            
            <div>
              <ProductInfo product={product} />
              <ProductActions product={product} />
              <ProductSocial />
            </div>
          </div>
          
          <div className="mt-16 border-t border-gray-200 pt-16">
            <ProductReviews productId={product._id} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
