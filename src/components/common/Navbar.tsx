
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  BookOpen,
  ShieldCheck,
  Brain,
  TrendingUp,
  History,
  UserPlus,
} from "lucide-react";

interface NavbarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

const navLinks = [
  { label: "Home", path: "/", icon: Home },
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Modules", path: "/learn", icon: BookOpen },
  { label: "Simulator", path: "/simulator", icon: ShieldCheck },
  { label: "Quiz", path: "/quiz", icon: Brain },
  { label: "Progress", path: "/results", icon: TrendingUp },
  { label: "Test History", path: "/history", icon: History },
];

export default function Navbar({
  currentPath = "/",
  onNavigate,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateTo = (path: string) => {
    setMenuOpen(false);

    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <nav className="relative mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Hamburger menu */}
        <div className="z-10 flex w-1/3 items-center justify-start">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Center: Logo image only */}
        <button
          type="button"
          onClick={() => navigateTo("/dashboard")}
          aria-label="Go to home"
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
          <img
            src="/phishguard-logo.png"
            alt="PhishGuard"
            className="h-14 w-auto max-w-[180px] object-contain sm:h-16 sm:max-w-[220px]"
          />
        </button>

        {/* Right: Blue Sign In button with User Plus icon */}
        <div className="z-10 flex w-1/3 items-center justify-end">
          <button
            type="button"
            onClick={() => navigateTo("/login")}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <UserPlus size={17} />
            <span>Sign In</span>
          </button>
        </div>
      </nav>

      {/* Navigation menu */}
      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-20 z-40 cursor-default bg-black/20"
          />

          <div className="absolute left-0 right-0 top-full z-50 border-b border-slate-200 bg-white shadow-xl">
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Navigation
              </p>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {navLinks.map(({ label, path, icon: Icon }) => (
                  <button
                    key={path}
                    type="button"
                    onClick={() => navigateTo(path)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-blue-50 hover:text-blue-700 ${
                      currentPath === path
                        ? "bg-blue-50 font-semibold text-blue-700"
                        : "text-slate-700"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => navigateTo("/")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-3 font-medium text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                >
                  <span className="text-xl">+</span>
                  New Project
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
