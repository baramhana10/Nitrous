import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AtvCategories from "@/components/atv-categories";
import FeaturesSection from "@/components/FeaturesSection";
import ProductsSection from "@/components/ProductsSection";
import TechnologySection from "@/components/TechnologySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroSection />
            <AtvCategories />

            <ProductsSection />
            {/* <TechnologySection />
            <TestimonialsSection /> */}
            <FeaturesSection />
            <Footer />
        </div>
    );
};

export default Index;
