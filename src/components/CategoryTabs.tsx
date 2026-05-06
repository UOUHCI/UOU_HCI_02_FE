import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import type { Category } from '../types/product';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategoryId?: string;
}

export const CategoryTabs = ({ categories, selectedCategoryId }: CategoryTabsProps): ReactElement => (
  <div className="grid grid-cols-4 gap-x-4 gap-y-5 px-4 py-6">
    <Link
      to="/category"
      className={[
        'flex flex-col items-center gap-2 text-xs font-bold transition',
        selectedCategoryId ? 'text-neutral-500' : 'text-ink',
      ].join(' ')}
    >
      <span className="grid size-11 place-items-center rounded-full bg-neutral-100 text-sm text-ink">전</span>
      <span>전체</span>
    </Link>
    {categories.map((category) => (
      <Link
        key={category.id}
        to={`/category/${category.id}`}
        className={[
          'flex flex-col items-center gap-2 text-xs font-bold transition',
          selectedCategoryId === category.id ? 'text-ink' : 'text-neutral-500',
        ].join(' ')}
      >
        <span className="grid size-11 place-items-center rounded-full bg-neutral-100 text-sm text-ink">
          {category.name.slice(0, 1)}
        </span>
        <span>{category.name}</span>
      </Link>
    ))}
  </div>
);
