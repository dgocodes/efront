// hooks/useCart.ts
import { useState, useEffect } from 'react';

export function useCart() {
  const [items, setItems] = useState<any[]>([]);

  // Carrega os itens do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart-storage');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Suporta formato Zustand ou Array puro
        setItems(parsed.state?.items || (Array.isArray(parsed) ? parsed : []));
      } catch (e) {
        setItems([]);
      }
    }
  }, []);

  // Função para adicionar ao carrinho
  const addToCart = (product: { skuId: string, name?: string, price?: number }) => {
    const currentCart = [...items];
    const existingItem = currentCart.find(i => i.skuId === product.skuId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ 
        skuId: product.skuId, 
        quantity: 1,
        name: product.name,
        price: product.price 
      });
    }

    // Atualiza estado e LocalStorage
    setItems(currentCart);
    localStorage.setItem('cart-storage', JSON.stringify(currentCart));
    
    // Dispara um evento para que outros componentes saibam que o carrinho mudou
    window.dispatchEvent(new Event('storage')); 
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart-storage');
  };

  return { items, addToCart, clearCart };
}