import { createBrowserRouter } from 'react-router-dom';
import { LegacyChrome } from './layouts/LegacyChrome';
import { RootLayout } from './layouts/RootLayout';
import { CategoryPage } from './pages/CategoryPage';
import { AvatarDashboardPage } from './pages/AvatarDashboardPage';
import { AvatarGenerationPage } from './pages/AvatarGenerationPage';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { RankingPage } from './pages/RankingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'category',
        element: (
          <LegacyChrome>
            <CategoryPage />
          </LegacyChrome>
        ),
      },
      {
        path: 'category/:categoryId',
        element: (
          <LegacyChrome>
            <CategoryPage />
          </LegacyChrome>
        ),
      },
      {
        path: 'ranking',
        element: (
          <LegacyChrome>
            <RankingPage />
          </LegacyChrome>
        ),
      },
      {
        path: 'product/:productId',
        element: <ProductDetailPage />,
      },
      {
        path: 'avatar/create',
        element: <AvatarGenerationPage />,
      },
      {
        path: 'avatar/dashboard',
        element: <AvatarDashboardPage />,
      },
      {
        path: '*',
        element: <HomePage />,
      },
    ],
  },
]);
