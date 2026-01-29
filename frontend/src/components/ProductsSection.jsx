import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    name: "NAITROUS X1",
    tagline: "Urban Explorer",
    price: "$12,999",
    specs: ["200 mi range", "100 kW", "0-60 in 3.2s"],
    badge: "Best Seller",
    color: "from-primary/20 to-primary/5",
    accentColor: "primary",
  },
  {
    name: "NAITROUS X3 PRO",
    tagline: "Terrain Dominator",
    price: "$18,999",
    specs: ["300 mi range", "150 kW", "0-60 in 2.8s"],
    badge: "New",
    featured: true,
    color: "from-secondary/30 to-primary/10",
    accentColor: "secondary",
  },
  {
    name: "NAITROUS X5 APEX",
    tagline: "Ultimate Performance",
    price: "$24,999",
    specs: ["400 mi range", "200 kW", "0-60 in 2.4s"],
    badge: "Limited",
    color: "from-accent/20 to-secondary/10",
    accentColor: "accent",
  },
];

const ProductsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-animated opacity-10" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-secondary/10 via-transparent to-transparent blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 space-y-3 sm:space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-card border border-secondary/30">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
            <span className="text-secondary font-display text-[10px] sm:text-xs tracking-[0.2em] uppercase">
              Electric ATV Collection
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-bold px-3 sm:px-4">
            <span className="text-foreground">Choose Your </span>
            <span className="text-gradient-animated">Machine</span>
          </h2>

          <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-3 sm:px-4">
            From urban cruising to extreme off-road adventures, find the perfect electric ATV for your journey.
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-12">
          {products.map((product, index) => (
            <div
              key={index}
              className={`group relative ${product.featured ? "lg:-mt-8 lg:mb-8" : ""}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Glow */}
              <div
                className={`absolute -inset-4 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br ${product.color}`}
              />

              {/* Card */}
              <div
                className={`relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl transition-all duration-500 morph-card h-full flex flex-col
                ${product.featured
                    ? "bg-gradient-to-b from-secondary/15 via-card to-card border-2 border-secondary/40"
                    : "glass-card border border-border/50"
                  }
                group-hover:border-primary/40 group-hover:shadow-[0_0_60px_-12px] group-hover:shadow-primary/30`}
              >
                {/* Badge */}
                {product.badge && (
                  <div
                    className={`absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 z-20 px-2 py-0.5 sm:px-3 sm:py-1 lg:px-4 lg:py-1.5 rounded-full text-[8px] sm:text-[10px] lg:text-xs font-display font-bold uppercase tracking-wider
                    ${product.featured
                        ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg"
                        : "bg-muted/90 text-muted-foreground border border-border/50"
                      }`}
                  >
                    {product.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-32 sm:h-48 md:h-56 lg:h-72 overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 transition-all duration-700 group-hover:scale-110"
                    style={{
                      transform:
                        hoveredIndex === index
                          ? "scale(1.1) translateY(-10px)"
                          : "scale(1)",
                    }}>
                    <Zap className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 text-primary/40" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 lg:space-y-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-display font-bold text-foreground leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {product.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg text-[8px] sm:text-[10px] bg-muted/30 border border-border/30"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 sm:pt-3 lg:pt-4 border-t border-border/20 mt-auto">
                    <div>
                      <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wider">
                        Starting at
                      </p>
                      <p
                        className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-bold leading-none ${product.featured ? "text-secondary" : "text-primary"}
                          }`}
                      >
                        {product.price}
                      </p>
                    </div>

                    <Button
                      variant={product.featured ? "default" : "outline"}
                      size="sm"
                      className="w-full sm:w-auto text-[10px] sm:text-xs font-bold uppercase tracking-wider h-8 sm:h-9"
                    >
                      <span className="hidden sm:inline">Buy Now</span>
                      <span className="sm:hidden">BUY</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <Link to="/products">
            <Button variant="heroOutline" size="lg" className="group text-xs sm:text-sm lg:text-base">
              View All Models
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
