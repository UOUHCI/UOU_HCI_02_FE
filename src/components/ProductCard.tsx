import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { formatPrice, getDiscountedPrice } from '../utils/format';

interface ProductCardProps {
  product: Product;
  rank?: number;
}

export const ProductCard = ({ product, rank }: ProductCardProps): ReactElement => {
  const discountedPrice = getDiscountedPrice(product.price, product.discountRate);

  return (
    <Link to={`/product/${product.id}`} className="group block min-w-0 bg-white">
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {rank ? (
          <span className="absolute left-0 top-0 grid size-7 place-items-center bg-ink text-sm font-black text-white">{rank}</span>
        ) : null}
        <button className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/90 text-lg text-neutral-700">
          ♡
        </button>
      </div>
      <div className="min-w-0 p-2">
        <p className="truncate text-[11px] font-black text-neutral-500">{product.brand}</p>
        <h3 className="mt-1 line-clamp-2 min-h-9 text-xs font-semibold leading-[18px]">{product.name}</h3>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-1">
          {product.discountRate > 0 ? <span className="text-sm font-black text-red-600">{product.discountRate}%</span> : null}
          <span className="text-sm font-black">{formatPrice(discountedPrice)}</span>
        </div>
        {product.discountRate > 0 ? (
          <p className="mt-0.5 text-xs text-neutral-400 line-through">{formatPrice(product.price)}</p>
        ) : null}
        <p className="mt-1 text-xs font-bold text-neutral-400">♡ {(product.rank * 1.7 + 2.1).toFixed(1)}k</p>
      </div>
    </Link>
  );
};
