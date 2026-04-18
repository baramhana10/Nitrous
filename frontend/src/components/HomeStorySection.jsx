import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeStorySection() {
  return (
    <section className="relative w-full py-32 bg-background overflow-hidden border-b border-white/5 flex flex-col justify-between min-h-[800px]">
      
      {/* Huge Background Outline Text */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex whitespace-nowrap opacity-30 pointer-events-none select-none overflow-hidden">
        <h2 
            className="text-[15vw] font-black uppercase tracking-tighter"
            style={{ 
                WebkitTextStroke: "2px rgba(255,51,51,0.8)", 
                color: "transparent",
                textShadow: "0 0 40px rgba(255,51,51,0.4), 0 0 80px rgba(255,51,51,0.15)"
            }}
        >
          MHANA PLUS MHANA PLUS MHANA PLUS
        </h2>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center flex-1 flex flex-col items-center justify-center pt-20 pb-40">
        
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
          كل <span className="text-primary">لعبة</span> تحكى قصة — نختار
          <br />
          لأطفالكم الأفضل دائماً
        </h2>

        <div className="flex items-center gap-6 mt-6">
            <span className="text-white/50 text-sm font-semibold">+500 منتج جديد هذا الشهر</span>
            <Link to="/products">
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,51,51,0.3)] hover:scale-105">
                    استكشف الآن
                </button>
            </Link>
        </div>
      </div>

      {/* Bottom Stats (Different from top ticker) */}
      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6 border-t border-white/5 pt-12 mt-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x-reverse divide-x divide-white/5">
            <div className="flex flex-col items-center justify-center py-4">
                <span className="text-4xl md:text-5xl font-black text-primary mb-2">99%</span>
                <span className="text-sm font-medium text-white/50">رضا العملاء</span>
            </div>
            <div className="flex flex-col items-center justify-center py-4">
                <span className="text-4xl md:text-5xl font-black text-primary mb-2">4.9</span>
                <span className="text-sm font-medium text-white/50">متوسط التقييم</span>
            </div>
            <div className="flex flex-col items-center justify-center py-4">
                <span className="text-4xl md:text-5xl font-black text-primary mb-2">+50K</span>
                <span className="text-sm font-medium text-white/50">منتج مباع</span>
            </div>
            <div className="flex flex-col items-center justify-center py-4">
                <span className="text-4xl md:text-5xl font-black text-primary mb-2">+10K</span>
                <span className="text-sm font-medium text-white/50">عائلة سعيدة</span>
            </div>
        </div>
      </div>

    </section>
  );
}