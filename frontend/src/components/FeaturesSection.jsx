import { Battery, Zap, Mountain, Clock, Flame } from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Battery,
    title: "Extended Range",
    description: "Up to 300+ miles on a single charge with our advanced solid-state battery technology.",
    value: "300+",
    unit: "mi",
    gradient: "from-primary to-red-400",
  },
  {
    icon: Zap,
    title: "Motor Power",
    description: "Dual electric motors delivering instant torque and 150kW of raw power.",
    value: "150",
    unit: "kW",
    gradient: "from-secondary to-crimson-400",
  },
  {
    icon: Mountain,
    title: "All-Terrain",
    description: "Adaptive suspension and smart traction control for any terrain condition.",
    value: "Any",
    unit: "Ground",
    gradient: "from-accent to-orange-400",
  },
  {
    icon: Clock,
    title: "Fast Charging",
    description: "0-80% charge in just 25 minutes with DC fast charging capability.",
    value: "25",
    unit: "min",
    gradient: "from-primary to-secondary",
  },
];

const FeaturesSection = () => {
  // Removed <number | null> type annotation
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute inset-0 bg-grid opacity-5" />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-3xl rotate-12 animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-secondary/10 rounded-full animate-float" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-primary/5 rotate-45 animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30">
            <Flame className="w-4 h-4 text-primary" />
            <span className="text-primary font-display text-xs tracking-[0.2em] uppercase">
              Revolutionary Technology
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold px-4">
            <span className="text-foreground">Key </span>
            <span className="text-gradient-animated">Features</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-4">
            Engineered for the future with cutting-edge technology that redefines off-road performance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative perspective-1000"
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />

              {/* Card */}
              <div className="relative glass-card p-4 sm:p-6 lg:p-8 h-full transition-all duration-500 hover:border-primary/50 group-hover:-translate-y-3 group-hover:shadow-[0_20px_60px_-12px] group-hover:shadow-primary/20 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                </div>

                {/* Icon Container */}
                <div className="relative mb-4 sm:mb-6 lg:mb-8">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} p-[1px] group-hover:shadow-neon-red transition-all duration-500`}>
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  {/* Holographic glow */}
                  <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>

                {/* Value */}
                <div className="mb-3 sm:mb-4">
                  <span className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.value}
                  </span>
                  <span className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-muted-foreground ml-1">
                    {feature.unit}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-display font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
                  <div className="absolute top-0 right-0 w-16 h-px bg-gradient-to-l from-primary/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24 overflow-hidden rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 w-px h-16 bg-gradient-to-t from-secondary/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-16 h-px bg-gradient-to-r from-secondary/50 to-transparent" />
                </div>

                {/* Bottom line accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-20 glass-card p-8 rounded-3xl border border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Years Warranty", value: "10" },
              { label: "Service Centers", value: "500+" },
              { label: "Countries", value: "45" },
              { label: "Happy Riders", value: "50K+" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">{stat.value}</p>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;