import { api } from '@/data/api'
import { Product } from '@/data/type/product'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

async function getFearedProducts(): Promise<Product[]> {
  const response = await api('/products/featured')

  const products = await response.json()

  return products
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const [highLightedProduct, ...otherProducts] = await getFearedProducts()

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highLightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
      >
        <Image
          src={highLightedProduct.image}
          width={960}
          height={960}
          quality={100}
          alt=""
          className=" group-hover:scale-105 transition-transform duration-500"
        />

        <div className=" absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className=" text-sm truncate"> {highLightedProduct.title}</span>
          <span className=" flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highLightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>
      {otherProducts.map((products) => {
        return (
          <Link
            key={products.id}
            href={`/product/${products.slug}`}
            className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
          >
            <Image
              src={products.image}
              width={960}
              height={960}
              quality={100}
              alt=""
              className=" group-hover:scale-105 transition-transform duration-500"
            />
            <div className=" absolute bottom-10 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className=" text-sm truncate"> {products.title}</span>
              <span className=" flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {products.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
