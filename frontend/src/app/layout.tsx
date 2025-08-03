'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import './globals.css';
import Layout from '../components/Layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
  
        <Provider store={store}>
      <Layout>
          {children}
                 </Layout>
        </Provider>
 
      </body>
    </html>
  );
}