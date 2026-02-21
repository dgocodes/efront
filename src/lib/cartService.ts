// services/cartService.ts
import { api } from "./api";

export interface CartItemDTO {
  skuId: string;
  quantity: number;
}

export const cartService = {
  /**
   * Sincroniza o carrinho local com o servidor
   */
  async syncCart(items: CartItemDTO[]): Promise<void> {
    if (!items.length) return;

    // O token é injetado automaticamente pela lib/api.ts
    await api.post('/cart/sync', { items });
  },

  /**
   * Adiciona um item individual ao carrinho no banco
   */
  async addItem(item: CartItemDTO): Promise<void> {
    await api.post('/cart/items', item);
  },

  /**
   * Remove um item do carrinho no banco
   */
  async removeItem(skuId: string): Promise<void> {
    await api.delete(`/cart/items/${skuId}`);
  }
};