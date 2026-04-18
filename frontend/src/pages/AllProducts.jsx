import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star, ShoppingCart, ChevronDown, X, Search, Check, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Data ───────────────────────────────────────────────── */
const categories = [
  { id: "all",         name: "الكل",       emoji: "🛍️" },
  { id: "edu",         name: "تعليمية",     emoji: "📚" },
  { id: "dolls",       name: "دمى",         emoji: "🪆" },
  { id: "cars",        name: "سيارات",      emoji: "🚗" },
  { id: "electronics", name: "إلكترونية",   emoji: "🎮" },
  { id: "building",    name: "بناء",        emoji: "🧱" },
  { id: "outdoor",     name: "خارجية",      emoji: "⚽" },
  { id: "arts",        name: "فنون",        emoji: "🎨" },
  { id: "babies",      name: "رضع",         emoji: "🍼" },
];

const priceRanges = [
  { id: "all",     name: "كل الأسعار",      min: 0,   max: Infinity },
  { id: "budget",  name: "أقل من 200 ر.س",  min: 0,   max: 200 },
  { id: "mid",     name: "200 – 500 ر.س",   min: 200, max: 500 },
  { id: "premium", name: "أكثر من 500 ر.س", min: 500, max: Infinity },
];

const sortOptions = [
  { id: "featured",   name: "المميزة" },
  { id: "price-low",  name: "الأقل سعراً" },
  { id: "price-high", name: "الأعلى سعراً" },
  { id: "rating",     name: "الأعلى تقييماً" },
];

/* ─── Bottom Sheet ───────────────────────────────────────── */
const BottomSheet = ({ open, onClose, title, children }) => (
  <>
    <div
      onClick={onClose}
      className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    />
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f111a] rounded-t-3xl border-t border-white/8
                     transition-transform duration-300 ease-out max-h-[80vh] overflow-y-auto
                     ${open ? "translate-y-0" : "translate-y-full"}`}>
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 rounded-full bg-white/20" />
      </div>
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <h3 className="text-base font-black text-white">{title}</h3>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-white/50">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="px-5 py-5 pb-28">{children}</div>
    </div>
  </>
);

/* ─── Product Card ───────────────────────────────────────── */
const ProductCard = ({ product }) => {
  const raw = product.images?.[0] || product.image || "";
  const imgSrc = raw.startsWith("/uploads") ? `http://localhost:5000${raw}` : raw;

  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="h-full rounded-2xl overflow-hidden bg-[#0e1118] border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col">
        <div className="relative overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent" style={{ paddingBottom: "100%" }}>
          <img src={imgSrc} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {product.badge && (
            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white z-10">{product.badge}</span>
          )}
        </div>
        <div className="flex-1 p-3 flex flex-col">
          <h3 className="text-xs md:text-sm font-bold text-white mb-1 line-clamp-2 leading-snug">{product.name}</h3>
          {product.rating > 0 && (
            <div className="flex items-center gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-2.5 h-2.5 ${i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-white/15"}`} />
              ))}
            </div>
          )}
          <div className="mt-auto flex items-center justify-between pt-2 border-t border-white/5">
            <div>
              <span className="text-sm font-black text-primary">{product.price.replace(/[$,]/g, "").substring(0, 7)}</span>
              <span className="text-[9px] text-white/30 block">ر.س</span>
            </div>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); }}
              className="w-8 h-8 rounded-xl bg-primary/10 hover:bg-primary flex items-center justify-center text-primary hover:text-white transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

/* ─── Main ───────────────────────────────────────────────── */
const AllProducts = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory]   = useState(searchParams.get("category") || "all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy]                        = useState("featured");
  const [searchTerm, setSearchTerm]                = useState("");
  const [showSortSheet, setShowSortSheet]          = useState(false);
  const [showPriceSheet, setShowPriceSheet]        = useState(false);
  const [catExpanded, setCatExpanded]              = useState(false); // show all vs 6 cats

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    }
  });

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  useEffect(() => {
    const c = searchParams.get("category");
    if (c) setSelectedCategory(c);
  }, [searchParams]);

  const filteredProducts = products
    .filter(p => !(p.quantity !== undefined && p.quantity !== null && p.quantity === 0))
    .filter(p => selectedCategory === "all" || p.category === selectedCategory)
    .filter(p => {
      const q = searchTerm.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.tagline?.toLowerCase().includes(q) || p.categoryName?.toLowerCase().includes(q);
    })
    .filter(p => {
      const range = priceRanges.find(r => r.id === selectedPriceRange);
      const price = parseFloat(p.price.replace(/[$,]/g, ""));
      return price >= range.min && price <= range.max;
    })
    .sort((a, b) => {
      if (sortBy === "price-low")  return parseFloat(a.price.replace(/[$,]/g, "")) - parseFloat(b.price.replace(/[$,]/g, ""));
      if (sortBy === "price-high") return parseFloat(b.price.replace(/[$,]/g, "")) - parseFloat(a.price.replace(/[$,]/g, ""));
      if (sortBy === "rating")     return b.rating - a.rating;
      return 0;
    });

  const resetAll = () => { setSelectedCategory("all"); setSelectedPriceRange("all"); setSortBy("featured"); setSearchTerm(""); };
  const activeFilters = [selectedPriceRange !== "all", sortBy !== "featured"].filter(Boolean).length;

  const visibleCategories = catExpanded ? categories : categories.slice(0, 8);

  if (isLoading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Navbar />
      <div className="w-10 h-10 border-4 border-white/10 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ══════════════════════════════════
           MOBILE
      ══════════════════════════════════ */}
      <div className="lg:hidden pt-16 pb-36">

        {/* Sticky Search */}
        <div className="sticky top-14 z-30 bg-[#0a0b10]/96 backdrop-blur-md px-4 pt-3 pb-3 border-b border-white/5">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-10 py-2.5 rounded-2xl bg-white/[0.06] border border-white/8 text-white text-sm
                         placeholder:text-white/25 focus:outline-none focus:border-primary/50 transition-colors"
            />
            {searchTerm
              ? <button onClick={() => setSearchTerm("")} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"><X className="w-3.5 h-3.5" /></button>
              : null
            }
          </div>
        </div>

        <div className="px-4 pt-5 space-y-5">

          {/* ── Category Grid ── */}
          <div>
            <div className="grid grid-cols-3 gap-2.5">
              {visibleCategories.map(cat => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-2xl
                                border transition-all duration-200 active:scale-95
                                ${active
                                  ? "bg-primary border-primary shadow-lg shadow-primary/30"
                                  : "bg-white/[0.04] border-white/8"}`}
                  >
                    <span className="text-2xl leading-none">{cat.emoji}</span>
                    <span className={`text-[11px] font-bold leading-none ${active ? "text-white" : "text-white/50"}`}>
                      {cat.name}
                    </span>
                    {active && (
                      <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-white/80" />
                    )}
                  </button>
                );
              })}

              {/* Expand/Collapse button if there are more */}
              {categories.length > 8 && (
                <button
                  onClick={() => setCatExpanded(!catExpanded)}
                  className="flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-2xl border border-dashed border-white/15 text-white/30"
                >
                  <span className="text-2xl">{catExpanded ? "▲" : "▼"}</span>
                  <span className="text-[11px] font-bold">{catExpanded ? "أقل" : "المزيد"}</span>
                </button>
              )}
            </div>
          </div>

          {/* ── Sort + Price quick pills ── */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowSortSheet(true)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition-all
                ${sortBy !== "featured" ? "border-primary/40 bg-primary/10 text-primary" : "border-white/10 bg-white/[0.04] text-white/50"}`}
            >
              <ChevronDown className="w-3.5 h-3.5" />
              {sortOptions.find(s => s.id === sortBy)?.name}
            </button>
            <button
              onClick={() => setShowPriceSheet(true)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition-all
                ${selectedPriceRange !== "all" ? "border-primary/40 bg-primary/10 text-primary" : "border-white/10 bg-white/[0.04] text-white/50"}`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {priceRanges.find(r => r.id === selectedPriceRange)?.name}
            </button>
            {activeFilters > 0 && (
              <button onClick={resetAll} className="px-3 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Result count */}
          <p className="text-xs text-white/30">
            <span className="text-white font-bold">{filteredProducts.length}</span> منتج
            {selectedCategory !== "all" && (
              <span className="text-primary mr-1.5">· {categories.find(c => c.id === selectedCategory)?.emoji} {categories.find(c => c.id === selectedCategory)?.name}</span>
            )}
          </p>

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 py-12 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-white/50 text-sm font-semibold mb-4">لا توجد نتائج</p>
              <button onClick={resetAll} className="px-5 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold border border-primary/20">مسح الفلاتر</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map(product => <ProductCard key={product._id} product={product} />)}
            </div>
          )}
        </div>
      </div>

      {/* ── Sort Sheet ── */}
      <BottomSheet open={showSortSheet} onClose={() => setShowSortSheet(false)} title="ترتيب حسب">
        <div className="grid grid-cols-2 gap-2">
          {sortOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => { setSortBy(opt.id); setShowSortSheet(false); }}
              className={`flex items-center justify-between gap-2 px-4 py-3.5 rounded-2xl text-sm font-bold border transition-all
                ${sortBy === opt.id ? "bg-primary/15 text-primary border-primary/30" : "bg-white/[0.04] text-white/50 border-white/8"}`}
            >
              {opt.name}
              {sortBy === opt.id && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      </BottomSheet>

      {/* ── Price Sheet ── */}
      <BottomSheet open={showPriceSheet} onClose={() => setShowPriceSheet(false)} title="نطاق السعر">
        <div className="space-y-2">
          {priceRanges.map(range => (
            <button
              key={range.id}
              onClick={() => { setSelectedPriceRange(range.id); setShowPriceSheet(false); }}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-bold border transition-all
                ${selectedPriceRange === range.id ? "bg-primary/15 text-primary border-primary/30" : "bg-white/[0.04] text-white/50 border-white/8"}`}
            >
              {range.name}
              {selectedPriceRange === range.id && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </BottomSheet>

      {/* ══════════════════════════════════
           DESKTOP
      ══════════════════════════════════ */}
      <div className="hidden lg:block pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-start justify-between mb-10">
            <div>
              <Link to="/" className="inline-flex items-center text-sm text-white/40 hover:text-primary transition-colors mb-4 gap-1.5">
                <ArrowLeft className="w-4 h-4" /> الرئيسية
              </Link>
              <h1 className="text-5xl font-black text-white mb-1">منتجاتنا</h1>
              <p className="text-sm text-white/40">{filteredProducts.length} منتج</p>
            </div>
            <div className="relative w-72">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              <input
                type="text" placeholder="بحث..." value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 space-y-7 sticky top-24">
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">ترتيب</p>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white text-sm focus:outline-none">
                    {sortOptions.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">التصنيف</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {categories.map(cat => (
                      <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                        className={`flex flex-col items-center gap-1 py-3 rounded-xl text-center border transition-all
                          ${selectedCategory === cat.id ? "bg-primary border-primary text-white" : "bg-white/[0.03] border-white/8 text-white/40 hover:border-white/20"}`}>
                        <span className="text-lg">{cat.emoji}</span>
                        <span className="text-[10px] font-bold leading-none">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">السعر</p>
                  <div className="space-y-1.5">
                    {priceRanges.map(r => (
                      <button key={r.id} onClick={() => setSelectedPriceRange(r.id)}
                        className={`w-full text-right px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
                          ${selectedPriceRange === r.id ? "bg-primary text-white" : "text-white/50 hover:bg-white/5 hover:text-white"}`}>
                        {r.name}
                      </button>
                    ))}
                  </div>
                </div>
                {activeFilters > 0 && (
                  <button onClick={resetAll} className="w-full py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white text-sm font-semibold transition-colors">
                    مسح الفلاتر
                  </button>
                )}
              </div>
            </div>
            <div className="col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-16 text-center">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="text-white/50">لا توجد منتجات</p>
                  <button onClick={resetAll} className="mt-5 px-6 py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-bold border border-primary/20">مسح</button>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-5">
                  {filteredProducts.map(product => <ProductCard key={product._id} product={product} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllProducts;
