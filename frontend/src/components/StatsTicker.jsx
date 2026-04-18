import { Zap } from "lucide-react";

const StatsTicker = () => {
  return (
    <div className="w-full flex flex-col border-y border-white/5 bg-[#0a0b10]">
      {/* Top Stats Bar */}
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-white/5 border-b border-white/5">

        {/* Stat 1 */}
        <div className="flex flex-col items-center justify-center py-6 px-4">
          <span className="text-3xl font-black text-primary mb-1">30</span>
          <span className="text-sm font-medium text-white/50">يوم استرجاع</span>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col items-center justify-center py-6 px-4">
          <span className="text-3xl font-black text-primary mb-1">4.9</span>
          <span className="text-sm font-medium text-white/50">تقييم العملاء</span>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col items-center justify-center py-6 px-4">
          <span className="text-3xl font-black text-primary mb-1">+50K</span>
          <span className="text-sm font-medium text-white/50">منتج مباع</span>
        </div>

        {/* Stat 4 */}
        <div className="flex flex-col items-center justify-center py-6 px-4">
          <span className="text-3xl font-black text-primary mb-1">100%</span>
          <span className="text-sm font-medium text-white/50">منتجات آمنة ومعتمدة</span>
        </div>

      </div>

      {/* Red Marquee Banner */}
      <div className="w-full bg-primary py-2.5 overflow-hidden relative flex">
        <div className="animate-marquee whitespace-nowrap flex space-x-12 space-x-reverse items-center min-w-full">
          {/* Repeating elements to create the marquee effect */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-white fill-white" />
              <span className="text-white font-bold text-sm tracking-wide">
                عرض خاص — خصم 30% على جميع ألعاب البناء
              </span>
              {/* Some other texts from the image banner */}
              <Zap className="w-4 h-4 text-white fill-white mr-6" />
              <span className="text-white font-bold text-sm tracking-wide">
                توصيل مجاني للطلبات فوق 200 رس
              </span>
              <Zap className="w-4 h-4 text-white fill-white mr-6" />
              <span className="text-white font-bold text-sm tracking-wide">
                منتجات آمنة ومعتمدة 100% للأطفال
              </span>
              <Zap className="w-4 h-4 text-white fill-white mr-6" />
              <span className="text-white font-bold text-sm tracking-wide">
                استرجاع وتبديل مجاني خلال 30 يوم
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sub banner of small links */}
      <div className="w-full bg-[#131620] py-2.5 border-b border-white/5 hidden md:block">
        <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-12">
          <span className="text-white/40 text-xs font-semibold flex items-center gap-2"><span className="text-primary">+</span> ألعاب معتمدة ومأمونة</span>
          <span className="text-white/40 text-xs font-semibold flex items-center gap-2"><span className="text-primary">+</span> توصيل سريع لباب بيتك</span>
          <span className="text-white/40 text-xs font-semibold flex items-center gap-2"><span className="text-primary">+</span> جودة عالمية مضمونة</span>
          <span className="text-white/40 text-xs font-semibold flex items-center gap-2"><span className="text-primary">+</span> دفع آمن 100%</span>
          <span className="text-white/40 text-xs font-semibold flex items-center gap-2"><span className="text-primary">+</span> عروض يومية حصرية</span>
        </div>
      </div>

    </div>
  );
};

export default StatsTicker;
