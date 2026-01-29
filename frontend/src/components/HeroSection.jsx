import { Button } from "@/components/ui/button";
import { ChevronDown, Zap, Shield, Gauge, Flame } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Removed ': MouseEvent' type annotation
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-24 pb-8 sm:pb-0">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-animated opacity-30" />

      {/* Multiple Radial Glows - Red Theme */}
      <div className="absolute inset-0 bg-radial-glow-intense" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-secondary/20 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-primary/15 via-transparent to-transparent blur-3xl" />

      {/* Animated Scan Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-[scan-line_4s_linear_infinite]" />
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent animate-[scan-line_6s_linear_infinite]" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Orbs - Red Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Removed Array type generic */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'hsl(0 85% 55% / 0.15)' : 'hsl(350 80% 45% / 0.15)'} 0%, transparent 70%)`,
              animation: `float-slow ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Particle System - Red Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-10%`,
              background: i % 3 === 0
                ? 'hsl(0 85% 55%)'
                : i % 3 === 1
                  ? 'hsl(350 80% 45%)'
                  : 'hsl(20 100% 55%)',
              boxShadow: `0 0 ${6 + Math.random() * 10}px currentColor`,
              animation: `particle-float ${10 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Orbiting Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-30">
        <div className="absolute inset-0 animate-orbit">
          <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_hsl(0_85%_55%)]" />
        </div>
        <div className="absolute inset-0 animate-orbit-reverse">
          <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_15px_hsl(350_80%_45%)]" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8">
            <div className="space-y-6">
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-card border border-primary/30 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-primary font-display text-[10px] sm:text-xs tracking-[0.2em] uppercase">
                  Next Generation Electric
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[0.95] animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <span className="block text-foreground relative">
                  Future
                </span>
                <span className="block text-gradient-animated py-1 sm:py-2">
                  Power.
                </span>
                <span className="block">
                  <span className="text-foreground">Zero </span>
                  <span className="text-gradient-reverse neon-text-intense">Noise.</span>
                </span>
              </h1>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in px-4 lg:px-0" style={{ animationDelay: '0.6s' }}>
              Experience the future of off-road adventure. Silent power meets
              <span className="text-primary"> uncompromising performance</span>.
              Built for those who dare to lead.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button variant="hero" size="xl" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  Shop Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
              <Button variant="heroOutline" size="xl" className="group">
                <span className="flex items-center gap-2">
                  Explore Models
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
              </Button>
            </div>

            {/* Stats with Icons */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 pt-4 sm:pt-8 animate-fade-in" style={{ animationDelay: '1s' }}>
              {[
                { value: "300+", label: "Mile Range", icon: Gauge },
                { value: "2.8s", label: "0-60 MPH", icon: Zap },
                { value: "150kW", label: "Peak Power", icon: Shield },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group text-center lg:text-left p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-2xl glass-card border border-transparent hover:border-primary/30 transition-all duration-300"
                >
                  <stat.icon className="w-3 h-3 sm:w-5 sm:h-5 text-primary mb-1 sm:mb-2 mx-auto lg:mx-0 group-hover:scale-110 transition-transform" />
                  <p className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-primary neon-text group-hover:neon-text-intense transition-all">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-[8px] sm:text-xs uppercase tracking-wider mt-0.5 sm:mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - ATV Image with 3D Effect */}
          <div className="relative animate-fade-in perspective-1000" style={{ animationDelay: '0.6s' }}>
            {/* Multiple Glow Layers - Red Theme */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/40 via-secondary/20 to-transparent blur-3xl scale-125 animate-pulse-glow-intense" />
            <div className="absolute inset-0 bg-gradient-radial from-secondary/30 via-transparent to-transparent blur-2xl scale-110" style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }} />

            {/* Rotating Ring */}
            <div className="absolute inset-[-20%] border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-[-10%] border border-secondary/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

            {/* Energy Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]">
              <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-[ripple_3s_ease-out_infinite]" />
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[ripple_3s_ease-out_infinite_1s]" />
              <div className="absolute inset-0 border-2 border-primary/10 rounded-full animate-[ripple_3s_ease-out_infinite_2s]" />
            </div>

            {/* ATV Image with Float and Parallax */}
            <div
              className="relative animate-float preserve-3d"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
              }}
            >
              <img
                src="/nitrousHome.png"
                alt="Naitrous Electric ATV"
                className="w-full h-auto drop-shadow-[0_0_80px_hsl(0,85%,55%,0.4)] transition-transform duration-300"
              />

              {/* Holographic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 mix-blend-overlay" />
            </div>

            {/* Floating Tech Specs */}
            <div className="absolute -right-4 top-1/4 glass-card p-3 rounded-xl border border-primary/30 animate-float-slow hidden lg:block" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Battery</p>
                  <p className="text-sm font-display font-bold text-primary">120 kWh</p>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 bottom-1/4 glass-card p-3 rounded-xl border border-secondary/30 animate-float-slow hidden lg:block" style={{ animationDelay: '2s' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Protection</p>
                  <p className="text-sm font-display font-bold text-secondary">IP68</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;