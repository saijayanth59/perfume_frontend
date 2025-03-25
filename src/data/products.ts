
export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  shortDescription: string;
  price: number;
  sizes: { size: string; price: number }[];
  images: string[];
  category: 'men' | 'women' | 'unisex';
  featured: boolean;
  new: boolean;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ethereal Bloom",
    brand: "Lumière",
    description: "A captivating blend of wild jasmine, bergamot, and sandalwood, creating an aura of mystery and elegance. The top notes offer a fresh citrus burst that evolves into a heart of floral sophistication, finally settling into a warm, woody base that lingers throughout the day.",
    shortDescription: "Delicate floral notes with hints of citrus and wood",
    price: 129.99,
    sizes: [
      { size: "30ml", price: 129.99 },
      { size: "50ml", price: 179.99 },
      { size: "100ml", price: 239.99 }
    ],
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000",
      "https://images.unsplash.com/photo-1626784215021-2e39ccb64efa?q=80&w=1000"
    ],
    category: "women",
    featured: true,
    new: true,
    rating: 4.8
  },
  {
    id: 2,
    name: "Midnight Oud",
    brand: "Noir Collection",
    description: "An intense, sophisticated fragrance built around precious oud wood, Bulgarian rose, and amber. This exotic blend begins with spicy top notes, revealing a complex heart of smoky oud and velvety rose, all anchored by a rich base of amber and vanilla that creates an unforgettable sensory experience.",
    shortDescription: "Rich, exotic blend of oud wood and amber",
    price: 199.99,
    sizes: [
      { size: "50ml", price: 199.99 },
      { size: "100ml", price: 299.99 }
    ],
    images: [
      "https://images.unsplash.com/photo-1566977776052-6e61e28f31d9?q=80&w=1000",
      "https://images.unsplash.com/photo-1558157264-af9a68857ba4?q=80&w=1000"
    ],
    category: "unisex",
    featured: true,
    new: false,
    rating: 4.9
  },
  {
    id: 3,
    name: "Aqua Vitae",
    brand: "Azure",
    description: "A refreshing aquatic fragrance that captures the essence of Mediterranean coastlines. Crisp sea notes blend with aromatic herbs and a touch of citrus, creating an invigorating scent that evolves into a clean, subtle masculinity with undertones of cedarwood and musk.",
    shortDescription: "Invigorating aquatic scent with Mediterranean herbs",
    price: 89.99,
    sizes: [
      { size: "30ml", price: 89.99 },
      { size: "50ml", price: 129.99 },
      { size: "100ml", price: 169.99 }
    ],
    images: [
      "https://images.unsplash.com/photo-1615361200098-9e630ec29b4e?q=80&w=1000",
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e8?q=80&w=1000"
    ],
    category: "men",
    featured: true,
    new: false,
    rating: 4.6
  },
  {
    id: 4,
    name: "Velvet Rose",
    brand: "Lumière",
    description: "A luxurious celebration of the queen of flowers, featuring Turkish rose, peony, and blackcurrant. This opulent fragrance opens with sparkling fruity notes that give way to a sumptuous floral heart, all wrapped in a warm embrace of patchouli and musk that ensures a lasting impression.",
    shortDescription: "Luxurious rose fragrance with fruity undertones",
    price: 149.99,
    sizes: [
      { size: "30ml", price: 149.99 },
      { size: "50ml", price: 199.99 },
      { size: "100ml", price: 259.99 }
    ],
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000",
      "https://images.unsplash.com/photo-1596742578443-7682ef5251cd?q=80&w=1000"
    ],
    category: "women",
    featured: true,
    new: true,
    rating: 4.7
  },
  {
    id: 5,
    name: "Amber Woods",
    brand: "Terra",
    description: "A warm, enveloping fragrance that blends rare amber with cedarwood, vetiver, and vanilla. The composition begins with a hint of bergamot and pepper before revealing its rich, woody heart, finally settling into a long-lasting base of amber, vanilla, and balsamic notes that provide comfort and depth.",
    shortDescription: "Warm amber fragrance with woody depth",
    price: 159.99,
    sizes: [
      { size: "50ml", price: 159.99 },
      { size: "100ml", price: 219.99 }
    ],
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000",
      "https://images.unsplash.com/photo-1611375387541-25e1b2ee0c1c?q=80&w=1000"
    ],
    category: "unisex",
    featured: false,
    new: true,
    rating: 4.5
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};
