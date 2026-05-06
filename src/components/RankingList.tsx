import type { ReactElement } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types/product';

interface RankingListProps {
  products: Product[];
}

export const RankingList = ({ products }: RankingListProps): ReactElement => (
  <div className="grid grid-cols-2 gap-2 px-4">
    {products.map((product, index) => (
      <ProductCard key={product.id} product={product} rank={index + 1} />
    ))}
  </div>
);
