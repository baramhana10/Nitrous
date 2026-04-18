import { Home, Grid, ShoppingCart, Heart, Search, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoSrc from "@/assets/logo.png";

const navItems = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "/products" },
  { label: "العروض", href: "#" },
  { label: "تواصل معنا", href: "#" },
];

/* Mobile Bottom Nav Items */
const mobileNav = [
  { label: "الرئيسية",  href: "/",        icon: Home },
  { label: "المنتجات",  href: "/products", icon: Grid },
  { label: "المفضلة",   href: "#",         icon: Heart },
  { label: "السلة",     href: "#",         icon: ShoppingCart },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close menu on route change */
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <>
      {/* ── Top Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5
          ${isScrolled ? "py-3 bg-[#0a0b10]/90 backdrop-blur-md shadow-lg" : "py-5 bg-transparent"}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">

            {/* Left: Icons (desktop only) */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full transition-colors font-medium text-sm">
                <span className="relative flex h-5 w-5">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-background border border-background">3</span>
                </span>
                <span>السلة</span>
              </button>
              <button className="text-white/60 hover:text-white transition-colors"><Heart className="w-5 h-5" /></button>
              <button className="text-white/60 hover:text-white transition-colors"><Search className="w-5 h-5" /></button>
            </div>

            {/* Center: Desktop Nav */}
            <div className="hidden lg:flex items-center justify-center gap-8 flex-1">
              {navItems.map(item => (
                <Link
                  key={item.label} to={item.href}
                  className={`text-sm font-semibold transition-colors duration-200 ${location.pathname === item.href ? "text-primary" : "text-white/60 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile: Search icon */}
            <button className="lg:hidden text-white/60 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Logo — always centered on mobile */}
            <Link to="/" className="flex items-center transition-opacity hover:opacity-80 mx-auto lg:mx-0">
              <img
                src={logoSrc} alt="Mhana Plus"
                style={{ height: "64px", width: "auto", display: "block", filter: "invert(1) hue-rotate(180deg)" }}
              />
            </Link>

            {/* Mobile: Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isOpen && (
            <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-[#131620] rounded-2xl border border-white/5 shadow-2xl z-40 overflow-hidden">
              <div className="p-4 flex flex-col space-y-1">
                {navItems.map(item => (
                  <Link
                    key={item.label} to={item.href}
                    className={`px-4 py-3 rounded-xl transition-colors font-semibold text-sm
                      ${location.pathname === item.href ? "bg-primary/10 text-primary" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── Mobile Bottom Tab Bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0b0d14]/95 backdrop-blur-md border-t border-white/8 pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {mobileNav.map(({ label, href, icon: Icon }) => {
            const active = location.pathname === href;
            return (
              <Link
                key={label} to={href}
                className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200 min-w-[56px]"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
                  ${active ? "bg-primary shadow-lg shadow-primary/30" : "bg-white/5"}`}>
                  <Icon className={`w-5 h-5 ${active ? "text-white" : "text-white/40"}`} />
                </div>
                <span className={`text-[10px] font-semibold ${active ? "text-primary" : "text-white/30"}`}>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Spacer so content doesn't hide behind bottom nav on mobile */}
      <div className="lg:hidden h-[72px]" aria-hidden="true" style={{ position: "fixed", bottom: 0, pointerEvents: "none" }} />
    </>
  );
};

export default Navbar;
