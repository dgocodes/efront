// services/cartService.ts

import { api } from "./api";

export interface CartItemDTO {
  skuId: string;
  quantity: number;
}

export const cartService = {
  /**
   * Envia os itens do localStorage para o banco de dados
   */
  async syncCart(items: CartItemDTO[], token: string): Promise<void> {
    if (!items.length || !token) return;

    await api.post('/api/cart/sync', 
      { items }, 
    );
  },

  /**
   * Adiciona um item individual (Útil para o futuro)
   */
  async addItem(item: CartItemDTO): Promise<void> {
    await api.post('/api/cart/items', item);
  }
};