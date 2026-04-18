import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CATEGORIES = [
  { id: "edu",         name: "ألعاب تعليمية",    emoji: "📚", color: "#3b82f6", ageRange: "2 – 10 سنوات",  description: "تنمّي عقل طفلك وتجعل التعلّم ممتعاً" },
  { id: "dolls",       name: "دمى وعرائس",        emoji: "🧸", color: "#ec4899", ageRange: "1 – 8 سنوات",   description: "أصدقاء صغار يرافقون طفلك في كل مغامرة" },
  { id: "cars",        name: "سيارات وطائرات",    emoji: "🚗", color: "#f59e0b", ageRange: "3 – 12 سنة",   description: "سرعة وإثارة ومغامرة لا تنتهي" },
  { id: "electronics", name: "ألعاب إلكترونية",  emoji: "🎮", color: "#8b5cf6", ageRange: "5 – 15 سنة",   description: "تقنية حديثة تجعل وقت اللعب لا يُنسى" },
  { id: "building",    name: "ألعاب البناء",      emoji: "🧱", color: "#10b981", ageRange: "3 – 12 سنة",   description: "طوّر التفكير الهندسي والإبداعي" },
  { id: "outdoor",     name: "ألعاب خارجية",      emoji: "⚽", color: "#06b6d4", ageRange: "3 – 14 سنة",   description: "نشاط وصحة في الهواء الطلق" },
  { id: "arts",        name: "فنون وإبداع",       emoji: "🎨", color: "#f43f5e", ageRange: "3 – 12 سنة",   description: "أطلق العنان لخيال طفلك الواسع" },
  { id: "babies",      name: "مستلزمات الرضع",   emoji: "🍼", color: "#a78bfa", ageRange: "0 – 2 سنوات",  description: "عناية وأمان لأصغر أفراد العائلة" },
];

const FALLBACK = {
  edu:         [{ emoji: "📖", name: "مجموعة التعلم المتكامل", price: "149" }, { emoji: "🔢", name: "لعبة الأرقام الذكية", price: "89" }, { emoji: "🔤", name: "تعلّم الحروف", price: "65" }],
  dolls:       [{ emoji: "🧸", name: "دمية الدبدوب الناعم",   price: "99" }, { emoji: "👸", name: "عروسة الأميرة",        price: "129" }, { emoji: "🦁", name: "أسد الغابة المحشو",  price: "79" }],
  cars:        [{ emoji: "🏎️", name: "سيارة السباق RC",       price: "299" }, { emoji: "✈️", name: "طائرة المراقبة",      price: "399" }, { emoji: "🚂", name: "قطار الأطفال",       price: "189" }],
  electronics: [{ emoji: "🤖", name: "روبوت البرمجة الذكي",  price: "549" }, { emoji: "🎯", name: "لعبة الواقع المعزز",  price: "329" }, { emoji: "🕹️", name: "وحدة التحكم",        price: "459" }],
  building:    [{ emoji: "🧩", name: "طقم البناء الذكي",      price: "219" }, { emoji: "🏡", name: "مكعبات البناء",       price: "149" }, { emoji: "🔧", name: "حقيبة المهندس",      price: "89"  }],
  outdoor:     [{ emoji: "⚽", name: "كرة القدم الاحترافية",  price: "119" }, { emoji: "🛴", name: "سكوتر الأطفال",       price: "349" }, { emoji: "🏊", name: "مسبح الأطفال",       price: "199" }],
  arts:        [{ emoji: "🎨", name: "طقم الرسم الفني",       price: "139" }, { emoji: "🖌️", name: "ألوان الأكواريل",     price: "79"  }, { emoji: "✂️", name: "حقيبة الأشغال",     price: "95"  }],
  babies:      [{ emoji: "🍼", name: "مجموعة الحسية للرضع",  price: "189" }, { emoji: "🎵", name: "خشخيشة موسيقية",      price: "49"  }, { emoji: "🧸", name: "بطانية اللعب",       price: "129" }],
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function CategoriesSection() {
  const [activeId, setActiveId]           = useState("electronics");
  const [products, setProducts]           = useState([]);
  const [loading, setLoading]             = useState(false);
  const [animating, setAnimating]         = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/products`)
      .then(r => r.json())
      .then(d => setProducts(Array.isArray(d) ? d : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const switchTo = (id) => {
    if (id === activeId) return;
    setAnimating(true);
    setTimeout(() => { setActiveId(id); setAnimating(false); }, 180);
  };

  const active       = CATEGORIES.find(c => c.id === activeId);
  const realProducts = products.filter(p => p.category === activeId).slice(0, 3);
  const displayItems = realProducts.length > 0 ? realProducts : (FALLBACK[activeId] || []);
  const isReal       = realProducts.length > 0;
  const totalReal    = products.filter(p => p.category === activeId).length;

  return (
    <section className="py-16 md:py-24 bg-background border-b border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">

        {/* ── Section Header ── */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-primary block" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase">الأقسام</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white">تسوق حسب الفئة</h2>
          </div>
          <Link to="/products" className="hidden md:flex items-center gap-2 text-white/40 hover:text-white text-sm font-semibold transition-colors">
            كل المنتجات <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* ══════════════════════════════════════
            MOBILE: vertical card list + side panel
        ══════════════════════════════════════ */}
        <div className="md:hidden">
          {/* Category cards — 2 col visual grid */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {CATEGORIES.map(cat => {
              const isActive = activeId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => switchTo(cat.id)}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-2xl border transition-all duration-200 active:scale-95"
                  style={{
                    background: isActive ? `${cat.color}22` : "rgba(255,255,255,0.03)",
                    borderColor: isActive ? `${cat.color}66` : "rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="text-xl leading-none">{cat.emoji}</span>
                  <span className="text-[9px] font-bold leading-tight text-center px-0.5"
                    style={{ color: isActive ? cat.color : "rgba(255,255,255,0.45)" }}>
                    {cat.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active category detail card */}
          <div
            className="rounded-3xl border overflow-hidden transition-all duration-200"
            style={{
              borderColor: `${active?.color}33`,
              background: `linear-gradient(135deg, ${active?.color}0d 0%, rgba(14,17,24,1) 60%)`,
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(8px)" : "translateY(0)",
            }}
          >
            {/* Top: emoji + info */}
            <div className="flex items-center gap-4 p-5">
              <div className="relative w-16 h-16 shrink-0">
                <div className="absolute inset-0 rounded-2xl blur-lg opacity-60"
                  style={{ background: active?.color }} />
                <div className="relative w-full h-full rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: `${active?.color}22`, border: `1px solid ${active?.color}44` }}>
                  {active?.emoji}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-black text-base mb-0.5">{active?.name}</p>
                <p className="text-white/40 text-xs mb-2">{active?.description}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${active?.color}22`, color: active?.color }}>
                  العمر: {active?.ageRange}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px mx-5" style={{ background: `${active?.color}22` }} />

            {/* Products mini list */}
            <div className="p-4 space-y-2.5">
              {loading
                ? [...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-2">
                      <div className="w-11 h-11 rounded-xl bg-white/5 animate-pulse shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-2.5 bg-white/5 rounded animate-pulse w-3/4" />
                        <div className="h-2 bg-white/5 rounded animate-pulse w-1/3" />
                      </div>
                    </div>
                  ))
                : displayItems.map((item, idx) => {
                    if (isReal) {
                      const imgSrc = (item.images?.[0] || "").startsWith("/uploads") ? `${API_URL}${item.images[0]}` : item.images?.[0] || "";
                      return (
                        <Link key={item._id} to={`/product/${item._id}`}
                          className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/5 transition-colors">
                          <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border"
                            style={{ borderColor: `${active?.color}33` }}>
                            {imgSrc ? <img src={imgSrc} className="w-full h-full object-cover" alt="" /> : <span className="flex items-center justify-center w-full h-full text-lg">{active?.emoji}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-bold truncate">{item.name}</p>
                            <p className="text-xs font-black mt-0.5" style={{ color: active?.color }}>{item.price} ر.س</p>
                          </div>
                        </Link>
                      );
                    }
                    return (
                      <div key={idx} className="flex items-center gap-3 p-2.5 rounded-2xl">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                          style={{ background: `${active?.color}15`, border: `1px solid ${active?.color}33` }}>
                          {item.emoji}
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-xs font-bold">{item.name}</p>
                          <p className="text-xs font-black mt-0.5" style={{ color: active?.color }}>{item.price} ر.س</p>
                        </div>
                      </div>
                    );
                  })
              }
            </div>

            {/* Shop button */}
            <div className="px-4 pb-4">
              <Link to={`/products?category=${activeId}`}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white transition-all"
                style={{ background: active?.color }}>
                تسوق {active?.name}
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            DESKTOP: side pill list + showcase
        ══════════════════════════════════════ */}
        <div className="hidden md:flex gap-6">

          {/* Left: vertical category list */}
          <div className="w-64 shrink-0 flex flex-col gap-1.5">
            {CATEGORIES.map(cat => {
              const isActive = activeId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => switchTo(cat.id)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-right transition-all duration-200 group relative overflow-hidden"
                  style={{
                    background: isActive ? `${cat.color}18` : "transparent",
                    border: isActive ? `1px solid ${cat.color}44` : "1px solid transparent",
                  }}
                >
                  {/* Active left bar */}
                  {isActive && (
                    <span className="absolute right-0 top-3 bottom-3 w-0.5 rounded-full"
                      style={{ background: cat.color }} />
                  )}
                  <span className="text-2xl leading-none">{cat.emoji}</span>
                  <span className="text-sm font-bold transition-colors"
                    style={{ color: isActive ? cat.color : "rgba(255,255,255,0.5)" }}>
                    {cat.name}
                  </span>
                  {isActive && (
                    <ArrowRight className="w-4 h-4 mr-auto shrink-0" style={{ color: cat.color }} />
                  )}
                </button>
              );
            })}
            <Link to="/products"
              className="mt-2 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl border border-white/8 text-white/30 hover:text-white text-xs font-semibold transition-colors">
              كل الأقسام <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right: showcase panel */}
          <div
            className="flex-1 rounded-3xl border overflow-hidden flex transition-all duration-200"
            style={{
              borderColor: `${active?.color}25`,
              background: `linear-gradient(135deg, ${active?.color}0c 0%, #0e1118 50%)`,
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(10px)" : "translateY(0)",
            }}
          >
            {/* Center: visual */}
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              {/* Glow bg */}
              <div className="relative w-44 h-44 mb-6">
                <div className="absolute inset-0 rounded-full blur-3xl opacity-40"
                  style={{ background: active?.color }} />
                <div className="relative w-full h-full flex items-center justify-center text-[90px] select-none">{active?.emoji}</div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full mb-3"
                style={{ background: `${active?.color}20`, color: active?.color }}>
                العمر: {active?.ageRange}
              </span>
              <h3 className="text-4xl font-black text-white mb-3">{active?.name}</h3>
              <p className="text-white/50 text-sm max-w-xs mb-8">{active?.description}</p>
              <Link to={`/products?category=${activeId}`}>
                <button
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-white text-sm transition-all hover:scale-105"
                  style={{ background: active?.color, boxShadow: `0 8px 30px ${active?.color}44` }}>
                  تسوق الآن
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Right panel: product list */}
            <div className="w-[340px] shrink-0 border-r border-white/5 bg-black/20 flex flex-col">
              <div className="px-6 py-5 border-b border-white/5">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">منتجات مميزة</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {loading
                  ? [...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3 p-3">
                        <div className="w-14 h-14 rounded-xl bg-white/5 animate-pulse shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-white/5 rounded animate-pulse w-3/4" />
                          <div className="h-2.5 bg-white/5 rounded animate-pulse w-1/3" />
                        </div>
                      </div>
                    ))
                  : displayItems.map((item, idx) => {
                      if (isReal) {
                        const imgSrc = (item.images?.[0] || "").startsWith("/uploads") ? `${API_URL}${item.images[0]}` : item.images?.[0] || "";
                        return (
                          <Link key={item._id} to={`/product/${item._id}`}
                            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/8 transition-all group">
                            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border"
                              style={{ borderColor: `${active?.color}33` }}>
                              {imgSrc ? <img src={imgSrc} className="w-full h-full object-cover" alt="" /> : <span className="flex items-center justify-center w-full h-full text-2xl">{active?.emoji}</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-bold truncate mb-1">{item.name}</p>
                              <p className="text-sm font-black" style={{ color: active?.color }}>{item.price} ر.س</p>
                            </div>
                          </Link>
                        );
                      }
                      return (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/8 transition-all cursor-pointer">
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                            style={{ background: `${active?.color}15`, border: `1px solid ${active?.color}33` }}>
                            {item.emoji}
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm font-bold mb-1">{item.name}</p>
                            <p className="text-sm font-black" style={{ color: active?.color }}>{item.price} ر.س</p>
                          </div>
                        </div>
                      );
                    })
                }
              </div>
              <div className="p-4 border-t border-white/5">
                <Link to={`/products?category=${activeId}`}
                  className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-colors"
                  style={{ color: active?.color }}>
                  عرض جميع منتجات {active?.name}
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
