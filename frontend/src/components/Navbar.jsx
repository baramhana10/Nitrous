import { Button } from "@/components/ui/button";
import { Zap, Menu, X, ChevronRight, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: " All-Products", href: "/products", isRoute: true },

];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "py-2" : "py-4"
        }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${isScrolled
          ? "glass border-b border-primary/20 shadow-[0_4px_30px_rgba(220,38,38,0.1)]"
          : "bg-transparent"
          }`}
      />

      {/* Top border */}
      <div
        className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"
          }`}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="/Nitrous.png"
                alt="Nitrous ATV Logo"
                className="relative w-12 h-12 sm:w-14 sm:h-14 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_20px_hsl(0_85%_55%_/_0.4)] group-hover:drop-shadow-[0_0_40px_hsl(0_85%_55%_/_0.6)]"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="relative px-5 py-2 font-display text-sm uppercase tracking-wider text-foreground/80 hover:text-foreground transition-all duration-300 group"
                >
                  <span className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                  <span className="relative">{item.label}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary group-hover:w-3/4 transition-all duration-300" />
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative px-5 py-2 font-display text-sm uppercase tracking-wider text-foreground/80 hover:text-foreground transition-all duration-300 group"
                >
                  <span className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                  <span className="relative">{item.label}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary group-hover:w-3/4 transition-all duration-300" />
                </a>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Button>
            <Button variant="default" size="sm" className="group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-1">
                Shop Now
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden relative p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="absolute inset-0 rounded-lg bg-primary/10 opacity-0 hover:opacity-100 transition-opacity" />
            {isOpen ? (
              <X className="w-6 h-6 relative" />
            ) : (
              <Menu className="w-6 h-6 relative" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-4 right-4 mt-2 glass-card rounded-2xl border border-primary/20 overflow-hidden animate-fade-in shadow-[0_20px_60px_-12px_hsl(0_85%_55%_/_0.2)]">
            <div className="p-6 space-y-2">
              {navItems.map((item, index) => (
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-center justify-between font-display text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 py-3 px-4 rounded-xl hover:bg-primary/10"
                    onClick={() => setIsOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.label}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between font-display text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 py-3 px-4 rounded-xl hover:bg-primary/10"
                    onClick={() => setIsOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.label}
                    <ChevronRight className="w-4 h-4" />
                  </a>
                )
              ))}
              <div className="flex gap-3 pt-4 mt-4 border-t border-border/30">
                <Button variant="ghost" size="sm" className="flex-1">
                  Sign In
                </Button>
                <Button variant="default" size="sm" className="flex-1">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
