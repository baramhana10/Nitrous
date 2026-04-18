import { ArrowLeft, Gamepad2, Palette, Rocket, Star } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden mhana-grid-bg">
      {/* Subtle Glow in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center text-center">

        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-[#131620]/80 backdrop-blur-sm mb-12">
          <span className="text-sm font-medium text-white">أكثر من <span className="font-bold">10,000</span> عائلة سعيدة</span>
          <Star className="w-4 h-4 text-accent fill-accent" />
        </div>

        {/* Main Title */}
        <h1 className="text-[5rem] md:text-[7rem] lg:text-[9rem] font-black leading-[1.1] text-white tracking-tight mb-8">
          عالم الألعاب
          <br />
          <span className="text-primary relative inline-block">
            يبدأ هنا
            {/* The little dash above 'د' seen in the design */}
            <span className="absolute top-[0.1em] left-[1.5em] w-[0.8em] h-[0.1em] bg-white rounded-full"></span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/60 mb-14 font-medium max-w-2xl">
          ألعاب مختارة بعناية — آمنة، ممتعة، تنمي خيال طفلك
        </p>

        {/* Action Button & Floating Badges Container */}
        <div className="relative w-full max-w-4xl flex flex-col items-center">

          {/* Shop Button */}
          <Link to="/products" className="relative z-20">
            <button className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,51,51,0.3)]">
              تسوق الآن
              <ArrowLeft className="w-5 h-5" /> {/* Arrow pointing left for RTL */}
            </button>
          </Link>

          {/* Floating Icons (using Lucide icons in dark circles to emulate the 3D items) */}
          <div className="absolute top-[-80px] left-[15%] hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-[#131620] border border-white/5 shadow-xl animate-[bounce_4s_infinite]">
            <Rocket className="w-6 h-6 text-pink-400" />
          </div>
          <div className="absolute top-10 left-[5%] hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[#131620] border border-white/5 shadow-xl animate-[bounce_5s_infinite_0.5s]">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
          </div>
          <div className="absolute top-[-160px] right-[40%] hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-[#131620] border border-white/5 shadow-xl animate-[bounce_6s_infinite_1s]">
            <Palette className="w-7 h-7 text-blue-400" />
          </div>
          <div className="absolute top-[20px] right-[10%] hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-[#131620] border border-white/5 shadow-xl animate-[bounce_4.5s_infinite_1.5s]">
            <span className="text-2xl">🧸</span>
          </div>
        </div>

      </div>

      {/* Center Bottom Item (Teddy Bear area) */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-red-500/10 flex items-center justify-center z-0">
        <div className="absolute inset-0 rounded-full border border-red-500/20 scale-75"></div>
        <div className="absolute inset-0 rounded-full border border-red-500/30 scale-50"></div>
        <div className="flex flex-col items-center translate-y-[-40px]">
          {/* If there's an actual bear image we can use it, otherwise emoji or an icon */}
          <span className="text-6xl md:text-8xl drop-shadow-[0_0_30px_rgba(255,204,0,0.4)]">🧸</span>
          <span className="text-accent font-bold mt-4 tracking-wider text-sm md:text-base">مهنا بلس</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
