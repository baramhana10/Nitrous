import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Zap,
    Battery,
    Gauge,
    Mountain,
    Trophy,
    Filter,
    SlidersHorizontal,
    X,
    ChevronDown,
    Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allProducts = [
    // Desert Performance Series
    {
        id: 1,
        category: "desert-performance",
        categoryName: "Desert Performance",
        name: "NITROUS DESERT X1",
        tagline: "Sand Conqueror",
        price: "$14,999",
        image: "/nitrousC1.png",
        specs: {
            range: "250 mi",
            power: "120 kW",
            acceleration: "0-60 in 3.5s",
            topSpeed: "85 mph"
        },
        features: ["Sand-optimized tires", "Enhanced suspension", "Heat management"],
        badge: "Popular",
        rating: 4.8,
        reviews: 127
    },
    {
        id: 2,
        category: "desert-performance",
        categoryName: "Desert Performance",
        name: "NITROUS DESERT X3",
        tagline: "Dune Master",
        price: "$19,999",
        image: "/nitrousC1.png",
        specs: {
            range: "320 mi",
            power: "160 kW",
            acceleration: "0-60 in 2.9s",
            topSpeed: "95 mph"
        },
        features: ["Paddle tires", "Long-travel suspension", "Advanced cooling"],
        badge: "New",
        rating: 4.9,
        reviews: 89
    },
    // Race Series
    {
        id: 3,
        category: "race-series",
        categoryName: "Race Series",
        name: "NITROUS RACE R1",
        tagline: "Track Warrior",
        price: "$22,999",
        image: "/nitrousC2.png",
        specs: {
            range: "180 mi",
            power: "180 kW",
            acceleration: "0-60 in 2.5s",
            topSpeed: "110 mph"
        },
        features: ["Carbon fiber body", "Race suspension", "Track mode"],
        badge: "Pro",
        rating: 5.0,
        reviews: 215
    },
    {
        id: 4,
        category: "race-series",
        categoryName: "Race Series",
        name: "NITROUS RACE R3 ELITE",
        tagline: "Championship Edition",
        price: "$28,999",
        image: "/nitrousC2.png",
        specs: {
            range: "200 mi",
            power: "220 kW",
            acceleration: "0-60 in 2.2s",
            topSpeed: "120 mph"
        },
        features: ["Titanium components", "Adjustable aero", "Data logging"],
        badge: "Limited",
        rating: 5.0,
        reviews: 94
    },
    // Sport Elite
    {
        id: 5,
        category: "sport-elite",
        categoryName: "Sport Elite",
        name: "NITROUS SPORT S1",
        tagline: "Adrenaline Rush",
        price: "$16,999",
        image: "/nitrousC3.png",
        specs: {
            range: "240 mi",
            power: "140 kW",
            acceleration: "0-60 in 3.1s",
            topSpeed: "90 mph"
        },
        features: ["Sport tuning", "Performance brakes", "Dynamic handling"],
        badge: "Best Value",
        rating: 4.7,
        reviews: 156
    },
    {
        id: 6,
        category: "sport-elite",
        categoryName: "Sport Elite",
        name: "NITROUS SPORT S3 MAX",
        tagline: "Ultimate Thrill",
        price: "$21,999",
        image: "/nitrousC3.png",
        specs: {
            range: "280 mi",
            power: "170 kW",
            acceleration: "0-60 in 2.7s",
            topSpeed: "105 mph"
        },
        features: ["Adaptive suspension", "Launch control", "Sport+ mode"],
        badge: "Editor's Choice",
        rating: 4.9,
        reviews: 178
    },
    // Youth Series
    {
        id: 7,
        category: "youth-series",
        categoryName: "Youth Series",
        name: "NITROUS YOUTH Y1",
        tagline: "Junior Champion",
        price: "$7,999",
        image: "/nitrousC4.png",
        specs: {
            range: "120 mi",
            power: "40 kW",
            acceleration: "0-40 in 5.2s",
            topSpeed: "45 mph"
        },
        features: ["Speed limiter", "Safety cage", "Parental controls"],
        badge: "Safe Start",
        rating: 4.8,
        reviews: 203
    },
    {
        id: 8,
        category: "youth-series",
        categoryName: "Youth Series",
        name: "NITROUS YOUTH Y2 PRO",
        tagline: "Teen Racer",
        price: "$10,999",
        image: "/nitrousC4.png",
        specs: {
            range: "150 mi",
            power: "60 kW",
            acceleration: "0-50 in 4.5s",
            topSpeed: "55 mph"
        },
        features: ["Progressive power", "Training modes", "GPS tracking"],
        badge: "Youth Pro",
        rating: 4.9,
        reviews: 142
    },
    // Adventure Pro
    {
        id: 9,
        category: "adventure-pro",
        categoryName: "Adventure Pro",
        name: "NITROUS ADVENTURE A1",
        tagline: "Trail Blazer",
        price: "$17,999",
        image: "/nitrousC5.png",
        specs: {
            range: "350 mi",
            power: "130 kW",
            acceleration: "0-60 in 3.8s",
            topSpeed: "80 mph"
        },
        features: ["All-terrain tires", "Rock sliders", "Winch ready"],
        badge: "Off-Road",
        rating: 4.8,
        reviews: 167
    },
    {
        id: 10,
        category: "adventure-pro",
        categoryName: "Adventure Pro",
        name: "NITROUS ADVENTURE A3 EXTREME",
        tagline: "Terrain Dominator",
        price: "$23,999",
        image: "/nitrousC5.png",
        specs: {
            range: "400 mi",
            power: "165 kW",
            acceleration: "0-60 in 3.2s",
            topSpeed: "88 mph"
        },
        features: ["Locking differentials", "Skid plates", "Expedition pack"],
        badge: "Extreme",
        rating: 5.0,
        reviews: 98
    },
    // Collection (Flagship models)
    {
        id: 11,
        category: "collection",
        categoryName: "Full Collection",
        name: "NITROUS X5 APEX",
        tagline: "Ultimate Performance",
        price: "$24,999",
        image: "/nitrousC6.png",
        specs: {
            range: "400 mi",
            power: "200 kW",
            acceleration: "0-60 in 2.4s",
            topSpeed: "115 mph"
        },
        features: ["Flagship tech", "Luxury interior", "Premium materials"],
        badge: "Flagship",
        rating: 5.0,
        reviews: 256
    },
    {
        id: 12,
        category: "collection",
        categoryName: "Full Collection",
        name: "NITROUS X7 SIGNATURE",
        tagline: "The Legend",
        price: "$32,999",
        image: "/nitrousC6.png",
        specs: {
            range: "450 mi",
            power: "250 kW",
            acceleration: "0-60 in 2.0s",
            topSpeed: "125 mph"
        },
        features: ["Signature edition", "Bespoke customization", "Concierge service"],
        badge: "Exclusive",
        rating: 5.0,
        reviews: 87
    }
];

const categories = [
    { id: "all", name: "All Models", icon: Zap },
    { id: "desert-performance", name: "Desert Performance", icon: Mountain },
    { id: "race-series", name: "Race Series", icon: Trophy },
    { id: "sport-elite", name: "Sport Elite", icon: Gauge },
    { id: "youth-series", name: "Youth Series", icon: Star },
    { id: "adventure-pro", name: "Adventure Pro", icon: Mountain },
    { id: "collection", name: "Full Collection", icon: Zap }
];

const priceRanges = [
    { id: "all", name: "All Prices", min: 0, max: Infinity },
    { id: "entry", name: "Under $15K", min: 0, max: 15000 },
    { id: "mid", name: "$15K - $22K", min: 15000, max: 22000 },
    { id: "premium", name: "$22K+", min: 22000, max: Infinity }
];

const AllProducts = () => {
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get('category');

    const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "all");
    const [selectedPriceRange, setSelectedPriceRange] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [sortBy, setSortBy] = useState("featured");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
        }
    }, [categoryFromUrl]);

    const filteredProducts = allProducts
        .filter(product => selectedCategory === "all" || product.category === selectedCategory)
        .filter(product => {
            const range = priceRanges.find(r => r.id === selectedPriceRange);
            const price = parseFloat(product.price.replace(/[$,]/g, ''));
            return price >= range.min && price <= range.max;
        })
        .sort((a, b) => {
            if (sortBy === "price-low") return parseFloat(a.price.replace(/[$,]/g, '')) - parseFloat(b.price.replace(/[$,]/g, ''));
            if (sortBy === "price-high") return parseFloat(b.price.replace(/[$,]/g, '')) - parseFloat(a.price.replace(/[$,]/g, ''));
            if (sortBy === "rating") return b.rating - a.rating;
            return 0; // featured
        });

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Products Section */}
            <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Filter Bar */}
                    <div className="mb-6 sm:mb-10">
                        {/* Mobile Filter Toggle */}
                        <div className="flex items-center justify-between gap-4 lg:hidden mb-4">
                            <div className="text-sm text-foreground/70 font-display tracking-wider font-semibold">
                                {filteredProducts.length} MODELS
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowFilters(!showFilters)}
                                className="gap-2"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Desktop Filters */}
                        <div className="hidden lg:flex items-center justify-between gap-4 p-3 glass-card rounded-2xl border border-border/50">
                            {/* Category Pills */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {categories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`px-4 py-2.5 rounded-xl font-display text-xs uppercase tracking-[0.15em] transition-colors duration-200 flex items-center gap-2
                        ${selectedCategory === category.id
                                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                                                    : "bg-muted/40 text-foreground/70 hover:bg-muted/60 hover:text-foreground"
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {category.name}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Sort Dropdown */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2.5 rounded-xl bg-muted/40 border border-border/50 text-xs font-display uppercase tracking-[0.15em] text-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>

                        {/* Mobile Filters Panel */}
                        {showFilters && (
                            <div className="lg:hidden p-4 glass-card rounded-2xl border border-border/50 space-y-4 animate-fade-in">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-display font-bold uppercase tracking-[0.15em] text-sm text-foreground">Filters</h3>
                                    <button onClick={() => setShowFilters(false)}>
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Mobile Categories */}
                                <div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {categories.map((category) => {
                                            const Icon = category.icon;
                                            return (
                                                <button
                                                    key={category.id}
                                                    onClick={() => setSelectedCategory(category.id)}
                                                    className={`px-3 py-2.5 rounded-lg text-xs font-display uppercase tracking-[0.1em] transition-colors duration-200 flex items-center justify-center gap-1.5
                            ${selectedCategory === category.id
                                                            ? "bg-primary text-primary-foreground"
                                                            : "bg-muted/40 text-foreground/70"
                                                        }`}
                                                >
                                                    <Icon className="w-3 h-3" />
                                                    <span className="truncate">{category.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Mobile Sort */}
                                <div>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg bg-muted/40 border border-border/50 text-xs font-display uppercase tracking-[0.15em] text-foreground/80"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Highest Rated</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="group relative"
                                onMouseEnter={() => setHoveredProduct(product.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                {/* Card */}
                                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl glass-card border border-border/50 group-hover:border-primary/50 transition-all duration-300 h-full flex flex-col group-hover:shadow-2xl group-hover:shadow-primary/20">

                                    {/* Badge */}
                                    {product.badge && (
                                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 z-20 px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 rounded-full text-[8px] sm:text-[10px] lg:text-xs font-display uppercase tracking-[0.1em] sm:tracking-[0.15em] bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg">
                                            {product.badge}
                                        </div>
                                    )}

                                    {/* Image */}
                                    <div className="relative h-32 sm:h-48 lg:h-56 xl:h-64 overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10">
                                        <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                            <Zap className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 text-primary/40 transition-colors duration-300 group-hover:text-primary/60" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-2.5 sm:p-4 lg:p-5 space-y-2 sm:space-y-3 lg:space-y-4 flex-1 flex flex-col">
                                        <div className="flex-1">
                                            <h3 className="text-xs sm:text-base lg:text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                                                {product.name}
                                            </h3>
                                            <p className="text-muted-foreground text-[10px] sm:text-xs lg:text-sm mt-0.5 sm:mt-1 leading-snug">
                                                {product.tagline}
                                            </p>
                                        </div>

                                        {/* Specs */}
                                        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] lg:text-xs">
                                            <div className="flex items-center gap-1 sm:gap-1.5 text-muted-foreground">
                                                <Battery className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary flex-shrink-0" />
                                                <span className="truncate">{product.specs.range}</span>
                                            </div>
                                            <div className="flex items-center gap-1 sm:gap-1.5 text-muted-foreground">
                                                <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-secondary flex-shrink-0" />
                                                <span className="truncate">{product.specs.power}</span>
                                            </div>
                                            <div className="flex items-center gap-1 sm:gap-1.5 text-muted-foreground">
                                                <Gauge className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent flex-shrink-0" />
                                                <span className="truncate">{product.specs.acceleration}</span>
                                            </div>
                                            <div className="flex items-center gap-1 sm:gap-1.5 text-muted-foreground">
                                                <Mountain className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary flex-shrink-0" />
                                                <span className="truncate">{product.specs.topSpeed}</span>
                                            </div>
                                        </div>

                                        {/* Price & CTA */}
                                        <div className="flex items-end justify-between pt-2 sm:pt-3 lg:pt-4 border-t border-border/20 mt-auto gap-2 sm:gap-3">
                                            <div className="flex-1">
                                                <p className="text-lg sm:text-2xl lg:text-3xl font-display font-bold text-primary leading-none">
                                                    {product.price}
                                                </p>
                                            </div>

                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="group/btn flex-shrink-0 h-7 px-2 sm:h-9 sm:px-3 lg:h-10 lg:px-4"
                                            >
                                                <span className="hidden sm:inline text-xs lg:text-sm">View</span>
                                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 sm:ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <Zap className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                            <Button onClick={() => { setSelectedCategory("all"); setSelectedPriceRange("all"); }} variant="outline">
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AllProducts;
