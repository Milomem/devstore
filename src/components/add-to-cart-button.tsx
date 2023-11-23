'use client'

import { useCart } from '@/context/cart-context'

export interface AddToCartButtonProps {
  productId: number
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  function handleAddToProduct() {
    addToCart(productId)
  }

  return (
    <button
      type="button"
      onClick={handleAddToProduct}
      className=" mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
    >
      Adicionar ao carrinho
    </button>
  )
}
