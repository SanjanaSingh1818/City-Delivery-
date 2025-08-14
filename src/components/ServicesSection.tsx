import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
  Flower2, 
  Shirt, 
  Palette, 
  Cake, 
  Package, 
  Home,
  Heart,
  Star
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Flower2,
      title: 'توصيل الورود والهدايا',
      description: 'نوصل الورود والهدايا بعناية فائقة',
      color: 'text-pink-500'
    },
    {
      icon: Shirt,
      title: 'توصيل العبايات والملابس',
      description: 'توصيل آمن للملابس والعبايات',
      color: 'text-purple-500'
    },
    {
      icon: Palette,
      title: 'توصيل الحنا والمكياج',
      description: 'منتجات التجميل والحنا بأمان',
      color: 'text-orange-500'
    },
    {
      icon: Cake,
      title: 'توصيل طلبات الحلا',
      description: 'الحلويات والكيك تصل طازجة',
      color: 'text-yellow-500'
    },
    {
      icon: Package,
      title: 'توصيل الاغراض الشخصية',
      description: 'أغراضك الشخصية بيد أمينة',
      color: 'text-blue-500'
    },
    {
      icon: Home,
      title: 'توصيل طلبات البيت',
      description: 'كل ما تحتاجه لبيتك نوصله لك',
      color: 'text-green-500'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // Enhanced title animation with typewriter effect
    gsap.fromTo(titleRef.current, 
      {
        opacity: 0,
        y: 50,
        rotationX: -30
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%"
        }
      }
    );

    // Enhanced cards animation with complex effects
    const cards = cardsRef.current?.children;
    if (cards) {
      const cardsAnimation = gsap.fromTo(cards,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotationY: -30
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%"
          }
        }
      );

      // Add icon rotation animation after cards are loaded
      cardsAnimation.then(() => {
        const icons = cardsRef.current?.querySelectorAll('.service-icon');
        if (icons) {
          gsap.to(icons, {
            rotation: 360,
            duration: 8,
            ease: "none",
            repeat: -1,
            stagger: 1
          });
        }
      });

      // Add magnetic effect to cards
      Array.from(cards).forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            rotationX: 5,
            rotationY: 5,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-white to-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-accent mb-4">
            <span className="word inline-block mx-1">خدماتنا</span>
            <span className="word inline-block mx-1">المميزة</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نقدم خدمات توصيل متنوعة تلبي جميع احتياجاتك في الكويت
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="service-card group cursor-pointer"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 text-accent group-hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-xl border border-primary/20">
                    <div className="service-icon relative z-10">
                      <IconComponent size={48} className="drop-shadow-sm" />
                    </div>
                    {/* Floating decorative elements */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full opacity-50 animate-pulse"></div>
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-accent rounded-full opacity-40 animate-pulse"></div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-2xl"></div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold text-accent mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-primary text-white">
            <h3 className="text-2xl font-bold mb-4">
              خبرة طويلة في مجال توصيل الطلبات
            </h3>
            <p className="text-lg leading-relaxed">
              نضمن خدمة مميزة ومرضية من بداية تواصلك معنا لحين انتهاء من توصيل الطلبات...
              حرفياً ممكن تكون عملية التوصيل بأقل من ساعة.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;