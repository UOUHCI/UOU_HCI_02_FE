import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export const RootLayout = (): ReactElement => (
  <div className="min-h-screen bg-neutral-100 text-ink">
    <div className="mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-white shadow-2xl shadow-neutral-200/80">
      <Outlet />
    </div>
  </div>
);
