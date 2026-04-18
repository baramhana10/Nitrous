import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Star, Truck, ShieldCheck, Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    }
  });

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-white/10 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/50 text-sm">جارٍ تحميل المنتج...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-400 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : (product.image ? [product.image] : []);
  const getImgSrc = (img) => img?.startsWith("/uploads") ? `http://localhost:5000${img}` : img;
  const mainImage = getImgSrc(images[selectedImage]);
  const isSoldOut = product.quantity !== undefined && product.quantity !== null && product.quantity === 0;

  const handleBuyNow = () => navigate("/checkout", { state: { product, quantity } });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ════════════════════════════════
          MOBILE LAYOUT  (< md)
      ════════════════════════════════ */}
      <div className="md:hidden">
        {/* Hero Image — full width, tall */}
        <div className="relative w-full h-[60vw] min-h-[280px] max-h-[420px] bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden">
          {mainImage ? (
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-8xl">📦</span>
            </div>
          )}

          {/* Back button */}
          <Link to="/products"
            className="absolute top-14 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </Link>

          {/* Wishlist button */}
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className="absolute top-14 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <Heart className={`w-5 h-5 ${wishlisted ? "fill-red-400 text-red-400" : "text-white"}`} />
          </button>

          {/* Badge */}
          {product.badge && (
            <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-primary text-white">
              {product.badge}
            </span>
          )}

          {/* Sold out overlay */}
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-black text-xl">نفد المخزون</span>
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 px-4 mt-3 overflow-x-auto scrollbar-hide">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all
                  ${selectedImage === idx ? "border-primary" : "border-white/10"}`}
              >
                <img src={getImgSrc(img)} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        )}

        {/* Product Info Card */}
        <div className="px-4 pt-5 pb-36">

          {/* Category + Name */}
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">{product.categoryName || "منتج"}</p>
          <h1 className="text-2xl font-black text-white leading-tight mb-2">{product.name}</h1>
          {product.tagline && <p className="text-sm text-white/50 mb-4">{product.tagline}</p>}

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`} />
                ))}
              </div>
              <span className="text-xs text-white/40">({product.reviews} تقييم)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-black text-primary">{product.price}</span>
            <span className="text-sm text-white/40">ر.س</span>
          </div>

          {/* Specs grid */}
          {product.specs && Object.values(product.specs).some(Boolean) && (
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-4 mb-5">
              <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">المواصفات</p>
              <div className="grid grid-cols-2 gap-3">
                {product.specs.range && <div><p className="text-[10px] text-white/40 uppercase mb-0.5">المدى</p><p className="text-sm font-bold text-white">{product.specs.range}</p></div>}
                {product.specs.power && <div><p className="text-[10px] text-white/40 uppercase mb-0.5">القوة</p><p className="text-sm font-bold text-white">{product.specs.power}</p></div>}
                {product.specs.acceleration && <div><p className="text-[10px] text-white/40 uppercase mb-0.5">التسارع</p><p className="text-sm font-bold text-white">{product.specs.acceleration}</p></div>}
                {product.specs.topSpeed && <div><p className="text-[10px] text-white/40 uppercase mb-0.5">السرعة القصوى</p><p className="text-sm font-bold text-white">{product.specs.topSpeed}</p></div>}
              </div>
            </div>
          )}

          {/* Features */}
          {product.features?.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">المميزات</p>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-primary font-bold mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="rounded-xl bg-white/[0.03] border border-white/8 p-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary shrink-0" />
              <div><p className="text-xs font-bold text-white">شحن مجاني</p><p className="text-[10px] text-white/40">فوق 100 ر.س</p></div>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/8 p-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
              <div><p className="text-xs font-bold text-white">دفع آمن</p><p className="text-[10px] text-white/40">مضمون 100%</p></div>
            </div>
          </div>
        </div>

        {/* ── Sticky Bottom CTA (mobile) ── */}
        <div className="fixed bottom-[72px] left-0 right-0 z-40 bg-[#0b0d14]/95 backdrop-blur-md border-t border-white/8 px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Quantity */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white/60 hover:text-white">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white font-bold w-6 text-center text-sm">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-white/60 hover:text-white">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Buy now */}
            <button
              onClick={handleBuyNow}
              disabled={isSoldOut}
              className="flex-1 py-3 rounded-xl font-black text-white bg-primary hover:bg-primary/90 transition-colors
                         disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              {isSoldOut ? "نفد المخزون" : "اشترِ الآن"}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors
                ${wishlisted ? "bg-red-500/20 border-red-500/40 text-red-400" : "bg-white/5 border-white/10 text-white/50"}`}
            >
              <Heart className={`w-5 h-5 ${wishlisted ? "fill-red-400" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          DESKTOP LAYOUT  (>= md)
      ════════════════════════════════ */}
      <div className="hidden md:block pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Back */}
          <Link to="/products" className="inline-flex items-center text-sm text-white/50 hover:text-primary transition-colors mb-8 gap-2">
            <ArrowRight className="w-4 h-4" />
            العودة إلى المنتجات
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/8 aspect-square">
                {mainImage
                  ? <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center"><span className="text-9xl">📦</span></div>
                }
                {product.badge && (
                  <span className="absolute top-5 right-5 px-4 py-2 rounded-full text-xs font-bold bg-primary text-white">{product.badge}</span>
                )}
                {isSoldOut && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-black text-2xl">نفد المخزون</span>
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {images.map((img, idx) => (
                    <button key={idx} onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? "border-primary" : "border-white/10 hover:border-primary/40"}`}>
                      <img src={getImgSrc(img)} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{product.categoryName || "منتج"}</p>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">{product.name}</h1>
              {product.tagline && <p className="text-lg text-white/50 mb-6">{product.tagline}</p>}

              {product.rating > 0 && (
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/8">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`} />
                    ))}
                  </div>
                  <span className="text-white/40 text-sm">{product.rating.toFixed(1)} ({product.reviews} تقييمات)</span>
                </div>
              )}

              <div className="mb-8">
                <span className="text-5xl font-black text-primary">{product.price}</span>
                <span className="text-white/40 text-sm mr-2">ر.س</span>
              </div>

              {product.specs && Object.values(product.specs).some(Boolean) && (
                <div className="mb-8 pb-8 border-b border-white/8">
                  <h3 className="font-bold text-white text-base mb-4">المواصفات</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.specs.range && <div><p className="text-xs text-white/40 uppercase tracking-wide mb-1">المدى</p><p className="text-base font-bold text-white">{product.specs.range}</p></div>}
                    {product.specs.power && <div><p className="text-xs text-white/40 uppercase tracking-wide mb-1">القوة</p><p className="text-base font-bold text-white">{product.specs.power}</p></div>}
                    {product.specs.acceleration && <div><p className="text-xs text-white/40 uppercase tracking-wide mb-1">التسارع</p><p className="text-base font-bold text-white">{product.specs.acceleration}</p></div>}
                    {product.specs.topSpeed && <div><p className="text-xs text-white/40 uppercase tracking-wide mb-1">السرعة القصوى</p><p className="text-base font-bold text-white">{product.specs.topSpeed}</p></div>}
                  </div>
                </div>
              )}

              {product.features?.length > 0 && (
                <div className="mb-8 pb-8 border-b border-white/8">
                  <h3 className="font-bold text-white text-base mb-4">المميزات</h3>
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70"><span className="text-primary font-bold mt-0.5">✓</span>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity + CTA */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-white/60 font-semibold text-sm">الكمية:</span>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white/50 hover:text-white"><Minus className="w-4 h-4" /></button>
                    <span className="text-white font-bold w-8 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-white/50 hover:text-white"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleBuyNow}
                    disabled={isSoldOut}
                    className="flex-1 py-4 rounded-xl font-black text-white bg-primary hover:bg-primary/90 transition-colors
                               disabled:opacity-40 flex items-center justify-center gap-2 text-base"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isSoldOut ? "نفد المخزون" : "اشترِ الآن"}
                  </button>
                  <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className={`w-14 rounded-xl border flex items-center justify-center transition-colors
                      ${wishlisted ? "bg-red-500/20 border-red-500/40 text-red-400" : "bg-white/5 border-white/10 text-white/50 hover:text-white"}`}
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? "fill-red-400" : ""}`} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/8">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div><p className="font-bold text-white text-sm">شحن مجاني</p><p className="text-xs text-white/40">على الطلبات فوق 100 ر.س</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div><p className="font-bold text-white text-sm">دفع آمن</p><p className="text-xs text-white/40">آمن ومضمون 100%</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
