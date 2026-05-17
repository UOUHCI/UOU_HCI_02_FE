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

type BodyConcern = {
  id: string;
  label: string;
  issues: string[];
  measurementLabel: string;
  measurementPlaceholder: string;
};

const bodyConcerns: BodyConcern[] = [
  {
    id: 'pants-inseam',
    label: '하의 길이 (인심)',
    issues: ['바지가 자주 길어요', '바지가 자주 짧아요', '수선이 자주 필요해요'],
    measurementLabel: '인심 길이',
    measurementPlaceholder: '예: 76',
  },
  {
    id: 'waist',
    label: '허리 둘레',
    issues: ['허리가 자주 남아요', '허리가 자주 끼어요', '밑위가 불편해요'],
    measurementLabel: '허리 둘레',
    measurementPlaceholder: '예: 78',
  },
  {
    id: 'top-length',
    label: '상의 길이 (총장)',
    issues: ['상의가 자주 길어요', '상의가 자주 짧아요', '넣어 입기 불편해요'],
    measurementLabel: '선호 총장',
    measurementPlaceholder: '예: 68',
  },
  {
    id: 'thigh',
    label: '허벅지 둘레',
    issues: ['허벅지가 자주 끼어요', '앉을 때 당겨요', '허벅지에 맞추면 허리가 남아요'],
    measurementLabel: '허벅지 둘레',
    measurementPlaceholder: '예: 56',
  },
  {
    id: 'chest',
    label: '가슴/가슴둘레',
    issues: ['가슴이 자주 끼어요', '품이 자주 남아요', '단추/지퍼가 당겨요'],
    measurementLabel: '가슴 둘레',
    measurementPlaceholder: '예: 96',
  },
  {
    id: 'foot',
    label: '발 사이즈',
    issues: ['발볼이 넓어요', '발등이 높아요', '사이즈가 애매해요'],
    measurementLabel: '발 길이',
    measurementPlaceholder: '예: 260',
  },
  {
    id: 'shoulder',
    label: '어깨 너비',
    issues: ['어깨가 자주 끼어요', '어깨선이 처져요', '팔을 들 때 불편해요'],
    measurementLabel: '어깨 너비',
    measurementPlaceholder: '예: 47',
  },
  {
    id: 'arm',
    label: '팔 길이',
    issues: ['소매가 자주 길어요', '소매가 자주 짧아요', '손목 위치가 안 맞아요'],
    measurementLabel: '팔 길이',
    measurementPlaceholder: '예: 61',
  },
  {
    id: 'hip',
    label: '엉덩이 둘레',
    issues: ['엉덩이가 자주 끼어요', '허리에 맞추면 힙이 불편해요', '뒤태 핏이 어색해요'],
    measurementLabel: '엉덩이 둘레',
    measurementPlaceholder: '예: 98',
  },
  {
    id: 'calf',
    label: '종아리 둘레',
    issues: ['종아리가 자주 끼어요', '부츠/팬츠가 불편해요', '밑단 핏이 어색해요'],
    measurementLabel: '종아리 둘레',
    measurementPlaceholder: '예: 38',
  },
  {
    id: 'none',
    label: '특별히 없음',
    issues: [],
    measurementLabel: '',
    measurementPlaceholder: '',
  },
  {
    id: 'other',
    label: '기타',
    issues: ['직접 설명할게요'],
    measurementLabel: '관련 치수',
    measurementPlaceholder: '선택 입력',
  },
];

type ConcernDetail = {
  issue?: string;
  severity?: 'mild' | 'normal' | 'strong';
  measurement?: string;
  memo?: string;
};

const severityOptions: Array<{ value: NonNullable<ConcernDetail['severity']>; label: string }> = [
  { value: 'mild', label: '약간' },
  { value: 'normal', label: '보통' },
  { value: 'strong', label: '심함' },
];

export const AvatarGenerationPage = (): ReactElement => {
  const navigate = useNavigate();
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [concernDetails, setConcernDetails] = useState<Record<string, ConcernDetail>>({});
  const [uploaded, setUploaded] = useState<Record<PhotoSlot['id'], boolean>>({
    front: false,
    left: false,
    right: false,
  });

  const completeCount = Object.values(uploaded).filter(Boolean).length;
  const selectedDetailConcerns = bodyConcerns.filter(
    (concern) => selectedConcerns.includes(concern.id) && concern.id !== 'none',
  );

  const toggleConcern = (concernId: string): void => {
    setSelectedConcerns((current) => {
      if (current.includes(concernId)) {
        setConcernDetails((details) => {
          const nextDetails = { ...details };
          delete nextDetails[concernId];
          return nextDetails;
        });
        return current.filter((id) => id !== concernId);
      }

      if (concernId === 'none') {
        setConcernDetails({});
        return ['none'];
      }

      return [...current.filter((id) => id !== 'none'), concernId];
    });
  };

  const updateConcernDetail = (concernId: string, detail: ConcernDetail): void => {
    setConcernDetails((current) => ({
      ...current,
      [concernId]: {
        ...current[concernId],
        ...detail,
      },
    }));
  };

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

        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black text-neutral-400">복수 선택 가능</p>
              <h2 className="mt-2 text-3xl font-black tracking-normal">신체 특징 입력</h2>
            </div>
            <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-sm font-black text-neutral-500">
              {selectedConcerns.length}개 선택
            </span>
          </div>
          <p className="mt-4 text-lg font-semibold leading-7 text-neutral-500">
            특이체형에도 잘 맞는 3D 아바타를 만들 수 있도록 평소 핏이 잘 맞지 않는 부위를 선택해 주세요.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            {bodyConcerns.map((concern) => {
              const isSelected = selectedConcerns.includes(concern.id);

              return (
                <button
                  key={concern.id}
                  type="button"
                  onClick={() => toggleConcern(concern.id)}
                  className={[
                    'min-h-24 rounded-2xl border-2 p-4 text-left transition',
                    isSelected ? 'border-black bg-black text-white' : 'border-neutral-100 bg-neutral-50 text-black',
                  ].join(' ')}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-lg font-black leading-snug">{concern.label}</span>
                    <span
                      className={[
                        'grid size-6 shrink-0 place-items-center rounded-full border text-xs font-black',
                        isSelected ? 'border-white bg-white text-black' : 'border-neutral-300 text-neutral-400',
                      ].join(' ')}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                  </span>
                  <span className={['mt-3 block text-sm font-black', isSelected ? 'text-white/70' : 'text-neutral-400'].join(' ')}>
                    {concern.id === 'other' ? '직접 입력' : '아바타 보정'}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedDetailConcerns.length > 0 ? (
            <div className="mt-7 space-y-5">
              {selectedDetailConcerns.map((concern) => {
                const detail = concernDetails[concern.id] ?? {};

                return (
                  <div key={concern.id} className="rounded-2xl border border-neutral-200 bg-white p-4">
                    <h3 className="text-xl font-black">{concern.label}</h3>

                    <div className="mt-4">
                      <p className="mb-3 text-sm font-black text-neutral-500">어떤 점이 불편한가요?</p>
                      <div className="flex flex-wrap gap-2">
                        {concern.issues.map((issue) => (
                          <button
                            key={issue}
                            type="button"
                            onClick={() => updateConcernDetail(concern.id, { issue })}
                            className={[
                              'rounded-full border px-4 py-2 text-sm font-black transition',
                              detail.issue === issue ? 'border-black bg-black text-white' : 'border-neutral-200 bg-neutral-50',
                            ].join(' ')}
                          >
                            {issue}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="mb-3 text-sm font-black text-neutral-500">불편 정도</p>
                      <div className="grid grid-cols-3 gap-2">
                        {severityOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => updateConcernDetail(concern.id, { severity: option.value })}
                            className={[
                              'h-11 rounded-xl border text-sm font-black transition',
                              detail.severity === option.value ? 'border-black bg-black text-white' : 'border-neutral-200 bg-neutral-50',
                            ].join(' ')}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4">
                      <label className="block">
                        <span className="mb-2 block text-sm font-black text-neutral-500">{concern.measurementLabel} (선택)</span>
                        <div className="flex items-center rounded-xl border border-neutral-200 bg-neutral-50 px-4">
                          <input
                            value={detail.measurement ?? ''}
                            onChange={(event) => updateConcernDetail(concern.id, { measurement: event.target.value })}
                            inputMode="decimal"
                            placeholder={concern.measurementPlaceholder}
                            className="h-14 min-w-0 flex-1 bg-transparent text-lg font-semibold outline-none"
                          />
                          <span className="text-sm font-black text-neutral-400">cm</span>
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-black text-neutral-500">추가 설명 (선택)</span>
                        <textarea
                          value={detail.memo ?? ''}
                          onChange={(event) => updateConcernDetail(concern.id, { memo: event.target.value })}
                          placeholder="예: 허벅지에 맞추면 허리가 항상 남아요"
                          className="min-h-24 w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-base font-semibold outline-none focus:border-black"
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
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
        <p className="sr-only">
          선택된 구매 어려움 부위 {selectedConcerns.join(', ')} {JSON.stringify(concernDetails)}
        </p>
      </footer>
    </div>
  );
};
