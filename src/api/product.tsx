import { Product } from "../data/products";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const jsonData = await response.json();
    const data: Product[] = jsonData.products;
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function addRating(
  productId: string,
  username: string,
  gmail: string,
  rating: number,
  comment: string
): Promise<void> {
  try {
    console.log(productId);
    const response = await fetch(`${API_URL}/${productId}/rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, gmail, rating, comment }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add rating: ${response.statusText}`);
    }
    console.log("response", response);

    const data = await response.json();
    console.log("Rating added successfully:", data);
  } catch (error) {
    console.error("Error adding rating:", error);
  }
}

export async function fetchProductById(productId: string) {
  try {
    const response = await fetch(`${API_URL}/${productId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const jsonData = await response.json();
    return jsonData.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
