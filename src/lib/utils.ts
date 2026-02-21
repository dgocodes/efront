/**
 * Formata um número para o padrão de moeda brasileiro (BRL).
 * Exemplo: 1250.5 -> R$ 1.250,50
 */
export function formatPrice(price: number | string): string {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numericPrice)) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

/**
 * Helper para concatenar classes do Tailwind condicionalmente (opcional, mas muito útil)
 * Ex: cn('base-class', isOpen && 'active-class')
 */
export function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}