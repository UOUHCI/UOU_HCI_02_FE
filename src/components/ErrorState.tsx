import type { ReactElement } from 'react';

interface ErrorStateProps {
  message: string;
}

export const ErrorState = ({ message }: ErrorStateProps): ReactElement => (
  <div className="mx-4 flex min-h-40 items-center justify-center border border-red-200 bg-red-50 px-4 text-center text-sm font-bold text-red-700">
    {message}
  </div>
);
