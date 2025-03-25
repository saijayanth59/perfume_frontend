
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1612016316594-7a5a89bf1c05?q=80&w=2000" 
          alt="Luxury perfume" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-3xl">
          <span className="inline-block py-1 px-3 mb-6 bg-white/20 backdrop-blur-md rounded-full text-white text-xs uppercase tracking-wider opacity-0 animate-fade-in animate-delay-100">
            New Collection
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight opacity-0 animate-fade-in animate-delay-200">
            Discover Your <br /> Signature Scent
          </h1>
          
          <p className="mt-6 text-lg text-white/90 max-w-xl opacity-0 animate-fade-in animate-delay-300">
            Explore our curated collection of premium fragrances designed to captivate the senses and leave a lasting impression.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4 opacity-0 animate-fade-in animate-delay-400">
            <Link 
              to="/shop" 
              className="group inline-flex items-center py-3 px-6 bg-white text-black rounded-full hover:bg-black hover:text-white transition-colors duration-300"
            >
              <span>Shop Now</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            
            <Link 
              to="/collections" 
              className="py-3 px-6 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors duration-300"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 opacity-0 animate-fade-in animate-delay-500">
        <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center p-2">
          <div className="w-1.5 h-3 bg-white rounded-full animate-float" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
