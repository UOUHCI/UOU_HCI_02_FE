import type { ReactElement } from 'react';

export const LoadingState = (): ReactElement => (
  <div className="mx-4 flex min-h-40 items-center justify-center border border-line bg-neutral-50 text-sm font-bold text-muted">
    상품을 불러오는 중입니다.
  </div>
);
