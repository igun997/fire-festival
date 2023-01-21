import type { AppProps } from 'next/app';
import * as React from 'react';
import 'antd/dist/antd.less';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrPage from '../components/ErrBoundaries';
import { storeConfig } from '../configs/store.config';
import { persistStore } from 'redux-persist';
import moment from 'moment';
import id_ID from 'antd/lib/locale/id_ID';
import { ConfigProvider } from 'antd';
import BaseLayout from '../components/Layout';
import Head from 'next/head';
import PlainLayout from '../components/PlainLayout';
import '/assets/less/ant-custom.less';

let persistor = persistStore(storeConfig);
moment().locale('id');
const ListLayouts: any = { base: BaseLayout, plain: PlainLayout };

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = ListLayouts[(Component as any).layout ?? 'plain'];
  const _title = (Component as any).title ?? '-';
  const _description = (Component as any).description ?? '-';
  const _siteName = '';
  return (
    <Provider store={storeConfig}>
      <PersistGate persistor={persistor}>
        <ErrorBoundary FallbackComponent={ErrPage}>
          <ConfigProvider componentSize="middle" locale={id_ID}>
            <Layout>
              <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/*<title>{_title}</title>*/}
                <meta name="description" content={_description} />
                <meta name="keywords" content={`${_title} - ${_siteName}`} />
                <link rel="manifest" href="/manifest.json" />
                {/*<link rel="shortcut icon" href="/icons/icon-192x192.png" type="image/png" />*/}
                {/*<link rel="icon" href="/favicon.png" type="image/png" />*/}
                <meta name="theme-color" content="#075E54" />
                <meta property="og:title" content={_title} />
                <meta property="og:description" content={_description} />
                <meta property="og:url" content={_siteName} />
                <meta property="og:site_name" content={_siteName} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="" />
              </Head>
              <Component {...pageProps} />
            </Layout>
          </ConfigProvider>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
