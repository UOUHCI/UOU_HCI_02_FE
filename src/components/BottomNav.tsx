import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: '홈', icon: '⌂', end: true },
  { to: '/category', label: '카테고리', icon: '☷', end: false },
  { to: '/ranking', label: '랭킹', icon: '◎', end: false },
];

export const BottomNav = (): ReactElement => (
  <nav className="fixed bottom-0 left-1/2 z-30 grid h-16 w-full max-w-[430px] -translate-x-1/2 grid-cols-3 border-t border-neutral-200 bg-white">
    {navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        className={({ isActive }) =>
          [
            'flex flex-col items-center justify-center gap-0.5 text-[11px] font-bold transition',
            isActive ? 'text-ink' : 'text-neutral-400',
          ].join(' ')
        }
      >
        <span className="text-xl leading-none">{item.icon}</span>
        <span>{item.label}</span>
      </NavLink>
    ))}
  </nav>
);
