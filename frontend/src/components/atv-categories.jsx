import { useState } from "react"
import { useNavigate } from "react-router-dom"

const categories = [
  {
    id: "desert-performance",
    name: "DESERT PERFORMANCE",
    image: "/nitrousC1.png",
    tagline: "Conquer the Dunes",
    description: "Built for sand, engineered for speed",
  },
  {
    id: "race-series",
    name: "RACE SERIES",
    image: "/nitrousC2.png",
    tagline: "Track Domination",
    description: "Professional racing technology",
  },
  {
    id: "sport-elite",
    name: "SPORT ELITE",
    image: "/nitrousC3.png",
    tagline: "Maximum Speed",
    description: "Pure adrenaline, zero compromise",
  },
  {
    id: "youth-series",
    name: "YOUTH SERIES",
    image: "/nitrousC4.png",
    tagline: "Future Champions",
    description: "Safe power for the next generation",
  },
  {
    id: "adventure-pro",
    name: "ADVENTURE PRO",
    image: "/nitrousC5.png",
    tagline: "Extreme Terrain",
    description: "Unstoppable in any condition",
  },
  {
    id: "collection",
    name: "FULL COLLECTION",
    image: "/nitrousC6.png",
    tagline: "Complete Lineup",
    description: "Explore every model, every spec",
  },
]

export default function ATVCategories() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.8),transparent_50%)]" />
        {/* Disable heavy blur animations on mobile */}
        <div className="hidden md:block absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="hidden md:block absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[150px] animate-spin-slow" />
      </div>

      <div className="absolute inset-0 opacity-[0.02] md:opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            rgba(220, 38, 38, 0.5) 50px,
            rgba(220, 38, 38, 0.5) 51px
          )`,
          }}
        />
      </div>

      <div className="relative max-w-[1800px] mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-20">
        <div className="mb-8 sm:mb-12 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[3px] w-12 bg-gradient-to-r from-red-600 to-transparent" />
            <div className="h-[2px] w-24 bg-gradient-to-r from-red-500/50 to-transparent" />
            <div className="h-[1px] w-32 bg-gradient-to-r from-red-400/30 to-transparent" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-3 sm:mb-4">
            <span className="inline-block">SELECT</span>
            <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-600 animate-gradient">
              YOUR CLASS
            </span>
          </h1>

          <div className="flex items-center gap-2 sm:gap-3 text-gray-500 text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-4 sm:mt-6">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <span>Six Categories</span>
            <div className="h-[1px] w-8 bg-red-600/30" />
            <span>Pure Performance</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            <CategoryCard
              category={categories[0]}
              isHovered={hoveredId === categories[0].id}
              isSelected={selectedId === categories[0].id}
              onHover={setHoveredId}
              onSelect={setSelectedId}
              variant="large"
            />
          </div>

          <div className="col-span-12 md:col-span-4 lg:col-span-5 md:row-span-2">
            <CategoryCard
              category={categories[1]}
              isHovered={hoveredId === categories[1].id}
              isSelected={selectedId === categories[1].id}
              onHover={setHoveredId}
              onSelect={setSelectedId}
              variant="tall"
            />
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <CategoryCard
              category={categories[2]}
              isHovered={hoveredId === categories[2].id}
              isSelected={selectedId === categories[2].id}
              onHover={setHoveredId}
              onSelect={setSelectedId}
              variant="medium"
            />
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <CategoryCard
              category={categories[3]}
              isHovered={hoveredId === categories[3].id}
              isSelected={selectedId === categories[3].id}
              onHover={setHoveredId}
              onSelect={setSelectedId}
              variant="small"
            />
          </div>

          <div className="col-span-12 lg:col-span-7">
            <CategoryCard
              category={categories[4]}
              isHovered={hoveredId === categories[4].id}
              isSelected={selectedId === categories[4].id}
              onHover={setHoveredId}
              onSelect={setSelectedId}
              variant="wide"
            />
          </div>

          <div className="col-span-12 lg:col-span-5">
            <CategoryCard
              category={categories[5]}
              isHovered={hoveredId === categories[5].id}
              isSelected={selectedId === categories[5].id}
              onHover={setHoveredId}
              onSelect={setSelectedId}
              variant="feature"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
          
          @keyframes spin-slow {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          .animate-gradient {
            background-size: 200% auto;
            animation: gradient 4s ease infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          
          .animate-spin-slow {
            animation: spin-slow 30s linear infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        }
      `}</style>
    </section>
  )
}

function CategoryCard({ category, isHovered, isSelected, onHover, onSelect, variant = "medium" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (category.id === "collection") {
      navigate('/products');
    } else {
      navigate(`/products?category=${category.id}`);
    }
  };

  const heightClasses = {
    large: "h-[500px] md:h-[650px]",
    tall: "h-[500px] md:h-[850px]",
    medium: "h-[400px] md:h-[500px]",
    small: "h-[400px] md:h-[440px]",
    wide: "h-[350px] md:h-[450px]",
    feature: "h-[400px] md:h-[450px]",
  }

  return (
    <div
      className={`group relative ${heightClasses[variant]} cursor-pointer`}
      onMouseEnter={() => onHover(category.id)}
      onMouseLeave={() => onHover(null)}
      onClick={handleClick}
    >
      {/* Simplified glow - no blur on mobile */}
      <div
        className={`absolute -inset-1 bg-gradient-to-br from-red-600 via-red-500 to-transparent rounded-3xl transition-opacity duration-300 md:duration-500 ${isHovered || isSelected ? "opacity-100 md:blur-xl md:scale-105" : "opacity-0"
          }`}
      />

      <div className="relative h-full bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-900/50 transition-all duration-300 md:duration-500">
        <div className="relative h-full overflow-hidden">
          {/* Disable scale animation on mobile */}
          <div
            className={`absolute inset-0 transition-transform duration-0 md:duration-500 ${isHovered ? "md:scale-110" : "scale-100"}`}
          >
            <img
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              className={`w-full h-full object-cover transition-none md:transition-all md:duration-500 ${isHovered ? "md:brightness-110 md:contrast-110" : "brightness-90 contrast-100"
                }`}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          {/* Disable heavy blend modes on mobile */}
          <div
            className={`hidden md:block absolute inset-0 bg-gradient-to-br from-red-600/40 via-red-500/20 to-transparent mix-blend-multiply transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
              }`}
          />
          <div
            className={`hidden md:block absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/10 to-red-600/30 mix-blend-screen transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
              }`}
          />

          <div
            className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220, 38, 38, 0.03) 2px, rgba(220, 38, 38, 0.03) 4px)",
            }}
          />

          <div
            className={`absolute top-0 right-0 w-full h-full transition-all duration-700 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            style={{
              background: "linear-gradient(135deg, transparent 30%, rgba(220, 38, 38, 0.1) 50%, transparent 70%)",
            }}
          />

          <div
            className={`absolute top-0 left-0 transition-all duration-500 ${isHovered ? "w-24 h-24 opacity-100" : "w-12 h-12 opacity-0"
              }`}
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 to-transparent" />
            <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-red-600 to-transparent" />
          </div>
          <div
            className={`absolute bottom-0 right-0 transition-all duration-500 ${isHovered ? "w-24 h-24 opacity-100" : "w-12 h-12 opacity-0"
              }`}
          >
            <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-red-600 to-transparent" />
            <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-red-600 to-transparent" />
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
          <div className="flex justify-between items-start">
            <div
              className={`transition-all duration-500 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full border border-red-600/30">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-red-500 uppercase">{category.tagline}</span>
              </div>
            </div>

            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${isHovered ? "border-red-600 bg-red-600/20 scale-110" : "border-white/20 bg-white/5 scale-100"
                }`}
            >
              <svg
                className={`w-5 h-5 transition-all duration-500 ${isHovered ? "text-red-500 rotate-0" : "text-white/50 -rotate-45"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div>
            <h3
              className={`text-3xl md:text-5xl font-black text-white leading-none tracking-tighter mb-3 transition-all duration-500 ${isHovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-90"
                }`}
            >
              {category.name}
            </h3>

            <p
              className={`text-gray-400 text-sm md:text-base font-light mb-4 transition-all duration-500 delay-75 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
            >
              {category.description}
            </p>

            <div className="relative h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-1000 ease-out ${isHovered ? "w-full" : "w-0"
                  }`}
              />
            </div>

            <div
              className={`flex items-center gap-3 text-sm font-bold transition-all duration-500 delay-100 ${isHovered ? "text-red-500 opacity-100 translate-x-0" : "text-white/60 opacity-0 -translate-x-4"
                }`}
            >
              <span className="tracking-widest uppercase">Explore Range</span>
              <div className="flex gap-1">
                <div
                  className={`w-8 h-[2px] bg-current transition-all duration-300 ${isHovered ? "translate-x-0" : "-translate-x-2"}`}
                />
                <div
                  className={`w-2 h-2 border-t-2 border-r-2 border-current rotate-45 transition-all duration-300 ${isHovered ? "translate-x-0" : "-translate-x-2"}`}
                />
              </div>
            </div>
          </div>
        </div>

        {isSelected && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-red-600/20 animate-glitch-1" />
            <div className="absolute inset-0 bg-red-600/20 animate-glitch-2" />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translateX(0); opacity: 0.8; }
          25% { transform: translateX(-2px); opacity: 1; }
          50% { transform: translateX(2px); opacity: 0.8; }
          75% { transform: translateX(-1px); opacity: 1; }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          33% { transform: translateY(-1px); opacity: 0.8; }
          66% { transform: translateY(1px); opacity: 0.6; }
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.3s infinite;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.4s infinite;
        }
      `}</style>
    </div>
  )
}
