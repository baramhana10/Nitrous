import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Star, ArrowLeft, Flame, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS, getImageUrl } from "@/lib/api";

/* ══════════════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════════════ */
const ProductCard = ({ product, rank = null, accentColor = "#ef4444" }) => (
  <Link to={`/product/${product.id}`} className="block">
    <div
      className="group relative flex flex-col bg-[#0e1118] border border-white/5 rounded-2xl overflow-hidden
                 hover:border-white/15 hover:shadow-2xl transition-all duration-300 cursor-pointer"
      style={{ "--accent": accentColor }}
    >
      {/* Rank Badge */}
      {rank && (
        <div
          className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg"
          style={{ background: accentColor }}
        >
          #{rank}
        </div>
      )}

      {/* Wish + Product Badges */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 items-end">
        <button
          onClick={(e) => e.preventDefault()}
          className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-red-400 transition-colors"
        >
          <Heart className="w-3.5 h-3.5" />
        </button>
        {product.badges.map((badge, i) => (
          <span
            key={i}
            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white"
          >
            {badge.text}
          </span>
        ))}
      </div>

      {/* Image Area */}
      <div className="relative w-full h-48 flex items-center justify-center overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent">
        {/* Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 50% 80%, ${accentColor}22 0%, transparent 70%)`,
          }}
        />
        {product.image && (product.image.startsWith("http") || product.image.startsWith("/")) ? (
          <img
            src={product.displayImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML =
                '<span class="text-[5rem] drop-shadow-2xl">📦</span>';
            }}
          />
        ) : (
          <span className="text-[5rem] drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">
            📦
          </span>
        )}
      </div>

      {/* Separator line colored with accent */}
      <div className="h-px w-full" style={{ background: `${accentColor}33` }} />

      {/* Info */}
      <div className="p-4 flex flex-col gap-3">
        {/* Name + Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-white leading-snug group-hover:text-white/80 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 bg-white/5 px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold text-white">{product.rating}</span>
          </div>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-black" style={{ color: accentColor }}>
            {product.price}&nbsp;<span className="text-xs font-semibold text-white/50">ر.س</span>
          </span>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="w-9 h-9 rounded-xl flex items-center justify-center border text-white/60
                       hover:text-white transition-all duration-200"
            style={{
              borderColor: `${accentColor}44`,
              background: `${accentColor}11`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = accentColor;
              e.currentTarget.style.borderColor = accentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${accentColor}11`;
              e.currentTarget.style.borderColor = `${accentColor}44`;
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </Link>
);

/* ══════════════════════════════════════════════
   SECTION WRAPPER  (distinct visual per category)
══════════════════════════════════════════════ */
const CategorySection = ({ label, sublabel, icon: Icon, accentColor, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-16 md:mb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 md:mb-8 px-4 md:px-0">
        <div className="flex flex-col items-end text-right">
          <div className="flex items-center gap-2 mb-1">
            <Icon className="w-4 h-4" style={{ color: accentColor }} />
            <span className="font-bold text-xs tracking-widest uppercase" style={{ color: accentColor }}>{sublabel}</span>
          </div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white">{label}</h3>
        </div>
        <Link
          to="/products"
          className="flex items-center gap-2 text-xs md:text-sm font-semibold text-white/50 hover:text-white transition-colors shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          عرض الكل
        </Link>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden flex gap-3 overflow-x-auto pb-3 px-4 snap-x snap-mandatory scrollbar-hide">
        {items.map((product, idx) => (
          <div key={product.id} className="shrink-0 w-[160px] snap-start">
            <ProductCard product={product} rank={label === "الأكثر مبيعاً" ? idx + 1 : null} accentColor={accentColor} />
          </div>
        ))}
      </div>

      {/* Desktop: 4-col grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((product, idx) => (
          <ProductCard key={product.id} product={product} rank={label === "الأكثر مبيعاً" ? idx + 1 : null} accentColor={accentColor} />
        ))}
      </div>
    </div>
  );
};


/* ══════════════════════════════════════════════
   SMART SECTION DISTRIBUTOR
   Works with any number of products (even 1-4).
   Priority: tag-match → smart slice fallback.
══════════════════════════════════════════════ */
const isSoldOut = (p) => p.quantity !== undefined && p.quantity !== null && p.quantity === 0;

const distribute = (all, tag, sliceIndices) => {
  const available = all.filter(p => !isSoldOut(p));
  const tagged = available.filter(p => p.tags?.includes(tag));
  if (tagged.length > 0) return tagged.slice(0, 4);
  return sliceIndices.map(i => available[i % Math.max(available.length, 1)]).filter(Boolean);
};

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(API_ENDPOINTS.PRODUCTS);
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const data = await res.json();

        setProducts(
          data.map((p) => {
            const imageUrl = p.images?.length ? p.images[0] : p.image || null;
            return {
              id:          p._id,
              name:        p.name,
              image:       imageUrl,
              displayImage: getImageUrl(imageUrl) || "📦",
              price:       p.price,
              rating:      p.rating || 4.5,
              reviews:     p.reviews || 0,
              badges:      p.badge ? [{ text: p.badge, color: "bg-primary text-white" }] : [],
              tags:        p.tags || [],
            };
          })
        );
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* Build sections — each always has ≥1 product */
  const n = products.length;
  const offersItems    = distribute(products, "عروض",          [0, 1, 2, 3].filter(i => i < n || n > 0).map(i => i % Math.max(n,1)).slice(0,4));
  const newItems       = distribute(products, "جديد",          [0, 1, 2, 3].map(i => (i + Math.ceil(n / 3)) % Math.max(n,1)).slice(0,4));
  const bestSellerItems = distribute(products, "الأكثر مبيعاً", [0, 1, 2, 3].map(i => (n - 1 - i + n) % Math.max(n,1)).slice(0,4));

  // Deduplicate within each section
  const unique = (arr) => arr.filter((p, i, self) => self.findIndex(x => x.id === p.id) === i);

  return (
    <section className="py-28 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">

        {/* ── Page Header ── */}
        <div className="flex flex-col items-end text-right mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-px bg-primary inline-block" />
            <span className="text-primary font-bold text-sm tracking-widest uppercase">المنتجات</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white">منتجات مميزة</h2>
          <p className="text-white/40 mt-3 text-base">اكتشف أفضل المنتجات لدينا مُصنّفة لك بعناية</p>
        </div>

        {/* ── States ── */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="w-14 h-14 border-4 border-white/10 border-t-primary rounded-full animate-spin mx-auto mb-5" />
              <p className="text-white/50">جاري تحميل المنتجات...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-32 text-center">
            <div>
              <p className="text-red-400 mb-2 text-lg font-semibold">خطأ في تحميل المنتجات</p>
              <p className="text-white/40 text-sm">{error}</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p className="text-white/40 text-lg">لا توجد منتجات حالياً</p>
          </div>
        ) : (
          <>
            {/* ── 1. عروض ── */}
            <CategorySection
              label="عروض"
              sublabel="Deals"
              icon={Flame}
              accentColor="#ef4444"
              items={unique(offersItems)}
            />

            {/* ── 2. جديد ── */}
            <CategorySection
              label="جديد"
              sublabel="New Arrivals"
              icon={Sparkles}
              accentColor="#f59e0b"
              items={unique(newItems)}
            />

            {/* ── 3. الأكثر مبيعاً ── */}
            <CategorySection
              label="الأكثر مبيعاً"
              sublabel="Best Sellers"
              icon={TrendingUp}
              accentColor="#22c55e"
              items={unique(bestSellerItems)}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
