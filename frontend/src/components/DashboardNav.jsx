import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ShoppingBag, Plus } from "lucide-react";

const DashboardNav = () => {
    const location = useLocation();

    const navItems = [
        {
            label: "Add Product",
            href: "/dashboard",
            icon: Plus
        },
        {
            label: "Manage Products",
            href: "/dashboard/products",
            icon: LayoutDashboard
        },
        {
            label: "Orders",
            href: "/dashboard/orders",
            icon: ShoppingBag
        }
    ];

    return (
        <div className="mb-12 mt-20 sm:mt-28 w-full max-w-5xl mx-auto px-1">
            <div className="flex flex-wrap items-center justify-center gap-2 bg-card/50 p-1.5 rounded-2xl border border-border/40 shadow-sm backdrop-blur-sm">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Button
                            key={item.href}
                            variant={isActive ? "default" : "ghost"}
                            className={`flex-1 sm:flex-none gap-2 px-3 sm:px-5 h-10 rounded-xl transition-all duration-300 ${isActive
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                                }`}
                            asChild
                        >
                            <Link to={item.href}>
                                <Icon className="w-4 h-4 shrink-0" />
                                <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${!isActive ? "hidden md:inline" : "inline"}`}>
                                    {isActive ? item.label : item.label.split(' ')[0]}
                                </span>
                            </Link>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardNav;
