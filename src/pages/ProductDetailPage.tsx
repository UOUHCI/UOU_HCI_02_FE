import type { ReactElement } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { useProductStore } from '../store/productStore';
import { formatPrice, getDiscountedPrice } from '../utils/format';

type ProductTab = 'info' | 'review' | 'qna' | 'delivery';

const tabs: Array<{ id: ProductTab; label: string }> = [
  { id: 'info', label: '상품정보' },
  { id: 'review', label: '리뷰' },
  { id: 'qna', label: '문의' },
  { id: 'delivery', label: '배송/교환/환불' },
];

const sizes = ['S', 'M', 'L', 'XL'];

export const ProductDetailPage = (): ReactElement => {
  const { productId = 'p-001' } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { selectedProduct, isLoading, errorMessage, loadProduct } = useProductStore();
  const [selectedTab, setSelectedTab] = useState<ProductTab>('info');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    void loadProduct(productId);
  }, [loadProduct, productId]);

  const discountedPrice = useMemo(() => {
    if (!selectedProduct) {
      return 0;
    }

    return getDiscountedPrice(selectedProduct.price, selectedProduct.discountRate);
  }, [selectedProduct]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (errorMessage) {
    return <ErrorState message={errorMessage} />;
  }

  if (!selectedProduct) {
    return <ErrorState message="상품 정보를 찾을 수 없습니다." />;
  }

  return (
    <div className="relative min-h-screen bg-white">
      <header className="sticky top-0 z-20 flex h-12 items-center justify-between bg-white px-4">
        <button className="text-2xl font-bold" onClick={() => navigate(-1)} type="button">
          ‹
        </button>
        <button className="text-xl" type="button" aria-label="쇼핑백">
          ▢
        </button>
      </header>

      <section>
        <div className="relative aspect-square bg-neutral-100">
          <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="h-full w-full object-cover" />
          <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
            1 / 5
          </span>
        </div>
      </section>

      <section className="border-b border-neutral-100 px-4 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-black text-neutral-500">{selectedProduct.brand}</p>
            <h1 className="mt-2 text-xl font-black leading-7 tracking-normal">{selectedProduct.name}</h1>
          </div>
          <button className="grid size-10 shrink-0 place-items-center rounded-full border border-neutral-200 text-xl" type="button">
            ♡
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm font-bold">
          <span>★ 4.9</span>
          <span className="text-neutral-400">12,430건</span>
        </div>

        <div className="mt-4">
          {selectedProduct.discountRate > 0 ? (
            <p className="text-sm text-neutral-400 line-through">{formatPrice(selectedProduct.price)}</p>
          ) : null}
          <div className="mt-1 flex items-baseline gap-2">
            {selectedProduct.discountRate > 0 ? (
              <span className="text-2xl font-black text-red-600">{selectedProduct.discountRate}%</span>
            ) : null}
            <span className="text-2xl font-black">{formatPrice(discountedPrice)}</span>
          </div>
        </div>

        <div className="mt-4 bg-neutral-50 px-3 py-3 text-sm">
          <p className="font-black">무신사 현대카드 추가 할인</p>
          <p className="mt-1 text-neutral-500">결제 시 최대 5% 청구 할인</p>
        </div>
      </section>

      <section className="border-b border-neutral-100 px-4 py-5 text-sm">
        <h2 className="font-black">배송정보</h2>
        <p className="mt-3 font-bold">무료배송 <span className="font-normal text-neutral-500">(일부 도서산간 제외)</span></p>
        <p className="mt-1 text-neutral-500">내일 도착 예정</p>
        <h2 className="mt-5 font-black">적립금</h2>
        <p className="mt-2 text-neutral-500">최대 <span className="font-black text-ink">695원</span> 적립</p>
      </section>

      <section>
        <div className="sticky top-12 z-10 grid grid-cols-4 border-b border-neutral-100 bg-white text-xs font-bold">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={[
                'h-12 border-b-2 px-1',
                selectedTab === tab.id ? 'border-ink text-ink' : 'border-transparent text-neutral-400',
              ].join(' ')}
              onClick={() => setSelectedTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="px-4 py-6">
          {selectedTab === 'info' ? <InfoTab productName={selectedProduct.name} imageUrl={selectedProduct.imageUrl} /> : null}
          {selectedTab === 'review' ? <ReviewTab /> : null}
          {selectedTab === 'qna' ? <QnaTab /> : null}
          {selectedTab === 'delivery' ? <DeliveryTab /> : null}
        </div>
      </section>

      <div className="fixed bottom-0 left-1/2 z-30 flex h-16 w-full max-w-[430px] -translate-x-1/2 gap-2 border-t border-neutral-200 bg-white p-2">
        <button className="w-14 border border-neutral-200 text-xs font-bold text-neutral-500" type="button">
          ♡<br />12543
        </button>
        <button className="flex-1 bg-ink text-base font-black text-white" onClick={() => setIsSheetOpen(true)} type="button">
          구매하기
        </button>
      </div>

      {isSheetOpen ? (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setIsSheetOpen(false)}>
          <div
            className="absolute bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 bg-white p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 h-1 w-12 rounded-full bg-neutral-300 mx-auto" />
            <h2 className="text-lg font-black">옵션 선택</h2>
            <p className="mt-1 text-sm text-neutral-500">{selectedProduct.name}</p>

            <div className="mt-5">
              <p className="mb-2 text-sm font-black">사이즈</p>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={[
                      'h-11 border text-sm font-black',
                      selectedSize === size ? 'border-ink bg-ink text-white' : 'border-neutral-200',
                    ].join(' ')}
                    onClick={() => setSelectedSize(size)}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm font-black">수량</p>
              <div className="flex items-center border border-neutral-200">
                <button className="size-10 text-lg" onClick={() => setQuantity((value) => Math.max(1, value - 1))} type="button">
                  -
                </button>
                <span className="grid size-10 place-items-center text-sm font-black">{quantity}</span>
                <button className="size-10 text-lg" onClick={() => setQuantity((value) => value + 1)} type="button">
                  +
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
              <span className="font-black">총 상품금액</span>
              <span className="text-xl font-black">{formatPrice(discountedPrice * quantity)}</span>
            </div>

            <button className="mt-5 h-12 w-full bg-ink text-base font-black text-white" type="button">
              장바구니 담기
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

interface InfoTabProps {
  productName: string;
  imageUrl: string;
}

const InfoTab = ({ productName, imageUrl }: InfoTabProps): ReactElement => (
  <div>
    <h2 className="text-lg font-black">상품 상세 정보</h2>
    <img src={imageUrl} alt={`${productName} 상세이미지1`} className="mt-4 aspect-[4/5] w-full object-cover" />
    <div className="mt-4 bg-neutral-50 p-4">
      <h3 className="font-black">사이즈 정보</h3>
      <div className="mt-3 space-y-2 text-sm text-neutral-600">
        <p>S 총장 68 / 어깨 48 / 가슴 52</p>
        <p>M 총장 70 / 어깨 50 / 가슴 54.5</p>
        <p>L 총장 72 / 어깨 52 / 가슴 57</p>
        <p>XL 총장 74 / 어깨 54 / 가슴 59.5</p>
      </div>
    </div>
  </div>
);

const ReviewTab = (): ReactElement => (
  <div className="space-y-4">
    <h2 className="text-lg font-black">리뷰 12,430</h2>
    {['원단이 탄탄하고 핏이 깔끔합니다.', '기본템으로 매일 입기 좋아요.'].map((review) => (
      <article key={review} className="border-b border-neutral-100 pb-4">
        <p className="font-black">★★★★★</p>
        <p className="mt-2 text-sm leading-6 text-neutral-600">{review}</p>
      </article>
    ))}
  </div>
);

const QnaTab = (): ReactElement => (
  <div className="bg-neutral-50 p-4 text-sm leading-6 text-neutral-600">
    상품 문의는 주문 전 사이즈, 재입고, 배송 일정 등을 확인하는 용도로 사용할 수 있습니다.
  </div>
);

const DeliveryTab = (): ReactElement => (
  <div className="space-y-3 text-sm leading-6 text-neutral-600">
    <p>배송비는 무료이며 일부 도서산간 지역은 추가 비용이 발생할 수 있습니다.</p>
    <p>교환/반품은 상품 수령 후 7일 이내 신청 가능합니다.</p>
    <p>상품 훼손 또는 착용 흔적이 있는 경우 교환/반품이 제한될 수 있습니다.</p>
  </div>
);
