'use client';

import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';
import { Toaster } from 'react-hot-toast';

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Cart />
      <Toaster position="bottom-right" />
    </div>
  );
} 