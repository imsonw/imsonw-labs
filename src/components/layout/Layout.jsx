import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      {/* Background Decorative Glowing Blobs */}
      <div className="glowing-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <Navbar />

      <main style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: '4rem' }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
