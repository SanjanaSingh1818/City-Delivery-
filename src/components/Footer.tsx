import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MessageCircle, 
  Globe, 
  Users, 
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const additionalServices = [
    {
      icon: Globe,
      title: 'خدمات اعلانات جوجل',
      description: 'تسويق رقمي احترافي لعملك',
      color: 'text-blue-500'
    },
    {
      icon: Users,
      title: 'خدمات ادارة حسابات مواقع التواصل',
      description: 'إدارة وسائل التواصل الاجتماعي',
      color: 'text-purple-500'
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'اتصل بنا',
      info: '+965 67771782'
    },
    {
      icon: Mail,
      title: 'راسلنا',
      info: 'info@kuwaitexpress.com'
    },
    {
      icon: MapPin,
      title: 'نخدم',
      info: 'جميع محافظات الكويت'
    }
  ];

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.fromTo(servicesRef.current?.children || [],
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 90%",
          end: "bottom 20%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleServiceClick = (service: string) => {
    // Open WhatsApp with service inquiry
    const message = encodeURIComponent(`مرحباً، أرغب في الاستفسار عن ${service}`);
    window.open(`https://wa.me/96567771782?text=${message}`, '_blank');
  };

  return (
    <footer ref={footerRef} className="bg-foreground text-white pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Additional Services Section */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            خدمات إضافية نقدمها
          </h3>
          
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleServiceClick(service.title)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-full bg-white/10 ${service.color} group-hover:scale-110 transition-transform`}>
                      <IconComponent size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-white/80 mb-4">
                        {service.description}
                      </p>
                      <Button
                        variant="outline"
                        className="bg-transparent border-white/30 text-white hover:bg-white hover:text-foreground"
                      >
                        <MessageCircle className="ml-2 h-4 w-4" />
                        استفسر الآن
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-white/20 pt-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {contactInfo.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h5 className="font-semibold mb-1">{contact.title}</h5>
                  <p className="text-white/80">{contact.info}</p>
                </div>
              );
            })}
          </div>

          {/* Main CTA */}
          <div className="text-center">
            <Button
              onClick={() => window.open('https://wa.me/96567771782', '_blank')}
              size="lg"
              className="btn-whatsapp text-lg py-4 px-8"
            >
              <MessageCircle className="ml-3 h-6 w-6" />
              ابدأ التوصيل معنا الآن
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-right">
              <p className="text-white/80">
                © 2024 خدمة التوصيل السريع - الكويت. جميع الحقوق محفوظة.
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm">
                صُمم بـ ❤️ لخدمة أهل الكويت
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;