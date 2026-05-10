import { useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

type PhotoSlot = {
  id: 'front' | 'left' | 'right';
  title: string;
  ghost: string;
};

const photoSlots: PhotoSlot[] = [
  { id: 'front', title: '정면', ghost: '●' },
  { id: 'left', title: '왼쪽', ghost: '◐' },
  { id: 'right', title: '오른쪽', ghost: '◑' },
];

const guideItems = [
  '밝고 고른 조명에서 촬영해 주세요',
  '바른 자세와 무표정을 유지해 주세요',
  '발끝까지 전신이 모두 나오도록 촬영해 주세요',
];

export const AvatarGenerationPage = (): ReactElement => {
  const navigate = useNavigate();
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [uploaded, setUploaded] = useState<Record<PhotoSlot['id'], boolean>>({
    front: false,
    left: false,
    right: false,
  });

  const completeCount = Object.values(uploaded).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white pb-36">
      <header className="sticky top-0 z-20 bg-white px-6 pb-5 pt-5">
        <div className="grid grid-cols-[44px_1fr_44px] items-center">
          <button type="button" onClick={() => navigate(-1)} className="text-4xl leading-none" aria-label="뒤로가기">
            ‹
          </button>
          <div className="text-center text-2xl font-black tracking-normal">
            MUSINSA <span className="rounded bg-black px-1.5 py-0.5 text-sm text-white">K</span>
          </div>
        </div>
      </header>

      <main className="px-6">
        <div className="grid grid-cols-3 gap-3">
          {photoSlots.map((slot, index) => (
            <div
              key={slot.id}
              className={['h-1 rounded-full', index === 0 ? 'bg-black' : 'bg-neutral-100'].join(' ')}
            />
          ))}
        </div>
        <p className="mt-4 text-center text-lg font-semibold text-neutral-500">1 of 3</p>

        <h1 className="mt-16 text-center text-4xl font-black tracking-normal">AI 아바타 생성</h1>

        <section className="mt-12 grid grid-cols-2 gap-5">
          <label className="block">
            <span className="mb-3 block text-lg font-black text-neutral-600">키(cm)</span>
            <input
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              inputMode="numeric"
              className="h-20 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-5 text-2xl font-semibold text-neutral-500 outline-none focus:border-black"
            />
          </label>
          <label className="block">
            <span className="mb-3 block text-lg font-black text-neutral-600">몸무게(kg)</span>
            <input
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              inputMode="numeric"
              className="h-20 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-5 text-2xl font-semibold text-neutral-500 outline-none focus:border-black"
            />
          </label>
        </section>

        <section className="mt-16 grid grid-cols-3 gap-5">
          {photoSlots.map((slot) => (
            <label key={slot.id} className="block">
              <span className="mb-6 block text-center text-2xl font-black">{slot.title}</span>
              <span
                className={[
                  'relative flex aspect-[3/5] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 bg-neutral-50 transition',
                  uploaded[slot.id] ? 'border-black' : 'border-neutral-100',
                ].join(' ')}
              >
                <span className="absolute text-[88px] font-black leading-none text-neutral-200">{slot.ghost}</span>
                <span className="z-10 mb-4 flex size-14 items-center justify-center rounded-xl bg-black text-2xl text-white">
                  ⌑
                </span>
                <span className="z-10 text-center text-sm font-black leading-tight">전신 사진 촬영</span>
                {uploaded[slot.id] ? (
                  <span className="absolute right-2 top-2 rounded-full bg-black px-2 py-1 text-[10px] font-black text-white">
                    완료
                  </span>
                ) : null}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={() => setUploaded((current) => ({ ...current, [slot.id]: true }))}
                />
              </span>
            </label>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-normal">최상의 결과를 위한 안내</h2>
          <div className="mt-7 space-y-6">
            {guideItems.map((item, index) => (
              <div key={item} className="flex items-center gap-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-black text-sm font-black">
                  {index + 1}
                </span>
                <p className="text-xl font-black leading-snug text-neutral-800">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 border-t border-neutral-100 bg-white/95 px-6 py-5 backdrop-blur">
        <button
          type="button"
          onClick={() => navigate('/avatar/dashboard')}
          className="h-16 w-full rounded-xl bg-black text-2xl font-black text-white transition active:scale-[0.99]"
        >
          아바타 생성하기
        </button>
        <button type="button" onClick={() => navigate('/avatar/dashboard')} className="mt-5 w-full text-xl font-bold underline">
          다음에 하기
        </button>
        <p className="sr-only">{completeCount}개 사진 업로드됨</p>
      </footer>
    </div>
  );
};
