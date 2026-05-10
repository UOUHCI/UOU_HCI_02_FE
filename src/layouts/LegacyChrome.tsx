import type { ReactElement, ReactNode } from 'react';
import { BottomNav } from '../components/BottomNav';
import { Header } from '../components/Header';

type LegacyChromeProps = {
  children: ReactNode;
};

export const LegacyChrome = ({ children }: LegacyChromeProps): ReactElement => (
  <>
    <Header />
    <main className="pb-24">{children}</main>
    <BottomNav />
  </>
);
