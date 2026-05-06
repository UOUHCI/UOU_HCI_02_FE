export const formatPrice = (price: number): string => `${price.toLocaleString('ko-KR')}원`;

export const getDiscountedPrice = (price: number, discountRate: number): number => {
  if (discountRate <= 0) {
    return price;
  }

  return Math.floor(price * (1 - discountRate / 100));
};
