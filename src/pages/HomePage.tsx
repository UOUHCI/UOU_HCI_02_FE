import type { ReactElement } from 'react';
import { BottomNav } from '../components/BottomNav';
import { Header } from '../components/Header';
import { FloatingAvatarButton } from '../components/ui/FloatingAvatarButton';
import { homeRecommendations } from '../data/avatarExperience';
import { formatPrice } from '../utils/format';

const categories = [
  { label: '전', name: '전체' },
  { label: '상', name: '상의' },
  { label: '아', name: '아우터' },
  { label: '바', name: '바지' },
  { label: '신', name: '신발' },
  { label: '핏', name: 'AI핏' },
  { label: '액', name: '액세서리' },
];

export const HomePage = (): ReactElement => (
  <div className="min-h-screen bg-white pb-24">
    <Header />

    <section className="relative h-44 overflow-hidden bg-black text-white">
      <img
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1100&q=85"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-950/35 to-black/20" />
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <span className="mb-3 bg-red-700 px-3 py-1 text-xs font-black">SALE</span>
        <h1 className="text-3xl font-black tracking-normal">겨울 아우터 클리어런스</h1>
        <p className="mt-2 text-base font-black">최대 80% 할인 + AI 핏 추천</p>
      </div>
    </section>

    <section className="grid grid-cols-4 gap-y-5 border-b border-neutral-100 px-5 py-6">
      {categories.map((category) => (
        <button key={category.name} type="button" className="flex flex-col items-center gap-2">
          <span className="flex size-14 items-center justify-center rounded-full bg-neutral-100 text-xl font-black">
            {category.label}
          </span>
          <span className="text-sm font-black text-neutral-600">{category.name}</span>
        </button>
      ))}
    </section>

    <section className="px-4 pt-7">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-[25px] font-black tracking-normal">지금 가장 인기 있는 상품</h2>
        <button type="button" className="text-sm font-black text-neutral-500">
          전체보기 &gt;
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-6">
        {homeRecommendations.map((product, index) => (
          <article key={product.id} className="min-w-0">
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
              <img src={product.imageUrl} alt="" className="h-full w-full object-cover" />
              <span className="absolute left-0 top-0 bg-black px-3 py-2 text-sm font-black text-white">{index + 1}</span>
              <button
                type="button"
                aria-label="좋아요"
                className="absolute right-2 top-2 flex size-10 items-center justify-center rounded-full bg-white/85 text-2xl"
              >
                ♡
              </button>
            </div>
            <div className="pt-3">
              <p className="text-xs font-black text-neutral-500">{product.brand}</p>
              <h3 className="mt-1 line-clamp-2 min-h-11 text-lg font-black leading-snug tracking-normal">{product.name}</h3>
              <p className="mt-2 text-lg font-black">
                <span className="mr-1 text-red-700">{product.discountRate}%</span>
                {formatPrice(product.price)}원
              </p>
              <p className="mt-1 text-sm font-bold text-neutral-400">♡ {product.likes}</p>
            </div>
          </article>
        ))}
      </div>
    </section>

    <FloatingAvatarButton />
    <BottomNav />
  </div>
);
