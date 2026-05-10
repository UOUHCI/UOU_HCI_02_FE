import { useMemo, useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { Header } from '../components/Header';
import { AvatarViewer } from '../components/avatar/AvatarViewer';
import { OutfitCard } from '../components/outfit/OutfitCard';
import {
  closetItems,
  defaultClothingColors,
  defaultClothingVisibility,
  outfitPresets,
} from '../data/avatarExperience';
import type { ClosetCategory, ClosetItem, ClothingColors, ClothingVisibility, OutfitPreset } from '../types/avatar';
import { formatPrice } from '../utils/format';

const closetTabs: Array<{ id: ClosetCategory; label: string }> = [
  { id: 'top', label: '상의' },
  { id: 'bottom', label: '하의' },
  { id: 'outer', label: '아우터' },
];

const findClosetItemByColor = (category: ClosetCategory, color: string): ClosetItem | undefined =>
  closetItems.find((item) => item.category === category && item.color === color);

export const AvatarDashboardPage = (): ReactElement => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ClosetCategory>('top');
  const [activeOutfitId, setActiveOutfitId] = useState(outfitPresets[0].id);
  const [selectedTopId, setSelectedTopId] = useState('top-knit-cream');
  const [selectedBottomId, setSelectedBottomId] = useState('bottom-denim');
  const [selectedOuterId, setSelectedOuterId] = useState<string | null>(null);

  const selectedOutfit = useMemo(
    () => outfitPresets.find((outfit) => outfit.id === activeOutfitId) ?? outfitPresets[0],
    [activeOutfitId],
  );
  const currentLookName = activeOutfitId === 'custom' ? '커스텀 착장' : selectedOutfit.name;

  const selectedTop = closetItems.find((item) => item.id === selectedTopId);
  const selectedBottom = closetItems.find((item) => item.id === selectedBottomId);
  const selectedOuter = selectedOuterId ? closetItems.find((item) => item.id === selectedOuterId) : undefined;

  const visibility: ClothingVisibility = {
    ...defaultClothingVisibility,
    tanktop: Boolean(selectedTop),
    shorts: Boolean(selectedBottom),
  };

  const colors: ClothingColors = {
    tanktop: selectedTop?.color ?? defaultClothingColors.tanktop,
    shorts: selectedBottom?.color ?? defaultClothingColors.shorts,
  };

  const totalPrice = [selectedTop, selectedBottom, selectedOuter].reduce((sum, item) => sum + (item?.price ?? 0), 0);
  const visibleClosetItems = closetItems.filter((item) => item.category === activeTab);

  const applyOutfit = (outfit: OutfitPreset): void => {
    setActiveOutfitId(outfit.id);
    setSelectedTopId(findClosetItemByColor('top', outfit.colors.tanktop)?.id ?? selectedTopId);
    setSelectedBottomId(findClosetItemByColor('bottom', outfit.colors.shorts)?.id ?? selectedBottomId);
  };

  const selectClosetItem = (item: ClosetItem): void => {
    setActiveOutfitId('custom');

    if (item.category === 'top') {
      setSelectedTopId((current) => (current === item.id ? '' : item.id));
      return;
    }

    if (item.category === 'bottom') {
      setSelectedBottomId((current) => (current === item.id ? '' : item.id));
      return;
    }

    setSelectedOuterId((current) => (current === item.id ? null : item.id));
  };

  const isSelected = (item: ClosetItem): boolean =>
    item.id === selectedTopId || item.id === selectedBottomId || item.id === selectedOuterId;

  return (
    <div className="min-h-screen bg-white pb-24">
      <Header />

      <div className="sticky top-[92px] z-20 grid h-16 grid-cols-[48px_1fr_48px] items-center border-b border-neutral-100 bg-white px-3">
        <button type="button" onClick={() => navigate('/')} className="text-4xl leading-none" aria-label="홈으로 이동">
          ‹
        </button>
        <h1 className="text-center text-xl font-black tracking-normal">AI 아바타 피팅룸 - 착장 관리</h1>
      </div>

      <section className="relative h-[42vh] min-h-[315px] max-h-[420px] border-b border-neutral-100 bg-neutral-50">
        <AvatarViewer visibility={visibility} colors={colors} />
        <button
          type="button"
          aria-label="전체 화면"
          className="absolute bottom-5 right-5 flex size-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-2xl shadow-lg"
        >
          ⛶
        </button>
      </section>

      <section className="-mt-4 rounded-t-[28px] bg-white px-4 pt-4">
        <div className="mx-auto mb-6 h-1.5 w-14 rounded-full bg-neutral-300" />
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black text-neutral-500">현재 착장</p>
            <h2 className="text-3xl font-black tracking-normal">{currentLookName}</h2>
            <p className="mt-2 text-sm font-bold text-neutral-500">
              {selectedTop?.name ?? '상의 없음'} · {selectedBottom?.name ?? '하의 없음'}
            </p>
          </div>
          <button type="button" className="rounded-md bg-black px-4 py-3 text-sm font-black text-white">
            전체 구매하기
          </button>
        </div>
      </section>

      <section className="mt-8 px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-black tracking-normal">Closet</h2>
          <span className="text-sm font-black text-neutral-500">총 {closetItems.length}개</span>
        </div>

        <div className="grid grid-cols-3 border-b border-neutral-200 text-lg font-black">
          {closetTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={[
                'h-12 border-b-2 transition',
                activeTab === tab.id ? 'border-black text-black' : 'border-transparent text-neutral-400',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {visibleClosetItems.map((item) => {
            const selected = isSelected(item);

            return (
              <article key={item.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => selectClosetItem(item)}
                  className="group block w-full text-left"
                  aria-label={`${item.name} ${selected ? '해제' : '착용'}`}
                >
                  <span className="relative block aspect-square overflow-hidden bg-neutral-100">
                    <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                    <span
                      className={[
                        'absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full text-sm font-black text-white',
                        selected ? 'bg-red-500' : 'bg-black',
                      ].join(' ')}
                    >
                      {selected ? '×' : '+'}
                    </span>
                    <span
                      className="absolute bottom-1.5 left-1.5 size-4 rounded-full border border-white shadow"
                      style={{ backgroundColor: item.color }}
                    />
                  </span>
                  <span className="mt-2 block truncate text-[10px] font-black text-neutral-500">{item.brand}</span>
                  <span className="mt-0.5 block truncate text-xs font-black">{item.name}</span>
                  <span className="mt-0.5 block text-xs font-black">{formatPrice(item.price)}원</span>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-8 px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-black tracking-normal">스타일 추천</h2>
          <div className="flex gap-4 text-4xl font-light leading-none text-neutral-400">
            <span>‹</span>
            <span>›</span>
          </div>
        </div>
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-3">
          {outfitPresets.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} isActive={outfit.id === activeOutfitId} onTryOn={applyOutfit} />
          ))}
        </div>
      </section>

      <div className="mt-8 flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-4">
        <p className="text-lg font-black">
          총 주문금액: <span className="text-2xl">{formatPrice(totalPrice)}원</span>
        </p>
        <button type="button" className="h-14 rounded-md bg-black px-6 text-xl font-black text-white">
          적용하기
        </button>
      </div>

      <BottomNav />
    </div>
  );
};
