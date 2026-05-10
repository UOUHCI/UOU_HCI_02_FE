import type { ReactElement } from 'react';
import type { OutfitPreset } from '../../types/avatar';
import { formatPrice } from '../../utils/format';

type OutfitCardProps = {
  outfit: OutfitPreset;
  isActive: boolean;
  onTryOn: (outfit: OutfitPreset) => void;
};

export const OutfitCard = ({ outfit, isActive, onTryOn }: OutfitCardProps): ReactElement => (
  <article
    className={[
      'min-w-[286px] rounded-md border bg-white p-3 transition',
      isActive ? 'border-black shadow-[0_12px_34px_rgba(0,0,0,0.16)]' : 'border-neutral-200',
    ].join(' ')}
  >
    <div className="aspect-[4/5] overflow-hidden rounded bg-neutral-100">
      <img src={outfit.imageUrl} alt="" className="h-full w-full object-cover" />
    </div>
    <div className="pt-4">
      <p className="text-xs font-black text-neutral-500">{outfit.brand}</p>
      <h3 className="mt-1 text-[22px] font-black leading-tight tracking-normal">{outfit.name}</h3>
      <p className="mt-2 min-h-10 text-sm font-semibold leading-5 text-neutral-500">{outfit.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {outfit.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-bold">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          {outfit.discountRate > 0 ? (
            <span className="mr-1 text-sm font-black text-red-700">{outfit.discountRate}%</span>
          ) : null}
          <span className="text-lg font-black">{outfit.price ? `${formatPrice(outfit.price)}원` : '체형 확인'}</span>
        </div>
        <button
          type="button"
          onClick={() => onTryOn(outfit)}
          className={[
            'h-11 shrink-0 rounded-md px-5 text-sm font-black transition',
            isActive ? 'bg-black text-white' : 'border border-black bg-white text-black',
          ].join(' ')}
        >
          입어보기
        </button>
      </div>
    </div>
  </article>
);
