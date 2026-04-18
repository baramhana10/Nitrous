import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const password = watch("password");

    const onSubmit = async (data) => {
        setIsLoading(true);
        const result = await signup(data.email, data.password);

        if (result.success) {
            toast.success("Admin account created successfully!");
            navigate("/dashboard");
        } else {
            toast.error(result.message || "Sign up failed");
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
                        alt="Nitrous ATV Logo"
                        className="relative w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_20px_hsl(0_85%_55%_/_0.4)]"
                    />
                </div>
                <span className="font-display text-xl font-bold uppercase tracking-wider">Nitrous</span>
            </Link>

            {/* Sign Up Card */}
            <Card className="w-full max-w-md glass-card border-border/50 relative z-10 shadow-2xl">
                <CardHeader className="space-y-3 text-center">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-2 shadow-lg shadow-primary/50">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-display uppercase tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Create Admin Account
                    </CardTitle>
                    <CardDescription className="text-base">
                        Register to access the admin dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@nitrous.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
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
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all"
                            />
                            {errors.password && (
                                <p className="text-xs text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-2">
                                <Lock className="w-4 h-4 text-primary" />
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => value === password || "Passwords do not match"
                                })}
                                className="h-12 bg-background/50 border-border/50 focus:border-primary transition-all"
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold group relative overflow-hidden mt-6"
                            disabled={isLoading}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isLoading ? "Creating Account..." : "Create Account"}
                                {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border/50"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Or</span>
                            </div>
                        </div>

                        {/* Sign In Link */}
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link
                                    to="/signin"
                                    className="text-primary hover:text-primary/80 font-semibold transition-colors underline-offset-4 hover:underline"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>

                        {/* Back to Home */}
                        <div className="text-center pt-2">
                            <Link
                                to="/"
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUp;
