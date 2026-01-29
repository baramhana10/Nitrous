import { Cpu, Shield, Wifi, Gauge, Atom, Layers, Flame } from "lucide-react";

const techFeatures = [
  {
    icon: Cpu,
    title: "Neural Drive System",
    description: "AI-powered motor control that adapts to terrain in real-time for optimal performance and efficiency.",
    stat: "1M+",
    statLabel: "Calculations/sec",
  },
  {
    icon: Shield,
    title: "Quantum Battery",
    description: "Next-generation solid-state cells with 3x energy density and zero degradation over 500,000 miles.",
    stat: "500K",
    statLabel: "Mile lifespan",
  },
  {
    icon: Wifi,
    title: "Holo-Connect",
    description: "5G connectivity with augmented reality HUD, real-time diagnostics, and over-the-air updates.",
    stat: "5G",
    statLabel: "Connectivity",
  },
  {
    icon: Gauge,
    title: "Adaptive Dynamics",
    description: "Magnetic suspension system that reads the terrain 1000 times per second for perfect handling.",
    stat: "1000x",
    statLabel: "Per second",
  },
];

const TechnologySection = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Complex Animated Background */}
      <div className="absolute inset-0">
        {/* Animated Lines */}
        <svg className="absolute w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0, 85%, 55%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(0, 85%, 55%)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(350, 80%, 45%)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="line-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(350, 80%, 45%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(20, 100%, 55%)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(0, 85%, 55%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="0%"
              y1={`${10 + i * 12}%`}
              x2="100%"
              y2={`${15 + i * 12}%`}
              stroke={i % 2 === 0 ? "url(#line-gradient-1)" : "url(#line-gradient-2)"}
              strokeWidth="1"
              className="animate-energy-flow"
              style={{ animationDelay: `${i * 0.3}s`, animationDuration: `${4 + i * 0.5}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-secondary/10 via-transparent to-transparent blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-card border border-primary/30">
            <Atom className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-[spin_10s_linear_infinite]" />
            <span className="text-primary font-display text-[10px] sm:text-xs tracking-[0.2em] uppercase">
              Innovation Beyond Limits
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold px-4">
            <span className="text-foreground">Advanced </span>
            <span className="text-gradient-animated">Technology</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-4">
            Powered by breakthroughs that seemed impossible just years ago. Welcome to the future of mobility.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Tech Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {techFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Glow */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                {/* Glassmorphism Card */}
                <div className="relative glass-card p-6 h-full transition-all duration-500 hover:border-primary/50 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_-12px] group-hover:shadow-primary/20 overflow-hidden">
                  {/* Corner Decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rotate-45" />
                  </div>

                  <div className="flex flex-col h-full">
                    {/* Icon & Stat */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20 group-hover:border-primary/50 group-hover:shadow-neon-red transition-all duration-300">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-display font-bold text-primary neon-text">{feature.stat}</p>
                        <p className="text-xs text-muted-foreground">{feature.statLabel}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Bottom Accent */}
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2 text-xs text-primary group-hover:text-secondary transition-colors">
                        <Layers className="w-3 h-3" />
                        <span>Learn more</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Central Visualization */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute inset-[-50%] bg-gradient-radial from-primary/20 via-secondary/10 to-transparent blur-3xl animate-pulse-glow" />

              {/* Main Container */}
              <div className="relative w-80 h-80">
                {/* Outermost Ring */}
                <div className="absolute inset-0 rounded-full border border-primary/10 animate-[spin_30s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_hsl(0_85%_55%)]" />
                </div>

                {/* Outer Ring */}
                <div className="absolute inset-8 rounded-full border-2 border-primary/20 animate-[spin_25s_linear_infinite_reverse]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_15px_hsl(350_80%_45%)]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_hsl(0_85%_55%)]" />
                </div>

                {/* Middle Ring with Dashes */}
                <div className="absolute inset-16 rounded-full border border-dashed border-secondary/30 animate-[spin_20s_linear_infinite]" />

                {/* Inner Ring */}
                <div className="absolute inset-24 rounded-full border-2 border-primary/30 animate-[spin_15s_linear_infinite_reverse]">
                  {[0, 90, 180, 270].map((angle) => (
                    <div
                      key={angle}
                      className="absolute w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(0_85%_55%)]"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${angle}deg) translateX(48px) translateY(-50%)`,
                      }}
                    />
                  ))}
                </div>

                {/* Core Container */}
                <div className="absolute inset-32 flex items-center justify-center">
                  {/* Core Glow */}
                  <div className="absolute inset-0 bg-gradient-radial from-primary/50 to-transparent blur-xl animate-pulse-glow-intense" />

                  {/* Core */}
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/80 via-secondary/60 to-primary/80 flex items-center justify-center animate-border-dance">
                    <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center">
                      <Flame className="w-8 h-8 text-primary animate-[pulse_2s_ease-in-out_infinite]" />
                    </div>
                  </div>
                </div>

                {/* Floating Particles */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-primary/60"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                      animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>

              {/* Tech Labels */}
              <div className="absolute -top-4 -right-4 glass-card px-3 py-1.5 rounded-full border border-primary/30 text-xs font-display text-primary">
                AI Core
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card px-3 py-1.5 rounded-full border border-secondary/30 text-xs font-display text-secondary">
                Neural Net
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;