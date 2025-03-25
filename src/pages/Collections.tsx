import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GalleryHorizontal, Layers3 } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { fetchProducts } from "@/api/product";
import { collections } from "@/data/products";

const Collections = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Get a sample product for each collection
  const getCollectionSample = (collectionId: string) => {
    const collection = collections.find((c) => c.id === collectionId);
    if (!collection) return [];

    return products
      .filter((product) => {
        return collection.filters.some((filter) => {
          if (filter.startsWith("category:")) {
            const category = filter.split(":")[1];
            return product.category === category;
          } else if (filter === "featured") {
            return product.featured;
          } else if (filter === "new") {
            return product.new;
          }
          return false;
        });
      })
      .slice(0, 2); // Get up to 2 products per collection
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
              Explore our curated collections of premium fragrances, each
              telling its own unique story.
            </p>

            {/* View mode toggle */}
            <div className="flex justify-center mt-6">
              <div className="inline-flex border border-gray-200 rounded-full p-1">
                <button
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === "grid"
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <GalleryHorizontal className="w-4 h-4" />
                </button>
                <button
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === "list"
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <Layers3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-12"
            }`}
          >
            {collections.map((collection) => (
              <div
                key={collection.id}
                className={`group ${
                  viewMode === "list"
                    ? "flex flex-col md:flex-row gap-8 items-center"
                    : ""
                }`}
              >
                {/* Collection Image */}
                <div
                  className={`relative overflow-hidden rounded-lg ${
                    viewMode === "list" ? "md:w-1/3" : "aspect-[3/2] mb-4"
                  }`}
                >
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
                <div className={viewMode === "list" ? "md:w-2/3" : ""}>
                  <h2 className="text-xl font-bold">{collection.name}</h2>
                  <p className="mt-2 text-gray-500">{collection.description}</p>

                  {viewMode === "list" && (
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
                            <p className="text-sm font-medium">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              ${product.price.toFixed(2)}
                            </p>
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

                  {viewMode === "grid" && (
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
