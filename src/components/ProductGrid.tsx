import type { ReactElement } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types/product';

interface ProductGridProps {
  products: Product[];
  showRank?: boolean;
}

export const ProductGrid = ({ products, showRank = false }: ProductGridProps): ReactElement => (
  <div className="grid grid-cols-2 gap-2 px-4">
    {products.map((product, index) => (
      <ProductCard key={product.id} product={product} rank={showRank ? index + 1 : undefined} />
    ))}
  </div>
);
