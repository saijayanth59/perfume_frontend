export interface Product {
  _id: string;
  name: string;
  brand: string;
  description: string;
  shortDescription: string;
  price: number;
  sizes: { size: string; price: number; _id: string }[];
  images: string[];
  category: "men" | "women" | "unisex";
  featured: boolean;
  new: boolean;
  ratings: {
    username: string;
    gmail: string;
    rating: number;
    comment: string;
  }[];
  avgRating: number;
  numRatings: number;
  __v: number;
}

export const collections = [
  {
    id: "signature",
    name: "Signature Collection",
    description: "Our iconic fragrances that define the essence of our brand.",
    image:
      "https://i.pinimg.com/736x/44/5b/8a/445b8a2102a825d864584bcbab6f74f9.jpg",
    filters: ["featured"],
  },
  {
    id: "seasonal",
    name: "Seasonal Editions",
    description: "Limited releases inspired by the changing seasons.",
    image:
      "https://i.pinimg.com/736x/a1/94/6b/a1946b0657aee8aa274c8875a935d6ee.jpg",
    filters: ["new"],
  },
  {
    id: "men",
    name: "Men's Collection",
    description: "Sophisticated scents tailored for the modern gentleman.",
    image:
      "https://i.pinimg.com/736x/02/cb/34/02cb342c22e9ee4083a76897b213a1ee.jpg",
    filters: ["category:men"],
  },
  {
    id: "women",
    name: "Women's Collection",
    description: "Elegant fragrances crafted to capture feminine essence.",
    image:
      "https://i.pinimg.com/736x/73/e5/47/73e5477a1f89b3da2a2db121820149b9.jpg",
    filters: ["category:women"],
  },
  {
    id: "unisex",
    name: "Unisex Fragrances",
    description: "Gender-neutral scents for everyone to enjoy.",
    image:
      "https://i.pinimg.com/736x/c5/60/ab/c560abebc240b9be1a82f68677c6ec49.jpg",
    filters: ["category:unisex"],
  },
  {
    id: "luxury",
    name: "Luxury Line",
    description: "Premium fragrances featuring rare and exotic ingredients.",
    image:
      "https://i.pinimg.com/736x/f2/7e/07/f27e07b1e09ffc0a5954cb7cd468bb3d.jpg",
    filters: ["featured"],
  },
];
