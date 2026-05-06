import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: '추천', end: true },
  { to: '/ranking', label: '랭킹', end: false },
  { to: '/category', label: '업데이트', end: false },
  { to: '/category/accessory', label: '뷰티', end: false },
  { to: '/category/shoes', label: '스포츠', end: false },
  { to: '/category/outer', label: '세일', end: false },
];

export const Header = (): ReactElement => (
  <header className="sticky top-0 z-20 bg-ink text-white">
    <div className="flex h-12 items-center justify-between px-4">
      <NavLink to="/" className="text-xl font-black tracking-normal">
        MUSINSA
      </NavLink>

      <div className="flex items-center gap-4 text-xl">
        <span aria-label="검색" role="img">⌕</span>
        <span aria-label="알림" role="img">♢</span>
        <span aria-label="쇼핑백" role="img">▢</span>
      </div>
    </div>

    <nav className="flex gap-5 overflow-x-auto px-4 pb-3 text-sm font-bold text-white/60">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          end={item.end}
          className={({ isActive }) => ['shrink-0', isActive ? 'text-white' : ''].join(' ')}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  </header>
);
