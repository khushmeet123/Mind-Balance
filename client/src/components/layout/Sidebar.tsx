'use client';

import React from 'react';
import { NavItemId } from '@/types/dashboard';
import { navigationItems, mockUser } from '@/lib/mockData';
import { IconRenderer } from '@/components/shared/IconRenderer';
import { HeartPulse, ChevronLeft, ChevronRight, X, Shield, Lock } from 'lucide-react';

interface SidebarProps {
  currentTab: NavItemId;
  onSelectTab: (tab: NavItemId) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#FBF9F6] border-r border-[#E8E2D9] flex flex-col transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-72'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand & Logo Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#E8E2D9]">
          <div
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-3 cursor-pointer overflow-hidden select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1B382B] flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105">
              <HeartPulse className="w-5 h-5 text-[#8EB89D]" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-base tracking-tight text-[#1B382B] truncate">
                  MindBalance
                </span>
                <span className="text-[11px] font-medium text-[#7D9D85] truncate">
                  Workforce Well-being
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex w-7 h-7 rounded-lg border border-[#E8E2D9] bg-white items-center justify-center text-[#66706B] hover:text-[#1B382B] hover:border-[#1B382B]/30 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            aria-label="Close sidebar"
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[#66706B] hover:text-[#1C2321]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider uppercase text-[#8A9590]">
              Navigation
            </div>
          )}

          {navigationItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group relative
                  ${
                    isActive
                      ? 'bg-[#1B382B] text-white shadow-xs'
                      : 'text-[#4A5550] hover:bg-[#F2ECE4] hover:text-[#1C2321]'
                  }
                  ${isCollapsed ? 'justify-center px-0' : ''}
                `}
              >
                <span
                  className={`shrink-0 transition-colors ${
                    isActive ? 'text-[#8EB89D]' : 'text-[#66706B] group-hover:text-[#1B382B]'
                  }`}
                >
                  <IconRenderer name={item.iconName} className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>

                {!isCollapsed && (
                  <>
                    <span className="truncate flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 transition-colors ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#EBF2ED] text-[#1B382B] border border-[#D5E4D8]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}

                {/* Collapsed Tooltip Indicator */}
                {isCollapsed && item.badge && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#1B382B]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Privacy Perimeter Tag (Non-invasive guarantee) */}
        {!isCollapsed && (
          <div className="mx-3 mb-3 p-3 rounded-xl bg-[#FAF5EE] border border-[#E8DFC8]/70 text-[11px] text-[#7A6B52] flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-[#B8863A] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#574933]">Privacy Vault Enforced</p>
              <p className="text-[10px] text-[#85745B] leading-tight mt-0.5">
                Zero individual logs shared with HR. Aggregated under k-anonymity (N &ge; 7).
              </p>
            </div>
          </div>
        )}

        {/* User Profile Pill at Bottom */}
        <div className="p-3 border-t border-[#E8E2D9] bg-[#F5EFE8]/40">
          <div
            className={`flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white/80 cursor-pointer ${
              isCollapsed ? 'justify-center' : ''
            }`}
            onClick={() => onSelectTab('settings')}
          >
            <div className="w-9 h-9 rounded-full bg-[#1B382B] text-white flex items-center justify-center font-semibold text-xs shrink-0 shadow-xs ring-2 ring-[#8EB89D]/40">
              {mockUser.initials}
            </div>

            {!isCollapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-semibold text-[#1C2321] truncate">{mockUser.name}</span>
                <span className="text-[11px] text-[#66706B] truncate">{mockUser.department}</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
