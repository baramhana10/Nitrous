import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsTicker from "@/components/StatsTicker";
import CategoriesSection from "@/components/atv-categories"; // Contains the Mhana categories
import ProductsSection from "@/components/ProductsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HomeStorySection from "@/components/HomeStorySection";
import Footer from "@/components/Footer";

const Index = () => {
    return (
        <div className="relative min-h-screen bg-background">
            <Navbar />
            <HeroSection />
            <StatsTicker />
            <CategoriesSection />
            <ProductsSection />
            <FeaturesSection />
            <HomeStorySection />
            <Footer />
        </div>
    );
};

export default Index;
