import { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ShoppingBag, CreditCard, Wallet,
  Flame, Sparkles, TrendingUp,
  UploadCloud, Eye, X,
  CheckCircle2, MinusCircle, AlertTriangle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardNav from "@/components/DashboardNav";

/* ─── Constants ─────────────────────────────────────────── */
const CATEGORY_TAGS = [
  { id: "عروض",          label: "عروض",          icon: Flame,      color: "#ef4444" },
  { id: "جديد",          label: "جديد",          icon: Sparkles,   color: "#f59e0b" },
  { id: "الأكثر مبيعاً", label: "الأكثر مبيعاً", icon: TrendingUp, color: "#22c55e" },
];

const CATEGORY_OPTIONS = [
  { id: "edu",         name: "ألعاب تعليمية" },
  { id: "dolls",       name: "دمى وعرائس" },
  { id: "cars",        name: "سيارات وطائرات" },
  { id: "electronics", name: "ألعاب إلكترونية" },
  { id: "building",    name: "ألعاب البناء" },
  { id: "outdoor",     name: "ألعاب خارجية" },
  { id: "arts",        name: "فنون وإبداع" },
  { id: "babies",      name: "مستلزمات الرضع" },
];

/* ─── Styled Inputs ──────────────────────────────────────── */
const Field = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

const DarkInput = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/[0.08] text-white text-sm
                placeholder:text-white/25 focus:outline-none focus:border-primary/60 focus:bg-white/[0.08]
                transition-all duration-200 ${props.className || ""}`}
  />
));
DarkInput.displayName = "DarkInput";

const DarkTextarea = forwardRef((props, ref) => (
  <textarea
    {...props}
    ref={ref}
    rows={3}
    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/[0.08] text-white text-sm
               placeholder:text-white/25 focus:outline-none focus:border-primary/60
               transition-all duration-200 resize-none"
  />
));
DarkTextarea.displayName = "DarkTextarea";

const DarkSelect = ({ value, onChange, options, placeholder }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className="w-full px-4 py-2.5 rounded-xl bg-[#0e1118] border border-white/[0.08] text-white text-sm
               focus:outline-none focus:border-primary/60 transition-all duration-200"
  >
    <option value="" disabled>{placeholder}</option>
    {options.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
  </select>
);

/* ─── Tag Selector ───────────────────────────────────────── */
const TagSelector = ({ selectedTags, onChange }) => (
  <div>
    <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">قسم الصفحة الرئيسية</p>
    <div className="flex flex-wrap gap-2">
      {CATEGORY_TAGS.map(({ id, label, icon: Icon, color }) => {
        const active = selectedTags.includes(id);
        return (
          <button
            key={id} type="button"
            onClick={() => onChange(active ? selectedTags.filter(t => t !== id) : [...selectedTags, id])}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
            style={{
              borderColor: active ? color : "rgba(255,255,255,0.08)",
              background:  active ? `${color}22` : "transparent",
              color:       active ? color : "rgba(255,255,255,0.4)",
            }}
          >
            <Icon className="w-3.5 h-3.5" />{label}
          </button>
        );
      })}
    </div>
  </div>
);

/* ─── Live Preview Card ──────────────────────────────────── */
const PreviewCard = ({ name, price, badge, quantity, selectedTags, imagePreview }) => {
  const firstTag = CATEGORY_TAGS.find(t => selectedTags?.includes(t.id));
  const accent   = firstTag?.color || "#ef4444";
  const sold     = quantity !== "" && quantity !== undefined && Number(quantity) === 0;

  return (
    <div className="rounded-2xl overflow-hidden bg-[#0e1118] border border-white/10 w-full max-w-[220px] mx-auto">
      <div className="relative h-40 flex items-center justify-center overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 90%, ${accent}22 0%, transparent 70%)` }} />
        {imagePreview
          ? <img src={imagePreview} alt="preview" className={`w-full h-full object-cover ${sold ? "opacity-40 grayscale" : ""}`} />
          : <span className={`text-5xl ${sold ? "opacity-25" : "opacity-60"}`}>📦</span>
        }
        {sold && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-red-500/90 text-white text-[11px] font-black px-3 py-1 rounded-full">نفد المخزون</span>
          </div>
        )}
        {badge && !sold && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white">{badge}</span>
        )}
      </div>
      <div className="h-px w-full" style={{ background: `${accent}44` }} />
      <div className="p-3">
        <p className="text-xs font-bold text-white truncate mb-1">{name || "اسم المنتج"}</p>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-black ${sold ? "text-white/30 line-through" : ""}`} style={sold ? {} : { color: accent }}>
            {price || "0"} <span className="text-[10px] text-white/40">ر.س</span>
          </span>
          <div className="flex gap-1">
            {selectedTags?.map(tagId => {
              const t = CATEGORY_TAGS.find(x => x.id === tagId);
              return t ? <t.icon key={tagId} className="w-3 h-3" style={{ color: t.color }} /> : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Dashboard ──────────────────────────────────────────── */
const Dashboard = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [imageFiles, setImageFiles]     = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const queryClient = useQueryClient();

  const nameVal  = watch("name");
  const priceVal = watch("price");
  const badgeVal = watch("badge");
  const qtyVal   = watch("quantity");
  const imgPreview = imageFiles[0] ? URL.createObjectURL(imageFiles[0]) : null;

  /* ── Payment Stats ── */
  const { data: paymentStats } = useQuery({
    queryKey: ["paymentStats"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/orders/stats/payments");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    }
  });

  /* ── Mutation ── */
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch("http://localhost:5000/api/products", { method: "POST", body: formData });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || "Failed to add product"); }
      return res.json();
    },
    onSuccess: () => {
      toast.success("تم إضافة المنتج بنجاح!");
      reset();
      setImageFiles([]);
      setSelectedTags([]);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (e) => toast.error(e.message)
  });

  const onSubmit = (data) => {
    if (imageFiles.length === 0) return toast.error("يجب رفع صورة واحدة على الأقل");

    const fd = new FormData();
    fd.append("name",     data.name);
    fd.append("tagline",  data.tagline || "");
    fd.append("price",    data.price);
    fd.append("category", data.category);
    const cat = CATEGORY_OPTIONS.find(c => c.id === data.category);
    fd.append("categoryName", cat?.name || "");
    fd.append("specs", JSON.stringify({ range: data.range, power: data.power, acceleration: data.acceleration, topSpeed: data.topSpeed }));
    fd.append("features", JSON.stringify((data.features || "").split(",").map(f => f.trim()).filter(Boolean)));
    fd.append("badge",    data.badge || "");
    fd.append("tags",     JSON.stringify(selectedTags));
    fd.append("quantity", data.quantity === "" || data.quantity === undefined ? "" : data.quantity);
    imageFiles.forEach(f => fd.append("images", f));
    mutation.mutate(fd);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-40 pb-16 sm:pt-20 sm:pb-24">
        <DashboardNav />

        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 max-w-4xl mx-auto">
          {[
            { label: "الدفع عند الاستلام", value: paymentStats?.cash  || 0, icon: Wallet,      color: "#f59e0b" },
            { label: "بطاقة فيزا / كريديت", value: paymentStats?.card  || 0, icon: CreditCard,   color: "#ef4444" },
            { label: "إجمالي الطلبات",      value: paymentStats?.total || 0, icon: ShoppingBag,  color: "#ffffff" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-[#0e1118] border border-white/8 rounded-2xl px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-white/40 text-sm mb-1">{label}</p>
                <p className="text-3xl font-black" style={{ color }}>{value}</p>
              </div>
              <Icon className="w-10 h-10 opacity-10" style={{ color }} />
            </div>
          ))}
        </div>

        {/* ── Add Product Section ── */}
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-start mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-primary inline-block" />
              <span className="text-primary text-xs font-bold uppercase tracking-widest">لوحة التحكم</span>
            </div>
            <h2 className="text-3xl font-black text-white">إضافة منتج جديد</h2>
            <p className="text-white/30 text-sm mt-1">أضف منتجًا جديدًا إلى متجرك</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row gap-8">

              {/* ── Form Fields ── */}
              <div className="flex-1 space-y-5">

                {/* Quantity */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">الكمية في المخزون</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <DarkInput
                      type="number" min="0"
                      placeholder="اتركه فارغاً = غير محدود"
                      className="max-w-[210px]"
                      {...register("quantity")}
                    />
                    <span className="text-sm">
                      {qtyVal === "" || qtyVal === undefined
                        ? <span className="text-green-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" />غير محدود</span>
                        : Number(qtyVal) === 0
                        ? <span className="text-red-400 flex items-center gap-1"><MinusCircle className="w-4 h-4" />نفد المخزون</span>
                        : Number(qtyVal) <= 5
                        ? <span className="text-yellow-400 flex items-center gap-1"><AlertTriangle className="w-4 h-4" />كمية محدودة</span>
                        : <span className="text-green-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" />متاح</span>
                      }
                    </span>
                  </div>
                </div>

                {/* Name + Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="اسم المنتج">
                    <DarkInput placeholder="مثال: نيتروس برو 3000" {...register("name", { required: true })} />
                  </Field>
                  <Field label="السعر (ر.س)">
                    <DarkInput placeholder="مثال: 1200" {...register("price", { required: true })} />
                  </Field>
                </div>

                {/* Tagline */}
                <Field label="وصف مختصر">
                  <DarkInput placeholder="جملة قصيرة تصف المنتج..." {...register("tagline")} />
                </Field>

                {/* Category + Badge */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="التصنيف">
                    <DarkSelect
                      value={watch("category") || ""}
                      onChange={val => setValue("category", val)}
                      options={CATEGORY_OPTIONS}
                      placeholder="اختر التصنيف..."
                    />
                  </Field>
                  <Field label="شارة (Badge)">
                    <DarkInput placeholder="مثال: new · sale · hot" {...register("badge")} />
                  </Field>
                </div>

                {/* Tags */}
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
                </div>

                {/* Specs */}
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-3">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">المواصفات (اختياري)</p>
                  <div className="grid grid-cols-2 gap-3">
                    <DarkInput {...register("range")}        placeholder="المدى" />
                    <DarkInput {...register("power")}        placeholder="القوة" />
                    <DarkInput {...register("acceleration")} placeholder="التسارع" />
                    <DarkInput {...register("topSpeed")}     placeholder="أقصى سرعة" />
                  </div>
                </div>

                {/* Features */}
                <Field label="المميزات (مفصولة بفاصلة)">
                  <DarkTextarea {...register("features")} placeholder="ميزة 1، ميزة 2، ميزة 3" />
                </Field>

                {/* Images */}
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-3">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">الصور</p>
                  {imageFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {imageFiles.map((file, idx) => (
                        <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-primary/40 group">
                          <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="" />
                          <button
                            type="button"
                            onClick={() => setImageFiles(prev => prev.filter((_, i) => i !== idx))}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                          >
                            <X className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-white/15 hover:border-primary/50 cursor-pointer transition-colors group">
                    <UploadCloud className="w-5 h-5 text-white/30 group-hover:text-primary transition-colors" />
                    <span className="text-sm text-white/40 group-hover:text-white/60">
                      {imageFiles.length > 0 ? `${imageFiles.length} صورة مختارة` : "انقر لرفع صور المنتج"}
                    </span>
                    <input
                      type="file" accept="image/*" multiple className="hidden"
                      onChange={e => setImageFiles(Array.from(e.target.files))}
                    />
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full py-4 rounded-xl font-black text-white text-base bg-primary hover:bg-primary/90
                             transition-colors disabled:opacity-50 flex items-center justify-center gap-3
                             shadow-lg shadow-primary/20"
                >
                  {mutation.isPending
                    ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />جاري الإضافة...</>
                    : "إضافة المنتج"
                  }
                </button>
              </div>

              {/* ── Live Preview ── */}
              <div className="lg:w-64 shrink-0 space-y-4">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-widest text-center flex items-center justify-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> معاينة مباشرة
                </p>
                <PreviewCard
                  name={nameVal}
                  price={priceVal}
                  badge={badgeVal}
                  quantity={qtyVal}
                  selectedTags={selectedTags}
                  imagePreview={imgPreview}
                />
                <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3 space-y-2 text-xs text-white/40">
                  <p className="font-semibold text-white/60">يظهر في أقسام:</p>
                  {CATEGORY_TAGS.map(({ id, label, icon: Icon, color }) => (
                    <div key={id} className="flex items-center gap-2" style={{ color: selectedTags.includes(id) ? color : undefined }}>
                      <Icon className="w-3 h-3" />
                      <span className={selectedTags.includes(id) ? "font-semibold" : "opacity-40"}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
