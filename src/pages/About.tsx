import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  GlobeIcon,
  LeafIcon,
  UserIcon,
  HeartIcon,
  CheckCircleIcon,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative h-[50vh] overflow-hidden mb-16">
          <div className="absolute inset-0">
            <img
              src="https://i.pinimg.com/736x/c6/9d/6b/c69d6bee94bd9c4707d2c335ef1d183d.jpg"
              alt="Our Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative container mx-auto h-full flex items-center px-4 md:px-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Our Story
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-xl">
                Discover the passion and craftsmanship behind ESSENCE, where
                every fragrance tells a story.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-lg text-gray-600 mb-8">
              Founded in 2010, ESSENCE began with a simple belief: that
              fragrance is more than just a scent—it's an experience, a memory,
              and a form of self-expression.
            </p>
            <p className="text-lg text-gray-600">
              Our founder, Claire Laurent, a perfumer with over 20 years of
              experience, set out to create fragrances that capture moments and
              emotions, using only the finest ingredients sourced from around
              the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=2070"
                alt="Essence Laboratory"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Artistry & Innovation</h3>
              <p className="text-gray-600 mb-6">
                At ESSENCE, we believe in the perfect balance between
                traditional perfumery techniques and modern innovation. Our
                laboratory in Paris combines age-old methods with cutting-edge
                technology to create fragrances that are both timeless and
                contemporary.
              </p>
              <p className="text-gray-600">
                Each fragrance is meticulously crafted through a process that
                can take anywhere from several months to years, ensuring that
                every note and accord is perfectly balanced.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center mb-4">
                  <LeafIcon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  We are committed to sustainable sourcing and production
                  methods, minimizing our environmental impact while maximizing
                  the quality of our fragrances.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Quality</h3>
                <p className="text-gray-600">
                  We never compromise on quality. From ingredient selection to
                  bottling, every step in our process is held to the highest
                  standards.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center mb-4">
                  <GlobeIcon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Diversity</h3>
                <p className="text-gray-600">
                  We celebrate diversity in all its forms, creating fragrances
                  that transcend cultural boundaries and speak to the breadth of
                  human experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="bg-black text-white py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
            <p className="text-lg max-w-3xl mx-auto">
              At ESSENCE, we're committed to creating fragrances that not only
              smell incredible but are also responsibly made. Our dedication to
              quality, sustainability, and innovation drives everything we do.
            </p>
            <div className="mt-10">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                <HeartIcon className="h-4 w-4 mr-2" />
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
