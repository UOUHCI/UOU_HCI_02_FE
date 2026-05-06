import type { ReactElement } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { Header } from '../components/Header';

export const RootLayout = (): ReactElement => {
  const { pathname } = useLocation();
  const isProductPage = pathname.startsWith('/product/');

  return (
    <div className="min-h-screen bg-neutral-100 text-ink">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-white shadow-2xl shadow-neutral-200/80">
        {isProductPage ? null : <Header />}
        <main className={isProductPage ? 'pb-24' : 'pb-20'}>
          <Outlet />
        </main>
        {isProductPage ? null : <BottomNav />}
      </div>
    </div>
  );
};
