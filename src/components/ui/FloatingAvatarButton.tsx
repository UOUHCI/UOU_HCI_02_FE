import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const FloatingAvatarButton = (): ReactElement => (
  <Link
    to="/avatar/create"
    className="fixed bottom-20 right-[max(18px,calc((100vw-430px)/2+18px))] z-40 flex size-20 flex-col items-center justify-center rounded-full bg-black text-white shadow-[0_12px_26px_rgba(0,0,0,0.28)]"
    aria-label="AI 아바타 생성 페이지로 이동"
  >
    <span className="relative mb-1 block size-7 rounded-full border-2 border-white before:absolute before:left-1/2 before:top-6 before:h-4 before:w-8 before:-translate-x-1/2 before:rounded-t-full before:border-2 before:border-white before:border-b-0" />
    <span className="text-xs font-black leading-none">AI 아바타</span>
  </Link>
);
