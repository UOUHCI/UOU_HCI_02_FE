import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: '홈', icon: '⌂', end: true },
  { to: '/category', label: '카테고리', icon: '≡', end: false },
  { to: '/ranking', label: '랭킹', icon: '◎', end: false },
];

export const BottomNav = (): ReactElement => (
  <nav className="fixed bottom-0 left-1/2 z-40 grid h-[72px] w-full max-w-[430px] -translate-x-1/2 grid-cols-3 border-t border-neutral-200 bg-white">
    {navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        className={({ isActive }) =>
          [
            'flex flex-col items-center justify-center gap-1 text-xs font-black transition',
            isActive ? 'text-black' : 'text-neutral-400',
          ].join(' ')
        }
      >
        <span className="text-[28px] leading-none">{item.icon}</span>
        <span>{item.label}</span>
      </NavLink>
    ))}
  </nav>
);
