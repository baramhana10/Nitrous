import { useState, forwardRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Edit, Trash2, Image as ImageIcon, X,
  Flame, Sparkles, TrendingUp, Star,
  Package, UploadCloud, Eye, AlertTriangle,
  CheckCircle2, MinusCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardNav from "@/components/DashboardNav";
import { useForm } from "react-hook-form";
import { getImageUrl } from "@/lib/api";

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

const isSoldOut = (p) =>
  p.quantity !== undefined && p.quantity !== null && p.quantity === 0;

/* ─── Stock Badge ────────────────────────────────────────── */
const StockBadge = ({ quantity }) => {
  if (quantity === null || quantity === undefined)
    return <span className="flex items-center gap-1 text-[10px] font-semibold text-green-400"><CheckCircle2 className="w-3 h-3" />متاح</span>;
  if (quantity === 0)
    return <span className="flex items-center gap-1 text-[10px] font-semibold text-red-400"><MinusCircle className="w-3 h-3" />نفد المخزون</span>;
  if (quantity <= 5)
    return <span className="flex items-center gap-1 text-[10px] font-semibold text-yellow-400"><AlertTriangle className="w-3 h-3" />كمية محدودة ({quantity})</span>;
  return <span className="flex items-center gap-1 text-[10px] font-semibold text-green-400"><CheckCircle2 className="w-3 h-3" />متاح ({quantity})</span>;
};

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
    className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white text-sm
                placeholder:text-white/25 focus:outline-none focus:border-primary/60 focus:bg-white/8
                transition-all duration-200 ${props.className || ""}`}
  />
));
DarkInput.displayName = "DarkInput";

const DarkTextarea = forwardRef((props, ref) => (
  <textarea
    {...props}
    ref={ref}
    rows={3}
    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white text-sm
               placeholder:text-white/25 focus:outline-none focus:border-primary/60
               transition-all duration-200 resize-none"
  />
));
DarkTextarea.displayName = "DarkTextarea";

const DarkSelect = ({ value, onChange, options, placeholder }) => (
  <select
    value={value} onChange={e => onChange(e.target.value)}
    className="w-full px-4 py-2.5 rounded-xl bg-[#0e1118] border border-white/8 text-white text-sm
               focus:outline-none focus:border-primary/60 transition-all duration-200"
  >
    <option value="" disabled>{placeholder}</option>
    {options.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
  </select>
);

/* ─── Live Preview Mini Card ─────────────────────────────── */
const PreviewCard = ({ name, price, badge, quantity, selectedTags, imagePreview }) => {
  const firstTag = CATEGORY_TAGS.find(t => selectedTags?.includes(t.id));
  const accent   = firstTag?.color || "#ef4444";
  const sold     = Number(quantity) === 0;

  return (
    <div className="rounded-2xl overflow-hidden bg-[#0e1118] border border-white/10 w-full max-w-[220px] mx-auto">
      <div className="relative h-36 flex items-center justify-center overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent">
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
        {badge && !sold && <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white">{badge}</span>}
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

/* ─── Edit Form ──────────────────────────────────────────── */
const EditForm = ({
  register, handleSubmit, watch, setValue,
  selectedTags, setSelectedTags,
  imageFiles, setImageFiles,
  existingImages, setExistingImages,
  onSubmit, isPending, onCancel,
}) => {
  const nameVal    = watch("name");
  const priceVal   = watch("price");
  const badgeVal   = watch("badge");
  const qtyVal     = watch("quantity");
  const imgPreview = imageFiles[0]
    ? URL.createObjectURL(imageFiles[0])
    : existingImages?.[0]
      ? (existingImages[0].startsWith("/uploads") ? `http://localhost:5000${existingImages[0]}` : existingImages[0])
      : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col lg:flex-row gap-8">

        {/* ── Fields ── */}
        <div className="flex-1 space-y-5 overflow-y-auto">

          {/* Quantity — top priority, prominent */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">الكمية في المخزون</p>
            <div className="flex items-center gap-4">
              <DarkInput
                type="number" min="0"
                placeholder="اتركه فارغاً = غير محدود"
                {...register("quantity")}
                className="max-w-[200px]"
              />
              <div className="text-sm">
                {qtyVal === "" || qtyVal === undefined || qtyVal === null
                  ? <span className="text-green-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" />غير محدود</span>
                  : Number(qtyVal) === 0
                  ? <span className="text-red-400 flex items-center gap-1"><MinusCircle className="w-4 h-4" />نفد المخزون — لن يظهر في المتجر</span>
                  : Number(qtyVal) <= 5
                  ? <span className="text-yellow-400 flex items-center gap-1"><AlertTriangle className="w-4 h-4" />كمية محدودة</span>
                  : <span className="text-green-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" />متاح</span>
                }
              </div>
            </div>
          </div>

          {/* Name + Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="اسم المنتج">
              <DarkInput placeholder="اسم المنتج" {...register("name", { required: true })} />
            </Field>
            <Field label="السعر (ر.س)">
              <DarkInput placeholder="السعر" {...register("price", { required: true })} />
            </Field>
          </div>

          {/* Tagline */}
          <Field label="وصف مختصر">
            <DarkInput placeholder="جملة قصيرة..." {...register("tagline")} />
          </Field>

          {/* Category + Badge */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="التصنيف">
              <DarkSelect value={watch("category") || ""} onChange={val => setValue("category", val)} options={CATEGORY_OPTIONS} placeholder="اختر التصنيف..." />
            </Field>
            <Field label="شارة (Badge)">
              <DarkInput placeholder="مثال: new · sale" {...register("badge")} />
            </Field>
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
            <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
          </div>

          {/* Specs */}
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 space-y-3">
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
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 space-y-3">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">الصور</p>
            {existingImages?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {existingImages.map((img, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10 group">
                    <img src={img.startsWith("/uploads") ? `http://localhost:5000${img}` : img} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setExistingImages(prev => prev.filter(i => i !== img))}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {imageFiles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {imageFiles.map((file, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-primary/40">
                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                    <span className="absolute top-0.5 left-0.5 text-[9px] font-bold bg-primary text-white px-1 rounded">NEW</span>
                  </div>
                ))}
              </div>
            )}
            <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-white/15 hover:border-primary/50 cursor-pointer transition-colors group">
              <UploadCloud className="w-5 h-5 text-white/30 group-hover:text-primary transition-colors" />
              <span className="text-sm text-white/40 group-hover:text-white/60">
                {imageFiles.length > 0 ? `${imageFiles.length} صورة مختارة` : "انقر لرفع صور جديدة"}
              </span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={e => setImageFiles(Array.from(e.target.files))} />
            </label>
          </div>
        </div>

        {/* ── Preview ── */}
        <div className="lg:w-60 shrink-0 space-y-4">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest text-center flex items-center justify-center gap-1">
            <Eye className="w-3.5 h-3.5" /> معاينة مباشرة
          </p>
          <PreviewCard name={nameVal} price={priceVal} badge={badgeVal} quantity={qtyVal} selectedTags={selectedTags} imagePreview={imgPreview} />
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

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-white/8">
        <button type="button" onClick={onCancel}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white/50 hover:text-white border border-white/10 hover:border-white/20 transition-colors">
          إلغاء
        </button>
        <button type="submit" disabled={isPending}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2">
          {isPending
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />جاري الحفظ...</>
            : "حفظ التغييرات"
          }
        </button>
      </div>
    </form>
  );
};

/* ─── Slide Panel ────────────────────────────────────────── */
const SlidePanel = ({ open, onClose, title, children }) => (
  <>
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={onClose}
    />
    <div
      className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-3xl bg-[#0b0d14] border-l border-white/8 shadow-2xl
                  flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
        <h2 className="text-lg font-black text-white">{title}</h2>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
    </div>
  </>
);

/* ─── Main Page ──────────────────────────────────────────── */
const ManageProducts = () => {
  const queryClient = useQueryClient();

  const [editingProduct, setEditingProduct]     = useState(null);
  const [editSelectedTags, setEditSelectedTags] = useState([]);
  const [editImageFiles, setEditImageFiles]     = useState([]);
  const [editExisting, setEditExisting]         = useState([]);

  const editForm = useForm();

  /* ── Data ── */
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    }
  });

  /* ── Mutations ── */
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => { toast.success("تم حذف المنتج"); queryClient.invalidateQueries(["products"]); },
    onError: (e) => toast.error(e.message)
  });

  const editMutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: "PUT", body: formData });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.message || "Failed to update"); }
      return res.json();
    },
    onSuccess: () => {
      toast.success("تم تحديث المنتج");
      setEditingProduct(null);
      setEditImageFiles([]);
      queryClient.invalidateQueries(["products"]);
    },
    onError: (e) => toast.error(e.message)
  });

  /* ── Helpers ── */
  const openEdit = (product) => {
    const imgs = product.images?.length ? product.images : (product.image ? [product.image] : []);
    setEditingProduct(product);
    setEditExisting(imgs);
    setEditImageFiles([]);
    setEditSelectedTags(product.tags || []);
    editForm.reset({
      name:         product.name || "",
      price:        product.price || "",
      tagline:      product.tagline || "",
      category:     product.category || "",
      badge:        product.badge || "",
      quantity:     product.quantity !== null && product.quantity !== undefined ? String(product.quantity) : "",
      range:        product.specs?.range || "",
      power:        product.specs?.power || "",
      acceleration: product.specs?.acceleration || "",
      topSpeed:     product.specs?.topSpeed || "",
      features:     Array.isArray(product.features) ? product.features.join(", ") : "",
    });
  };

  const onEditSubmit = (data) => {
    if (editImageFiles.length === 0 && (editExisting?.length || 0) === 0) {
      return toast.error("يجب إضافة صورة واحدة على الأقل");
    }
    const fd = new FormData();
    fd.append("name",     data.name);
    fd.append("tagline",  data.tagline || "");
    fd.append("price",    data.price);
    fd.append("category", data.category);
    const cat = CATEGORY_OPTIONS.find(c => c.id === data.category);
    fd.append("categoryName", cat?.name || "");
    fd.append("specs",    JSON.stringify({ range: data.range, power: data.power, acceleration: data.acceleration, topSpeed: data.topSpeed }));
    fd.append("features", JSON.stringify((data.features || "").split(",").map(f => f.trim()).filter(Boolean)));
    fd.append("badge",    data.badge || "");
    fd.append("tags",     JSON.stringify(editSelectedTags));
    fd.append("quantity", data.quantity === "" ? "" : data.quantity);
    fd.append("hasExistingImages", "true");
    editExisting?.forEach(img => fd.append("existingImages", img));
    editImageFiles.forEach(f => fd.append("images", f));
    editMutation.mutate({ id: editingProduct._id, formData: fd });
  };

  const getImgSrc = (product) => {
    const raw = product.images?.[0] || product.image || "";
    return raw.startsWith("/uploads") ? `http://localhost:5000${raw}` : raw;
  };

  const soldOut = products.filter(isSoldOut).length;
  const inStock = products.length - soldOut;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-40 pb-16 sm:pt-64 sm:pb-24">
        <DashboardNav />

        {/* ── Header ── */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-px bg-primary inline-block" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">لوحة التحكم</span>
              </div>
              <h1 className="text-3xl font-black text-white">إدارة المنتجات</h1>
              <p className="text-white/40 text-sm mt-1">انقر على أي منتج لتعديله</p>
            </div>
            {/* Stats */}
            <div className="flex gap-4 text-center">
              <div className="bg-white/[0.03] border border-white/8 rounded-xl px-5 py-3">
                <p className="text-2xl font-black text-white">{products.length}</p>
                <p className="text-[11px] text-white/40">إجمالي</p>
              </div>
              <div className="bg-white/[0.03] border border-white/8 rounded-xl px-5 py-3">
                <p className="text-2xl font-black text-green-400">{inStock}</p>
                <p className="text-[11px] text-white/40">متاح</p>
              </div>
              <div className="bg-white/[0.03] border border-white/8 rounded-xl px-5 py-3">
                <p className="text-2xl font-black text-red-400">{soldOut}</p>
                <p className="text-[11px] text-white/40">نفد</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-10 h-10 border-4 border-white/10 border-t-primary rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <Package className="w-16 h-16 text-white/10 mb-4" />
              <p className="text-white/40 text-lg font-semibold">لا توجد منتجات</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map(product => {
                const sold = isSoldOut(product);
                return (
                  <div
                    key={product._id}
                    onClick={() => openEdit(product)}
                    className={`group relative flex flex-col bg-[#0e1118] border rounded-2xl overflow-hidden cursor-pointer
                                hover:border-white/20 transition-all duration-300
                                ${sold ? "border-red-500/20 opacity-75" : "border-white/5"}`}
                  >
                    {/* Image */}
                    <div className={`relative h-44 flex items-center justify-center overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent`}>
                      <img
                        src={getImgSrc(product)}
                        alt={product.name}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${sold ? "grayscale opacity-50" : ""}`}
                        onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = '<span class="text-4xl opacity-30">📦</span>'; }}
                      />
                      {/* Sold-out overlay */}
                      {sold && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <span className="bg-red-500/90 text-white text-[11px] font-black px-3 py-1 rounded-full">نفد المخزون</span>
                        </div>
                      )}
                      {/* Hover actions */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <span className="flex items-center gap-1.5 text-white text-sm font-semibold">
                          <Edit className="w-4 h-4" /> تعديل
                        </span>
                      </div>
                      {/* Tag icons */}
                      {(product.tags || []).length > 0 && (
                        <div className="absolute top-2 right-2 flex gap-1">
                          {product.tags.map(tagId => {
                            const t = CATEGORY_TAGS.find(x => x.id === tagId);
                            return t ? (
                              <span key={tagId} className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${t.color}33` }}>
                                <t.icon className="w-3 h-3" style={{ color: t.color }} />
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>

                    <div className="h-px w-full bg-white/5" />

                    {/* Info */}
                    <div className="p-4 flex-1">
                      <h3 className="text-sm font-bold text-white truncate mb-1">{product.name}</h3>
                      <StockBadge quantity={product.quantity} />
                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-base font-black ${sold ? "text-white/30 line-through" : "text-primary"}`}>
                          {product.price} <span className="text-xs font-normal text-white/30">ر.س</span>
                        </span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) deleteMutation.mutate(product._id);
                          }}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Edit Panel ── */}
      <SlidePanel open={!!editingProduct} onClose={() => setEditingProduct(null)} title={`تعديل: ${editingProduct?.name || ""}`}>
        {editingProduct && (
          <EditForm
            register={editForm.register}
            handleSubmit={editForm.handleSubmit}
            watch={editForm.watch}
            setValue={editForm.setValue}
            selectedTags={editSelectedTags}
            setSelectedTags={setEditSelectedTags}
            imageFiles={editImageFiles}
            setImageFiles={setEditImageFiles}
            existingImages={editExisting}
            setExistingImages={setEditExisting}
            onSubmit={onEditSubmit}
            isPending={editMutation.isPending}
            onCancel={() => setEditingProduct(null)}
          />
        )}
      </SlidePanel>

      <Footer />
    </div>
  );
};

export default ManageProducts;
