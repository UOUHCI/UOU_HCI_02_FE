export type ClothingKey = 'tanktop' | 'shorts';

export type ClothingVisibility = Record<ClothingKey, boolean>;

export type ClothingColors = Record<ClothingKey, string>;

export type OutfitPreset = {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  discountRate: number;
  imageUrl: string;
  tags: string[];
  visibility: ClothingVisibility;
  colors: ClothingColors;
};

export type Recommendation = {
  id: string;
  name: string;
  brand: string;
  price: number;
  discountRate: number;
  imageUrl: string;
  category: string;
  likes: string;
};

export type ClosetCategory = 'top' | 'bottom' | 'outer';

export type ClosetItem = {
  id: string;
  mesh: ClothingKey | null;
  category: ClosetCategory;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  color: string;
};
