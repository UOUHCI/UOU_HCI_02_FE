export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  discountRate: number;
  imageUrl: string;
  categoryId: string;
  rank: number;
  isNew: boolean;
  isSale: boolean;
}
