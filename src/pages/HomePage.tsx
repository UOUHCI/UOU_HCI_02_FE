import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CategoryTabs } from '../components/CategoryTabs';
import { ErrorState } from '../components/ErrorState';
import { HeroBanner } from '../components/HeroBanner';
import { LoadingState } from '../components/LoadingState';
import { ProductGrid } from '../components/ProductGrid';
import { useProductStore } from '../store/productStore';

export const HomePage = (): ReactElement => {
  const { categories, rankingProducts, isLoading, errorMessage, loadCategories, loadRankingProducts } = useProductStore();

  useEffect(() => {
    void loadCategories();
    void loadRankingProducts();
  }, [loadCategories, loadRankingProducts]);

  const featuredProducts = rankingProducts.slice(0, 5);

  return (
    <div>
      <HeroBanner />

      <section className="border-b border-neutral-100">
        <CategoryTabs categories={categories} />
      </section>

      <section className="pt-6">
        <div className="mb-4 flex items-center justify-between px-4">
          <h2 className="text-lg font-black tracking-normal">지금 가장 인기 있는 상품</h2>
          <Link to="/ranking" className="text-xs font-bold text-neutral-500">
            전체보기 &gt;
          </Link>
        </div>
        {isLoading ? <LoadingState /> : null}
        {errorMessage ? <ErrorState message={errorMessage} /> : null}
        {!isLoading && !errorMessage ? <ProductGrid products={featuredProducts} showRank /> : null}
      </section>
    </div>
  );
};
