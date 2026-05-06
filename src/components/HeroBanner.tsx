import type { ReactElement } from 'react';

export const HeroBanner = (): ReactElement => (
  <section className="relative h-40 overflow-hidden bg-ink text-white">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
        alt="Banner"
        className="h-full w-full object-cover opacity-70"
      />
    </div>
    <div className="relative flex h-full flex-col items-center justify-center bg-black/20 px-6 text-center">
      <span className="mb-2 bg-red-600 px-2 py-1 text-xs font-black">SALE</span>
      <h1 className="text-2xl font-black tracking-normal">겨울 아우터 클리어런스</h1>
      <p className="mt-2 text-sm font-bold text-white/90">최대 80% 할인 + 추가 10% 쿠폰</p>
    </div>
  </section>
);
