import { Mail, Phone, MapPin, Heart, Twitter, Facebook, Instagram, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border mt-20">
      {/* Trust Badges Minimal */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-border">
            <div className="flex flex-col items-center gap-3 pt-6 md:pt-0">
              <ShieldCheck className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              <h4 className="font-medium text-foreground">آمن للأطفال</h4>
              <p className="text-sm text-foreground/50">ألعاب مختبرة ومضمونة</p>
            </div>
            <div className="flex flex-col items-center gap-3 pt-6 md:pt-0">
              <Truck className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              <h4 className="font-medium text-foreground">شحن سريع</h4>
              <p className="text-sm text-foreground/50">مجاني للطلبات فوق 100$</p>
            </div>
            <div className="flex flex-col items-center gap-3 pt-6 md:pt-0">
              <RefreshCw className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              <h4 className="font-medium text-foreground">إرجاع سهل</h4>
              <p className="text-sm text-foreground/50">خلال 30 يوماً</p>
            </div>
          </div>
        </div>
      </div>



      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4 group">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                  <span className="text-primary font-bold text-xl">✨</span>
                </div>
                <span className="font-display font-bold text-xl text-foreground">متجر الألعاب</span>
              </div>
            </Link>
            <p className="text-foreground/70 text-sm mb-4">
              وجهتك العالمية للألعاب المختارة بعناية وتجربة تسوق سهلة وممتعة لكل الأعمار.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wide">
              التسوق
            </h4>
            <ul className="space-y-3">
              {[
                { label: "كل الألعاب", href: "/products" },
                { label: "ألعاب المغامرة", href: "/products?category=desert-performance" },
                { label: "مجموعة السرعة", href: "/products?category=race-series" },
                { label: "ركن الأطفال", href: "/products?category=youth-series" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wide">
              الدعم
            </h4>
            <ul className="space-y-3">
              {[
                { label: "تواصل معنا", href: "#" },
                { label: "الأسئلة الشائعة", href: "#" },
                { label: "الشحن", href: "#" },
                { label: "الإرجاع", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wide">
              الشركة
            </h4>
            <ul className="space-y-3">
              {[
                { label: "من نحن", href: "#" },
                { label: "الوظائف", href: "#" },
                { label: "المدونة", href: "#" },
                { label: "الصحافة", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wide">
              التواصل
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-foreground/60 font-semibold">البريد الإلكتروني</p>
                  <a
                    href="mailto:support@toystore.com"
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    support@toystore.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-foreground/60 font-semibold">الهاتف</p>
                  <a
                    href="tel:+18005555555"
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    1-800-555-5555
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-foreground/60 font-semibold">العنوان</p>
                  <p className="text-foreground/70 text-sm">
                    123 Toy Lane<br />
                    مدينة المرح، FC 12345
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-foreground/70 text-sm text-center md:text-left">
            © {currentYear} متجر الألعاب. جميع الحقوق محفوظة. صُنع بحب{" "}
            <Heart className="inline w-4 h-4 text-primary" /> لعشاق الألعاب حول العالم.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { label: "سياسة الخصوصية", href: "#" },
              { label: "شروط الخدمة", href: "#" },
              { label: "سياسة ملفات الارتباط", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground/70 hover:text-primary transition-colors text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
