import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Flower2, 
  Shirt, 
  Palette, 
  Cake, 
  Package, 
  Home,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

    // Title animation
    gsap.fromTo(titleRef.current, 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
        }
      }
    );

    // Cards stagger animation
    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
          }
        }
      );
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
            خدماتنا المميزة
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
                  <div className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 text-accent group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={40} />
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