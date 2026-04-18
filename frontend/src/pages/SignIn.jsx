import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Zap, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        const result = await login(data.email, data.password);

        if (result.success) {
            toast.success("مرحبًا بعودتك، تم تسجيل الدخول بنجاح");
            navigate("/dashboard");
        } else {
            toast.error(result.message || "فشل تسجيل الدخول");
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Logo - Top Left */}
            <Link to="/" className="absolute top-8 left-8 flex items-center gap-3 group z-10">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                        src="/Nitrous.png"
                        alt="شعار متجر الألعاب"
                        className="relative w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_20px_hsl(0_85%_55%_/_0.4)]"
                    />
                </div>
                <span className="font-display text-xl font-bold uppercase tracking-wider">متجر الألعاب</span>
            </Link>

            {/* Sign In Card */}
            <Card className="w-full max-w-md glass-card border-border/50 relative z-10 shadow-2xl">
                <CardHeader className="space-y-3 text-center">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-2 shadow-lg shadow-primary/50">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-display uppercase tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        تسجيل دخول الإدارة
                    </CardTitle>
                    <CardDescription className="text-base">
                        أدخل بياناتك للوصول إلى لوحة التحكم
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                البريد الإلكتروني
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@toystore.com"
                                {...register("email", {
                                    required: "البريد الإلكتروني مطلوب",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "عنوان البريد الإلكتروني غير صالح"
                                    }
                                })}
                                className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all"
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                                <Lock className="w-4 h-4 text-primary" />
                                كلمة المرور
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "كلمة المرور مطلوبة"
                                })}
                                className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all"
                            />
                            {errors.password && (
                                <p className="text-xs text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold group relative overflow-hidden"
                            disabled={isLoading}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isLoading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
                                {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Button>



                        {/* Back to Home */}
                        <div className="text-center pt-2">
                            <Link
                                to="/"
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                            >
                                ← العودة إلى الرئيسية
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignIn;
