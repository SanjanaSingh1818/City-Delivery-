import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Shield, MapPin, Star, Truck, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Counter state
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const hasCounted = useRef(false);

  const benefits = [
    { icon: Clock, title: 'سرعة التوصيل', description: 'أقل من ساعة' },
    { icon: Shield, title: 'ضمان الجودة', description: 'خدمة موثوقة' },
    { icon: MapPin, title: 'تغطية شاملة', description: 'جميع مناطق الكويت' },
    { icon: Star, title: 'خدمة مميزة', description: 'رضا العملاء' }
  ];

  const stats = [
    { number: 5000, label: 'طلب مكتمل', suffix: '+' },
    { number: 24,   label: 'خدمة مستمرة', suffix: '/7' },
    { number: 98,   label: 'رضا العملاء', suffix: '%' },
    { number: 60,   label: 'دقيقة متوسط التوصيل', prefix: '<' }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // Slide-in for text
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      }
    );

    // Cards pop-in for stats tiles
    const statElements = statsRef.current?.children;
    if (statElements) {
      gsap.fromTo(
        statElements,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    // Robust counting trigger
    const startCounting = () => {
      if (hasCounted.current) return; // prevent double-run (StrictMode, enter/enterBack)
      hasCounted.current = true;

      stats.forEach((stat, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.number,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            setCounts(prev => {
              const next = [...prev];
              next[i] = Math.round(obj.val);
              return next;
            });
          },
        });
      });
    };

    // Fire counting when stats enter view (once)
    const st = ScrollTrigger.create({
      trigger: statsRef.current!,
      start: 'top 85%',
      once: true,
      onEnter: startCounting,
      onEnterBack: startCounting, // in case user scrolls back up
    });

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* Full-width 50vh image above the section */}
      <div
        className="w-full h-[50vh] bg-center bg-cover"
        style={{ backgroundImage: "url('banner.png')" }}
      >
        <div className="w-full h-full bg-black/30 flex items-center justify-center">
          {/* Optional overlay text */}
          <h2 className="text-white text-4xl font-bold">مرحباً بك في خدمتنا</h2>
        </div>
      </div>

      <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div ref={contentRef} className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  لماذا تختار خدمتنا؟
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  نحن نفهم أهمية الوقت والدقة في توصيل طلباتك. لذلك نقدم خدمة استثنائية
                  تضمن وصول طلباتك في الوقت المحدد وبأفضل حالة.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4 space-x-reverse">
                      <div className="p-3 rounded-full bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Additional Features */}
              <div className="pt-6 border-t border-border/50">
                <div className="flex items-center space-x-6 space-x-reverse">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Truck className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">أسطول حديث</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Headphones className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">دعم مستمر</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Side */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-10 blur-3xl"></div>

              <div ref={statsRef} className="relative grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-medium text-center group hover:scale-105 transition-transform"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                      {stat.prefix || ''}{counts[index]}{stat.suffix || ''}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BenefitsSection;
