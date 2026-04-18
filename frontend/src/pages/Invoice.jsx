import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Banknote, Wallet, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity = 1 } = location.state || {};
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
  }, [product, navigate]);

  const mutation = useMutation({
    mutationFn: async (orderData) => {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "فشل في تأكيد الطلب");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("تم تأكيد الطلب بنجاح!");
      setTimeout(() => {
        navigate("/dashboard/orders");
      }, 2000);
    },
    onError: (error) => {
      toast.error(`حدث خطأ: ${error.message}`);
    },
  });

  if (!product) return null;

  const totalPrice = parseFloat(product.price.replace(/[$,]/g, "")) * quantity;

  const onSubmit = (data) => {
    const orderData = {
      orderItems: [
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.images?.[0] || product.image,
        },
      ],
      shippingDetails: {
        name: data.name,
        phone: data.phone,
        location: data.location,
      },
      notes: data.notes || "",
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
      status: paymentMethod === "cash" ? "Pending" : "Processing",
    };

    mutation.mutate(orderData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-foreground/70 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            رجوع
          </button>

          <div className="space-y-8">
            {/* Order Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Customer Details */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <span>📋</span> بيانات الطلب
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="name" className="text-sm font-semibold mb-2 text-foreground">
                      الاسم الكامل *
                    </Label>
                    <Input
                      id="name"
                      placeholder="أحمد محمد"
                      {...register("name", { required: "الاسم مطلوب" })}
                      className={`bg-background border-border text-foreground ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold mb-2 text-foreground">
                      رقم الهاتف *
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+966 50 123 4567"
                      {...register("phone", { required: "رقم الهاتف مطلوب" })}
                      className={`bg-background border-border text-foreground ${errors.phone ? "border-destructive" : ""}`}
                    />
                    {errors.phone && (
                      <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location" className="text-sm font-semibold mb-2 text-foreground">
                      الموقع / العنوان *
                    </Label>
                    <Input
                      id="location"
                      placeholder="الرياض، حي النسيم، شارع الملك فهد"
                      {...register("location", { required: "الموقع مطلوب" })}
                      className={`bg-background border-border text-foreground ${errors.location ? "border-destructive" : ""}`}
                    />
                    {errors.location && (
                      <p className="text-destructive text-xs mt-1">{errors.location.message}</p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes" className="text-sm font-semibold mb-2 text-foreground">
                      ملاحظات إضافية
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="مثال: تسليم في الطابق الأول فقط..."
                      {...register("notes")}
                      className="bg-background border-border text-foreground min-h-24"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <span>💳</span> طريقة الدفع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      {/* Cash on Delivery */}
                      <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 cursor-pointer transition-colors bg-card/50">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer flex items-center gap-3">
                          <Wallet className="w-5 h-5 text-accent" />
                          <div>
                            <span className="font-semibold text-foreground block">الدفع عند الاستلام</span>
                            <span className="text-xs text-foreground/60">ادفع عند وصول الطلب إليك</span>
                          </div>
                        </Label>
                      </div>

                      {/* Visa Card */}
                      <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 cursor-pointer transition-colors bg-card/50">
                        <RadioGroupItem value="card" id="visa" />
                        <Label htmlFor="visa" className="flex-1 cursor-pointer flex items-center gap-3">
                          <Banknote className="w-5 h-5 text-primary" />
                          <div>
                            <span className="font-semibold text-foreground block">بطاقة فيزا / كريديت</span>
                            <span className="text-xs text-foreground/60">ادفع بأمان باستخدام بطاقتك البنكية</span>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <span>📦</span> ملخص الطلب
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-foreground">
                    <span>{product.name}</span>
                    <span>${product.price}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70 text-sm">
                    <span>الكمية:</span>
                    <span>{quantity}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-lg font-bold text-primary">
                    <span>الإجمالي:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-white"
              >
                {mutation.isPending ? "جارٍ المعالجة..." : "إكمال الطلب"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Invoice;
