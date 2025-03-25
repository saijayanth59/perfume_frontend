
import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

const ProductImageGallery = ({ images, name }: ProductImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState<string>(images[0]);

  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
        <img 
          src={currentImage} 
          alt={name} 
          className="w-full h-full object-cover object-center opacity-0 animate-fade-in"
        />
      </div>
      
      <div className="flex space-x-4">
        {images.map((image, index) => (
          <button
            key={index}
            className={`w-20 h-20 rounded-md overflow-hidden transition ${
              currentImage === image ? 'ring-2 ring-black' : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => setCurrentImage(image)}
          >
            <img 
              src={image} 
              alt={`${name} thumbnail ${index + 1}`} 
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
