import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Menu,
  X,
  Compass,
  Trophy,
  BookOpen,
  Map,
  Newspaper,
  Bot,
  User as UserIcon,
  LogOut,
  ShieldAlert,
  ChevronDown,
  LayoutDashboard,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Opportunities', path: '/opportunities', icon: Compass },
    { name: 'Hackathons', path: '/hackathons', icon: Trophy },
    { name: 'Techathons', path: '/techathons', icon: Zap },
    { name: 'Learn', path: '/learn', icon: BookOpen },
    { name: 'Roadmaps', path: '/roadmaps', icon: Map },
    { name: 'Tech News', path: '/news', icon: Newspaper },
    { name: 'AI Tools', path: '/ai-tools', icon: Sparkles },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Bot },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090B]/90 backdrop-blur-md border-b border-[#272B35] shadow-lg shadow-black/40 py-2.5'
          : 'bg-[#09090B]/60 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7900] via-[#E06A00] to-[#168BFF] p-[2px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#09090B] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#FF7900] group-hover:text-[#168BFF] transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">TECHNOVA</span>
                <span className="font-bold text-xs px-1.5 py-0.5 rounded bg-[#168BFF]/20 text-[#168BFF] border border-[#168BFF]/30">
                  HUB
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 tracking-wider font-mono uppercase hidden sm:block">
                Ecosystem for Engineers
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#15171C]/80 border border-[#272B35] px-3 py-1.5 rounded-full">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FF7900] text-black font-semibold shadow-sm shadow-[#FF7900]/30'
                      : 'text-zinc-300 hover:text-white hover:bg-[#272B35]/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Search & Auth */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#15171C] border border-[#272B35] text-zinc-400 hover:text-white hover:border-[#FF7900]/50 transition-all text-xs"
              title="Search opportunities, roadmaps, tutorials (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#FF7900]" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden md:inline font-mono text-[10px] bg-[#09090B] px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Auth Area */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-[#15171C] border border-[#272B35] hover:border-[#168BFF]/50 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF7900] to-[#168BFF] flex items-center justify-center text-xs font-bold text-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-zinc-200 max-w-[100px] truncate hidden sm:inline">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#15171C] border border-[#272B35] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-[#272B35]">
                      <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-mono uppercase bg-[#168BFF]/20 text-[#168BFF] border border-[#168BFF]/30">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-xs text-zinc-300 hover:text-white hover:bg-[#272B35]/60 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#FF7900]" />
                      Student Dashboard
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-xs text-amber-400 hover:text-amber-300 hover:bg-[#272B35]/60 transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4 text-amber-400" />
                        Admin Control Panel
                      </Link>
                    )}

                    <div className="border-t border-[#272B35] my-1" />

                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#15171C] transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#FF7900] to-[#E06A00] text-black shadow-md shadow-[#FF7900]/25 hover:brightness-110 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-[#15171C] border border-[#272B35] text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 bg-[#15171C] border border-[#272B35] rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#FF7900] text-black font-semibold'
                        : 'bg-[#09090B]/60 text-zinc-300 hover:text-white border border-[#272B35]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-[#272B35] pt-3 flex flex-col gap-2">
              <Link
                to="/community"
                className="text-xs text-zinc-400 hover:text-[#168BFF] py-1"
              >
                🌐 Technova Community & Campus Clubs
              </Link>
              {!user && (
                <div className="flex gap-2 pt-2">
                  <Link
                    to="/login"
                    className="flex-1 text-center py-2 rounded-lg border border-[#272B35] text-xs font-medium text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 text-center py-2 rounded-lg bg-[#FF7900] text-black font-semibold text-xs"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
