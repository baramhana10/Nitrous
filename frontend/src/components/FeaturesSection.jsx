import { Headset, RefreshCw, ShieldCheck, Truck } from "lucide-react";

const features = [
  {
    icon: Headset,
    title: "دعم على مدار الساعة",
    desc: "فريقنا المتخصص جاهز لمساعدتك 24/7 عبر الدردشة والهاتف والبريد",
    iconColor: "text-red-500",
  },
  {
    icon: RefreshCw,
    title: "استرجاع بلا قلق",
    desc: "غير راض؟ نسترجع منتجك مجاناً خلال 30 يوماً بدون أي أسئلة",
    iconColor: "text-amber-500",
  },
  {
    icon: ShieldCheck,
    title: "آمن ومعتمد",
    desc: "جميع منتجاتنا تجتاز اختبارات السلامة الدولية وآمنة 100% لأطفالك",
    iconColor: "text-emerald-500",
  },
  {
    icon: Truck,
    title: "توصيل فائق السرعة",
    desc: "توصيل مجاني للطلبات فوق 200 رس خلال 24-48 ساعة لأي مكان في المملكة",
    iconColor: "text-cyan-500",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-4 h-px bg-primary"></span>
            <span className="text-primary font-bold text-sm tracking-widest leading-none mt-1">لماذا مهنا بلس</span>
            <span className="w-4 h-px bg-primary"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            تجربة تسوق <span className="text-primary">استثنائية</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-card border border-white/5 p-8 rounded-2xl flex flex-col items-center text-center hover:border-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-6">
                  <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
