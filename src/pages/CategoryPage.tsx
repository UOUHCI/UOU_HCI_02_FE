import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryTabs } from '../components/CategoryTabs';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { ProductGrid } from '../components/ProductGrid';
import { SectionHeader } from '../components/SectionHeader';
import { useProductStore } from '../store/productStore';

export const CategoryPage = (): ReactElement => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { categories, products, selectedCategoryId, isLoading, errorMessage, loadCategories, loadProducts } = useProductStore();

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    void loadProducts(categoryId);
  }, [categoryId, loadProducts]);

  const selectedCategoryName = categories.find((category) => category.id === selectedCategoryId)?.name;

  return (
    <div>
      <div className="px-4 pb-2 pt-5">
        <SectionHeader
          eyebrow="Category"
          title={selectedCategoryName ? `${selectedCategoryName} 상품` : '전체 상품'}
        />
      </div>

      <CategoryTabs categories={categories} selectedCategoryId={selectedCategoryId} />

      {isLoading ? <LoadingState /> : null}
      {errorMessage ? <ErrorState message={errorMessage} /> : null}
      {!isLoading && !errorMessage ? <ProductGrid products={products} /> : null}
    </div>
  );
};
