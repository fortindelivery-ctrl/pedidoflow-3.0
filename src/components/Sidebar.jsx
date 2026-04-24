import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { sidebarMenuItems } from '@/components/sidebarMenuItems';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-[var(--layout-border)]/70 bg-[var(--layout-surface)]/90 backdrop-blur-sm md:flex">
      <div className="border-b border-[var(--layout-border)] p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--layout-border)] bg-[var(--layout-elevated)] shadow-lg">
            <img src="/pedidoflow.png" alt="PedidoFlow" className="h-8 w-8 object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[var(--layout-text)]">PedidoFlow</h1>
            <p className="text-xs font-medium text-[var(--layout-text-muted)]">Gestão Comercial</p>
          </div>
        </div>
      </div>

      <nav className="custom-scrollbar flex-1 space-y-1.5 overflow-y-auto p-4">
        {sidebarMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200',
                isActive
                  ? 'border-[var(--layout-border)] bg-[var(--layout-elevated)] text-[var(--layout-text)] shadow-[0_18px_30px_-20px_var(--layout-accent)]'
                  : 'border-transparent text-[var(--layout-text-muted)] hover:border-[var(--layout-border)] hover:bg-[var(--layout-surface-2)] hover:text-[var(--layout-text)]',
              )}
            >
              <Icon className={cn('h-5 w-5 transition-transform group-hover:scale-110', isActive ? 'scale-105' : '')} />
              <span className="font-medium tracking-wide">{item.label}</span>
              {isActive ? <div className="absolute right-2 h-2 w-2 animate-pulse rounded-full bg-[var(--layout-accent)]" /> : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[var(--layout-border)] bg-[var(--layout-surface-2)]/80 p-4">
        <div className="flex items-center justify-between px-2 text-xs text-[var(--layout-text-muted)]">
          <span>Versão 1.0.0</span>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[var(--layout-accent)]" title="Online" />
            <span>Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
