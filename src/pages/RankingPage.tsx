import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { RankingList } from '../components/RankingList';
import { SectionHeader } from '../components/SectionHeader';
import { useProductStore } from '../store/productStore';

export const RankingPage = (): ReactElement => {
  const { rankingProducts, isLoading, errorMessage, loadRankingProducts } = useProductStore();

  useEffect(() => {
    void loadRankingProducts();
  }, [loadRankingProducts]);

  return (
    <div>
      <div className="px-4 pb-5 pt-5">
        <SectionHeader eyebrow="Ranking" title="인기 상품 랭킹" />
      </div>

      {isLoading ? <LoadingState /> : null}
      {errorMessage ? <ErrorState message={errorMessage} /> : null}
      {!isLoading && !errorMessage ? <RankingList products={rankingProducts} /> : null}
    </div>
  );
};
