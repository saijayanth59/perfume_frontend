import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Product } from "../data/products";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ProductReviews } from "../components/ProductReviews";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfo from "../components/ProductInfo";
import ProductActions from "../components/ProductActions";
import ProductSocial from "../components/ProductSocial";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { fetchProductById } from "@/api/product";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
        <p className="text-gray-500 mb-6">
          The product you're looking for doesn't exist or has been moved.
        </p>
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
            <ProductReviews productId={Number(id)} product={product} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
