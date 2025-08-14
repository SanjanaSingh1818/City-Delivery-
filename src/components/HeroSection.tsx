import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const whatsappNumbers = [
    { number: '67771782', label: 'رقم التوصيل 1' },
    { number: '41142201', label: 'رقم التوصيل 2' },
    { number: '52552233', label: 'رقم التوصيل 3' },
    { number: '55335131', label: 'رقم التوصيل 4' },
  ];

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    // Initial states
    gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current, logoRef.current], {
      opacity: 0,
      y: 50,
    });

    // Animations
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");

  }, []);

  const handleWhatsAppClick = (number: string) => {
    window.open(`https://wa.me/965${number}`, '_blank');
  };

  const handleCallClick = (number: string) => {
    window.location.href = `tel:+965${number}`;
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 py-20 gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Logo Placeholder */}
        <div ref={logoRef} className="mb-8">
          <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
            {/* TODO: Replace with actual logo */}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-xl">KE</span>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 ref={titleRef} className="hero-title text-white mb-6">
          تهمك السرعة والدقة بتوصيل طلباتك؟
        </h1>

        {/* Subheading */}
        <p ref={subtitleRef} className="hero-subtitle text-white/90 mb-12 max-w-3xl mx-auto">
          سائقين منتشرين بمعظم مناطق الكويت - نوصل طلباتك بسرعة ودقة عالية
        </p>

        {/* WhatsApp Buttons */}
        <div ref={buttonsRef} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {whatsappNumbers.map((contact, index) => (
              <div key={contact.number} className="space-y-2">
                <Button
                  onClick={() => handleWhatsAppClick(contact.number)}
                  className="btn-whatsapp w-full group"
                >
                  <MessageCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  واتساب {contact.number}
                </Button>
                <Button
                  onClick={() => handleCallClick(contact.number)}
                  variant="outline"
                  className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Phone className="ml-2 h-4 w-4" />
                  اتصال مباشر
                </Button>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="max-w-md mx-auto">
            <Button
              onClick={() => handleWhatsAppClick(whatsappNumbers[0].number)}
              size="lg"
              className="btn-whatsapp w-full text-lg py-4 group"
            >
              <MessageCircle className="ml-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              اطلب توصيل سريع الآن
            </Button>
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-12 text-white/80 text-sm">
          <p>⚡ توصيل في أقل من ساعة | 🎯 دقة عالية | 🚚 تغطية شاملة للكويت</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;