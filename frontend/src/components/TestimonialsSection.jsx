import { Star, Quote, ArrowRight, Users } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Marcus Chen",
    role: "Adventure Enthusiast",
    quote: "The NAITROUS X3 PRO completely changed how I experience off-roading. Silent power that lets you hear nature while dominating any terrain.",
    rating: 5,
    avatar: "MC",
    location: "Colorado, USA",
    gradient: "from-primary to-cyan-400",
  },
  {
    name: "Sarah Williams",
    role: "Professional Racer",
    quote: "Instant torque, zero maintenance, and that acceleration is addictive. This is the future of motorsport.",
    rating: 5,
    avatar: "SW",
    location: "Dubai, UAE",
    gradient: "from-secondary to-purple-400",
  },
  {
    name: "David Park",
    role: "Tech Reviewer",
    quote: "The technology packed into these machines is mind-blowing. The AI-assisted handling makes anyone feel like a pro.",
    rating: 5,
    avatar: "DP",
    location: "Tokyo, Japan",
    gradient: "from-neon-pink to-rose-400",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="absolute inset-0 bg-grid opacity-5" />

      {/* Animated Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-secondary/10 via-transparent to-transparent blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-card border border-secondary/30">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
            <span className="text-secondary font-display text-[10px] sm:text-xs tracking-[0.2em] uppercase">
              Customer Stories
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold px-4">
            <span className="text-foreground">What Riders </span>
            <span className="text-gradient-animated">Say</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-4">
            Join thousands of satisfied riders who have embraced the electric revolution.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-500 ${activeIndex === index ? 'md:-translate-y-4' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />

              {/* Card */}
              <div className="relative glass-card p-8 h-full transition-all duration-500 hover:border-primary/50 group-hover:shadow-[0_20px_60px_-12px] group-hover:shadow-primary/20 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                </div>

                {/* Quote Icon */}
                <div className="absolute top-6 right-6">
                  <Quote className="w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors duration-500" />
                </div>

                {/* Rating with Glow */}
                <div className="flex gap-1.5 mb-6 relative">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary drop-shadow-[0_0_8px_hsl(180,100%,50%,0.6)] group-hover:drop-shadow-[0_0_12px_hsl(180,100%,50%,0.8)] transition-all duration-300"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/90 text-lg leading-relaxed mb-8 relative">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative">
                  {/* Avatar with Gradient Border */}
                  <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.gradient} p-[2px] group-hover:shadow-neon-cyan transition-shadow duration-300`}>
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                      <span className="font-display text-sm font-bold text-foreground">{testimonial.avatar}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-primary/60 mt-0.5">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Bottom Gradient Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
                  <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-primary/50 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Row */}
        <div className="mt-24 glass-card p-10 rounded-3xl border border-border/50 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Happy Riders", icon: "🏍️" },
              { value: "100M+", label: "Miles Traveled", icon: "🌍" },
              { value: "99%", label: "Satisfaction", icon: "⭐" },
              { value: "24/7", label: "Support", icon: "🛡️" },
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className="text-4xl md:text-5xl font-display font-bold text-gradient group-hover:neon-text transition-all duration-300">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm uppercase tracking-wider mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 group font-display text-sm uppercase tracking-wider">
            Read More Stories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;