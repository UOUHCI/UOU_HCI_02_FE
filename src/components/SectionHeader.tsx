import type { ReactElement } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export const SectionHeader = ({ eyebrow, title, description }: SectionHeaderProps): ReactElement => (
  <div className="flex flex-col gap-1">
    {eyebrow ? <span className="text-xs font-bold uppercase text-muted">{eyebrow}</span> : null}
    <h2 className="text-xl font-black tracking-normal">{title}</h2>
    {description ? <p className="max-w-2xl text-sm leading-6 text-muted">{description}</p> : null}
  </div>
);
