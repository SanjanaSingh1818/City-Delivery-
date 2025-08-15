import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      image: 'img1.png',
      title: 'توصيل الورود والهدايا',
      description: 'نوصل الورود والهدايا بعناية فائقة',
    },
    {
      image: 'img2.png',
      title: 'توصيل العبايات والملابس',
      description: 'توصيل آمن للملابس والعبايات',
    },
    {
      image: 'img3.png',
      title: 'توصيل الحنا والمكياج',
      description: 'منتجات التجميل والحنا بأمان',
    },
    {
      image: 'img4.png',
      title: 'توصيل طلبات الحلا',
      description: 'الحلويات والكيك تصل طازجة',
    },
    {
      image: 'img5.png',
      title: 'توصيل الاغراض الشخصية',
      description: 'أغراضك الشخصية بيد أمينة',
    },
    {
      image: 'img6.png',
      title: 'توصيل طلبات البيت',
      description: 'كل ما تحتاجه لبيتك نوصله لك',
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, rotationX: -30 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      }
    );

    // Cards animation
    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 100, scale: 0.8, rotationY: -30 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
          },
        }
      );

      // Magnetic hover effect
      Array.from(cards).forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            rotationX: 5,
            rotationY: 5,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-white to-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
<h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-accent mb-4">
  <span className="word inline-block mx-1">خدماتنا</span>
  <span className="word inline-block mx-1">المميزة المختارة</span>
</h2>



          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نقدم خدمات توصيل متنوعة تلبي جميع احتياجاتك في الكويت
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card group cursor-pointer">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/20 group-hover:scale-105">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold text-accent mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-primary text-white">
            <h3 className="text-2xl font-bold mb-4">خبرة طويلة في مجال توصيل الطلبات</h3>
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
