import AppLoading from '@/components/AppLoading';
import AppLoadingIndicator from '@/components/AppLoadingIndicator';
import App from '@/core/App';
import { AppCurrentUser } from '@/packages/ui/context/app';
import '@/static/CabinSketch.css';
import { sql } from '@/utils/mysql';
import Script from 'next/script';
import { Suspense } from 'react';
import './client-entry';
import './globals.scss';

export default async function RootLayout ({
  children,
  modal,
}: any) {

  const currentUser = await sql.unique<AppCurrentUser>`
      SELECT login, bio, avatar_url
      FROM github_personal.curr_user;
  `;

  return (
    <html lang="en">
    <body>
    <App currentUser={currentUser!}>
      <Suspense fallback={<AppLoading />}>
        {children}
      </Suspense>
      <Suspense fallback={<AppLoading />}>
        {modal}
      </Suspense>
      <AppLoadingIndicator />
    </App>
    </body>
    </html>
  );
}

