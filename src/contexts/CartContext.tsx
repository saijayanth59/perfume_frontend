import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../data/products";
import { toast } from "../hooks/use-toast";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, quantity: number) => void;
  removeItem: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedItems: CartItem[] = JSON.parse(savedCart);
        setItems(parsedItems.filter((item) => item.product && item.product.id));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const price = items.reduce((total, item) => {
      const sizePrice =
        item.product.sizes?.find((s) => s.size === item.size)?.price ||
        item.product.price;
      return total + sizePrice * item.quantity;
    }, 0);

    setTotalItems(itemCount);
    setTotalPrice(price);
  }, [items]);

  const addItem = (product: Product, size: string, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast({
          title: "Item updated",
          description: `${product.name} quantity increased`,
        });
        return updatedItems;
      } else {
        toast({
          title: "Item added to cart",
          description: `${product.name} has been added to your cart`,
        });
        return [...prevItems, { product, quantity, size }];
      }
    });
  };

  const removeItem = (productId: number, size: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );

    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const updateQuantity = (
    productId: number,
    size: string,
    quantity: number
  ) => {
    if (quantity < 1) {
      removeItem(productId, size);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
