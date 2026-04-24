import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileSidebar from '@/components/MobileSidebar';

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--layout-bg)] text-[var(--layout-text)]">
      <Sidebar />
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex h-screen flex-1 flex-col overflow-hidden md:m-2 md:rounded-2xl md:border md:border-[var(--layout-border)] md:bg-[var(--layout-surface)]/70 md:shadow-2xl md:backdrop-blur-sm">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-auto bg-[var(--layout-bg)]/45">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
