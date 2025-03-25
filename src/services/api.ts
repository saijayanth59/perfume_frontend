
import { Product } from '../types/product';

const API_BASE_URL = 'https://perfume-backend-api.onrender.com/api';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  try {
    const products = await fetchProducts();
    return products.find(product => product._id === id);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}
