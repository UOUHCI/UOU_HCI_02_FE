import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: '추천', end: true },
  { to: '/ranking', label: '랭킹', end: false },
  { to: '/category', label: '업데이트', end: false },
  { to: '/category/beauty', label: '뷰티', end: false },
  { to: '/category/sports', label: '스포츠', end: false },
  { to: '/category/sale', label: '세일', end: false },
];

export const Header = (): ReactElement => (
  <header className="sticky top-0 z-30 bg-black text-white">
    <div className="flex h-12 items-center justify-between px-4">
      <NavLink to="/" className="text-[22px] font-black tracking-normal">
        MUSINSA
      </NavLink>

      <div className="flex items-center gap-4 text-2xl leading-none text-white">
        <span aria-label="검색" className="font-light">
          ⌕
        </span>
        <span aria-label="스냅" className="font-light">
          ◇
        </span>
        <span aria-label="메뉴" className="font-light">
          □
        </span>
      </div>
    </div>

    <nav className="flex gap-5 overflow-x-auto px-4 pb-3 text-base font-black text-white/55">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          end={item.end}
          className={({ isActive }) => ['shrink-0 transition', isActive ? 'text-white' : ''].join(' ')}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  </header>
);
