
import { Facebook, Twitter, Instagram } from 'lucide-react';

const ProductSocial = () => {
  return (
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
  );
};

export default ProductSocial;
